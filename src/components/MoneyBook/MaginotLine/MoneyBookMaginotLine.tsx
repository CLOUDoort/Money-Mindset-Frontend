import Input from "../../InputForm"

const MoneyBookMaginotLine = () => {
    return (
        <div className="w-2/3 h-full mx-auto">
            <div className="flex flex-col items-center">
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