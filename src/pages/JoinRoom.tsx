import { useEffect, MouseEvent, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
	Button,
	Card,
	TextField,
	CardContent,
	Typography,
	Box,
	Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FileShare } from "./FileShare";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "../components/ViewFinder";
import { relative } from "path";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const StyledButton = styled(Button)`
//     height: 100%;
//     width: 100%;
// `;
//const socket = io('http://localhost:4000');
// const socket = io('https://limitless-tundra-34178.herokuapp.com/');
let socket: Socket;
const StyledBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
`;
export const JoinRoom = () => {
	const [data, setData] = useState("No Result");
	const [value, setValue] = useState("");
	const [roomReady, setRoomReady] = useState(false);
	useEffect(() => {
		socket = io("https://limitless-tundra-34178.herokuapp.com/");
		socket.on("connect", () => {
			console.log("Hello from Join Room");
		});
		socket.on("in-room", () => {
			setRoomReady(true);
			console.log("In room");
		});
		socket.on("connect_error", (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
		socket.on("both-in-room", () => {
			console.log("We should get same message");
		});
	}, []);

	const handleClick = (event: MouseEvent): void => {
		console.log(value);
		socket.emit("join-room", {
			roomId: value,
			socketId: socket.id,
			//Give information of platform used this is file sender btw
		});
	};
	return (
		<>
			{roomReady ? (
				<FileShare socket={socket} roomId={value} />
			) : (
				// <Grid container spacing={0}>
				//     <Grid item xs={4}>
				//         <TextField
				//             label="Enter Room ID"
				//             variant="outlined"
				//             value={value}
				//             onChange={e => setValue(e.target.value)}
				//         />
				//     </Grid>
				//     <Grid item xs={2}>
				//         <StyledButton onClick={handleClick}>Join Room</StyledButton>
				//     </Grid>
				// </Grid>
				<Stack
					spacing={6}
					direction="row"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "75vh" }}
				>
					<div>
						<Card
							sx={{
								paddingRight: "5px",
								paddingLeft: "5px",
								borderRadius: "24px",
								display: "flex",
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									marginRight: "64px",
									marginLeft: "8px",
								}}
							>
								<CardContent sx={{ marginTop: "16px" }}>
									<Typography variant="h4" gutterBottom>
										Enter Room ID
									</Typography>
									<div
										style={{
											position: "relative",
											top: "50px",
										}}
									>
										<TextField
											label="Enter Room ID"
											variant="outlined"
											value={value}
											onChange={(e) => setValue(e.target.value)}
										/>
										<div
											style={{
												padding: "20px",
												alignItems: "center",
												marginLeft: "30px",
											}}
										>
											<Button variant="contained" onClick={handleClick}>
												Join Room
											</Button>
										</div>
									</div>
								</CardContent>
								<StyledBox sx={{ pb: 8, paddingTop: "64px" }}>
									<Typography variant="h6" gutterBottom>
										or join with QR Code
									</Typography>
									<ArrowForwardIcon
										style={{
											position: "relative",
											bottom: "3px",
											left: "10px",
										}}
									/>
								</StyledBox>
							</Box>
							<StyledBox sx={{ marginRight: "32px" }}>
								<CardContent sx={{ width: "25vw" }}>
									<QrReader
										onResult={(result, error) => {
											if (!!result) {
												setData(result.getText());
												setValue(result.getText());
												socket.emit("join-room", {
													roomId: result.getText(),
													socketId: socket.id,
													//Give information of platform used this is file sender btw
												});
											}

											if (!!error) {
												console.info(error);
											}
										}}
										constraints={{
											facingMode: "environment",
										}}
										videoId="video"
										scanDelay={100}
										ViewFinder={ViewFinder}
									/>
									<p>{data}</p>
								</CardContent>
							</StyledBox>
						</Card>
					</div>
				</Stack>
			)}
		</>
	);
};
