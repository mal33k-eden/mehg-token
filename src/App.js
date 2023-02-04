import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuBar from "./components/MenuBar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import MyStats from "./pages/MyStats";
import Sale from "./pages/Sale";
function App() {
  return (
    <>
      <MenuBar />
      <Container className="">
        <Router>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/airdrop" element={<MyStats />} />
              <Route path="/airdrop/referral/:referredByUrl" element={<MyStats />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
          <div className="App"></div>
        </Router>
        <ToastContainer />
      </Container>
    </>
  );
}

export default App;
