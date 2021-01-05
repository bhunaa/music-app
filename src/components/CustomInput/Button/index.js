import React, { useState, useEffect } from "react";

var addedSongs = [];

function Button({ data, getAddedSongs }) {
	const [count, setCount] = useState(false);

	const handleIncude = (data) => {
		if (count === false) {
			addedSongs.push(data);
		} else {
			addedSongs = addedSongs.filter((item) => item.id !== data.id);
		}
		getAddedSongs(addedSongs);
		setCount(!count);
	};

	useEffect(() => {
		addedSongs = [];
	}, []);

	return (
		<div className="col-3">
			<h6
				className="card-subtitle mb-2 text-muted mt-4"
				onClick={() => handleIncude(data)}
			>
				{count ? "Added" : "Add to List"}
			</h6>
		</div>
	);
}

export default Button;
