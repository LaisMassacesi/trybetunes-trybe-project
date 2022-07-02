import React from 'react';
import Header from '../component/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Favorites</h3>
      </div>
    );
  }
}

export default Favorites;
