import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './components/forms/login/Login';
import UserView from './components/views/user/UserView';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isUserAuthenticated: false,
      isAdmin: false
    }
  }



  /**
   * Método para alterar o estado se o usuário está autenticado.
   */
  handleUserAuthentication = () => {

    if (this.state.isUserAuthenticated) {
      this.setState({ isUserAuthenticated: false });
    }
    else {
      this.setState({ isUserAuthenticated: true });
    }

  }


  /**
   * Método padrão para renderizar componentes.
   */
  render() {

    let toRender = [];

    // Verificando se o usuário NÃO está autenticado
    if (!this.state.isUserAuthenticated) {
      toRender.push(
        <div className="d-flex flex-row-reverse main-content">
          <div className="empty-space" ></div>
          <Login handleUserAuthentication={this.handleUserAuthentication} />
        </div>
      );
    }
    else {
      toRender.push(<UserView isAdmin={this.state.isAdmin} />);
    }

    return (
      <div className="App">
        <Navbar isAuthenticated={this.state.isUserAuthenticated} handleUserAuthentication={this.handleUserAuthentication} />
        {toRender}
      </div>
    );
  }
}

export default App;
