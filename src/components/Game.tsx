import React from "react";
import Board, {TPosition} from "./Board";
import Stone, {TColor} from "./Stone";
import Pass from './Pass';
import {flip, canPut} from "../Rule";
import Histories from "./Histories";
import Information from "./Information";
import {TSquares} from './Square';

interface IState {
  histories: any[];
  currently_color: number;
  squares: TSquares;
}

class Game extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    const squares: TSquares = Array(64).fill(Stone.EMPTY)

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

  flipStone = (position: TPosition): TSquares => {
    // 反転した石の設置箇所
    let flipped_squares: TSquares = this.state.squares.slice();

    // 現在石があるか
    if (this.state.squares[position] !== Stone.EMPTY) {
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

  isEmpty = (position: TPosition): Boolean => {
    return this.state.squares[position] === Stone.EMPTY;
  }

  changeTurn = (): void => {
    const next_color = this.state.currently_color === Stone.BLACK ? Stone.WHITE : Stone.BLACK;
    this.setState({currently_color: next_color})
  }

  getCurrentlyColor = (): TColor => {
    return this.state.currently_color;
  }

  squareClick = (position: TPosition) => {
    if (!this.isEmpty(position)) return;

    let flipped_squares = this.flipStone(position);

    // 差分があればターンチェンジ
    if (flipped_squares.toString() === this.state.squares.toString()) return;

    flipped_squares[position] = this.getCurrentlyColor();
    this.setState({squares: flipped_squares});
    this.setState({
      histories: this.state.histories.concat([{
        squares: flipped_squares,
        color: this.getCurrentlyColor()
      }])
    });

    this.changeTurn();
  }

  possibleToPass = (): boolean => {
    return !canPut(this.state.squares.slice(), this.state.currently_color);
  }

  render() {
    return (
      <div>
        <Information
          currently_color={this.state.currently_color}
          squares={this.state.squares.slice()}
        />

        <Pass
          possibleToPass={this.possibleToPass()}
          pass={this.changeTurn}
        />

        <Board
          squares={this.state.squares.slice()}
          currently_color={this.state.currently_color}
          histories={this.state.histories}
          squareClick={this.squareClick}
        />

        <Histories histories={this.state.histories}/>
      </div>
    );
  }
}

export default Game;