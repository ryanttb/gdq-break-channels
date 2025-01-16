import styled from '@emotion/styled';
import whipSprite from './whip.png';
import { useEffect, useState } from 'react';

interface WhipContainerProps {
    sprite: string;
    frameX: number;
    left?: string;
    top?: string;
}

const WhipContainer = styled.div<WhipContainerProps>`
    position: absolute;
    left: ${props => props.left || '45%'};
    top: ${props => props.top || '35%'};
    width: 523px;
    height: 82px;
    background-image: url(${props => props.sprite});
    background-repeat: no-repeat;
    overflow: hidden;
    background-position: ${props => `-${props.frameX * 523}px 0`};
`;

interface WhipProps {
  left?: string;
  top?: string;
  done: boolean;
}

function Whip({ left, top, done }: WhipProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(prevFrame => (prevFrame + 1) % 4);
            if (frame === 0) {
                clearInterval(interval);
                done = true;
            }
        }, 75);

        return () => clearInterval(interval);
    }, []);

    return (
        <WhipContainer sprite={whipSprite} frameX={frame} left={left} top={top} />
    );
}

export { WhipProps };

export default Whip;
