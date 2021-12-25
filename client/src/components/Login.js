import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {

    state = {
        rut: 0,
        password: "",
        cod_rol: "",
        resultado: true
    }

    componentDidMount = async () => {
        const res = await axios.get("/getRol");
        res.data.resultado &&  this.setState({
            cod_rol: res.data.codRol
        })
        console.log(this.state.cod_rol)
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const datosLogin = {
            rut: this.state.rut,
            password: this.state.password
        };
        const res = await axios.post('/auth/signin', datosLogin);
        res.data.Resultado === true ? this.setState({ 
            cod_rol: res.data.Usuario.cod_rol 
        }) : this.setState({ 
            resultado: res.data.resultado 
        });
    }

    onInputChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }

    render() {
        switch(this.state.cod_rol) {
            case "adm":
                return <Redirect to={{ 
                            pathname: '/users/adm'
                        }} />;
            case "sup":
                return <Redirect to={{ 
                            pathname: '/users/sup'
                        }} />;
            case "usr":
                return <Redirect to={{ 
                            pathname: '/users/usr'
                        }} />;
            default:
                break;
        };
        return <div 
                    className="col-md-6 offset-md-3"
                >
                    <div 
                        className="card card-body"
                    >
                        <form 
                            onSubmit={this.onSubmit}
                        >
                            <h4>Inicio de sesión</h4>
                            <br/>
                            <h5>Rut</h5>
                            <div 
                                className="form-group"
                            >
                                <input 
                                    type="Tel" 
                                    className="form-control" 
                                    placeholder="Ej: 123456789" 
                                    name="rut" 
                                    onChange={this.onInputChange} 
                                    required
                                />
                            </div>
                            <h5>Password</h5>
                            <div 
                                className="form-group"
                            >
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="********" name="password" 
                                    onChange={this.onInputChange} 
                                    required
                                />
                            </div>
                            {!this.state.resultado && <p>El usuario o contraseña ingresada no existe</p> }
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>    
    }
}
