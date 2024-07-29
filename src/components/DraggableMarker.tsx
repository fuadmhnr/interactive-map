import { useCallback, useMemo, useRef, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { LatLng, Marker as LeafletMarker } from 'leaflet'

type draggableProps = {
    lat: number,
    lng: number
}

const DraggableMarker = (location:draggableProps) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState<LatLng>(new LatLng(location.lat, location.lng))
    const markerRef = useRef<LeafletMarker>(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
          <p>{`Position: ${position.lat}, ${position.lng}`}</p>
        </Popup>
      </Marker>
    )
}

export default DraggableMarker