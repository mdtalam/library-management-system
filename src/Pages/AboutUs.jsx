import React, { useState } from "react";

const AboutUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate form submission
    alert("Your message has been submitted successfully!");

    // Clear form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <div>
      <div className="container mx-auto py-10 mt-[104px]">
        <h1 className="text-4xl font-bold text-purple mb-8">About Us</h1>

        <div className="bg-white shadow-lg p-8 rounded-lg">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Welcome to our Library Management System! Our goal is to provide a
            seamless and efficient platform for managing library resources,
            ensuring that students, teachers, and library staff have easy access
            to a vast collection of books, journals, and digital resources.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our mission is to cultivate a culture of learning and knowledge
            sharing by offering a well-organized and user-friendly library
            system. We strive to empower users by simplifying the process of
            borrowing, returning, and tracking books, thereby enhancing the
            overall learning experience.
          </p>

          <h2 className="text-2xl font-semibold text-dark-gray mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
            <li>Easy book search and categorization</li>
            <li>Real-time tracking of borrowed and returned books</li>
            <li>User authentication for personalized experiences</li>
            <li>Seamless borrow and return process</li>
            <li>Detailed user profiles with borrowing history</li>
          </ul>

          
        </div>
        
      </div>
      {/* Contact Us Section */}
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl text-center font-semibold text-dark-gray mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-center text-gray-700 mb-6">
          Have questions or feedback? Fill out the form below, and we’ll get
          back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-dark transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
