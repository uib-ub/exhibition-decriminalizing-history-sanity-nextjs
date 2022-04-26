import React, { useState } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import { createGeojson, fitViewportToFeature } from './util'

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Map({ data }) {
  const [viewport, setViewport] = useState({
    width: 300,
    height: 200,
    zoom: 7,
    pitch: 30,
    attributionControl: false,
    latitude: latitude,
    longitude: longitude,
  })

  if (!data) {
    return null
  }

  const geojson = createGeojson(data)
  const { latitude, longitude } = fitViewportToFeature(geojson, {
    padding: { left: 20, top: 20, right: 20, bottom: 20 },
  })


  return (
    <MapGL
      mapboxApiAccessToken={token}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Source type="geojson" data={geojson}>
        <Layer
          id="point"
          type="circle"
          paint={{
            'circle-radius': 10,
            'circle-color': '#007cbf',
          }}
        />
        <Layer
          id="line"
          type="line"
          paint={{
            'line-width': 4,
            'line-color': '#007cbf',
          }}
        />
      </Source>
    </MapGL>
  )
}
