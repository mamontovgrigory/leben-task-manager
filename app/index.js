import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";
import Authorization from "./components/Authorization";
import SectionsList from "./components/Sections/SectionsList";
import TasksList from "./components/Tasks/TasksList";
import Developing from "./components/Developing";

const app = document.getElementById("app");
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Authorization} />

            <Route path="sections" component={SectionsList} breadcrumb="sections" />

            <Route path="sections/:section/list" component={TasksList} breadcrumb="tasksList" />

            <Route path="sections/:action" component={Developing} breadcrumb="developing" />
            <Route path="sections/:section/list/:action" component={Developing} breadcrumb="developing" />
        </Route>
    </Router>,
    app);

import "./../stylesheet/style.scss";
import 'materialize-css/dist/js/materialize.js';