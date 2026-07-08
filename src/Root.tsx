import {Composition} from 'remotion';
import {DeveloperBurnout} from './DeveloperBurnout';

export const FPS = 30;
export const DURATION_IN_SECONDS = 7;

export const Root: React.FC = () => {
	return (
		<Composition
			id="DeveloperBurnout"
			component={DeveloperBurnout}
			durationInFrames={DURATION_IN_SECONDS * FPS}
			fps={FPS}
			width={1080}
			height={1920}
		/>
	);
};
