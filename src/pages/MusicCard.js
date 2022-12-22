import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  saveMusic = ({ target }) => {
    const { data } = this.props;
    const info = data.filter((_ele, ind) => `${ind - 1}` === `${target.value}`);
    this.setState({ loading: true }, async () => {
      await addSong(info);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        {data.filter((ele) => ele.trackName)
          .map((music, index) => (
            <div key={ music.trackId }>
              <p>{ music.trackName }</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                <code>audio</code>
              </audio>
              <label
                htmlFor="checkbox"
              >
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ this.saveMusic }
                  value={ index }
                />
              </label>
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
