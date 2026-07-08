import React from 'react';

export const Vignette: React.FC = () => {
	return (
		<>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(180deg, rgba(20,40,70,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(10,20,35,0.35) 100%)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'rgba(30,70,130,0.06)',
					mixBlendMode: 'overlay',
					pointerEvents: 'none',
				}}
			/>
		</>
	);
};
