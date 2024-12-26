import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";

const FeaturedBooks = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "A classic novel that explores themes of wealth, love, and the American Dream.",
      cover:
        "https://i.ibb.co.com/pjgXWyZ/75dc138d38e4e738549ff02f3d9c951a.jpg", // Replace with book cover URLs
      rating: 4.5,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A timeless tale of justice and morality in the Deep South.",
      cover: "https://i.ibb.co.com/LSRPqWz/55284815-0.jpg",
      rating: 5.0,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      description:
        "A dystopian masterpiece that delves into totalitarianism and freedom.",
      cover: "https://i.ibb.co.com/nk6P78g/images.jpg",
      rating: 4.8,
    },
  ];

  return (
    <section className="py-12 mt-10 bg-gradient-to-r from-purple-100 to-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-purple mb-6">
          Featured Books of the Month
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Explore our handpicked selection of top-rated books that you won't
          want to miss!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("hover started!")}
              key={book.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 font-medium mb-1">by {book.author}</p>
              <p className="text-gray-600 text-sm mb-4">{book.description}</p>
              <div className="flex items-center justify-center">
                <FaStar className="text-yellow-500 text-lg mr-2" />
                <span className="text-gray-800 font-bold">
                  {book.rating} / 5.0
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
