import React, { useMemo, useRef, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { LatLng, Marker as LeafletMarker } from "leaflet";

const PinMarker = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15);
    },
  });

  const markerRef = useRef<LeafletMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  return position === null ? null : (
    <Marker position={position} eventHandlers={eventHandlers} ref={markerRef} draggable>
      <Popup><span>
            your pin here
          </span>
        <p>{`Position: ${position.lat}, ${position.lng}`}</p>
        </Popup>
    </Marker>
  )
}

export default PinMarker