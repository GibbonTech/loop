import "clsx";
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const DRIIVO_FEE_RATE = 0.1;
const COTISATIONS_RATE = 0.14;
function calculateFees(ca) {
  return Math.round(ca * DRIIVO_FEE_RATE);
}
function calculateCotisations(ca) {
  return Math.round(ca * COTISATIONS_RATE);
}
function getSalaryBreakdown(ca) {
  const fees = calculateFees(ca);
  const cotisations = calculateCotisations(ca);
  const net = ca - fees - cotisations;
  return {
    ca,
    fees,
    cotisations,
    net,
    feesRate: DRIIVO_FEE_RATE,
    cotisationsRate: COTISATIONS_RATE
  };
}
export {
  formatNumber as f,
  getSalaryBreakdown as g
};
