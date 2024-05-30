export function getTime(): string {
  const dayWeek: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  const date: Date = new Date()
  return `${dayWeek[date.getDay()]}, ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`
}

export function timeToMinutes(time: string): number {
  const [hoursStr, minutesStr] = time.split(':').map((part) => parseInt(part, 10))
  const totalMinutes = hoursStr * 60 + minutesStr
  return totalMinutes
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const hoursStr = String(hours).padStart(2, '0')
  const minsStr = String(mins).padStart(2, '0')
  return `${hoursStr}:${minsStr}`
}
