import Banner from "../Component/Banner";
import BookCategories from "../Component/BookCategories";
import FeaturedBooks from "../Component/FeaturedBooks";
import Insights from "../Component/Insights";
import MembershipPlans from "../Component/MembershipPlan";
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
                <FeaturedBooks></FeaturedBooks>
            </section>
            <section>
                <OurServices></OurServices>
            </section>
            <section>
                <Insights></Insights>
            </section>
            <section>
                <MembershipPlans></MembershipPlans>
            </section>
        </div>
    );
};

export default Home;