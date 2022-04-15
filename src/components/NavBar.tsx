import React from "react";
import { Link } from "react-router-dom"; //client side routing
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	//passing in a function that returns the obj
	return {
		page: {
			// background: "#f9f9f9",
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
			width: `calc(100% - ${drawerWidth}px)`, //to fit the appbar
			alignItems: "center",
		},
		appbartext: {
			flexgrow: 1,
			alignItems: "center",
			width: "100%",
		},
		toolbar: theme.mixins.toolbar,
	};
});

type NavBarProps = {
	children: any;
};
export const NavBar = ({ children }: NavBarProps) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const menuitems = [
		{
			text: "Home",
			icon: <SubjectOutlined color="secondary" />,
			path: "/",
		},
		{
			text: "Create Room",
			icon: <SubjectOutlined color="secondary" />,
			path: "/create-room",
		},
		{
			text: "Join Room",
			icon: <SubjectOutlined color="secondary" />,
			path: "/join-room-test",
		},
	];

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar}>
				<Toolbar>
					<Typography className={classes.appbartext}>
						Welcome to Unidrop - A fast and lightweight file sharing app!
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: classes.drawerPaper }}
			>
				<div>
					<Typography variant="h4" className={classes.title}>
						UNIDROP
					</Typography>
				</div>

				{/* List / Links */}
				<List>
					{menuitems.map((item) => (
						<ListItem
							button
							key={item.text}
							onClick={() => navigate(item.path)}
						>
							<ListItemIcon> {item.icon} </ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
					;
				</List>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};
