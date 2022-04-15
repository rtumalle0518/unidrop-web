import { useState, MouseEvent, useEffect } from "react";
import { Button } from "@mui/material";
import { io } from "socket.io-client";
import { Room } from "./Room";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";

const socket = io("http://localhost:4000");

const useStyles = makeStyles((theme) => {
	return {
		page: {
			background: "#FF7F50",
		},
		content: {
			// background: "#f9f9f9",
			textAlign: "center",
		},
		app: {
			maxWidth: "500px",
			left: "50%",
			width: "100%",
			height: "100%",
		},
	};
});

export const CreateRoom = () => {
	const [flag, setFlag] = useState(false);
	const [id, setId] = useState("");
	const [userConnected, setUserConnected] = useState(false);
	const [userWaiting, setUserWaiting] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Hello from create room");
		});
		socket.on("user-connected", () => {
			console.log("Did this work?");
			setUserConnected(true);
		});
		socket.on("connect_error", (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	}, []);

	function generateID(): string {
		return uuidv4();
	}

	const handleClick = (event: MouseEvent): void => {
		setFlag(!flag);
		let generatedId = generateID();
		setId(generatedId);
		setUserWaiting(true);
		handleRoom(generatedId);
	};
	const handleRoom = (room: string) => {
		socket.emit("create-room", {
			roomId: room,
		});
	};

	// once handshake done
	return (
		<>
			{userWaiting ? (
				<Room connected={userConnected} roomId={id} socket={socket} />
			) : (
				<>
					<div className={classes.content}>
						<div className={classes.content}>Share your files securely</div>
						<Button onClick={handleClick}>Create Room</Button>
					</div>
				</>
			)}
		</>
	);
};
