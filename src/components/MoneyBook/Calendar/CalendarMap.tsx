import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import { FlowDetailType, PropsFlowItem } from "../../../type/expenseData"
import KakaoMap from "../KakaoMap"

const CalendarMap = ({ num, flow_data }: { num: number, flow_data: any }) => {
    const condition = num % 7 > 0 && num % 7 <= 3
    const viewCondition = num > 21
    const locations: FlowDetailType[] = flow_data.map((item: PropsFlowItem) => {
        return {
            detail: {
                detail: item.flowName + '(' + item.flowDetail?.detail + ')',
                flow_idx: item.idx,
                lat: item.flowDetail?.lat,
                lng: item.flowDetail?.lng
            },
            flow_id: item.flow_id,
        }
    })
    return (
        <div className={`absolute border border-black/30 ${!viewCondition ? "lg:-top-0 top-16" : "lg:-top-[18.5rem] -top-0"}   ${condition ? "left-[10.5rem] animate-fade-right" : "right-[10.5rem] animate-fade-left"}  flex flex-col bg-white shadow-xl lg:w-[24rem] lg:h-[30rem] w-40 h-[11.5rem] animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute border border-black/30 rotate-45 w-6 h-6 ${!viewCondition ? "lg:top-[8.5rem] top-[4.5rem]" : "lg:top-[27rem] top-[8.4rem]"} bg-white ${condition ? "-left-[0.79rem] border-r-0 border-t-0" : "-right-[0.79rem] border-l-0 border-b-0"}`}></div>
            {flow_data && locations[0] ?
                <KakaoMap flowMapData={locations} /> : <div className='flex items-center justify-center w-full h-full m-auto text-2xl font-semibold'>
                    <MdOutlineSpeakerNotesOff size={50} />
                </div>}
        </div>
    )
}

export default CalendarMap