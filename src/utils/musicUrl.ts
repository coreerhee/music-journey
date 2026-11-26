import type { MusicLocation } from "../types/music";

export function getListeningUrl(location: Pick<MusicLocation, "musicUrl" | "startTime">): string {
  const [minutes, seconds] = location.startTime.split(":").map(Number);
  const url = new URL(location.musicUrl);
  url.searchParams.set("t", `${minutes * 60 + seconds}s`);
  return url.toString();
}
