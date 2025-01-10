import styled from '@emotion/styled';
import guySprite from './guy.png';

interface GuyContainerProps {
  sprite: string;
  frameX: number;
}

const GuyContainer = styled.div<GuyContainerProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 101px;
  height: 104px;
  background-image: url(${props => props.sprite});
  background-repeat: no-repeat;
  overflow: hidden;
  background-position: ${props => `-${props.frameX * 101}px 0`};
`;

function Guy({ frameX = 0 }) {
  return (
    <GuyContainer sprite={guySprite} frameX={frameX} />
  );
}

export default Guy;
