import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

type Token = {text: string; color: string};

const KEYWORD = '#c586c0';
const FN = '#dcdcaa';
const STRING = '#ce9178';
const COMMENT = '#6a9955';
const PLAIN = '#9cdcfe';
const TYPE = '#4ec9b0';

const SNIPPET: Token[][] = [
	[{text: 'const', color: KEYWORD}, {text: ' user', color: PLAIN}, {text: ' = await ', color: KEYWORD}, {text: 'fetchUser', color: FN}, {text: '(id)', color: PLAIN}],
	[{text: '// TODO: handle error state', color: COMMENT}],
	[{text: 'if', color: KEYWORD}, {text: ' (!user) ', color: PLAIN}, {text: 'throw', color: KEYWORD}, {text: ' new ', color: KEYWORD}, {text: 'Error', color: TYPE}, {text: '(', color: PLAIN}, {text: "'not found'", color: STRING}, {text: ')', color: PLAIN}],
	[{text: 'export', color: KEYWORD}, {text: ' function ', color: KEYWORD}, {text: 'render', color: FN}, {text: '(props', color: PLAIN}, {text: ': ', color: PLAIN}, {text: 'Props', color: TYPE}, {text: ') {', color: PLAIN}],
	[{text: '  return', color: KEYWORD}, {text: ' <', color: PLAIN}, {text: 'Layout', color: TYPE}, {text: '>', color: PLAIN}],
	[{text: '    <', color: PLAIN}, {text: 'Header', color: TYPE}, {text: ' title', color: PLAIN}, {text: '={', color: PLAIN}, {text: 'title', color: PLAIN}, {text: '} />', color: PLAIN}],
	[{text: '  </', color: PLAIN}, {text: 'Layout', color: TYPE}, {text: '>', color: PLAIN}],
	[{text: '}', color: PLAIN}],
	[{text: 'async', color: KEYWORD}, {text: ' function ', color: KEYWORD}, {text: 'sync', color: FN}, {text: '() {', color: PLAIN}],
	[{text: '  try', color: KEYWORD}, {text: ' {', color: PLAIN}],
	[{text: '    await', color: KEYWORD}, {text: ' queue.', color: PLAIN}, {text: 'flush', color: FN}, {text: '()', color: PLAIN}],
	[{text: '  }', color: PLAIN}, {text: ' catch', color: KEYWORD}, {text: ' (e) {', color: PLAIN}],
	[{text: '    logger.', color: PLAIN}, {text: 'error', color: FN}, {text: '(e)', color: PLAIN}],
	[{text: '  }', color: PLAIN}],
	[{text: '}', color: PLAIN}],
	[{text: '// merge conflict again...', color: COMMENT}],
	[{text: 'const', color: KEYWORD}, {text: ' cache', color: PLAIN}, {text: ' = new ', color: KEYWORD}, {text: 'Map', color: TYPE}, {text: '()', color: PLAIN}],
	[{text: 'let', color: KEYWORD}, {text: ' retries', color: PLAIN}, {text: ' = 0', color: PLAIN}],
	[{text: 'while', color: KEYWORD}, {text: ' (retries', color: PLAIN}, {text: ' < 3) {', color: PLAIN}],
	[{text: '  retries++', color: PLAIN}],
	[{text: '}', color: PLAIN}],
];

export const CodeScreen: React.FC<{
	seed: number;
	lineHeight?: number;
	fontSize?: number;
}> = ({seed, lineHeight = 15, fontSize = 11}) => {
	const frame = useCurrentFrame();

	const scrollSpeed = 4 + (seed % 3);
	const totalHeight = SNIPPET.length * lineHeight;
	const scrollOffset = ((frame * scrollSpeed * 0.3 + seed * 40) % totalHeight);

	const cursorBlink = Math.floor(frame / 8) % 2 === 0;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				overflow: 'hidden',
				background: 'linear-gradient(180deg, #0c1420 0%, #0a1018 100%)',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: -scrollOffset,
					left: 10,
					right: 10,
					fontFamily: 'Menlo, Consolas, monospace',
					fontSize,
					lineHeight: `${lineHeight}px`,
					whiteSpace: 'pre',
				}}
			>
				{[...SNIPPET, ...SNIPPET].map((line, i) => (
					<div key={i}>
						{line.map((tok, j) => (
							<span key={j} style={{color: tok.color}}>
								{tok.text}
							</span>
						))}
						{i === Math.floor(scrollOffset / lineHeight) + 6 && cursorBlink ? (
							<span style={{color: '#ffffff'}}>{'█'}</span>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};

export const AiPanelScreen: React.FC<{seed: number}> = ({seed}) => {
	const frame = useCurrentFrame();
	const typedChars = Math.floor(interpolate(frame, [0, 210], [0, 220], {
		extrapolateRight: 'clamp',
	}));
	const fullText =
		'Suggested fix: refactor the async queue to debounce writes and avoid race conditions when multiple tabs sync at once. Consider using a mutex lock around the flush() call...';
	const shown = fullText.slice(0, (typedChars + seed * 17) % fullText.length);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				background: 'linear-gradient(180deg, #10121a 0%, #0b0d14 100%)',
				padding: 10,
				fontFamily: 'Menlo, Consolas, monospace',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 6,
					marginBottom: 8,
				}}
			>
				<div
					style={{
						width: 14,
						height: 14,
						borderRadius: 4,
						background: 'linear-gradient(135deg, #6ea8ff, #a56eff)',
					}}
				/>
				<div style={{color: '#7d8aa3', fontSize: 10}}>AI Assistant</div>
			</div>
			<div
				style={{
					background: 'rgba(110,168,255,0.08)',
					border: '1px solid rgba(110,168,255,0.2)',
					borderRadius: 8,
					padding: 8,
					color: '#c7d4ea',
					fontSize: 10,
					lineHeight: '14px',
				}}
			>
				{shown}
			</div>
		</div>
	);
};
