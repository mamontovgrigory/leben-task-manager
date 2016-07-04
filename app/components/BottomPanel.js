import React from "react";
import { Link } from "react-router";
//import { Footer }from "react-materialize";

export default class BottomPanel extends React.Component{
    render(){
        return (
            <footer className="page-footer panel">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5>Leben task manager</h5>
                            <p>Manage your life</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5>
                                <Link to="/section">Sections</Link></h5>
                            <ul>
                                <li><Link to="/section">Health</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2014 Copyright Text
                        <Link className="right" to="/section">More Links</Link>
                    </div>
                </div>
            </footer>
        );
    }
}