import propTypes from 'prop-types';
import React from 'react';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      artistName: '',
      albumName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getMusicsResponse();
    this.verifyFavoriteSongs();
  }

  isFavoriteSong = async (id) => {
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((song) => song.trackId === +id);
    return isFavorite;
  }

  verifyFavoriteSongs = () => {
    // const { response } = this.state;
    // response.forEach((song) => {
    //   console.log('entrou no foreach');
    //   this.isFavoriteSong(song.trackId)
    //     .then((data) => {
    //       if (data) {
    //         const songElement = document.getElementById(song.trackId);
    //         songElement.checked = true;
    //       }
    //     });
    // });
  }

  getMusicsResponse = async () => {
    console.log('entrou no getMusics');
    const { match: { params: { id } } } = this.props;
    this.setState({
      response: await getMusics(id),
    }, this.getInfosAlbum);
  }

  getInfosAlbum = () => {
    const { response } = this.state;
    this.setState({
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
    });
  }

  getMusicById = (id) => {
    const { response } = this.state;
    return response.find((music) => music.trackId === +id);
  }

  handleInputChange = async (event) => {
    this.setState({ isLoading: true });
    const musicId = event.target.id;
    const isFavorite = await this.isFavoriteSong(musicId);
    const music = this.getMusicById(musicId);
    if (isFavorite) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState({ isLoading: false });
    this.verifyFavoriteSongs();
  }

  render() {
    const { response, artistName, albumName, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h2>Album</h2>
            <h3 data-testid="artist-name">{ artistName }</h3>
            <h3 data-testid="album-name">{ albumName }</h3>
            { response.map((obj) => {
              if (response.indexOf(obj) === 0) return '';
              return (
                <div key={ obj.trackId }>
                  <MusicCard
                    amgArtistIdValue={ obj.amgArtistId }
                    trackNameValue={ obj.trackName }
                    previewUrlValue={ obj.previewUrl }
                    trackIdValue={ obj.trackId }
                    handleInputChange={ this.handleInputChange }
                    isFavorite={ this.isFavoriteSong }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.objectOf(propTypes.object).isRequired,
  params: propTypes.objectOf(propTypes.object).isRequired,
};

export default Album;
