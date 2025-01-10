import styled from '@emotion/styled'
import coinsSprite from './coins.png';

interface CoinContainerProps {
  sprite: string;
  index: number;
}

const CoinContainer = styled.div<CoinContainerProps>`
  width: 38px;
  height: 38px;
  background-image: url(${props => props.sprite});
  background-repeat: no-repeat;
  background-position: ${props => `-${props.index * 38}px 0`};
`;

interface CoinProps {
  /** 
   * index determines which coin to show:
   * 0 -> first coin (gold), 
   * 1 -> second coin, etc.
   */
  index?: number;
  className?: string;
}

export default function Coin({ index = 0, className }: CoinProps) {
  return <CoinContainer sprite={coinsSprite} index={index} className={className} />;
}
