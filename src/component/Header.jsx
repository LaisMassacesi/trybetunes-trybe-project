import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: true,
    };
  }

  getNameFromUser = async () => {
    const result = await getUser();
    this.setState({ userName: result.name, loading: false });
  }

  componentDidMount = () => {
    this.getNameFromUser();
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading /> : (
            <section>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites"> Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              <div data-testid="header-user-name">
                { userName }
              </div>
            </section>
          ) }
      </header>
    );
  }
}

export default Header;
