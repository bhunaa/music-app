import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../../state/store";
import { createPlaylist } from "../../../state/actions/playlist";
import Button from "../../CustomInput/Button";

function Playlist(props) {
	const { selectedPlaylist, createPlaylist } = props;
	const [songs, setSongs] = useState([]);
	const [allsongs, setAllSongs] = useState([]);
	const [enableAddSongs, setEnableAddSongs] = useState(false);
	const [searchArray, setSearchArray] = useState([]);

	const handelDelete = (id) => {
		let prevList = store.getState().user.myplaylists;
		prevList = prevList.filter((data) => data.title !== selectedPlaylist);

		setSongs(songs.filter((item) => item.id !== id));

		let data = {
			title: selectedPlaylist,
			songs: songs.filter((item) => item.id !== id),
			created_at: new Date().toLocaleString(),
		};

		prevList.push(data);
		createPlaylist(prevList);
	};

	useEffect(() => {
		// eslint-disable-next-line array-callback-return
		store.getState().user.myplaylists.map((data) => {
			if (data.title === selectedPlaylist) {
				setSongs(data.songs);
				setSearchArray(data.songs);
			}
		});

		let album = JSON.parse(localStorage.getItem("album"));
		setAllSongs(album);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSuffle = () => {
		let shuffle_ele = songs;

		let i = shuffle_ele.length - 1;
		for (; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = shuffle_ele[i];
			shuffle_ele[i] = shuffle_ele[j];
			shuffle_ele[j] = temp;
		}
		setSongs(shuffle_ele);
		let prevList = store.getState().user.myplaylists;
		prevList = prevList.filter((data) => data.title !== selectedPlaylist);

		let data = {
			title: selectedPlaylist,
			songs: shuffle_ele,
			created_at: new Date().toLocaleString(),
		};
		prevList.push(data);
		createPlaylist(prevList);
	};

	const getAddedSongs = (list) => {
		let temp = [];
		temp = songs.concat(list);
		setSongs(temp);

		let prevList = store.getState().user.myplaylists;
		prevList = prevList.filter((data) => data.title !== selectedPlaylist);

		let data = {
			title: selectedPlaylist,
			songs: temp,
			created_at: new Date().toLocaleString(),
		};
		prevList.push(data);
		createPlaylist(prevList);
	};

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
			setSongs(songs);
		}
	};

	return (
		<>
			<div className="mt-5">
				<h5
					style={{
						color: "wheat",
						textTransform: "capitalize",
						fontSize: 20,
						textDecoration: "underline",
						fontWeight: 400,
					}}
				>
					{selectedPlaylist}
				</h5>
			</div>
			<div className="row justify-content-center">
				<button
					type="button"
					className="btn btn-secondary mr-2"
					onClick={() => handleSuffle()}
				>
					Shuffle
				</button>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => setEnableAddSongs(!enableAddSongs)}
				>
					add songs
				</button>
			</div>
			<input
				className="form-control mt-3"
				list="datalistOptions"
				id="exampleDataList"
				style={{ backgroundColor: "darksalmon" }}
				placeholder="Search for songs..."
				onChange={(e) => searchItems(e)}
			/>

			{enableAddSongs === false
				? songs.map((data, index) => {
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
										<div className="col-3">
											<h6
												className="card-subtitle mb-2 text-muted mt-4"
												onClick={() => handelDelete(data.id)}
											>
												Delete
											</h6>
										</div>
									</div>
								</div>
							</div>
						);
				  })
				: allsongs.map((data, index) => {
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
		</>
	);
}

function mapStateToProps(state) {
	return {
		mylist: state.user.myplaylists,
	};
}

export default connect(mapStateToProps, { createPlaylist })(Playlist);
