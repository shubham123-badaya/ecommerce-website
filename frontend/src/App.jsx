import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
