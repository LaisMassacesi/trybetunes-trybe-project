import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {
      collectionId,
      artworkUrl100,
      collectionName,
    } = this.props;
    return (
      <div key={ collectionId }>
        <h3>{ collectionName }</h3>
        <img src={ artworkUrl100 } alt="albumImg" />
        <div>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Details
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: propTypes.number.isRequired,
  artworkUrl100: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
};

export default AlbumCard;
