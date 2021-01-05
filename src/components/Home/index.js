import React, { useState, useEffect } from "react";
import Playlist from "../Playlist/List";
import { customRequest } from "../../utilities/axios-interceptor";
import { connect } from "react-redux";

function App(props) {
	const [songs, setSongs] = useState([]);
	const [allSongs, setAllSongs] = useState(true);
	const [playlists, setPlaylists] = useState(false);
	const [searchArray, setSearchArray] = useState([]);
	const [list, setList] = useState([]);

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
		localStorage.setItem("album", JSON.stringify(data));
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

	return (
		<div className="container">
			<div className="row grey-header">
				<div className="col-md-6 ">
					<div className="">
						<span style={{ color: "red", fontSize: 30, fontWeight: "bold" }}>
							VBI
						</span>
						<span style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
							{" "}
							Music
						</span>
					</div>
					<nav
						className="navbar navbar-light"
						style={{ backgroundColor: "#e3f2fd" }}
					>
						<h5
							className="nav-link mt-3"
							style={{ textDecoration: allSongs ? "underline" : "" }}
							onClick={() => [setAllSongs(true), setPlaylists(false)]}
						>
							All Songs
						</h5>
						<h5
							className="nav-link mt-3"
							style={{ textDecoration: playlists ? "underline" : "" }}
							onClick={() => [setPlaylists(true), setAllSongs(false)]}
						>
							Playlists
						</h5>
					</nav>
				</div>
			</div>

			{allSongs ? (
				<>
					<div className="row">
						<input
							className="form-control mt-3"
							list="datalistOptions"
							id="exampleDataList"
							placeholder="Search for songs..."
							onChange={(e) => searchItems(e)}
							style={{ backgroundColor: "darksalmon" }}
						/>
					</div>

					{songs === undefined || songs === null || songs.length === 0 ? (
						<div className="d-flex justify-content-center mt-5">
							<div className="spinner-border" role="status"></div>
						</div>
					) : (
						""
					)}
					{songs.map((data, index) => {
						return (
							<div className="card mt-4" key={index}>
								<div className="card-body">
									<div className="row justify-content-center">
										<div className="col-9">
											<h5 className="card-title">{data.title}</h5>
											<h6 className="card-subtitle mb-2 text-muted">Singers</h6>
											<p className="card-text">Album</p>
										</div>
										<div className="col-3">
											<h6 className="card-subtitle mb-2 text-muted mt-4">
												Play time
											</h6>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</>
			) : (
				<Playlist />
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {})(App);
