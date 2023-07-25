import { useAtomValue } from "jotai"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { accessToken } from "../../store/initialState"

const FirstSection = () => {
    const element = useRef<HTMLDivElement | null>(null)
    const token = useAtomValue(accessToken)
    const navigate = useNavigate()
    const [inviewPort, setInviewPort] = useState<boolean>(false)
    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInviewPort(true)
                }
                else setInviewPort(false)
            })
        }
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        })
        if (element.current) {
            observer.observe(element.current)
        }
    }, [])
    const getStarted = () => {
        if (token) {
            navigate("/money-book/dashboard")
            toast.success("로그인 성공")
        }
        else navigate("/sign-in")
    }
    return (
        <section className={`w-full min-h-[calc(100vh-5rem)] bg-white`}>
            <div className="flex items-center justify-center w-full h-full pb-[10rem]">
                <div className="flex flex-col">
                    <div ref={element} className={`${inviewPort ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>
                        <div className="text-5xl font-semibold leading-normal whitespace-pre-wrap">
                            금융의 자유를 향한 첫 걸음은<br />
                            MoneyMindset과 함께
                        </div>
                        <div className="flex gap-3 mt-[1rem]">
                            <button onClick={getStarted} className='w-1/2 py-3 font-semibold text-center text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150'>Get started</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FirstSection