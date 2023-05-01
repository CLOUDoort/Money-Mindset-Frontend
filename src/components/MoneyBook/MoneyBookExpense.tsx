import MoneyBookNav from "./MoneyBookNav"

const MoneyBookExpense = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex flex-col items-center justify-center flex-1 p-10">
                Expense
            </div>
        </div>
    )
}

export default MoneyBookExpense