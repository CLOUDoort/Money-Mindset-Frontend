import Input from "../../InputForm"
import MoneyBookNav from "../MoneyBookNav"

const MoneyBookMaginotLine = () => {
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex flex-col items-center flex-1">
                <div>
                    chart
                </div>
                <div className="flex flex-col">
                    <div className="mb-2 font-semibold">목표 항목</div>
                    <table className="bg-gray-300">
                        <thead>
                            <tr>
                                <th>우선순위</th>
                                <th>목표</th>
                                <th>금액</th>
                                <th>사용금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end">저장</div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-2 font-semibold">목표 항목</div>
                    <table className="bg-gray-300">
                        <thead>
                            <tr>
                                <th>우선순위</th>
                                <th>목표</th>
                                <th>금액</th>
                                <th>사용금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                                <td>
                                    <Input type="text" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end">저장</div>
                </div>
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine