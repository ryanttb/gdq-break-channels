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
	font-family: gdqpixel;
    background-image: url(${subSprite});
    background-repeat: no-repeat;
`;

const SubPlan = styled.span`
    display: block;
    position: absolute;
    left: 16px;
    top: 12px;
    font-size: 12px;
    color: white;
`;

const SubDisplayName = styled.span`
    display: block;
    position: absolute;
    font-size: 14px;
    color: yellow;
    text-align: center;
    margin-top: 26px;
    width: 100%;
`;

export interface SubProps {
    left?: string;
    top?: string;
    subPlan?: string;
    displayName?: string;
}

export default function Sub({ left, top, subPlan, displayName }: SubProps) {
    return (
        <SubContainer left={left} top={top}>
            <SubPlan>{subPlan}</SubPlan>
            <SubDisplayName>{displayName}</SubDisplayName>
        </SubContainer>
    );
}