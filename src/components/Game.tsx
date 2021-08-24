import React from 'react';
import {Board, Position} from 'components/Board';
import {STONES} from 'components/Stone';
import {Pass} from 'components/Pass';
import {Histories} from 'components/Histories';
import {Information} from 'components/Information';
import {Squares} from 'components/Square';
import {flip, canPut} from 'utils/Rule';

type Props = {}

type State = {
  histories: any[];
  currently_color: number;
  squares: Squares;
}

export class Game extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    const squares: Squares = Array(64).fill(STONES.EMPTY)

    // 初期配置
    squares[27] = STONES.WHITE
    squares[28] = STONES.BLACK
    squares[35] = STONES.BLACK
    squares[36] = STONES.WHITE

    this.state = {
      currently_color: STONES.BLACK,
      histories: [{squares, color: STONES.BLACK}],
      squares: squares,
    };
  }

  flipStone = (position: Position): Squares => {
    // 反転した石の設置箇所
    let flipped_squares: Squares = this.state.squares.slice();

    // 現在石があるか
    if (this.state.squares[position] !== STONES.EMPTY) {
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

  isEmpty = (position: Position): Boolean => {
    return this.state.squares[position] === STONES.EMPTY;
  }

  changeTurn = (): void => {
    const next_color = this.state.currently_color === STONES.BLACK ? STONES.WHITE : STONES.BLACK;
    this.setState({currently_color: next_color})
  }

  getCurrentlyColor = (): number => {
    return this.state.currently_color;
  }

  squareClick = (position: Position) => {
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