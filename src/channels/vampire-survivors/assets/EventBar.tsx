import styled from '@emotion/styled';
import eventSprite from './event.png';

interface EventBarContainerProps {
  left?: string;
  top?: string;
}

const EventBarContainer = styled.div<EventBarContainerProps>`
    position: absolute;
    left: ${props => props.left || '45%'};
    top: ${props => props.top || '35%' };
    width: 100%;
    height: 48px;
    background-image: url(${eventSprite});
    background-repeat: no-repeat;
`;

export interface EventBarProps {
    left?: string;
    top?: string;
}

export default function EventBar({ left, top }: EventBarProps) {
    return (
        <EventBarContainer left={left} top={top} />
    );
}