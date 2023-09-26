import { LineData } from "../../../types"
import NoItem from "../NoItem"

const MaginotLineDetail = ({ lineData }: { lineData: any }) => {
    return (
        <>
            {lineData ?
                <div className="grid w-full grid-cols-2 gap-3 text-2xl">
                    {lineData?.map((item: LineData) => (
                        <div key={item.idx} className={`flex flex-col items-center ${item.value ? "bg-green-300" : "bg-red-300"} justify-center font-semibold w-full h-[10rem] border rounded-3xl`}>
                            <div>
                                {item.value ? item.value + "원 사용가능" : "파괴"}
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