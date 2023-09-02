import { CgMathMinus, CgMathPlus } from 'react-icons/cg'

import { AxiosResponse } from 'axios'
import { FLOW_DATA } from '../../../types'

const FlowList = ({ item, flowClick }: { item: AxiosResponse<any, any> | undefined, flowClick: (id: number, name: string) => void }) => {
    return (
        <div className="absolute left-0 z-40 w-full p-2 overflow-y-scroll bg-white border rounded h-60 top-16">
            {item?.data?.map((item: FLOW_DATA) => (
                <div className="p-2 rounded cursor-pointer hover:bg-gray-200" onClick={() => flowClick(item.id, item.name)} key={item.id}>
                    <div className="flex items-center gap-2">
                        {item.id > 4 ? <CgMathMinus /> : <CgMathPlus />}
                        {item.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FlowList