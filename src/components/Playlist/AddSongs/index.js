import React, { useState, useEffect } from "react";
import { customRequest } from "../../../utilities/axios-interceptor";
import Button from "../../CustomInput/Button";
import { createPlaylist } from "../../../state/actions/playlist";
import { connect } from "react-redux";
import store from "../../../state/store";

function Playlist(props) {
	const { createPlaylist, showMylist } = props;
	const [songs, setSongs] = useState([]);
	const [searchArray, setSearchArray] = useState([]);
	const [list, setList] = useState([]);
	const [playlistName, setPlaylistName] = useState("");
	const [addedSongs, setAddedSongs] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("album") === null) {
			customRequest(onSuccess, onFailure);
		} else {
			let album = JSON.parse(localStorage.getItem("album"));
			setSongs(album);
			setList(album);
			setSearchArray(album);
		}
	}, []);

	const onSuccess = (data) => {
		setSongs(data);
		setList(data);
		setSearchArray(data);
	};

	const onFailure = (data) => {};

	const searchItems = (e) => {
		let text = e.target.value;

		var isName = text;

		let newItem = searchArray.filter((item) => {
			var itemData;
			if (isName.match(/[a-z]+/i)) {
				itemData = `${item.title.toUpperCase()}`;
			}
			const textData = text.toUpperCase();
			if (text.length > 0) {
				return itemData.indexOf(textData) > -1;
			}
			return true;
		});

		if (text.length > 0) {
			setSongs(newItem);
		} else {
			setSongs(list);
		}
	};

	const onSaveHandler = () => {
		const playlistName = prompt("Please enter playlist name");
		setPlaylistName(playlistName);
	};

	const getAddedSongs = (songs) => {
		setAddedSongs(songs);
	};

	useEffect(() => {
		if (
			playlistName !== null &&
			playlistName !== undefined &&
			playlistName !== ""
		) {
			let data = {
				title: playlistName,
				songs: addedSongs,
				created_at: new Date().toLocaleString(),
			};
			if (
				store.getState().user.myplaylists &&
				store.getState().user.myplaylists.title !== ""
			) {
				let prevList = store.getState().user.myplaylists;
				prevList.push(data);
				prevList.sort((a, b) => {
					return a.created_at - b.created_at;
				});

				createPlaylist(prevList);
			} else {
				createPlaylist(data);
			}
			showMylist();
		}
		setAddedSongs([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playlistName]);
	return (
		<>
			<div className="row">
				<input
					className="form-control mt-3"
					list="datalistOptions"
					id="exampleDataList"
					style={{ backgroundColor: "darksalmon" }}
					placeholder="Search for songs..."
					onChange={(e) => searchItems(e)}
				/>
			</div>
			{songs.length === 0 || songs === undefined || songs === null ? (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border" role="status"></div>
				</div>
			) : (
				""
			)}

			<div style={{ maxHeight: 400, overflow: "scroll" }}>
				{songs.map((data, index) => {
					return (
						<div className="card mt-4" key={index}>
							<div className="card-body">
								<div className="row justify-content-center">
									<div className="col-6">
										<h5 className="card-title">{data.title}</h5>
										<h6 className="card-subtitle mb-2 text-muted">Singers</h6>
										<p className="card-text">Album</p>
									</div>
									<div className="col-3">
										<h6 className="card-subtitle mb-2 text-muted mt-4">
											Play time
										</h6>
									</div>
									<Button data={data} getAddedSongs={getAddedSongs} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="row justify-content-center mt-5">
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => onSaveHandler()}
				>
					Save
				</button>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {
	createPlaylist,
})(Playlist);
