import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';

const SKIN = '#f0d3ba';
const SKIN_SHADOW = '#d8b294';
const HAIR = '#1c1512';
const HAIR_HIGHLIGHT = '#2c221c';
const HOODIE = '#232a35';
const HOODIE_SHADOW = '#161b22';
const IRIS = '#3f7fc4';

export const Character: React.FC<{width: number; height: number}> = ({
	width,
	height,
}) => {
	const frame = useCurrentFrame();

	// continuous typing micro-motion
	const typeBob = Math.sin(frame * 1.3) * 2;
	const fingerL = Math.sin(frame * 2.1) * 3;
	const fingerR = Math.sin(frame * 2.1 + 2.4) * 3;

	// eye-rub gesture window (frames ~120-175 of 210)
	const rubProgress = interpolate(
		frame,
		[110, 130, 145, 160, 175],
		[0, 1, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.ease),
		}
	);
	const rubJitter = Math.sin(frame * 3) * 2 * rubProgress;

	// hand travels from keyboard (relative to hand group origin) up to the eye
	const handX = interpolate(rubProgress, [0, 1], [0, -70]);
	const handY = interpolate(rubProgress, [0, 1], [0, -860]) + rubJitter;

	// slow head-down droop cycle (nodding off and catching herself)
	const droop = interpolate(
		frame % 190,
		[0, 90, 110, 190],
		[0, 6, 0, 0],
		{easing: Easing.inOut(Easing.ease)}
	);

	const eyeOpen = interpolate(rubProgress, [0, 1], [1, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				bottom: 0,
				width,
				height,
			}}
		>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{position: 'absolute', inset: 0}}
			>
				<g transform={`translate(0 ${droop})`}>
					{/* shoulders / hoodie */}
					<path
						d={`M ${width * 0.18} ${height}
						    Q ${width * 0.2} ${height * 0.72} ${width * 0.34} ${height * 0.62}
						    L ${width * 0.66} ${height * 0.62}
						    Q ${width * 0.8} ${height * 0.72} ${width * 0.82} ${height}
						    Z`}
						fill={HOODIE}
					/>
					<path
						d={`M ${width * 0.34} ${height * 0.62} L ${width * 0.4} ${height * 0.78} L ${width * 0.5} ${height * 0.66} Z`}
						fill={HOODIE_SHADOW}
						opacity={0.6}
					/>

					{/* hair - volume behind head, frames the face and flows to shoulders */}
					<ellipse
						cx={width * 0.5}
						cy={height * 0.47}
						rx={width * 0.205}
						ry={height * 0.21}
						fill={HAIR}
					/>

					{/* neck */}
					<rect
						x={width * 0.44}
						y={height * 0.56}
						width={width * 0.12}
						height={height * 0.1}
						fill={SKIN_SHADOW}
					/>

					{/* head */}
					<ellipse
						cx={width * 0.5}
						cy={height * 0.44}
						rx={width * 0.16}
						ry={height * 0.11}
						fill={SKIN}
					/>

					{/* fringe - bangs across the forehead, on top of the head */}
					<path
						d={`M ${width * 0.345} ${height * 0.4}
						    Q ${width * 0.5} ${height * 0.315} ${width * 0.655} ${height * 0.4}
						    Q ${width * 0.5} ${height * 0.365} ${width * 0.345} ${height * 0.4}
						    Z`}
						fill={HAIR}
					/>
					{/* under-eye tired shadows */}
					<ellipse
						cx={width * 0.445}
						cy={height * 0.449}
						rx={width * 0.028}
						ry={height * 0.009}
						fill={SKIN_SHADOW}
						opacity={0.5}
					/>
					<ellipse
						cx={width * 0.555}
						cy={height * 0.449}
						rx={width * 0.028}
						ry={height * 0.009}
						fill={SKIN_SHADOW}
						opacity={0.5}
					/>

					{/* eyes (half-closed, tired), hidden while rubbing */}
					<g opacity={eyeOpen}>
						<ellipse
							cx={width * 0.445}
							cy={height * 0.435}
							rx={width * 0.02}
							ry={height * 0.006 + 0.002 * height}
							fill={IRIS}
						/>
						<ellipse
							cx={width * 0.555}
							cy={height * 0.435}
							rx={width * 0.02}
							ry={height * 0.006 + 0.002 * height}
							fill={IRIS}
						/>
						<path
							d={`M ${width * 0.42} ${height * 0.428} Q ${width * 0.445} ${height * 0.418} ${width * 0.47} ${height * 0.428}`}
							stroke={HAIR}
							strokeWidth={2}
							fill="none"
						/>
						<path
							d={`M ${width * 0.53} ${height * 0.428} Q ${width * 0.555} ${height * 0.418} ${width * 0.58} ${height * 0.428}`}
							stroke={HAIR}
							strokeWidth={2}
							fill="none"
						/>
					</g>
				</g>

				{/* keyboard */}
				<rect
					x={width * 0.28}
					y={height * 0.86}
					width={width * 0.44}
					height={height * 0.05}
					rx={4}
					fill="#12151a"
					stroke="#2a2f38"
				/>

				{/* left hand, continuous typing */}
				<ellipse
					cx={width * 0.38}
					cy={height * 0.885 + typeBob}
					rx={width * 0.05}
					ry={height * 0.018}
					fill={SKIN}
				/>
				{[0, 1, 2].map((i) => (
					<rect
						key={i}
						x={width * (0.345 + i * 0.02)}
						y={height * 0.875 + fingerL + (i % 2 === 0 ? 1 : -1)}
						width={width * 0.012}
						height={height * 0.018}
						rx={2}
						fill={SKIN_SHADOW}
					/>
				))}

				{/* right hand: typing, or rubbing eye during gesture window */}
				<g transform={`translate(${handX} ${handY})`}>
					<ellipse
						cx={width * 0.62}
						cy={height * 0.885 + typeBob * (1 - rubProgress)}
						rx={width * 0.05}
						ry={height * 0.018}
						fill={SKIN}
						transform={
							rubProgress > 0.05
								? `rotate(${-40 * rubProgress} ${width * 0.62} ${height * 0.885})`
								: undefined
						}
					/>
					{[0, 1, 2].map((i) => (
						<rect
							key={i}
							x={width * (0.6 + i * 0.02)}
							y={height * 0.875 + fingerR * (1 - rubProgress) + (i % 2 === 0 ? 1 : -1)}
							width={width * 0.012}
							height={height * 0.018}
							rx={2}
							fill={SKIN_SHADOW}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};
