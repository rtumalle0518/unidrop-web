import { useState, MouseEvent, useEffect } from "react";
import { Button } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { Room } from "./Room";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import { Stack } from "@mui/material";

//const socket = io("http://localhost:4000");
// const socket = io("https://limitless-tundra-34178.herokuapp.com/");
let socket: Socket;

const useStyles = makeStyles((theme) => {
	return {
		buttonSize: {
			width: 400,
			height: 50,

			[theme.breakpoints.down("sm")]: {
				width: 200,
				height: 40,
			},
		},

		page: {
			background: "#FF7F50",
		},
		content: {
			// background: "#f9f9f9",
			textAlign: "center",
		},
		title: {
			color: "white",
			textAlign: "center",
			fontSize: "1.5rem",
			padding: "20px",
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
		socket = io("https://limitless-tundra-34178.herokuapp.com/");
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
					<Stack
						spacing={6}
						direction="row"
						alignItems="center"
						justifyContent="center"
						style={{ minHeight: "75vh" }}
					>
						<div className={classes.content}>
							<div className={classes.title}> Share your files securely</div>
							<Button
								variant="outlined"
								className={classes.buttonSize}
								onClick={handleClick}
							>
								Generate Room ID
							</Button>
						</div>
					</Stack>
				</>
			)}
		</>
	);
};
