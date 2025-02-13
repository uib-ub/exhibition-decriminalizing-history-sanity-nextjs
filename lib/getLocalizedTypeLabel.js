const getLocalizedTypeLabel = (value) => {
  if (!value) return null

  switch (value) {
    case 'Production':
      return {
        no: 'Produksjon',
        en: value,
        es: 'Producción'
      }
    case 'BeginningOfExistence':
      return {
        no: 'Skapelse',
        en: 'Creation',
        es: 'Creación'
      }
    default:
      return {
        no: value,
        en: value,
        es: value
      }
  }
}

export default getLocalizedTypeLabel