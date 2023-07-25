import Skeleton from "react-loading-skeleton"

const SkeletonItem = ({ cards, width }: any) => {
    return (
        <>
            {
                Array(cards)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <div key={i} className="relative flex items-center text-center border-collapse transition-colors group h-[2rem] whitespace-nowrap">
                                <div className="flex w-full gap-1 px-5 group">
                                    <div className={width}>
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

export default SkeletonItem