import ExpenseModalItem from "./ExpenseModalItem"
import { useEffect, useState } from "react"
import ExpenseStatistics from "./ExpenseStatistics"

const ExpenseModal = ({ setModal, item, modalData }: any) => {
    const [state, setState] = useState(false)
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, [])
    const clickStatistics = () => setState(!state)
    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50" onClick={() => setModal(false)}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white w-[50rem] border border-black rounded h-[40rem]">
                {state ? <ExpenseStatistics click={clickStatistics} /> : <>
                    <div className="flex items-center justify-between pt-10 pb-5 font-semibold px-14 bg-gray">
                        <div className="text-2xl">{modalData}</div>
                        <div className="cursor-pointer" onClick={clickStatistics}>통계</div>
                    </div>
                    <div className="h-full overflow-y-scroll">
                        {item.map((item: any) => (
                            <ExpenseModalItem key={item.idx} data={item} />
                        ))}
                    </div>
                </>}
            </div>

        </div>
    )
}

export default ExpenseModal