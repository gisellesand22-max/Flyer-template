import { Composition } from "remotion";
import { ApifyMG } from "./ApifyMG";

export const RemotionRoot = () => {
  return (
    <Composition
      id="ApifyMG"
      component={ApifyMG}
      durationInFrames={450}
      fps={30}
      width={540}
      height={960}
      defaultProps={{}}
    />
  );
};
