import React from 'react';
import propTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavoriteSong: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setStateFavorite();
  }

  setStateFavorite = async () => {
    const { isFavorite, trackIdValue } = this.props;
    const response = await isFavorite(trackIdValue);
    this.setState({
      isFavoriteSong: response,
      isLoading: false,
    });
  }

  render() {
    const {
      amgArtistIdValue,
      previewUrlValue,
      trackIdValue,
      trackNameValue,
      handleInputChange,
    } = this.props;
    const { isLoading, isFavoriteSong } = this.state;
    return (
      <div key={ amgArtistIdValue }>
        { isLoading ? <Loading /> : (
          <div>
            <h3>{ trackNameValue }</h3>
            <audio data-testid="audio-component" src={ `${previewUrlValue}` } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor={ trackIdValue }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackIdValue}` }
                id={ trackIdValue }
                type="checkbox"
                checked={ isFavoriteSong }
                onChange={ handleInputChange }
              />
            </label>
          </div>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackNameValue: propTypes.string.isRequired,
  trackIdValue: propTypes.number.isRequired,
  previewUrlValue: propTypes.string.isRequired,
  amgArtistIdValue: propTypes.number.isRequired,
  handleInputChange: propTypes.func.isRequired,
  isFavorite: propTypes.func.isRequired,
};

export default MusicCard;
