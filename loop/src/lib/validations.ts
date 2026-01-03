import { z } from "zod";

// ============================================
// Common Validation Patterns
// ============================================

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const phoneSchema = z
  .string()
  .min(1, "Le téléphone est requis")
  .regex(phoneRegex, "Numéro de téléphone invalide");

export const emailSchema = z
  .string()
  .min(1, "L'email est requis")
  .email("Adresse email invalide");

export const nameSchema = z
  .string()
  .min(2, "Minimum 2 caractères")
  .max(50, "Maximum 50 caractères");

// ============================================
// Simulateur Form Schema
// ============================================

export const simulateurFormSchema = z.object({
  prenom: nameSchema,
  email: emailSchema,
  telephone: phoneSchema,
});

export type SimulateurFormData = z.infer<typeof simulateurFormSchema>;

// ============================================
// Inscription Form Schema
// ============================================

export const inscriptionFormSchema = z.object({
  // Step 1: Personal Info
  prenom: nameSchema,
  nom: nameSchema,
  email: emailSchema,
  telephone: phoneSchema,
  ville: z.string().min(2, "La ville est requise"),
  
  // Step 2: VTC Info
  carteVtc: z.enum(["oui", "non", "en_cours"], "Veuillez sélectionner une option"),
  numeroCarteVtc: z.string().optional(),
  experience: z.string().min(1, "L'expérience est requise"),
  
  // Step 3: Vehicle & Activity
  vehicule: z.enum(["oui", "non"], "Veuillez sélectionner une option"),
  vehiculeModele: z.string().optional(),
  plateformes: z.array(z.string()).min(1, "Sélectionnez au moins une plateforme"),
  caMensuel: z.string().min(1, "Le CA mensuel est requis"),
});

export type InscriptionFormData = z.infer<typeof inscriptionFormSchema>;

// Step-specific schemas for progressive validation
export const inscriptionStep1Schema = inscriptionFormSchema.pick({
  prenom: true,
  nom: true,
  email: true,
  telephone: true,
  ville: true,
});

export const inscriptionStep2Schema = inscriptionFormSchema.pick({
  carteVtc: true,
  numeroCarteVtc: true,
  experience: true,
});

export const inscriptionStep3Schema = inscriptionFormSchema.pick({
  vehicule: true,
  vehiculeModele: true,
  plateformes: true,
  caMensuel: true,
});

// ============================================
// Reunion (Meeting) Form Schema
// ============================================

export const reunionFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner un créneau"),
});

export type ReunionFormData = z.infer<typeof reunionFormSchema>;

// ============================================
// Lead Form Schema (for API)
// ============================================

export const leadSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  monthlyRevenue: z.string().optional(),
  source: z.enum(["SIMULATEUR", "LANDING", "REUNION"]),
});

export type LeadData = z.infer<typeof leadSchema>;

// ============================================
// Validation Helper
// ============================================

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  
  return { success: false, errors };
}
