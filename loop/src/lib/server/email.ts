import { Resend } from "resend";

// Lazy-initialize Resend at runtime (not build time)
// CRITICAL: Must read process.env directly at runtime, NOT through t3-env
let _resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (_resend) return _resend;

  const apiKey = process["env"]["RESEND_API_KEY"];

  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY is not set");
    return null;
  }

  _resend = new Resend(apiKey);
  return _resend;
}

const APP_URL = "https://app.driivo.fr";
// Using verified siratscolaire.fr domain on Resend
const FROM_EMAIL = "Driivo <noreply@siratscolaire.fr>";
const DRIIVO_PRIMARY = "#f97316"; // orange-500

/**
 * Base email template
 */
function emailTemplate(content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #1f2937; line-height: 1.7;">
        <div style="border-top: 3px solid ${DRIIVO_PRIMARY}; padding-top: 24px;">
          <div style="margin-bottom: 24px;">
            <strong style="font-size: 20px; color: #0a0a0a;">Driivo</strong>
          </div>
          ${content}
          <p style="margin-top: 32px; color: #6b7280; font-size: 14px;">
            L'équipe Driivo<br/>
            <a href="https://driivo.fr" style="color: ${DRIIVO_PRIMARY};">driivo.fr</a>
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Application submitted - confirmation to driver
 */
export async function sendApplicationConfirmationEmail(data: {
  email: string;
  firstName: string;
}) {
  const { email, firstName } = data;

  const html = emailTemplate(`
    <p>Bonjour ${firstName},</p>
    <p>Nous avons bien reçu votre candidature pour rejoindre Driivo en tant qu'entrepreneur salarié VTC.</p>
    <p>Notre équipe va examiner votre dossier dans les plus brefs délais. Vous recevrez un email dès qu'une décision sera prise.</p>
    <div style="margin: 20px 0; padding: 20px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
      <p style="margin: 0 0 8px 0; font-weight: bold; color: #0369a1;">Votre espace personnel</p>
      <p style="margin: 0; font-size: 14px;">Un compte a été créé avec votre email <strong>${email}</strong>.</p>
      <p style="margin: 4px 0 0 0; font-size: 14px;">Vous allez recevoir un second email pour choisir votre mot de passe et accéder à votre espace.</p>
    </div>
    <p><strong>Prochaines étapes :</strong></p>
    <ul style="margin: 16px 0; padding-left: 20px;">
      <li>Vérification de votre dossier par notre équipe</li>
      <li>Prise de contact pour un entretien téléphonique</li>
      <li>Signature du contrat et démarrage</li>
    </ul>
  `);

  return sendEmail({
    to: email,
    subject: "Candidature reçue - Driivo",
    html,
  });
}

/**
 * Set password email - sent via betterAuth's sendResetPassword
 */
export async function sendSetPasswordEmail(data: {
  email: string;
  firstName: string;
  url: string;
}) {
  const { email, firstName, url } = data;

  const html = emailTemplate(`
    <p>Bonjour ${firstName},</p>
    <p>Choisissez un mot de passe pour accéder à votre espace Driivo.</p>
    <p style="margin: 24px 0;">
      <a href="${url}" style="display: inline-block; background: ${DRIIVO_PRIMARY}; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold;">Créer mon mot de passe</a>
    </p>
    <p style="font-size: 13px; color: #6b7280;">Ce lien expire dans 7 jours. Si vous n'avez pas fait de candidature, ignorez cet email.</p>
  `);

  return sendEmail({
    to: email,
    subject: "Créez votre mot de passe - Driivo",
    html,
  });
}

/**
 * Application status changed - notification to driver
 */
export async function sendApplicationStatusEmail(data: {
  email: string;
  firstName: string;
  status: "APPROVED" | "REJECTED" | "UNDER_REVIEW";
  notes?: string;
}) {
  const { email, firstName, status, notes } = data;

  const statusConfig = {
    APPROVED: {
      subject: "Félicitations ! Votre candidature est approuvée - Driivo",
      color: "#16a34a",
      message: `
        <p>Bonjour ${firstName},</p>
        <p>Excellente nouvelle ! Votre candidature a été <strong style="color: #16a34a;">approuvée</strong>.</p>
        <p>Bienvenue chez Driivo ! Un membre de notre équipe va vous contacter prochainement pour finaliser votre inscription et planifier les prochaines étapes.</p>
        ${notes ? `<div style="margin: 16px 0; padding: 16px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;"><p style="margin: 0;">${notes}</p></div>` : ""}
        <p style="margin: 24px 0;">
          <a href="${APP_URL}/espace" style="display: inline-block; background: ${DRIIVO_PRIMARY}; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Accéder à mon espace</a>
        </p>
      `,
    },
    REJECTED: {
      subject: "Mise à jour de votre candidature - Driivo",
      color: "#dc2626",
      message: `
        <p>Bonjour ${firstName},</p>
        <p>Après examen de votre dossier, nous ne sommes malheureusement pas en mesure de donner suite à votre candidature pour le moment.</p>
        ${notes ? `<div style="margin: 16px 0; padding: 16px; background: #fef2f2; border-left: 4px solid #dc2626; border-radius: 4px;"><p style="margin: 0;">${notes}</p></div>` : ""}
        <p>N'hésitez pas à nous recontacter si votre situation évolue.</p>
      `,
    },
    UNDER_REVIEW: {
      subject: "Votre candidature est en cours d'examen - Driivo",
      color: "#f59e0b",
      message: `
        <p>Bonjour ${firstName},</p>
        <p>Votre candidature est actuellement <strong style="color: #f59e0b;">en cours d'examen</strong> par notre équipe.</p>
        <p>Nous reviendrons vers vous très prochainement avec une réponse.</p>
        <p style="margin: 24px 0;">
          <a href="${APP_URL}/espace" style="display: inline-block; background: ${DRIIVO_PRIMARY}; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Suivre ma candidature</a>
        </p>
      `,
    },
  };

  const config = statusConfig[status];

  const html = emailTemplate(config.message);

  return sendEmail({
    to: email,
    subject: config.subject,
    html,
  });
}

/**
 * Meeting booking confirmation
 */
export async function sendMeetingConfirmationEmail(data: {
  email: string;
  firstName: string;
  date: string;
  timeSlot: string;
}) {
  const { email, firstName, date, timeSlot } = data;

  const html = emailTemplate(`
    <p>Bonjour ${firstName},</p>
    <p>Votre rendez-vous téléphonique avec l'équipe Driivo est confirmé.</p>
    <div style="margin: 20px 0; padding: 16px; background: #f9fafb; border-radius: 8px;">
      <p style="margin: 0;"><strong>Date :</strong> ${date}</p>
      <p style="margin: 8px 0 0 0;"><strong>Heure :</strong> ${timeSlot}</p>
      <p style="margin: 8px 0 0 0;"><strong>Durée :</strong> ~15 minutes</p>
    </div>
    <p>Nous vous appellerons au numéro que vous avez renseigné. Assurez-vous d'être disponible à l'heure convenue.</p>
  `);

  return sendEmail({
    to: email,
    subject: `Rendez-vous confirmé le ${date} à ${timeSlot} - Driivo`,
    html,
  });
}

/**
 * New application notification to admin
 */
export async function sendNewApplicationAdminEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  applicationId: string;
}) {
  const { firstName, lastName, email: applicantEmail, applicationId } = data;

  const adminEmail = process["env"]["ADMIN_NOTIFICATION_EMAIL"] || "admin@driivo.fr";

  const html = emailTemplate(`
    <p>Nouvelle candidature reçue :</p>
    <div style="margin: 20px 0; padding: 16px; background: #f9fafb; border-radius: 8px;">
      <p style="margin: 0;"><strong>Nom :</strong> ${firstName} ${lastName}</p>
      <p style="margin: 8px 0 0 0;"><strong>Email :</strong> ${applicantEmail}</p>
    </div>
    <p style="margin: 24px 0;">
      <a href="${APP_URL}/admin/applications/${applicationId}" style="display: inline-block; background: ${DRIIVO_PRIMARY}; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Voir la candidature</a>
    </p>
  `);

  return sendEmail({
    to: adminEmail,
    subject: `Nouvelle candidature : ${firstName} ${lastName}`,
    html,
  });
}

/**
 * Core email sending function
 */
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}): Promise<{ success: boolean; message?: string; id?: string }> {
  const { to, subject, html, from = FROM_EMAIL } = options;

  const resend = getResendClient();
  if (!resend) {
    console.warn("[Email] Resend not configured, skipping email to:", to);
    return { success: false, message: "Email service not configured" };
  }

  try {
    console.log("[Email] Sending to:", to, "subject:", subject);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Resend API error:", JSON.stringify(error, null, 2));
      return { success: false, message: error.message };
    }

    console.log("[Email] Sent successfully:", data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("[Email] Exception:", error?.message || error);
    return { success: false, message: String(error) };
  }
}
