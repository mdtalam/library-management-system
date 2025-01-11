
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required Swiper modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import image
import { useNavigate } from 'react-router-dom';
import sliderImg1 from '../assets/img1.jpg';
import sliderImg2 from '../assets/img2.jpg';
import sliderImg3 from '../assets/img3.jpg';
import sliderImg4 from '../assets/img4.jpg';
import sliderImg5 from '../assets/img5.jpg';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden">
      <Swiper
        spaceBetween={30} // Space between slides
        centeredSlides={true} // Keep active slide in the center
        autoplay={{
          delay: 3000, // Slide changes every 3 seconds
          disableOnInteraction: false, // Keep autoplay running after interaction
        }}
        pagination={{
          clickable: true, // Enable clickable pagination dots
        }}
        navigation={true} // Enable next/previous buttons
        modules={[Autoplay, Pagination, Navigation]} // Import Swiper modules
        className="mySwiper h-[65vh] w-screen container mx-auto bg-cover"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="flex flex-col justify-center items-center h-full bg-cover bg-center relative text-white p-6 text-center"
            style={{
                backgroundImage: `url(${sliderImg1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-gradient-to-t bg-opacity-50 bg-black from-black via-transparent to-transparent"></div>
            <h2 className="text-3xl font-bold z-10">Welcome to Our Library</h2>
            <p className="text-xl mt-4 z-10">Explore a wide variety of books and resources.</p>
            <button className="mt-6 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark z-10">
              Browse Books
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="flex flex-col justify-center items-center h-full bg-cover bg-center relative text-white p-6 text-center"
            style={{
                backgroundImage: `url(${sliderImg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-gradient-to-t bg-opacity-50 bg-black from-black via-transparent to-transparent"></div>
            <h2 className="text-3xl font-bold z-10">Manage Your Borrowing</h2>
            <p className="text-xl mt-4 z-10">Easily track your borrowed books and due dates.</p>
            <button 
            onClick={() => navigate("/borrowed-books")}
            className="mt-6 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark z-10">
              My Borrowed Books
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="flex flex-col justify-center items-center h-full bg-cover bg-center relative text-white p-6 text-center"
            style={{
                backgroundImage: `url(${sliderImg3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-gradient-to-t bg-opacity-50 bg-black from-black via-transparent to-transparent"></div>
            <h2 className="text-3xl font-bold z-10">Add Your Books</h2>
            <p className="text-xl mt-4 z-10">Share your collection with others and contribute to the library.</p>
            <button
            onClick={() => navigate("/add-book")}
            className="mt-6 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark z-10">
              Add a Book
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="flex flex-col justify-center items-center h-full bg-cover bg-center relative text-white p-6 text-center"
            style={{
                backgroundImage: `url(${sliderImg4})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-gradient-to-t bg-opacity-50 bg-black from-black via-transparent to-transparent"></div>
            <h2 className="text-3xl font-bold z-10">New Arrivals</h2>
            <p className="text-xl mt-4 z-10">Check out the latest books added to our collection!</p>
            <button className="mt-6 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark z-10">
              View New Arrivals
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div
            className="flex flex-col justify-center items-center h-full bg-cover bg-center relative text-white p-6 text-center"
            style={{
                backgroundImage: `url(${sliderImg5})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-gradient-to-t bg-opacity-50 bg-black from-black via-transparent to-transparent"></div>
            <h2 className="text-3xl font-bold z-10">Join Our Community</h2>
            <p className="text-xl mt-4 z-10">Become a member and enjoy exclusive benefits.</p>
            <button 
            onClick={() => navigate("/register")}
            className="mt-6 bg-orange text-white px-6 py-2 rounded-lg hover:bg-orange-dark z-10">
              Sign Up Now
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
