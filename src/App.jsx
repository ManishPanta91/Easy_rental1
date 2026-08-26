import { ToastContainer } from "react-toastify";
import Layout from "./Layout/Layout"

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
      />
      <Layout/>
    </>
  );
}

export default App;
