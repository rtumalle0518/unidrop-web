import React from "react";
import { Link } from "react-router-dom"; //client side routing

export const NavBar = () => {
	return (
		<>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/create-room">Create Room</Link>
				</li>
				<li>
					<Link to="/join-room">Join Room</Link>
				</li>
			</ul>
		</>
	);
};
