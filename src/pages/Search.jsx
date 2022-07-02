import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchArtist: event.target.value,
    });
  }

  render() {
    const { searchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h3>Search</h3>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchArtist }
            onChange={ this.handleInputChange }
            name="searchArtist"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchArtist.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
