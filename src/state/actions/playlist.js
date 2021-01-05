import constants from "../constants/playlist.constant";

export const createPlaylist = (data) => ({
	type: constants.GET_SONGS,
	data,
});
