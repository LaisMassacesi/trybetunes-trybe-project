import React from 'react';
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
          ? <Loading /> : <header data-testid="header-user-name">{ userName }</header> }
      </header>
    );
  }
}

export default Header;
