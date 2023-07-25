import FirstPart from "./FirstSection"
import SecondPart from "./SecondSection"
import FourthSection from "./FourthSection"
import ThirdSection from "./ThirdSection"
import FifthSection from "./FifthSection"

const Index = () => {
    return (
        <main className="flex flex-col mt-[5rem] w-full h-full">
            <FirstPart />
            <SecondPart />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
        </main>
    )
}

export default Index