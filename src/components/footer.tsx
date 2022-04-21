import { Box } from "@material-ui/core";
import React from "react";
//import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => {
	return {
		block: {
			background: "#F0FFF0", //"#303846",
		},

		bottom: {
			position: "fixed", //"#303846",
			bottom: "0",
		},
	};
});

export const Footer = () => {
	const classes = useStyles();

	return (
		<Drawer
			PaperProps={{
				sx: {
					backgroundColor: "#303846",
					color: "white",

					marginTop: "-180px",
					height: "180px",
					bottom: "0",
				},
			}}
			variant="permanent"
			anchor="bottom"
		>
			<Grid
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="center"
			>
				<div className="column">
					<h4>Capstone Group 50</h4>
					<div>Randy Tumalle</div>
					<div>Ayo Obaisi</div>
				</div>
				<div className="column">
					<h4>Resources</h4>
					<div>GitHub - Web</div>
					<div>GitHub - Mobile</div>
				</div>
				<div className="column">
					<h4>Information</h4>
					<div>Contact Us</div>
					<div>About</div>
				</div>
			</Grid>
		</Drawer>
	);
};
