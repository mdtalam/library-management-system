import Banner from "../Component/Banner";
import BookCategories from "../Component/BookCategories";
import Insights from "../Component/Insights";
import OurServices from "../Component/OurServices";


const Home = () => {
    return (
        <div>
            <section className="banner">
                <Banner></Banner>
            </section>
            <section>
                <BookCategories></BookCategories>
            </section>
            <section>
                <OurServices></OurServices>
            </section>
            <section>
                <Insights></Insights>
            </section>
        </div>
    );
};

export default Home;