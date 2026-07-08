import React from 'react';

const NOTE_COLORS = ['#e8d24a', '#e87a9a', '#7ac1e8'];

export const StickyNotes: React.FC<{x: number; y: number; scale?: number}> = ({
	x,
	y,
	scale = 1,
}) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				transform: `scale(${scale})`,
			}}
		>
			<svg width="130" height="70" viewBox="0 0 130 70">
				{[0, 1, 2].map((i) => (
					<g key={i} transform={`translate(${i * 38} 0) rotate(${-8 + i * 9} 25 25)`}>
						<rect
							x="4"
							y="4"
							width="46"
							height="44"
							fill={NOTE_COLORS[i]}
							opacity={0.92}
							transform="rotate(2)"
						/>
						<line x1="12" y1="18" x2="42" y2="18" stroke="#00000030" strokeWidth={2} />
						<line x1="12" y1="26" x2="36" y2="26" stroke="#00000030" strokeWidth={2} />
						<line x1="12" y1="34" x2="40" y2="34" stroke="#00000030" strokeWidth={2} />
					</g>
				))}
			</svg>
		</div>
	);
};

export const Cables: React.FC<{
	fromX: number;
	fromY: number;
	toY: number;
	count?: number;
}> = ({fromX, fromY, toY, count = 4}) => {
	return (
		<svg
			style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}
			width="1"
			height="1"
		>
			{Array.from({length: count}).map((_, i) => {
				const startX = fromX + i * 22;
				const sway = (i % 2 === 0 ? 1 : -1) * (16 + i * 4);
				const endX = startX + sway * 0.6;
				const midX = startX + sway;
				const midY = fromY + (toY - fromY) * 0.55;
				return (
					<path
						key={i}
						d={`M ${startX} ${fromY} Q ${midX} ${midY} ${endX} ${toY}`}
						stroke="#14161a"
						strokeWidth={4}
						fill="none"
						strokeLinecap="round"
						opacity={0.85}
					/>
				);
			})}
		</svg>
	);
};
