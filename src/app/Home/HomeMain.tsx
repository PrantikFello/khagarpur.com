import Hero from "../../my_components/home_comp/HeroMain";
import dynamic from "next/dynamic";
import Footer from "../Navbar/footer";

const HomeCardsIterator = dynamic(() =>
import("../../my_components/home_comp/HomeCards"),{

}
);

export default function HomeMain(){
    return(
        <div className="snap_container w-screen overflow-y-visible" >
            <Hero></Hero>
            <HomeCardsIterator></HomeCardsIterator>
            <Footer/>
        </div>
    );
}