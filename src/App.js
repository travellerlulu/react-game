import React, { Component } from 'react';
import Square from './components/Square';
import './App.css';

class Board extends Component {
  render() {
    let squaresArr = [];
    this.props.squares.forEach((val, index) => {
      squaresArr.push(<Square value={val} key={index} onClick={() => {this.props.onClick(index)}} />)
    })
    return (
      <section className="board">
        {squaresArr}
      </section>
     )
  }
}

class App extends Component {
  state = {
      history: [
          {squares: Array(9).fill(null)}
      ],
      stepNumber: 0,
      xIsTrue: true
  }
  handleClick(index) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1),
    current = history[this.state.stepNumber].squares,
    squares = current.slice(0);
    if(CalculateWinner(current) || squares[index]) {
        return;
    }
    squares[index] = this.state.xIsTrue ? 'X' : 'O';
    this.setState({
        history: history.concat({
            squares: squares
        }),
        stepNumber: this.state.stepNumber + 1,
        xIsTrue: !this.state.xIsTrue
    })
  }
  jumpTo(index) {
      this.setState({
          stepNumber: index
      })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber].squares;
    const winner = CalculateWinner(current);
    let status = winner ? 'Winner: ' + winner : 'NextPlayer: ' + (this.state.xIsTrue ? 'X' : 'O');
    let moves = [];
    history.forEach((val, index) => {
        moves.push(
            <a href="javascript:;" key={index} onClick={() => {this.jumpTo(index)}}>{index === 0 ? 'Get Start' : '#moveTo' + index}</a>
        );
    })
    return (
      <div className="stage">
          <Board squares={current} onClick={(index) => {this.handleClick(index)}} />
          <div className="info">
              <p className="status">{status}</p>
              <div className="step-list">
                  {moves}
              </div>
          </div>
      </div>
    );
  }
}

function CalculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i = 0, len = lines.length; i < len; i++) {
        let [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
export default App;
