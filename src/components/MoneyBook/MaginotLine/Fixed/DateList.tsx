const DATE_SELECTOR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

const DateList = ({ dateClick }: { dateClick: (date: number) => void }) => {
    return (
        <div className="absolute z-40 h-48 p-2 overflow-y-scroll transition-all 0.5s bg-white border left-0 top-16 w-full rounded">
            {DATE_SELECTOR.map((item) => (
                <div className="p-2 transition-colors rounded cursor-pointer text-start hover:bg-gray-200" onClick={() => dateClick(item)} key={item}>{item} 일</div>
            ))}
        </div>
    )
}

export default DateList