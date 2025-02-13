export default function Timespan({ timespan, locale = 'en' }) {
  if (!timespan) {
    return null
  }

  return (
    <div>
      {timespan.length > 0 && timespan.map((time) => (
        <p key={time._key}>{time.edtf}</p>
      ))}
      {timespan && (
        <p key={timespan._key}>{timespan.edtf}</p>
      )}
    </div>
  )
}
