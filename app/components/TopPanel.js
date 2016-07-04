import React from "react";
import { Link } from "react-router";
//import { Navbar, NavItem }from "react-materialize";

const name = "Leben task manager";
const user = {
    name: "User"
};

export default class TopPanel extends React.Component{
    render(){
        return (
            <nav className="panel">
                <ul id="dropdown-user" className="dropdown-content">
                    <li><Link to="edit_profile">Edit profile</Link></li>
                    <li><Link to="exit">Exit</Link></li>
                </ul>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo">{name}</Link>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a className="dropdown-button" href="#!" data-activates="dropdown-user">
                                <div className="chip">
                                    <img src="images/user.jpg" alt="Profile" />
                                    {user.name}
                                </div>
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}