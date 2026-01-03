import { api } from "../../../shared/api/api";
import type { ITrack } from "../model/model";

async function getTrackData(trackId: number): Promise<ITrack> {
  return await api<ITrack>(`/media/${trackId}/info.json`);
}

async function getTrackAudio(trackId: number): Promise<HTMLAudioElement> {
  return await api<HTMLAudioElement>(`/media/${trackId}/${trackId}.mp3`);
}

export { getTrackData, getTrackAudio };
