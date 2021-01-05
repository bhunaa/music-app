import constants from "../constants/playlist.constant";

const initialState = {
	myplaylists: [],
};

function playlistReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_SONGS:
			return {
				...state,
				myplaylists: action.data,
			};
		default:
			return state;
	}
}

export default playlistReducer;
