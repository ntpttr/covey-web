import React from 'react';

class MemberCard extends React.Component {
  render() {
    return (
      <div>
        {this.props.member.username}
      </div>
    );
  }
}

export { MemberCard }; 
