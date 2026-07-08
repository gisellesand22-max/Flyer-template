import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Monitor} from './components/Monitor';
import {CoffeeCup} from './components/CoffeeCup';
import {Character} from './components/Character';
import {Vignette} from './components/Vignette';

export const DeveloperBurnout: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, width, height} = useVideoConfig();

	// slow push-in over the whole shot
	const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.14], {
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
					transformOrigin: '50% 55%',
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

				{/* desk surface */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: height * 0.14,
						height: height * 0.05,
						background: 'linear-gradient(180deg, #171a1f 0%, #0c0e11 100%)',
						boxShadow: '0 -6px 40px rgba(60,120,255,0.08)',
					}}
				/>

				{/* monitors behind character */}
				<Monitor x={width * 0.06} y={height * 0.26} width={width * 0.28} height={height * 0.16} rotate={-6} variant="code" seed={1} />
				<Monitor x={width * 0.36} y={height * 0.21} width={width * 0.3} height={height * 0.18} rotate={0} variant="ai" seed={2} />
				<Monitor x={width * 0.68} y={height * 0.26} width={width * 0.28} height={height * 0.16} rotate={6} variant="code" seed={3} />

				{/* scattered coffee cups and clutter on the desk */}
				<CoffeeCup x={width * 0.1} y={height * 0.79} scale={0.9} rotate={-4} seedOffset={0} />
				<CoffeeCup x={width * 0.8} y={height * 0.78} scale={1} rotate={5} seedOffset={2} />
				<CoffeeCup x={width * 0.86} y={height * 0.82} scale={0.7} rotate={-8} seedOffset={4} />

				{/* the developer, foreground, closest to camera */}
				<Character width={width} height={height} />

				<Vignette />
			</div>
		</AbsoluteFill>
	);
};
