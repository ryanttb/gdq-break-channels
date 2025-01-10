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
import Coin from './assets/Coin';
import { useEffect, useState } from 'react';

registerChannel('VampireSurvivors', 23, VampireSurvivors, {
	position: 'bottomLeft',
	site: 'GitHub',
	handle: 'example',
});

function VampireSurvivors(props: ChannelProps) {
	const [total] = useReplicant<Total | null>('total', null);

	const [bgOffset, setBgOffset] = useState(0);

	useListenFor('donation', (donation: FormattedDonation) => {
		/**
		 * Respond to a donation.
		 */
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setBgOffset((prevOffset) => (prevOffset - 4) % 1092);
		}, 1000 / 30);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container posX={bgOffset}>
			<TotalEl>
				<TweenNumber value={Math.floor(total?.raw ?? 0)} />
			</TotalEl>

			<Guy></Guy>
			
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
	padding: 0;
	margin: 0;
`;

const TotalEl = styled.div`
	font-family: gdqpixel;
	font-size: 32px;
	color: white;

	position: absolute;

	right: 64px;
	top: 12px;
`;

const TotalCoin = styled(Coin)`
	position: absolute;
	top: 8px;
	right: 16px;
`;
