import styled from '@emotion/styled';
import subSprite from './sub.png';

interface SubContainerProps {
  left?: string;
  top?: string;
}

const SubContainer = styled.div<SubContainerProps>`
    position: absolute;
    left: ${props => props.left || '45%'};
    top: ${props => props.top || '35%' };
    width: 320px;
    height: 64px;
    background-image: url(${subSprite});
    background-repeat: no-repeat;
`;

export interface SubProps {
    left?: string;
    top?: string;
}

export default function Sub({ left, top }: SubProps) {
    return (
        <SubContainer left={left} top={top} />
    );
}