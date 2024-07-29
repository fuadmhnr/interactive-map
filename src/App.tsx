import "./App.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, Map, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { markers } from "./data/markers";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import LocationMarker from "./components/LocationMarker";
import DraggableMarker from "./components/DraggableMarker";
import PinMarker from "./components/PinMarker";

function App() {
  const mapRef = useRef<Map>(null);

  const customIcon = new Icon({
    iconUrl: "/location-pin.png",
    iconSize: [38, 38],
  });

  // custom cluster icon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createClusterCustomIcon = (cluster: any) => {
    return divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: [33, 33],
    });
  };

  const handleResetZoom = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([-2.5, 118.0], 5);
    }
  };
  return (
    <div className="map-wrapper">
      <Button onClick={handleResetZoom} className="reset-zoom-btn" size="sm" variant="light">
        Reset Zoom
      </Button>
      <MapContainer
        center={[55.75124, 37.0]}
        zoom={5}
        style={{
          height: "100vh",
          width: "100%",
        }}
        ref={mapRef}
      >
        <Marker position={[52.233069, 43.450531]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
        <TileLayer
          attribution="Google Maps"
          // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
          url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <div className="d-flex flex-column gap-2">
                  <h6>{marker.popUp}</h6>
                  <span>Total EBT : {marker.data.ebt} Data</span>
                  <span>Total PIG : {marker.data.pig} Data</span>
                  <span>Total SDG : {marker.data.sdg} Data</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* <LocationMarker /> */}
        {/* <DraggableMarker lat={-6.135} lng={106.99}/> */}
        <PinMarker/>
      </MapContainer>
    </div>
  );
}

export default App;
