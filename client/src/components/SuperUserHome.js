import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';

export default class SuperUserHome extends Component {
    state = {
        rut: 0,
        cod_rol: "",
        verify: undefined,
        message: "",
    };

    componentDidMount = async () => {
        if(this.state.verify !== null){
            const res = await axios.get('/auth/sup/');
            this.setState({
                verify: res.data.resul,
                cod_rol: res.data.cod_rol,
                message: res.data.message
            });
        }
    };

    componentWillUnmount = () => {
        alert(this.state.message);
    };

    logOut = async () => {
        const res = await axios.get("/auth/logout");
        this.setState({
            verify: res.data.resul,
            message: res.data.message
        });
    };
    
    render() {
        switch(this.state.verify) {
            case false:
                return <Redirect to={{ pathname: '/users/'+this.state.cod_rol}}/>;
            case null:
                return <Redirect to={{ pathname: '/'}}/>; 
            default:
                break;
        };
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container">
                        <Link className="navbar-brand" to="#">Hola, Super Usuario</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">Features</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">Pricing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" to="#">Disabled</Link>
                                </li>
                                <li className="nav-item active">
                                    <button type="button" className="btn btn-primary" onClick={this.logOut}>
                                        Cerrar sesión
                                    </button>  
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <p className="text-center text-white altura-msj-cons title">
                        En construcción...
                    </p>
                </div>
            </div>
        )
    };
}
