import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from "react-router-dom";

import Calendar from './pages/MoneyBook/Calendar';
import DashNav from './components/MoneyBook/MoneyBookNav';
import Dashboard from './pages/MoneyBook/Dashboard';
import Expense from './pages/MoneyBook/Expense';
import Forgot from "./pages/Forgot";
import Header from "./components/Header";
import Home from "./pages/Home";
import MaginotLine from './pages/MoneyBook/MaginotLine';
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Statistics from './pages/MoneyBook/Statistics';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<DashNav />}>
            <Route path="/money-book/dashboard" element={<Dashboard />} />
            <Route path="/money-book/expense" element={<Expense />} />
            <Route path="/money-book/maginot-line" element={<MaginotLine />} />
            <Route path="/money-book/calendar" element={<Calendar />} />
            <Route path="/money-book/statistics" element={<Statistics />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
