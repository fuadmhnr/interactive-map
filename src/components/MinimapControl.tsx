import { useMemo } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import MinimapBounds from './MinimapBounds'

const POSITION_CLASSES:{[key: string]: string} = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

  interface MinimapControlProps {
    position?: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
    zoom?: number;
  }

const MinimapControl = ({ position, zoom }:MinimapControlProps) => {
    const parentMap = useMap()
    const mapZoom = zoom || 0
  
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 80, width: 80 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [],
    )
  
    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    )
}

export default MinimapControl