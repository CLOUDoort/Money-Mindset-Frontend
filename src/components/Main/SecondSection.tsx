import { useEffect, useRef, useState } from "react"

const SecondSection = () => {
    const element = useRef<HTMLDivElement | null>(null)
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
    return (
        <section className={`w-full min-h-[calc(100vh-5rem)] bg-gray-100`}>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div ref={element} className={`${inviewPort ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>
                    <div className="text-4xl font-semibold leading-normal whitespace-pre-wrap">
                        원하는 목표에 맞게 마지노선을 설정하여<br />
                        사용 가능한 금액을 한 눈에 보세요!<br />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecondSection