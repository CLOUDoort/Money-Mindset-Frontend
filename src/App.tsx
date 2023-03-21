import 'react-toastify/dist/ReactToastify.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Forgot from "./pages/Forgot";
import Header from "./components/Header";
import Home from "./pages/Home";
import MoneyBook from "./pages/MoneyBook";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn/Index";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/money-book" element={<MoneyBook />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  )
}

export default App;
