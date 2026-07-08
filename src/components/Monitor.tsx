import React from 'react';
import {useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {CodeScreen, AiPanelScreen} from './CodeScreen';

export const Monitor: React.FC<{
	x: number;
	y: number;
	width: number;
	height: number;
	rotate?: number;
	variant?: 'code' | 'ai';
	seed: number;
}> = ({x, y, width, height, rotate = 0, variant = 'code', seed}) => {
	const frame = useCurrentFrame();
	const flicker = 0.9 + noise2D('flicker-' + seed, frame * 0.08, seed) * 0.1;

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width,
				height,
				transform: `rotate(${rotate}deg)`,
				transformOrigin: 'center',
			}}
		>
			{/* glow behind monitor */}
			<div
				style={{
					position: 'absolute',
					inset: -40,
					background:
						'radial-gradient(ellipse at center, rgba(80,150,255,0.35) 0%, rgba(80,150,255,0) 70%)',
					opacity: flicker,
					filter: 'blur(6px)',
				}}
			/>
			{/* bezel */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: '#1b1e24',
					borderRadius: 10,
					boxShadow: '0 0 30px rgba(0,0,0,0.6)',
					border: '1px solid #2a2e36',
				}}
			/>
			{/* screen */}
			<div
				style={{
					position: 'absolute',
					left: 6,
					top: 6,
					right: 6,
					bottom: 6,
					borderRadius: 4,
					overflow: 'hidden',
					opacity: flicker,
				}}
			>
				{variant === 'ai' ? <AiPanelScreen seed={seed} /> : <CodeScreen seed={seed} />}
			</div>
			{/* stand */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: height,
					width: 10,
					height: 18,
					background: '#1b1e24',
					transform: 'translateX(-50%)',
				}}
			/>
		</div>
	);
};
