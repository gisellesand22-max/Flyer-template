import React from 'react';
import {useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';

export const EmptyChair: React.FC<{
	x: number;
	y: number;
	width: number;
	height: number;
	rotate?: number;
}> = ({x, y, width, height, rotate = 14}) => {
	const frame = useCurrentFrame();
	// almost-imperceptible settle sway, as if just vacated
	const sway = noise2D('chair-sway', frame * 0.02, 0) * 0.6;

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width,
				height,
				transform: `rotate(${rotate + sway}deg)`,
				transformOrigin: '50% 95%',
			}}
		>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{/* contact shadow */}
				<ellipse
					cx={width * 0.5}
					cy={height * 0.97}
					rx={width * 0.42}
					ry={height * 0.025}
					fill="#000"
					opacity={0.4}
				/>

				{/* star base + casters */}
				{[0, 1, 2, 3, 4].map((i) => {
					const angle = (i / 5) * Math.PI * 2;
					const bx = width * 0.5 + Math.cos(angle) * width * 0.34;
					const by = height * 0.93 + Math.sin(angle) * height * 0.035;
					return (
						<g key={i}>
							<line
								x1={width * 0.5}
								y1={height * 0.9}
								x2={bx}
								y2={by}
								stroke="#1c1f26"
								strokeWidth={5}
								strokeLinecap="round"
							/>
							<ellipse cx={bx} cy={by} rx={7} ry={5} fill="#101318" />
						</g>
					);
				})}

				{/* gas lift post */}
				<rect
					x={width * 0.47}
					y={height * 0.72}
					width={width * 0.06}
					height={height * 0.19}
					rx={4}
					fill="#22262e"
				/>

				{/* seat */}
				<path
					d={`M ${width * 0.24} ${height * 0.78}
					    Q ${width * 0.22} ${height * 0.68} ${width * 0.32} ${height * 0.65}
					    L ${width * 0.68} ${height * 0.65}
					    Q ${width * 0.78} ${height * 0.68} ${width * 0.76} ${height * 0.78}
					    Q ${width * 0.5} ${height * 0.84} ${width * 0.24} ${height * 0.78}
					    Z`}
					fill="#2a2e37"
				/>
				<path
					d={`M ${width * 0.28} ${height * 0.76} L ${width * 0.72} ${height * 0.76}`}
					stroke="#161a20"
					strokeWidth={3}
					opacity={0.5}
				/>

				{/* armrests */}
				<rect x={width * 0.16} y={height * 0.58} width={width * 0.07} height={height * 0.16} rx={6} fill="#20242b" />
				<rect x={width * 0.77} y={height * 0.58} width={width * 0.07} height={height * 0.16} rx={6} fill="#20242b" />
				<rect x={width * 0.14} y={height * 0.56} width={width * 0.11} height={height * 0.035} rx={5} fill="#2c313a" />
				<rect x={width * 0.75} y={height * 0.56} width={width * 0.11} height={height * 0.035} rx={5} fill="#2c313a" />

				{/* backrest, tall mesh-style office chair back, angled as if turned away from desk */}
				<path
					d={`M ${width * 0.3} ${height * 0.64}
					    Q ${width * 0.26} ${height * 0.3} ${width * 0.34} ${height * 0.14}
					    Q ${width * 0.5} ${height * 0.04} ${width * 0.66} ${height * 0.14}
					    Q ${width * 0.74} ${height * 0.3} ${width * 0.7} ${height * 0.64}
					    Q ${width * 0.5} ${height * 0.7} ${width * 0.3} ${height * 0.64}
					    Z`}
					fill="#23272f"
				/>
				{/* mesh texture lines */}
				{[0.2, 0.32, 0.44, 0.56].map((t, i) => (
					<path
						key={i}
						d={`M ${width * (0.3 + t * 0.06)} ${height * (0.16 + t * 0.7)}
						    Q ${width * 0.5} ${height * (0.1 + t * 0.75)} ${width * (0.7 - t * 0.06)} ${height * (0.16 + t * 0.7)}`}
						stroke="#181b21"
						strokeWidth={2}
						fill="none"
						opacity={0.5}
					/>
				))}
				{/* faint blue rim light catching the edge facing the monitors */}
				<path
					d={`M ${width * 0.34} ${height * 0.14}
					    Q ${width * 0.5} ${height * 0.04} ${width * 0.66} ${height * 0.14}`}
					stroke="#5b8fd6"
					strokeWidth={3}
					fill="none"
					opacity={0.35}
				/>
				<path
					d={`M ${width * 0.66} ${height * 0.14} Q ${width * 0.74} ${height * 0.3} ${width * 0.7} ${height * 0.64}`}
					stroke="#5b8fd6"
					strokeWidth={2}
					fill="none"
					opacity={0.25}
				/>

				{/* headrest */}
				<ellipse cx={width * 0.5} cy={height * 0.1} rx={width * 0.14} ry={height * 0.045} fill="#262b33" />
			</svg>
		</div>
	);
};
