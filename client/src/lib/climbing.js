export const GRADES = Array.from({ length: 18 }, (_, i) => `V${i}`)
export const STYLES = ['slab', 'vertical', 'overhang', 'roof', 'crimp', 'dyno']

export const gradeNumber = (grade) => Number(grade.slice(1))

// Summary used on logbook cards and the session page
export function summarise(climbs = []) {
  const sent = climbs.filter((c) => c.sent)
  const hardest = sent.reduce((max, c) => Math.max(max, gradeNumber(c.grade)), -1)
  return {
    total: climbs.length,
    sent: sent.length,
    hardest: hardest >= 0 ? `V${hardest}` : null,
  }
}