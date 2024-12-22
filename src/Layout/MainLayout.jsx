
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <section>
                <Navbar></Navbar>
            </section>
            <div className='min-h-[calc(100vh-445px)]'>
            <Outlet></Outlet>
            </div>
            <section>
                <Footer></Footer>
            </section>
        </div>
    );
};

export default MainLayout;