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

registerChannel('VampireSurvivors', 23, VampireSurvivors, {
	position: 'bottomLeft',
	site: 'GitHub',
	handle: 'example',
});

function VampireSurvivors(props: ChannelProps) {
	const [total] = useReplicant<Total | null>('total', null);

	useListenFor('donation', (donation: FormattedDonation) => {
		/**
		 * Respond to a donation.
		 */
	});

	return (
		<Container>
			<TotalEl>
				<TweenNumber value={Math.floor(total?.raw ?? 0)} />
			</TotalEl>

			<Guy frameX={0}></Guy>
			
			<TotalCoin index={0}></TotalCoin>
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: url('${background}');
	background-position: 0 0;
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
