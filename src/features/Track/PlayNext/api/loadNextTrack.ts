import { getTrackData } from "../../../../entities/track/api/api";
import type { ITrackAdditionalInfo } from "../../../../entities/track/model/model";
import { BASE_URL } from "../../../../shared/config/config";

async function loadNextTrack(
  trackId: number,
  volume: number,
  isShuffled: boolean,
  isPlaying: boolean,
  isRepeated: boolean
): Promise<ITrackAdditionalInfo> {
  trackId += 1;

  if (trackId > 10) {
    trackId = 1;
  }
  
  const data = await getTrackData(trackId);
  const trackData: ITrackAdditionalInfo = {
    ...data,
    cover: `${BASE_URL}/media/${trackId}/${data.cover}`,
    id: trackId,
    isShuffled: isShuffled,
    isPlaying: isPlaying,
    isRepeated: isRepeated,
    listeningTime: 0,
    volume: volume,
    src: `${BASE_URL}/media/${trackId}/${trackId}.mp3`,
  };

  return trackData;
}

export { loadNextTrack };
