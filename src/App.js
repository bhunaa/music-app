import React from "react";
import "./App.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./state/store";

import Routes from "./routes";

function App() {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
}

export default App;
