import { LineData } from "../../../types"
import NoItem from "../NoItem"

const MaginotLineDetail = ({ lineData, asset }: { lineData: any, asset: any }) => {
    return (
        <>
            {lineData ?
                <div className="grid w-full grid-cols-2 gap-3 text-2xl">
                    {lineData?.map((item: LineData) => (
                        <div key={item.idx} className={`flex flex-col items-center ${asset?.data?.userExpense > item.value ? "bg-red-300" : "bg-green-300"} justify-center font-semibold w-full h-[10rem] border rounded-3xl`}>
                            <div>
                                {item.value - asset?.data?.userExpense < 0 ? "파괴" : item.value - asset?.data?.userExpense + "원 사용가능"}
                                <div>{item.legend} 방어선</div>
                            </div>
                        </div>
                    ))}
                </div>
                : <NoItem styleProp="w-full h-[30rem]" />}
        </>
    )
}

export default MaginotLineDetail