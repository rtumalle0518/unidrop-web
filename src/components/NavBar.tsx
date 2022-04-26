import React from "react";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { SubjectOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	//passing in a function that returns the obj
	return {
		page: {
			//background: "#f9f9f9",
			width: "100%",
			padding: theme.spacing(3),
			// Remove everything below if you dont want the "phone look"
			// maxWidth: "500px",
			// height: "100%",
			// left: "50%",
			// transform: "translateX(-33%)",
			// position: "fixed",
		},
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		root: {
			display: "flex",
		},
		title: {
			padding: theme.spacing(2),
		},
		appbar: {
			//width: `calc(100% - ${drawerWidth}px)`, //to fit the appbar
			width: "100%",
			alignItems: "center",
		},
		unidrop: {
			alignItems: "left",
		},
		appbartext: {
			//flexgrow: 1,
			alignItems: "right",
			width: "100%",
			color: "#f9f9f9",
			//padding: "20px",
			textDecoration: "none",
			boxShadow: "none",
			textDecorationColor: "transparent",
		},
		toolbar: theme.mixins.toolbar,
		appbarcolor: {
			background: "#303846",
		},
	};
});

type NavBarProps = {
	children: any;
};

export const NavBar = ({ children }: NavBarProps) => {
	const classes = useStyles();
	const navigate = useNavigate();

	//Array of NavBar Items
	// const menuitems = [
	// 	{
	// 		text: "Home",
	// 		icon: <SubjectOutlined color="secondary" />,
	// 		path: "/",
	// 	},
	// 	{
	// 		text: "Create Room",
	// 		icon: <SubjectOutlined color="secondary" />,
	// 		path: "/create-room",
	// 	},
	// 	{
	// 		text: "Join Room",
	// 		icon: <SubjectOutlined color="secondary" />,
	// 		path: "/join-room-test",
	// 	},
	// ];

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} style={{ backgroundColor: "#303846" }}>
				<Toolbar>
					<svg
						//style={{position: "relative", }}
						className={classes.unidrop}
						width="65"
						height="65"
						viewBox="0 0 121 121"
						fill="none"
						xmlns=""
					>
						<path
							d="M118 91.9062C118 100.027 115.377 106.501 110.939 110.939C106.501 115.377 100.027 118 91.9062 118L29.0938 118C20.9727 118 14.499 115.377 10.061 110.939C5.62299 106.501 3 100.027 3 91.9062L3 29.0938C3 20.9727 5.62299 14.4985 10.061 10.0607C14.499 5.62293 20.9727 3 29.0938 3L91.9062 3C100.027 3 106.501 5.62293 110.939 10.0607C115.377 14.4985 118 20.9727 118 29.0938L118 91.9062Z"
							fill="#6972A3"
							stroke="#48515C"
							stroke-width="5"
						/>
						<path
							d="M96 29V67.5C96 87.1061 80.1061 103 60.5 103C40.8939 103 25 87.1061 25 67.5V29L96 29Z"
							fill="#3D4260"
						/>
						<path
							d="M82 20V68.5C82 80.3741 72.3741 90 60.5 90C48.6259 90 39 80.3741 39 68.5V20L82 20Z"
							fill="#6972A3"
						/>
						<path
							d="M60.875 69.6875L61 20"
							stroke="#F9F9F9"
							stroke-width="5"
							stroke-linejoin="round"
						/>
						<path
							d="M69.75 60C66.284 64.5399 64.341 67.0851 60.875 71.625L52 60"
							stroke="#F9F9F9"
							stroke-width="5"
							stroke-linejoin="round"
						/>
					</svg>
					<Typography
						variant="h3"
						component={Link}
						href="/"
						className={classes.appbartext}
						style={{ textDecoration: "none" }}
					>
						NIDROP
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};
