import Skeleton from "react-loading-skeleton"

const MaginotLineSkeleton = ({ cards }: any) => {
    return (
        <>
            {
                Array(cards)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <div key={i} className="relative flex items-center gap-3 p-3 mb-4 text-center transition-colors border rounded hover:bg-gray-100 group h-[74px]">
                                <div className="w-[33%]">
                                    <Skeleton />
                                </div>
                                <div className="w-[34%]">
                                    <Skeleton />
                                </div>
                                <div className="w-[33%]">
                                    <Skeleton />
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )
}

export default MaginotLineSkeleton