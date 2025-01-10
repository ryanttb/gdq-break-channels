import styled from '@emotion/styled';
import batSprite from './bat.png';
import { useEffect, useState } from 'react';

interface BatContainerProps {
    sprite: string;
    frameX: number;
    left?: string;
    top?: string;
}

const BatContainer = styled.div<BatContainerProps>`
    position: absolute;
    left: ${props => props.left || '45%'};
    top: ${props => props.top || '35%'};
    width: 80px;
    height: 80px;
    background-image: url(${props => props.sprite});
    background-repeat: no-repeat;
    overflow: hidden;
    background-position: ${props => `-${props.frameX * 80}px 0`};
`;

interface BatProps {
  left?: string;
  top?: string;
}

function Bat({ left, top }: BatProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(prevFrame => (prevFrame + 1) % 2);
        }, 1000 / 2);

        return () => clearInterval(interval);
    }, []);

    return (
        <BatContainer sprite={batSprite} frameX={frame} left={left} top={top} />
    );
}

export default Bat;
