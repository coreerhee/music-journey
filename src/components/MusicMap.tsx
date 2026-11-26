import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Control, DomEvent, DomUtil, latLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import {locations} from "../data/locations";
import type { MusicLocation } from "../types/music";
import MusicMarker from "./MusicMarker";
import MusicCard from "./MusicCard";

const noLocations: string[] = [];
const initialCenter: [number, number] = [25, 115];
const initialZoom = 3;

function MapResetControl() {
  const map = useMap();

  useEffect(() => {
    const control = new Control({ position: "topright" });
    const container = DomUtil.create("div", "map-reset-control");
    const button = DomUtil.create("button", "", container);
    button.type = "button";
    button.textContent = "지도 초기화";
    button.title = "처음 위치와 확대 수준으로 돌아가기";
    const resetView = () => map.setView(initialCenter, initialZoom);
    button.addEventListener("click", resetView);
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);
    control.onAdd = () => container;
    control.addTo(map);

    return () => {
      button.removeEventListener("click", resetView);
      DomEvent.off(container);
      control.remove();
    };
  }, [map]);

  return null;
}

function FocusSummaries({ ids }: { ids: string[] }) {
  const map = useMap();
  useEffect(() => {
    const visible = locations.filter((location) => ids.includes(location.id));
    if (!visible.length) return;
    const bounds = latLngBounds(visible.map((location) => [location.latitude, location.longitude]));
    map.fitBounds(bounds, { padding: [100, 100], maxZoom: 4 });
  }, [ids, map]);
  return null;
}

export default function MusicMap({ guided = false, summaryIds = noLocations, onGuidedSelect }: { guided?: boolean; summaryIds?: string[]; onGuidedSelect?: (location: MusicLocation) => void }) {
  const [selectedLocation, setSelectedLocation] = useState<MusicLocation | null>(null);

  return (
    <>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="music-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          guided && !summaryIds.includes(location.id) ? (
            <Marker key={location.id} position={[location.latitude, location.longitude]} />
          ) : <MusicMarker
            key={location.id}
            location={location}
            showOnMap={guided}
            onSelect={guided ? (selected) => onGuidedSelect?.(selected) : setSelectedLocation}
            />
        ))}
        {guided && <FocusSummaries ids={summaryIds} />}
        <MapResetControl />
      </MapContainer>

      {selectedLocation && (
        <MusicCard
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  );
}
