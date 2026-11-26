import {Marker, Popup} from "react-leaflet";
import { useEffect, useRef } from "react";
import type { Marker as LeafletMarker } from "leaflet";
import MusicLocationSummary from "./MusicLocationSummary";

import type { MusicLocation } from "../types/music";

interface MusicMarkerProps {
    location: MusicLocation;
    onSelect: (Location: MusicLocation) => void;
    showOnMap?: boolean;
}

export default function MusicMarker({location, onSelect, showOnMap = false}: MusicMarkerProps) {
    const markerRef = useRef<LeafletMarker>(null);

    useEffect(() => {
        if (showOnMap) markerRef.current?.openPopup();
    }, [showOnMap]);

    return (
        <Marker ref={markerRef} position={[location.latitude, location.longitude]}>
            <Popup
                autoClose={!showOnMap}
                closeOnClick={!showOnMap}
                autoPan={!showOnMap}
            >
                <MusicLocationSummary location={location} />

                <button type="button" onClick={() => onSelect(location)}>
                    자세히 보기
                </button>
            </Popup>
        </Marker>
    )
}
