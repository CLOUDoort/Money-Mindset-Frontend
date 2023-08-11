import { useEffect, useRef, useState } from "react"

const ThirdSection = () => {
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
                        자신의 수입과 지출을 기록하고 <br />
                        상세 내용과 위치도 기록해보세요
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThirdSection