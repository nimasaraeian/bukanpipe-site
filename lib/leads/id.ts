export function generateLeadId(): string {
  const timePart = Date.now().toString(36).toUpperCase().slice(-5);
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BP-${timePart}${randomPart}`;
}
