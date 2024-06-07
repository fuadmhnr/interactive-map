import { FC, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip, useMapEvent } from 'react-leaflet';
import { Modal } from 'react-bootstrap';
import salesData from '../data/salesData'
import 'leaflet/dist/leaflet.css';


export const IndonesiaMap: FC = () => {
    const [activeProvince, setActiveProvince] = useState<string | null>(null)

    const onEachProvince = (feature: any, layer: any) => {
        const provinceName = feature.properties.name;
        layer.on({
            mouseover: (e: any) => {
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    fillOpacity: 0.7
                });
                const salesInfo = salesData[provinceName];
                layer.bindTooltip(`
              <div>
                <strong>${provinceName}</strong><br/>
                Penjualan TV: ${salesInfo.tv}<br/>
                Penjualan Radio: ${salesInfo.radio}<br/>
                Penjualan Handphone: ${salesInfo.handphone}
              </div>
            `);
            },
            mouseout: (e: any) => {
                layer.setStyle({
                    weight: 1,
                    color: '#3388ff',
                    fillOpacity: 0.2
                });
                layer.unbindTooltip();
            },
            click: () => {
                setActiveProvince(provinceName);
            }
        });
    };

    const geoJsonStyle = {
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: 'blue',
        fillOpacity: 0.2
    };

    return (
        <div>
            <MapContainer center={[-2.548926, 118.0148634]} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={require('../data/indonesia.geojson')} style={geoJsonStyle} onEachFeature={onEachProvince} />
            </MapContainer>
            {activeProvince && (
                <Modal show={true} onHide={() => setActiveProvince(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Penjualan di {activeProvince}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Penjualan TV: {salesData[activeProvince].tv}</p>
                        <p>Penjualan Radio: {salesData[activeProvince].radio}</p>
                        <p>Penjualan Handphone: {salesData[activeProvince].handphone}</p>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};