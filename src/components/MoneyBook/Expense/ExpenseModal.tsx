import { useEffect, useState } from "react"

import ExpenseModalItem from "./ExpenseModalItem"
import ExpenseStatistics from "./ExpenseStatisticsModal"
import { FlowDataType } from "../../../types"
import NoItem from "../NoItem"

type Props = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    item: FlowDataType[],
    dataName: string
}

const ExpenseModal = ({ setModal, item, dataName }: Props) => {
    const [state, setState] = useState(false)
    const clickStatistics = () => setState(!state)
    // scroll fix
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

    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50" onClick={() => setModal(false)}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white w-[50rem] border border-black rounded h-[40rem]">
                {state ?
                    <ExpenseStatistics click={clickStatistics} dataName={dataName} />
                    : <>
                        <div className="flex items-center justify-between pt-10 pb-5 font-semibold px-14 bg-gray">
                            <div className="text-2xl">{dataName}</div>
                            <div className="cursor-pointer" onClick={clickStatistics}>통계</div>
                        </div>
                        {item?.length ?
                            <div className="h-full overflow-y-scroll">
                                {item.map((item: FlowDataType) => (
                                    <ExpenseModalItem key={item.idx} data={item} />
                                ))}
                            </div>
                            : <NoItem styleProp="mb-[5.6rem]" />
                        }

                    </>
                }
            </div>
        </div>
    )
}

export default ExpenseModal