import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { Route, Routes } from "react-router-dom";

import Calendar from './pages/MoneyBook/Calendar';
import Dashboard from './pages/MoneyBook/Dashboard';
import Expense from './pages/MoneyBook/Expense';
import Forgot from "./pages/Forgot";
import Header from "./components/Header";
import Home from "./pages/Home";
import MaginotLine from './pages/MoneyBook/MaginotLine';
import MoneyBookNav from './components/MoneyBook/MoneyBookNav';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Setting from './pages/MoneyBook/Setting';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { SkeletonTheme } from 'react-loading-skeleton';
import Statistics from './pages/MoneyBook/Statistics';
import { ToastContainer } from 'react-toastify';
import Welcome from './pages/Welcome';
import { queryClient } from './react-query/queryClient';

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor='#b0b0b0' highlightColor='#747474'>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route index element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/welcome" element={<Welcome />} />
            </Route>
            <Route element={<MoneyBookNav />}>
              <Route path="/money-book/dashboard" element={<Dashboard />} />
              <Route path="/money-book/expense" element={<Expense />} />
              <Route path="/money-book/maginot-line" element={<MaginotLine />} />
              <Route path="/money-book/calendar" element={<Calendar />} />
              <Route path="/money-book/statistics" element={<Statistics />} />
              <Route path="/money-book/setting" element={<Setting />} />
            </Route>
          </Routes>
        </SkeletonTheme>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer />
    </>
  )
}

export default App;
