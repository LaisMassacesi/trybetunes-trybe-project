import React from 'react';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allFavs: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongsData();
  }

  getFavoriteSongsData = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      allFavs: favorites,
      isLoading: false,
    });
  }

  isFavoriteSong = async (id) => {
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((song) => song.trackId === +id);
    return isFavorite;
  }

  handleInputChange = async (event) => {
    const { allFavs } = this.state;
    this.setState({ isLoading: true });
    const musicId = event.target.id;

    const musicObj = allFavs.find((obj) => obj.trackId === +musicId);
    await removeSong(musicObj);

    const updateFavs = allFavs.filter((song) => song.trackId !== +musicId);
    this.setState({
      allFavs: updateFavs,
      isLoading: false,
    });
  }

  render() {
    const { allFavs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Favorites</h3>
        { isLoading ? <Loading /> : (
          allFavs.map((song) => (
            <div key={ song.amgArtistId }>
              <MusicCard
                amgArtistIdValue={ song.amgArtistId }
                trackNameValue={ song.trackName }
                previewUrlValue={ song.previewUrl }
                trackIdValue={ song.trackId }
                isFavorite={ this.isFavoriteSong }
                handleInputChange={ this.handleInputChange }
              />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
