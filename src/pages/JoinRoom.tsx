import React from "react";

export const JoinRoom = () => {
	return (
		<body>
			<div className="app">
				<div className="screen join-screen active">
					<div className="form">
						<h2>Share your files</h2>
						<div className="form-input">
							<label>Join ID</label>
							<input type="text" id="join-id" />
						</div>
						<div className="form-input">
							<button>Connect</button>
						</div>
					</div>
				</div>
				<div className="screen fs-screen">
					<div className="files-list">
						<div className="title">Shared Files</div>
					</div>
				</div>
			</div>
			<script type="text/javascript" src="socket.io/socket.io.js"></script>
			<script
				type="text/javascript"
				src="https://cdnjs.cloudflare.com/ajax/libs/downloadjs/1.4.1/download.min.js"
			></script>
			<script type="text/javascript" src="reciever.js"></script>
		</body>
	);
};
