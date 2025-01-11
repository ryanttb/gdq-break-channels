/**
 * @author Ryan Morrison-Westphal <mr.tyzik@gmail.com>
 */

import type { FormattedDonation, Total } from '@gdq/types/tracker';
import { ChannelProps, registerChannel } from '../channels';

import { useListenFor, useReplicant } from 'use-nodecg';
import styled from '@emotion/styled';
import TweenNumber from '@gdq/lib/components/TweenNumber';

import background from './background.png';

import Guy from './assets/Guy';
import Bat, { type BatProps } from './assets/Bat';
import Coin from './assets/Coin';
import { useEffect, useState } from 'react';

registerChannel('Vampire Survivors', 23, VampireSurvivors, {
	position: 'bottomLeft',
	site: 'GitHub',
	handle: 'example',
});

function VampireSurvivors(props: ChannelProps) {
	const [total] = useReplicant<Total | null>('total', null);

	const [bgOffset, setBgOffset] = useState(0);

	const [batProps, setBatProps] = useState<BatProps[]>([]);

	useListenFor('donation', (donation: FormattedDonation) => {
		const maxLeft = (1092 / 2) - 160;
		const maxTop = 332;

		const middleTop = 128;

		let leftValue = Math.floor(Math.random() * (maxLeft + 1));
		let topValue = Math.floor(Math.random() * (maxTop + 1));

		if (topValue < middleTop) {
			topValue -= middleTop;
		} else {
			topValue += middleTop;
		}

		const left = leftValue + 'px';
		const top = topValue + 'px';

		setBatProps((prevProps) => [...prevProps, { left, top }]);
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setBgOffset((prevOffset) => (prevOffset - 4) % 1092);

			setBatProps((prevBatProps) =>
				prevBatProps.map((bat) => {
					const middleTop = 128;
					// Parse the current top from "###px" to a number
					const currentTop = parseInt(bat.top ?? '0', 10);
					// Move 1 pixel closer to the vertical center at 166
					// You can tweak the 1-pixel step, or use a fraction to ease in, etc.
					let newTop: number;
					if (currentTop < middleTop + 20 && currentTop > middleTop - 20) {
						newTop = currentTop; // already at pseduo-center
					} else if (currentTop < middleTop) {
						newTop = currentTop + 2; // move down
					} else if (currentTop > middleTop) {
						newTop = currentTop - 2; // move up
					} else {
						newTop = currentTop; // already at center
					}
					return { ...bat, top: `${newTop}px` };
				})
			  );
		}, 1000 / 30);

		return () => clearInterval(interval);
	}, [setBgOffset]);

	return (
		<Container posX={bgOffset}>
			<TotalEl>
				<TweenNumber value={Math.floor(total?.raw ?? 0)} />
			</TotalEl>

			<Guy></Guy>

			{batProps.map((props, index) => (
				<Bat key={index} {...props}></Bat>
			))}
			
			<TotalCoin index={0}></TotalCoin>
		</Container>
	);
}

interface ContainerProps {
	posX: number;
}

const Container = styled.div<ContainerProps>`
	position: absolute;
	width: 100%;
	height: 100%;
	background: url('${background}');
	background-position: ${(props) => `${props.posX}px 0`};
	overflow: hidden;
	padding: 0;
	margin: 0;
`;

const TotalEl = styled.div`
	font-family: gdqpixel;
	font-size: 24px;
	color: white;

	position: absolute;

	right: 64px;
	top: 16px;
`;

const TotalCoin = styled(Coin)`
	position: absolute;
	top: 8px;
	right: 16px;
`;
