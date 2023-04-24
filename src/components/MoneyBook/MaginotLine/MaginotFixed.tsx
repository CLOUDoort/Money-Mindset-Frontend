import Input from "../../InputForm"
import MaginotItem from "./MaginotItem"

const MaginotFixed = () => {
    return (
        <div className="flex flex-col mb-10">
            <div className="mb-2 text-2xl font-semibold">고정지출 항목</div>
            <table>
                <thead>
                    <tr>
                        <th>지출 발생일</th>
                        <th>목표</th>
                        <th>금액</th>
                    </tr>
                </thead>
                <tbody className="gap-2">
                    <tr>
                        <td>
                            <Input type="number" />
                        </td>
                        <td>
                            <Input type="text" />
                        </td>
                        <td>
                            <Input type="number" />
                        </td>
                    </tr>
                </tbody>
            </table >
            <MaginotItem />
            <button className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
        </div>

    )
}

export default MaginotFixed