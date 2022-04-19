import React from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { sizing } from "@mui/system";
import { makeStyles } from "@material-ui/core";

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
		title: {
			color: "white",
			textAlign: "center",
			fontSize: "1.5rem",
		},
	};
});

export const Home = () => {
	const classes = useStyles();
	return (
		<>
			<div className="container">
				<div className={classes.title}>
					<h1>Unidrop - Web</h1>
					<h4>A fast and lightweight file sharing web application</h4>
				</div>
			</div>
			<Stack
				spacing={6}
				direction="row"
				//alignItems="center"
				justifyContent="center"
				//style={{ minHeight: "75vh" }}
			>
				<Button
					href="/create-room"
					variant="outlined"
					className={classes.buttonSize}
				>
					Create Room
				</Button>
				<Button
					href="/join-room"
					variant="contained"
					className={classes.buttonSize}
				>
					Join Room
				</Button>
			</Stack>
		</>
	);
};
