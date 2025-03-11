import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="1085249332741-9gvua374l7k52j74ghd1fjv3iviu4cvp.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>
);
