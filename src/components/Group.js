import React from 'react';

import { GameCard, MemberCard } from './Cards';
import { groupService } from '../services';

class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      games: null,
      members: null,
    };

    this.getGroupDetails = this.getGroupDetails.bind(this);
  }

  getGroupDetails = async () => {
    try {
      const response = await groupService.getGroupDetails(this.props.identifier);
      this.setState({
        name: response.group.displayName,
        description: response.group.description,
        games: response.group.games,
        members: response.members,
      });
    } catch (message) {
      alert(message);
    }
  }

  componentDidMount() {
    this.getGroupDetails();
  }

  renderGames(games) {
    if (games !== null) {
      return (
        <div>
          {games.map((game) => <GameCard key={game._id} game={game} />)}
        </div>
      );
    }
  }

  renderMembers(members) {
    if (members !== null) {
      return (
        <div>
          {members.map((member) => <MemberCard key={member.username} member={member} />)}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.name}
          {this.state.description}
        </div>
        <div>
          Games:
          {this.renderGames(this.state.games)}
        </div>
        <div>
          Members:
          {this.renderMembers(this.state.members)}
        </div>
      </div>
    );
  }
}

export { Group }; 
