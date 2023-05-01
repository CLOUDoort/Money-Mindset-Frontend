import MoneyBookNav from "./MoneyBookNav"

const MoneyBookCalendar = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex flex-col items-center justify-center flex-1 p-10">
                calendar
            </div>
        </div>
    )
}

export default MoneyBookCalendar