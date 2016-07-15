import '../libs_custom/libsCustom';

import "./typography.scss";
import "./grid.scss";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";
import Authorization from "./components/Authorization";
import SectionsList from "./components/Sections/SectionsList";
import TasksList from "./components/Tasks/TasksList";
import Statistic from "./components/Statistic/Statistic";
import Developing from "./components/Developing";

const app = document.getElementById("app");
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Authorization} />

            <Route path="sections" component={SectionsList} breadcrumb="sections" />

            <Route path="sections/:section/list" component={TasksList} breadcrumb="tasksList" />

            <Route path="sections/statistic" component={Statistic} breadcrumb="statistic" />
            <Route path="sections/:action" component={Developing} breadcrumb="developing" />

            <Route path="sections/:section/list/statistic" component={Statistic} breadcrumb="sectionStatistic" />
            <Route path="sections/:section/list/:action" component={Developing} breadcrumb="developing" />
        </Route>
    </Router>,
    app);

console.log(moment())