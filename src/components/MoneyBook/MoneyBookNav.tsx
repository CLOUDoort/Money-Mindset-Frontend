import { Link, Outlet } from "react-router-dom"

const DashNav = () => {
    return (
        <div className="flex">
            <nav className="flex flex-col w-40">
                <Link to='/money-book/dashboard'>Dashboard</Link>
                <Link to='/money-book/expense'>Income & Outcome</Link>
                <Link to='/money-book/maginot-line'>Management Maginot Line</Link>
                <Link to='/money-book/calendar'>Calendar</Link>
                <Link to='/money-book/statistics'>Statistics</Link>
            </nav>
            <Outlet />
        </div>
    )
}

export default DashNav