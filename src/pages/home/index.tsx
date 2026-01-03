import { TracksView } from "./ui/TracksView";
import { Track } from "../../widgets/Track/ui/Track.ui";

export default function Home() {
  return (
    <>
      <h1>This is Home component</h1>
      <TracksView />
      <Track />
    </>
  );
}
