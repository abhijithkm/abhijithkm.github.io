import Contact from "./Contact"
import Education from "./Education"
import Experience from "./Experience"
import HeroContent from "./HeroContent"
import Projects from "./Projects"
import Skills from "./Skills"
import TopNav from "./TopNav"

const Home = () => {
    return (
        <>
            <TopNav />
            <HeroContent />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Contact />
        </>
    )
}

export default Home
