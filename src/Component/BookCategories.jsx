import 'animate.css';
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    category: "Fiction",
    image: "https://i.ibb.co.com/cNJjtPz/open-book-concept-fiction-storyt.jpg",
    subtitle: "Journey Through Fiction",
    route: "/category/fiction",
  },
  {
    category: "Science",
    image: "https://i.ibb.co.com/SPQhkbV/3651141-scaled.jpg",
    subtitle: "Discover the Wonders of Science",
    route: "/category/science",
  },
  {
    category: "History",
    image: "https://i.ibb.co.com/1Z4DY4q/1456225075.jpg",
    subtitle: "Uncover the Past",
    route: "/category/history",
  },
  {
    category: "Fantasy",
    image: "https://i.ibb.co.com/1L9YdkX/concept-of-an-open-magic-book-op.jpg",
    subtitle: "Explore Magical Worlds",
    route: "/category/fantasy",
  },
];

const BookCategories = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-12 mt-10">
      <h2 className="animate__animated animate__zoomIn text-3xl font-bold text-center mb-4 text-purple">
        Dive Into Our Collections
      </h2>
      <p className="animate__animated animate__zoomIn text-lg text-center mb-8">
        Discover a world of stories and knowledge. Explore diverse book
        categories tailored for every reader’s journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log("hover started!")}
            onClick={() => navigate(category.route)}
            key={index}
            className="animate__animated animate__zoomIn relative h-48 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
              <h3 className="text-xl font-bold mb-2">{category.category}</h3>
              <p className="text-md font-bold">{category.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
