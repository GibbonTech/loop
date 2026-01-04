import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// Number Formatting
// ============================================

/**
 * Format a number with French-style thousand separators (spaces)
 * Example: 5000 -> "5 000"
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Format a number as currency (EUR)
 * Example: 5000 -> "5 000 €"
 */
export function formatCurrency(num: number): string {
  return `${formatNumber(num)} €`;
}

// ============================================
// Driivo Salary Calculations
// ============================================

/** Driivo management fee rate (10%) */
export const DRIIVO_FEE_RATE = 0.10;

/** Social contributions rate (14%) */
export const COTISATIONS_RATE = 0.14;

/** Net rate after all deductions (76%) */
export const NET_RATE = 1 - DRIIVO_FEE_RATE - COTISATIONS_RATE;

/**
 * Calculate Driivo management fees from CA
 */
export function calculateFees(ca: number): number {
  return Math.round(ca * DRIIVO_FEE_RATE);
}

/**
 * Calculate social contributions from CA
 */
export function calculateCotisations(ca: number): number {
  return Math.round(ca * COTISATIONS_RATE);
}

/**
 * Calculate net salary from CA
 */
export function calculateNet(ca: number): number {
  return ca - calculateFees(ca) - calculateCotisations(ca);
}

/**
 * Get full salary breakdown from CA
 */
export function getSalaryBreakdown(ca: number) {
  const fees = calculateFees(ca);
  const cotisations = calculateCotisations(ca);
  const net = ca - fees - cotisations;

  return {
    ca,
    fees,
    cotisations,
    net,
    feesRate: DRIIVO_FEE_RATE,
    cotisationsRate: COTISATIONS_RATE,
  };
}

// ============================================
// Status Comparison Calculations
// ============================================

/** Auto-entrepreneur: ~23% URSSAF charges on CA */
export const AUTO_ENTREPRENEUR_CHARGE_RATE = 0.23;

/** SASU: High charges (employer + employee + IS) ~65% */
export const SASU_CHARGE_RATE = 0.65;

/**
 * Calculate Auto-entrepreneur net income
 * Net ≈ 77% of CA after URSSAF charges
 */
export function calculateAutoEntrepreneurNet(ca: number): number {
  return Math.round(ca * (1 - AUTO_ENTREPRENEUR_CHARGE_RATE));
}

/**
 * Calculate SASU net salary
 * Very simplified: high charges result in ~35% net
 */
export function calculateSASUNet(ca: number): number {
  return Math.round(ca * (1 - SASU_CHARGE_RATE));
}
