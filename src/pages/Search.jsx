import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h3 data-testid="page-search">Search</h3>
      </div>
    );
  }
}

export default Search;
