import Skeleton from "react-loading-skeleton"

const ExpenseItemSkeleton = ({ cards }: any) => {
    return (
        <>
            {
                Array(cards)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <div key={i} className="relative flex items-center text-center border-collapse transition-colors hover:bg-gray-100 group h-[4.6rem] whitespace-nowrap border-b border-b-zinc-500">
                                <div className="flex w-full gap-3 px-5 group">
                                    <div className="w-10">
                                        <Skeleton />
                                    </div>
                                    <div className="w-16">
                                        <Skeleton />
                                    </div>
                                    <div className="flex-1 pr-5 text-right">
                                        <Skeleton />
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )
}

export default ExpenseItemSkeleton