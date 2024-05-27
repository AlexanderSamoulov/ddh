export default function getTime(): string {
  const dayWeek: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  const date: Date = new Date()
  return `${dayWeek[date.getDay()]}, ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`
}
