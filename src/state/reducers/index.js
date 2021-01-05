import { combineReducers } from "redux";

import playlistReducer from "./playlist.reducer";

const appReducer = combineReducers({
	user: playlistReducer,
});

const rootReducer = (state, action) => {
	// Clear all data in redux store to initial.
	if (action.type === "DESTROY_SESSION") {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
