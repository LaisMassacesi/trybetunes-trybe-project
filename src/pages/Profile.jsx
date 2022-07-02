import React from 'react';
import Header from '../component/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h3>Profile</h3>
      </div>
    );
  }
}

export default Profile;
