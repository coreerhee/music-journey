import type { MusicLocation } from "../types/music";
import { getListeningUrl } from "../utils/musicUrl";

export default function MusicLocationSummary({
  location,
  showVideoLink = true,
}: {
  location: MusicLocation;
  showVideoLink?: boolean;
}) {
  return (
    <>
      <strong>{location.title}</strong>
      <p>{location.observationLocation}</p>
      {showVideoLink && (
        <a href={getListeningUrl(location)} target="_blank" rel="noopener noreferrer">
          영상 감상하기
        </a>
      )}
    </>
  );
}
