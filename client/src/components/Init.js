import React, { Component } from 'react'
import Login from './Login'

export default class Init extends Component {
    render() {
        return (
            <div className="altura-login">
                <div className="text-center">
                    <p className="title text-black">Proyecto</p>
                </div>
                <Login/>
                <div id="copyright" className="text-center m-3 text-black">
                    <h5>© Copyright 2021 | Todos los derechos reservados al desarrollo de este proyecto</h5>
                </div>
            </div>
        )
    }
}
