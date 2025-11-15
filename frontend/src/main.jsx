import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import Redux store and Provider
import { Provider } from "react-redux";
import store from "../src/frontend/redux/store.js";

// Import Auth context
import { AuthProvider } from "./admin/context/AuthContext.jsx";
import {UserAuthProvider} from "../src/user/auth/UserAuthContext.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserAuthProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserAuthProvider>
    </Provider>
  </StrictMode>
);
