import { useEffect, useRef, useState } from "react"

const FourthSection = () => {
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
                        캘린더에서 자신의 수입과 지출을 확인하고 <br />
                        특정 날짜의 지출 위치까지 확인하세요!
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FourthSection