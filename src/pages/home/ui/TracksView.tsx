import { useQueries } from "@tanstack/react-query";
import { getTrackData } from "../../../entities/track/api/api";

const LIMIT = 10;

const generateQueries = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
    return {
      queryKey: ["tracks", index + 1],
      queryFn: () => getTrackData(index + 1),
    };
  });
};

export function TracksView() {
  const results = useQueries({
    queries: generateQueries(),
  });

  results.map((result, index) => {
    console.log(result.data);
  });

  return (
    <>
      <h1>Tracks View</h1>
    </>
  );
}
