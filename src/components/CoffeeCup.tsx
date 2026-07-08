import React from 'react';
import {useCurrentFrame} from 'remotion';

export const CoffeeCup: React.FC<{
	x: number;
	y: number;
	scale?: number;
	rotate?: number;
	seedOffset?: number;
}> = ({x, y, scale = 1, rotate = 0, seedOffset = 0}) => {
	const frame = useCurrentFrame();

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				transform: `scale(${scale}) rotate(${rotate}deg)`,
				transformOrigin: 'bottom center',
			}}
		>
			<svg width="60" height="70" viewBox="0 0 60 70">
				<ellipse cx="26" cy="58" rx="20" ry="6" fill="#000" opacity="0.25" />
				<path
					d="M8 20 L12 55 Q13 60 18 60 L34 60 Q39 60 40 55 L44 20 Z"
					fill="#e8e4de"
					stroke="#3a3a3a"
					strokeWidth="1.5"
				/>
				<path d="M8 20 L44 20 L42 26 L10 26 Z" fill="#cfcac2" />
				<path
					d="M44 26 Q56 26 54 36 Q52 46 42 44"
					fill="none"
					stroke="#3a3a3a"
					strokeWidth="3"
				/>
				{[0, 1, 2].map((i) => {
					const t = frame + i * 20 + seedOffset * 13;
					const wobble = Math.sin(t * 0.09) * 4;
					const rise = ((t * 0.6) % 40);
					const opacity = Math.max(0, 0.35 - rise / 100);
					return (
						<path
							key={i}
							d={`M${20 + i * 8} ${18 - rise} q ${4 + wobble} -6 0 -12`}
							stroke="#dfe6ee"
							strokeWidth="2.5"
							fill="none"
							strokeLinecap="round"
							opacity={opacity}
						/>
					);
				})}
			</svg>
		</div>
	);
};
