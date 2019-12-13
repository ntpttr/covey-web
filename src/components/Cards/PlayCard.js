import React from 'react';

const Player = (props) => {
    return (
      <div>
        {props.username}
        {props.score}
        {props.placement}
      </div>
    );
  }

class PlayCard extends React.Component {
  render() {
    return (
      <div>
        {this.props.game}
        {
          this.props.players.map((player) => 
            <Player 
              key={player.user}
              username={player.user} 
              score={player.score}
              placement={player.placement}
            />)
        }
      </div>
    );
  }
}

export { PlayCard }; 
