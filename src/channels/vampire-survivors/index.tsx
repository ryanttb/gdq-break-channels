/**
 * @author Ryan Morrison-Westphal <mr.tyzik@gmail.com>
 */

import type { FormattedDonation, Total, TwitchSubscription } from '@gdq/types/tracker';
import { ChannelProps, registerChannel } from '../channels';

import { useListenFor, useReplicant } from 'use-nodecg';
import styled from '@emotion/styled';
import TweenNumber from '@gdq/lib/components/TweenNumber';

import background from './background.png';

import Guy from './assets/Guy';
import Bat, { type BatProps } from './assets/Bat';
import Coin, {type CoinProps } from './assets/Coin';
import Whip, {type WhipProps } from './assets/Whip';
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

	const [coinProps, setCoinProps] = useState<CoinProps[]>([]);

	const [whipProps, setWhipProps] = useState<WhipProps[]>([]);

	useListenFor('donation', (donation: FormattedDonation) => {
		const maxLeft = 1092;
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

		//setBatProps((prevProps) => [...prevProps, { left, top }]);
		let index = 1;
		if (donation.rawAmount > 20) {
			index = 2;
		}
		if (donation.rawAmount > 200) {
			index = 3;
		}
		setCoinProps((prevProps) => [...prevProps, { index: index, left, top, collected: false }]);
	});

	useListenFor('subscription', (subscription: TwitchSubscription) => {
		const maxTop = 332;

		const middleTop = 128;

		let leftValue = -80;
		let topValue = Math.floor(Math.random() * (maxTop + 1));

		if (topValue < middleTop) {
			topValue -= middleTop;
		} else {
			topValue += middleTop;
		}

		const left = leftValue + 'px';
		const top = topValue + 'px';

		setBatProps((prevProps) => [...prevProps, { left, top, collected: false }]);
	});

    useEffect(() => {
        const interval = setInterval(() => {
			setWhipProps((prevWhipProps) => 
				prevWhipProps.map((whip) => {
					whip.frame = (whip.frame + 1) % 4;
					return { ...whip, done: whip.frame === 0 };
				})
				.filter((whip) => !whip.done)
			);
        }, 75);

        return () => clearInterval(interval);
    }, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setBgOffset((prevOffset) => (prevOffset - 4) % 1092);

			setBatProps((prevBatProps) =>
				prevBatProps.map((bat) => {
					const middleLeft = 500;
					const middleTop = 128;

					// Current positions
					const currentLeft = parseInt(bat.left ?? '0', 10);
					const currentTop = parseInt(bat.top ?? '0', 10);

					// Distance from coin to Guy
					const dx = middleLeft - currentLeft;
					const dy = middleTop - currentTop;

					const fraction = 0.05;

					const newLeft = currentLeft + dx * fraction;
					const newTop = currentTop + dy * fraction;

					const distance = Math.sqrt(dx * dx + dy * dy);
					const collected = distance < 40;

					if (collected) {
						setWhipProps((prevWhipProps) => [...prevWhipProps, { left: `112px`, top: `112px`, frame: 0, done: false }]);
					}

					return { ...bat, left: `${newLeft}px`, top: `${newTop}px`, collected: collected };
				})
				.filter((bat) => !bat.collected)
			  );

			setWhipProps((prevWhipProps) =>
				prevWhipProps.filter((whip) => !whip.done)
			);

			  setCoinProps((prevCoinProps) => {
				return prevCoinProps.map((coin) => {
					const middleLeft = 682;
					const middleTop = 128;

					// Current positions
					const currentLeft = parseInt(coin.left ?? '0', 10);
					const currentTop = parseInt(coin.top ?? '0', 10);

					// Distance from coin to Guy
					const dx = middleLeft - currentLeft;
					const dy = middleTop - currentTop;

					const fraction = 0.1;

					const newLeft = currentLeft + dx * fraction;
					const newTop = currentTop + dy * fraction;

					// If distance is less than 20 pixels, mark as collected
					const distance = Math.sqrt(dx * dx + dy * dy);
					const collected = distance < 20;

					return { ...coin, left: `${newLeft}px`, top: `${newTop}px`, collected: collected };
				})
				.filter((coin) => !coin.collected)
			});
		}, 1000 / 30);

		return () => clearInterval(interval);
	}, [setBgOffset]);

	return (
		<Container posX={bgOffset}>
			<TotalEl>
				<TweenNumber value={Math.floor(total?.raw ?? 0)} />
			</TotalEl>

			<Guy left="640px" top="112px"></Guy>

			{batProps.map((props, index) => (
				<Bat key={index} {...props}></Bat>
			))}

			{whipProps.map((props, index) => (
				<Whip key={index} {...props}></Whip>
			))}

			{coinProps.map((props, index) => (
				<Coin key={index} {...props}></Coin>
			))}
			
			<Coin index={1} left="1032px" top="8px" collected={false}></Coin>
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
