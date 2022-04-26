import { WebMercatorViewport } from 'react-map-gl'
import bbox from '@turf/bbox'
var _ = require('lodash')

export const createGeojson = (data) => {
  if (!data) {
    return null
  }

  let features = data
    .filter((x) => {
      return x._type == 'geojsonFeatureCollection'
    })
    .map((fColl) => fColl.features)

  features = _.flatten(features)

  let collection = features.map((feature) => {
    return {
      type: 'Feature',
      geometry: {
        type: `${feature.geometry._type.replace('geojson', '')}`,
        coordinates: createCoordinates(feature.geometry.coordinates),
      },
      properties: feature.properties,
    }
  })

  let extGeojson = data
    .filter((x) => {
      if (x._type === 'geojson') {
        return x._type === 'geojson'
      } else {
        return null
      }
    })
    .map((fColl) => fColl.data.code)

  let allFeatures = [...collection]

  if (extGeojson.length > 0) {
    const { features } = JSON.parse(extGeojson)
    allFeatures = [...allFeatures, ...features]
  }

  return {
    type: 'FeatureCollection',
    features: [...allFeatures],
  }
}

const createCoordinates = (coordinates) => {
  if (Array.isArray(coordinates)) {
    return coordinates.map((point) => {
      return [point.lng, point.lat]
    })
  }

  if (typeof coordinates === 'object') {
    return [coordinates.lng, coordinates.lat]
  }
}

/**
 * A helper function that animates the viewport to fit a given feature on-screen.
 * @param map Map mapbox instance we want to fit the feature to
 * @param feature Feature<any> feature to fit the map to
 * @returns Bounds
 */
export const fitViewportToFeature = (feature, options) => {
  /** Invariants */
  if (!feature) {
    throw Error('You must pass a feature to fitMapToFeature')
  }

  /** Get bounding box of feature/collection */
  const bounds = bbox(feature)

  /** Setup WebMercatorViewport instances to fit bounds */
  // const { clientWidth, clientHeight } = map.getContainer();
  const viewport = new WebMercatorViewport({ width: 300, height: 200 })

  /** Edge case: if width is less than horizontal padding, remove padding */
  if (
    typeof options.padding === 'object' &&
    viewport.width < (options.padding.left || 0) + (options.padding.right || 0)
  ) {
    options.padding = 0
    console.warn('map width is less than padding width, resetting to 0px')
  }

  /** Edge case: if width is less than vertical padding, remove padding */
  if (
    typeof options.padding === 'object' &&
    viewport.height < (options.padding.top || 0) + (options.padding.bottom || 0)
  ) {
    options.padding = 0
    console.warn('map height is less than padding height, resetting to 0px')
  }

  /** Fit the bounds we found to the new viewport and return it */
  return viewport.fitBounds(
    [
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
    ],
    options,
  )
}

/* Eksempel på GeoJSON 
const definedByGeoJSON = [
  {
    "_key": "b7abd197984f",
    "_type": "geojson",
    "data": {
      "_type": "code",
      "code": "{\n\"type\": \"FeatureCollection\",\n\"features\": [\n{\n\"type\": \"Feature\",\n\"geometry\": {\n\"type\": \"Point\",\n\"coordinates\": [\n102,\n0.5\n]\n},\n\"properties\": {\n\"prop0\": \"value0\"\n}\n},\n{\n\"type\": \"Feature\",\n\"geometry\": {\n\"type\": \"LineString\",\n\"coordinates\": [\n[\n102,\n0\n],\n[\n103,\n1\n],\n[\n104,\n0\n],\n[\n105,\n1\n]\n]\n},\n\"properties\": {\n\"prop0\": \"value0\",\n\"prop1\": 0\n}\n},\n{\n\"type\": \"Feature\",\n\"geometry\": {\n\"type\": \"Polygon\",\n\"coordinates\": [\n[\n[\n100,\n0\n],\n[\n101,\n0\n],\n[\n101,\n1\n],\n[\n100,\n1\n],\n[\n100,\n0\n]\n]\n]\n},\n\"properties\": {\n\"prop0\": \"value0\",\n\"prop1\": {\n\"this\": \"that\"\n}\n}\n}\n]\n}",
      "language": "json"
    },
    "label": {
      "_type": "localeString",
      "nor": "GeoJSON"
    }
  }
]
 */
