import React, { useState } from "react";
import AddSongs from "../AddSongs";
import Details from "../Details";
import { connect } from "react-redux";
import store from "../../../state/store";

function Playlist(props) {
	const [createPlaylist, setCreatePlaylist] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState("");

	const showMylist = () => {
		setCreatePlaylist(false);
		setShowDetails(false);
	};

	return (
		<>
			{!createPlaylist && !showDetails ? (
				<>
					{store.getState().user.myplaylists &&
					store.getState().user.myplaylists.length > 0 ? (
						store.getState().user.myplaylists.map((data, index) => {
							return (
								<div
									className="card mt-4"
									onClick={() => [
										setShowDetails(true),
										setSelectedPlaylist(data.title),
									]}
									key={index}
								>
									<div className="card-body">
										<div className="row justify-content-center">
											<div className="col-8">
												<h5 className="card-title mt-3 text-capitalize">
													{data.title}
												</h5>
											</div>
											<div className="col-4">
												<h6 className="card-subtitle mb-2 text-muted mt-3">
													Created At {data.created_at}
												</h6>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className="card mt-4">
							<div className="card-body">
								<div className="row justify-content-center">
									No saved playlist available
								</div>
							</div>
						</div>
					)}
				</>
			) : createPlaylist && !showDetails ? (
				<AddSongs showMylist={showMylist} />
			) : (
				""
			)}
			{showDetails ? <Details selectedPlaylist={selectedPlaylist} /> : ""}

			{!createPlaylist && !showDetails ? (
				<div className="row justify-content-center mt-5">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => setCreatePlaylist(true)}
					>
						Create Playlist
					</button>
				</div>
			) : (
				""
			)}
		</>
	);
}

function mapStateToProps(state) {
	return {
		mylist: state.user.myplaylists,
	};
}

export default connect(mapStateToProps, {})(Playlist);
