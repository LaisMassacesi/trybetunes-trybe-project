import React from 'react';
import AlbumCard from '../component/AlbumCard';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: '',
      search: [],
      reserveArtistName: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchArtist: event.target.value,
    });
  }

  handleClick = async () => {
    const { searchArtist } = this.state;
    this.setState({
      search: await searchAlbumsAPI(searchArtist),
      reserveArtistName: searchArtist,
    }, () => {
      this.setState({
        searchArtist: '',
      });
    });
  }

  render() {
    const { searchArtist, search, reserveArtistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
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
            onClick={ (event) => {
              event.preventDefault();
              this.handleClick();
            } }
          >
            Pesquisar
          </button>
        </form>
        { search !== []
          ? <h3>{ `Resultado de álbuns de: ${reserveArtistName}` }</h3> : '' }
        { search.length === 0
          ? <span>Nenhum álbum foi encontrado</span>
          : search.map((album, indice) => (
            <AlbumCard
              key={ indice }
              { ...album }
              searchArtist={ searchArtist }
            />
          )) }
      </div>
    );
  }
}

export default Search;
