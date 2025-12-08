export const getDiffTime = (startDate: Date, endDate: Date) => {
  const ms = endDate.getTime() - startDate.getTime()
  const days = ms / (1000 * 60 * 60 * 24)
  const hours = ms / (1000 * 60 * 60)
  const minutes = ms / (1000 * 60)
  const seconds = ms / 1000

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())

  return { ms, seconds, minutes, hours, days, months }
}
