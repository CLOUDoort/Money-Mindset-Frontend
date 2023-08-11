import FifthPicture from "./FifthPicture"
import FifthSection from "./FifthSection"
import FirstSection from "./FirstSection"
import FourthPicture from "./FourthPicture"
import FourthSection from "./FourthSection"
import SecondPicture from "./SecondPicture"
import SecondSection from "./SecondSection"
import ThirdPicture from "./ThirdPicture"
import ThirdSection from "./ThirdSection"

const Index = () => {
    return (
        <main className="flex flex-col mt-[5rem] w-full h-full">
            <FirstSection />
            <SecondSection />
            <SecondPicture />
            <ThirdSection />
            <ThirdPicture />
            <FourthSection />
            <FourthPicture />
            <FifthSection />
            <FifthPicture />
        </main>
    )
}

export default Index