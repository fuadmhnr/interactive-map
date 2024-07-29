import { useCallback, useMemo, useState } from 'react'
import { Rectangle, useMap, useMapEvent } from 'react-leaflet'
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
  
const BOUNDS_STYLE = { weight: 1 }
interface MinimapBoundsProps {
    parentMap: LeafletMap;
    zoom: number;
  }

const MinimapBounds = ({ parentMap, zoom }:MinimapBoundsProps) => {
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)
  
    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])
  
    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)
  
    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

export default MinimapBounds