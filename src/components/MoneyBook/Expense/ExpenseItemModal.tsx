import { useNavigate } from "react-router"
import ExpenseItem from "./ExpenseItem"

const ExpenseItemModal = ({ setModal, item, modalData }: any) => {
    const navigate = useNavigate()
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-80" onClick={() => setModal(false)}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col p-10 z-1000 bg-white max-w-[50rem] w-[50%] lg:ml-52 ml-14 border rounded">
                <div className="flex items-center justify-between mb-5 font-semibold bg-gray">
                    <div className="text-2xl">{modalData}</div>
                    <div className="cursor-pointer" onClick={() => navigate('/money-book/statistics')}>통계</div>
                </div>
                <div className="overflow-y-scroll">
                    {item.map((item: any) => (
                        <ExpenseItem key={item.idx} data={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExpenseItemModal