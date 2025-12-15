import { format } from 'date-fns'
import { nb, enUS, ar } from 'date-fns/locale'
import { pickBy, identity } from 'lodash'

const locales = {
  no: nb,
  en: enUS,
  ar: ar
}

// eslint-disable-next-line max-params
export const timespanAsString = (bb, eb, date, be, ee, lang) => {
  let dates = pickBy({ bb, eb, date, be, ee }, identity)
  dates = Object.assign(
    {},
    ...Object.keys(dates).map((d) => ({
      [d]: format(new Date(dates[d]), 'PPP', { locale: locales[lang] })
    }))
  )

  const prettyTimespan = `${dates.date || ''}${dates.bb || ''}${dates.bb && dates.eb ? '~' : ''}${dates.eb || ''}` +
    `${(dates.bb || dates.eb) && (dates.be || dates.ee) ? ' / ' : ''}` +
    `${dates.be || ''}${dates.be && dates.ee ? '~' : ''}${dates.ee || ''}`

  return prettyTimespan
}
