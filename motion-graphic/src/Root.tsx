import { Composition } from "remotion";
import { LinktreeMG } from "./LinktreeMG";

export const RemotionRoot = () => {
  return (
    <Composition
      id="LinktreeMG"
      component={LinktreeMG}
      durationInFrames={450}
      fps={30}
      width={540}
      height={960}
      defaultProps={{}}
    />
  );
};
