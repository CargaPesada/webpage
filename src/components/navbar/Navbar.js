import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand text-light" href="#">Nome</a>
            </nav>
        );
    }
}

export default Navbar;