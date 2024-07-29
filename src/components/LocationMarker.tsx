import { useCallback, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng, Marker as LeafletMarker } from "leaflet";

function LocationMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
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
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return position === null ? null : (
    <Marker position={position} draggable={draggable} eventHandlers={eventHandlers} ref={markerRef}>
      <Popup><span onClick={toggleDraggable}>
            {draggable
              ? 'you are here'
              : 'Click here to make marker draggable'}
          </span>
        <p>{`Position: ${position.lat}, ${position.lng}`}</p>
        </Popup>
    </Marker>
  );
}

export default LocationMarker;
