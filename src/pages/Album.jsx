import React from 'react';
import Header from '../component/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h3>Album</h3>
      </div>
    );
  }
}

export default Album;
