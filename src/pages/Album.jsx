import React from 'react';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.getMusicsResponse();
  }

  getMusicsResponse = async () => {
    const { id } = this.props.match.params;
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

  render() {
    const { response, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h3 data-testid="album-name">{ albumName }</h3>
        <MusicCard response={ response } />
      </div>
    );
  }
}

export default Album;
