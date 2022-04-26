import { parseISO, format } from 'date-fns'
import nb from 'date-fns/locale/nb'

export default function Date({ dateFormat = 'do LLL yyyy', children }) {
  if (!children) {
    return null
  }

  const date = parseISO(children)

  return <time dateTime={children}>{format(date, dateFormat, { locale: nb })}</time>
}
