import { useEffect, useRef, useState } from "react"

const FourthPicture = () => {
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
        <section className={`w-full min-h-[calc(100vh-5rem)] bg-white`}>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div ref={element} className={`${inviewPort ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>
                    <div className="flex items-center justify-center gap-5">
                        <div className={`w-[32rem] h-[20rem] mb-[5rem] ${inviewPort && "animate-fade-right animate-ease-in"} shadow-xl`}>
                            <img src="/calendar_list.png" className="object-cover" alt="maginot" />
                        </div>
                        <div className={`w-[32rem] h-[20rem] ${inviewPort && "animate-fade-left animate-ease-in shadow-xl"} mt-[5rem]`}>
                            <img src="/calendar_map.png" className="object-cover" alt="maginot" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FourthPicture