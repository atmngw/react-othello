import React from "react";

import Board from "./Board";
import Stone from "./Stone";
import {flip} from "./Rule";
import Histories from "./Histories";

interface IState {
  histories: any[];
  currently_color: number;
  squares: (number | null)[];
}

class Game extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    const squares: (number | null)[] = Array(64).fill(null)

    // 初期配置
    squares[27] = Stone.WHITE
    squares[28] = Stone.BLACK
    squares[35] = Stone.BLACK
    squares[36] = Stone.WHITE

    this.state = {
      currently_color: Stone.BLACK,
      histories: [{squares, color: Stone.BLACK}],
      squares: squares,
    };
  }

  flipStone = (position: number): (number | null)[] => {
    // 反転した石の設置箇所
    let flipped_squares: (number | null)[] = this.state.squares.slice();

    // 現在石があるか
    if (this.state.squares[position] !== null) {
      return flipped_squares;
    }

    // 設置後のボードで反転処理を行う
    // 左斜め上
    flipped_squares = flip(this.state.currently_color, position, -9, flipped_squares);

    // 真上
    flipped_squares = flip(this.state.currently_color, position, -8, flipped_squares);

    // 右斜上
    flipped_squares = flip(this.state.currently_color, position, -7, flipped_squares);

    // 右
    flipped_squares = flip(this.state.currently_color, position, 1, flipped_squares);

    // 右斜下
    flipped_squares = flip(this.state.currently_color, position, 9, flipped_squares);

    // 真下
    flipped_squares = flip(this.state.currently_color, position, 8, flipped_squares);

    // 左斜下
    flipped_squares = flip(this.state.currently_color, position, 7, flipped_squares);

    // 左
    flipped_squares = flip(this.state.currently_color, position, -1, flipped_squares);

    return flipped_squares;
  }

  isEmpty = (position: number): Boolean => {
    return this.state.squares[position] === null;
  }

  changeTurn = (): void => {
    const next_color = this.state.currently_color === Stone.BLACK ? Stone.WHITE : Stone.BLACK;
    console.log('next color:' + next_color)
    this.setState({currently_color: next_color})
  }

  getCurrentlyColor = (): number => {
    return this.state.currently_color;
  }

  squareClick = (position: number) => {
    if (!this.isEmpty(position)) return;

    let flipped_squares = this.flipStone(position);

    // 差分があればターンチェンジ
    if (flipped_squares.toString() === this.state.squares.toString()) return;

    flipped_squares[position] = this.getCurrentlyColor();
    this.setState({squares: flipped_squares});
    this.setState({histories: this.state.histories.concat([{squares: flipped_squares, color: this.getCurrentlyColor()}])});

    this.changeTurn();
  }

  render() {
    return (
      <div>
        <Board
          squares={this.state.squares}
          currently_color={this.state.currently_color}
          histories={this.state.histories}
          squareClick={this.squareClick}
        />

      <Histories histories={this.state.histories} />
      </div>
    );
  }
}

export default Game;