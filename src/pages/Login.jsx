import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isloading: false,
      redirect: false,
    };
  }

  getUserName = () => {
    const { userName } = this.state;
    this.setState({
      isloading: true,
    }, async () => {
      await createUser({ name: userName });
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const { userName, isloading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { isloading ? <Loading /> : (
          <section>
            <h3>Loading</h3>
            <form>
              <label htmlFor="userName">
                Nome:
                <input
                  type="text"
                  data-testid="login-name-input"
                  onChange={ (event) => {
                    this.setState({
                      userName: event.target.value,
                    });
                  } }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ userName.length < +'3' }
                onClick={ this.getUserName }
              >
                Entrar
              </button>
            </form>
          </section>
        ) }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
