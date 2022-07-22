import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userData: [],
    };
  }

  componentDidMount = () => {
    this.awaitGetUser();
  }

  awaitGetUser = async () => {
    const response = await getUser();
    this.setState({
      userData: response,
      isLoading: false,
    });
  }

  render() {
    const {
      userData,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-profile">
        { isLoading ? <Loading /> : (
          <div>
            <Header />
            <h3>Profile</h3>
            <Link to="/profile/edit">Editar perfil</Link>
            <h4 div data-testid="header-user-name">Nome</h4>
            <p>{userData.name}</p>
            <h4>E-mail</h4>
            <p>{userData.email}</p>
            <h4>Descrição</h4>
            <p>{userData.description}</p>
            <img data-testid="profile-image" alt="user" src={ userData.image } />
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
