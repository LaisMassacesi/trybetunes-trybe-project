import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
// import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getMusicsData: [],
    };
  }

  getMusicsResponse = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      getMusicsData: await getMusics(id),
    });
  }

  render() {
    const { response } = this.props;
    const { getMusicsData } = this.state;
    return (
      <div data-testid="page-album">
        {response.map((obj) => {
          if (response.indexOf(obj) === 0) return '';
          return (
            <div key={ obj.amgArtistId }>
              <h3>{ obj.trackName }</h3>
              <audio data-testid="audio-component" src={ `${obj.previewUrl}` } controls>
                <track kind="captions" />
                <code>audio</code>
              </audio>
              <label data-testid={ `checkbox-music-${obj.trackId}` } htmlFor="isFavorite">
                Favorita
                <input
                  type="checkbox"
                  onChange={ async (event) => {
                    event.preventDefault();
                    await addSong(getMusicsData);
                  } }
                />
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

MusicCard.propTypes = {
  response: propTypes.arrayOf(propTypes.array).isRequired,
  match: propTypes.objectOf(propTypes.object).isRequired,
  params: propTypes.objectOf(propTypes.object).isRequired,
};

export default MusicCard;
