import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Monitor} from './components/Monitor';
import {CoffeeCup} from './components/CoffeeCup';
import {EmptyChair} from './components/EmptyChair';
import {Cables, StickyNotes} from './components/DeskClutter';
import {Vignette} from './components/Vignette';

export const DeveloperBurnout: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, width, height} = useVideoConfig();

	// slow push-in toward the screens over the whole shot
	const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.22], {
		easing: Easing.inOut(Easing.ease),
		extrapolateRight: 'clamp',
	});

	// subtle handheld drift, smooth via noise instead of random jitter
	const handheldX = noise2D('handheld-x', frame * 0.04, 0) * 10;
	const handheldY = noise2D('handheld-y', frame * 0.04, 1) * 8;
	const handheldRot = noise2D('handheld-rot', frame * 0.03, 2) * 0.6;

	return (
		<AbsoluteFill style={{backgroundColor: '#04060a', overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `scale(${pushIn}) translate(${handheldX}px, ${handheldY}px) rotate(${handheldRot}deg)`,
					transformOrigin: '50% 30%',
				}}
			>
				{/* dark room background with faint blue ambient wash */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(ellipse at 50% 30%, #0d1622 0%, #05080d 60%, #020304 100%)',
					}}
				/>

				{/* wall-mounted ambient glow behind the desk */}
				<div
					style={{
						position: 'absolute',
						left: width * 0.1,
						top: height * 0.18,
						width: width * 0.8,
						height: height * 0.3,
						background:
							'radial-gradient(ellipse at center, rgba(70,140,255,0.22) 0%, rgba(70,140,255,0) 70%)',
						filter: 'blur(20px)',
					}}
				/>

				{/* desk surface, raised so monitors and chair read as one continuous scene */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: height * 0.6,
						height: height * 0.032,
						background: 'linear-gradient(180deg, #1c2028 0%, #0c0e11 100%)',
						boxShadow: '0 -6px 40px rgba(60,120,255,0.1)',
					}}
				/>
				{/* desk front panel, filling down to the floor */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: height * 0.632,
						bottom: 0,
						background: 'linear-gradient(180deg, #10131a 0%, #05070a 60%)',
					}}
				/>

				{/* monitors sitting on the desk, the visual focus now that it's empty */}
				<Monitor x={width * 0.05} y={height * 0.325} width={width * 0.3} height={height * 0.26} rotate={-6} variant="code" seed={1} />
				<Monitor x={width * 0.36} y={height * 0.28} width={width * 0.32} height={height * 0.29} rotate={0} variant="ai" seed={2} />
				<Monitor x={width * 0.69} y={height * 0.325} width={width * 0.3} height={height * 0.26} rotate={6} variant="code" seed={3} />

				{/* the empty office chair, pushed back and turned as if just vacated */}
				<EmptyChair
					x={width * 0.25}
					y={height * 0.55}
					width={width * 0.5}
					height={height * 0.58}
					rotate={16}
				/>

				{/* cables spilling off the back of the desk */}
				<Cables fromX={width * 0.08} fromY={height * 0.632} toY={height * 0.95} count={4} />
				<Cables fromX={width * 0.82} fromY={height * 0.632} toY={height * 0.96} count={4} />

				{/* scattered coffee cups and clutter on the desk */}
				<CoffeeCup x={width * 0.06} y={height * 0.53} scale={0.85} rotate={-4} seedOffset={0} />
				<CoffeeCup x={width * 0.83} y={height * 0.52} scale={0.95} rotate={5} seedOffset={2} />
				<CoffeeCup x={width * 0.88} y={height * 0.56} scale={0.65} rotate={-8} seedOffset={4} />

				{/* sticky notes stuck to the desk edge */}
				<StickyNotes x={width * 0.04} y={height * 0.565} scale={0.8} />

				<Vignette />
			</div>
		</AbsoluteFill>
	);
};
