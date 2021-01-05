import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../components/Home";

const NotFound = () => {
	return <div>Page Not Found.</div>;
};

function RouterComponent() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="*" component={NotFound} />
			</Switch>
		</Router>
	);
}

export default RouterComponent;
