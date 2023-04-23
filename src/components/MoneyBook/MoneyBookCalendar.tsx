import MoneyBookNav from "./MoneyBookNav"

const MoneyBookCalendar = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex-1">
                calendar
            </div>
        </div>
    )
}

export default MoneyBookCalendar