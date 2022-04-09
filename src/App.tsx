import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRoom } from "./pages/CreateRoom";
import { JoinRoom } from "./pages/JoinRoom";
import { NavBar } from "./components/NavBar";
import { JoinRoomTest } from "./pages/JoinRoomTest";

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create-room" element={<CreateRoom />} />
				<Route path="/join-room" element={<JoinRoom />} />
				<Route path='/join-room-test' element={<JoinRoomTest />} />
			</Routes>
		</Router>
	);
}

export default App;
