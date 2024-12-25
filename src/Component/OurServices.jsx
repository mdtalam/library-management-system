import { FaBook, FaCalendarAlt, FaLaptop, FaUsers } from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      id: 1,
      icon: <FaBook className="text-4xl text-purple" />,
      title: "Book Borrowing",
      description:
        "Easily borrow books from our extensive collection, tailored to your interests.",
      bgColor: "bg-red-100",
    },
    {
      id: 2,
      icon: <FaLaptop className="text-4xl text-purple" />,
      title: "Digital Resources",
      description:
        "Access e-books, research papers, and other digital resources anytime.",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      icon: <FaUsers className="text-4xl text-purple" />,
      title: "Community Space",
      description:
        "Join a welcoming environment for study groups, discussions, and workshops.",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      icon: <FaCalendarAlt className="text-4xl text-purple" />,
      title: "Event Hosting",
      description:
        "Participate in or host events like book fairs, author meet-ups, and more.",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="py-12 mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple mb-4">
          Experience Exceptional Services
        </h2>
        <p className="text-lg text-center mb-8">
          Discover tailored solutions, seamless support, and unmatched quality
          through our comprehensive and customer-focused services designed for
          you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 ${service.bgColor}`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
