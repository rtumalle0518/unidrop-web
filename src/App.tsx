import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRoom } from "./pages/CreateRoom";
import { NavBar } from "./components/NavBar";
import { JoinRoom } from "./pages/JoinRoom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		background: {
			default: "#2C2F33",
		},
	},
});

function App() {
	return (
		<Router>
			<NavBar>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create-room" element={<CreateRoom />} />
						<Route path="/join-room" element={<JoinRoom />} />
					</Routes>
				</ThemeProvider>
			</NavBar>
		</Router>
	);
}

export default App;
