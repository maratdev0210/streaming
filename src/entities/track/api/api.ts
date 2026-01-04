import { api } from "../../../shared/api/api";
import type { ITrack } from "../model/model";

async function getTrackData(trackId: number): Promise<ITrack> {
  return await api<ITrack, unknown>(`/media/${trackId}/info.json`, "GET");
}

export { getTrackData };
