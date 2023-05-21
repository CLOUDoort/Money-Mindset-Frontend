const ExpenseItem = ({ data }: any) => {
    const { flow_date, flowName, amount } = data
    const temp = new Date(flow_date)
    const getMD = (dateIn: Date) => {
        var mm = dateIn.getMonth() + 1 // getMonth() is zero-based
        var dd = dateIn.getDate()
        return String(mm + '월 ' + dd + '일 ')
    }
    const date = getMD(temp)
    return (
        <div className="relative flex items-center p-3 mb-4 text-center transition-colors rounded hover:bg-gray-100 group h-[74px] whitespace-nowrap">
            <div className="flex w-full gap-3">
                <div>{date}</div>
                <div> {flowName}</div>
                <div>{amount} 원</div>
            </div>
        </div>
    )
}

export default ExpenseItem