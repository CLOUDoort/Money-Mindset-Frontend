import MaginotFixed from "./MaginotFixed"
import MaginotGoal from "./MaginotGoal"
import MoneyBookNav from "../MoneyBookNav"

const MoneyBookMaginotLine = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex flex-col items-center justify-center flex-1 p-4">
                <div>
                    chart
                </div>
                <MaginotGoal />
                <MaginotFixed />

            </div>
        </div>
    )
}

export default MoneyBookMaginotLine