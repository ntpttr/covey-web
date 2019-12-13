import React from 'react';

class GameCard extends React.Component {
  render() {
    return (
      <div>
        {this.props.game.name}
        {this.props.game.description}
      </div>
    );
  }
}

export { GameCard }; 
