import React from 'react';
import './Login.css';

class Login extends React.Component {

    render() {
        return (
            <div className="col-sm-3 bg-light custom-border">
                <form>
                    <div className="form-group">
                        <h1 className="display-4" style={{ marginTop: "5%" }}>LOGIN</h1>
                    </div>
                    <div className="form-group">
                        <input type="text" style={{ width: "100%" }} name="email" id="email" placeholder="E-Mail"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" style={{ width: "100%" }} name="password" id="password" type="password" placeholder="Senha"></input>
                    </div>
                    <input className="btn btn-primary" style={{ width: "100%", marginBottom: "5%" }} type="button" name="login" id="login" value="Entrar"
                        onClick={() => this.props.handleUserAuthentication()}></input>
                </form>
            </div>
        );
    }

}

export default Login;