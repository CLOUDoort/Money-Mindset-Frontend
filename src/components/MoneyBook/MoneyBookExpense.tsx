import MoneyBookNav from "./MoneyBookNav"

const MoneyBookExpense = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex-1">
                Expense
            </div>
        </div>
    )
}

export default MoneyBookExpense