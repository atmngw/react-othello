import React from "react";
import {STONES} from "../../../utils/Stone";

type GameResultProps = {
  countColors: { [key: number]: number };
  isFinished: boolean;
}

/**
 * 勝敗の表示
 * @constructor
 */
export const GameResult: React.FC<GameResultProps> = ({countColors, isFinished}) => {
  const blackCount = countColors[STONES.BLACK]
  const whiteCount = countColors[STONES.WHITE]

  let tag = null;

  if (isFinished) {
    if (blackCount === whiteCount) {
      tag = <div className={'game-end'}>引き分け</div>
    } else if (blackCount > whiteCount) {
      tag = <div className={'game-end'}>BLACKの勝ち</div>
    } else {
      tag = <div className={'game-end'}>WHITEの勝ち</div>
    }
  }

  return (
    tag
  );
}