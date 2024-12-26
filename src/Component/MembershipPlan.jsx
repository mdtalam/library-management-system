import { motion } from "motion/react";
const MembershipPlans = () => {
    const plans = [
      {
        id: 1,
        name: "Basic Membership",
        price: "Free",
        features: ["Borrow up to 3 books", "Access community events",""],
      },
      {
        id: 2,
        name: "Premium Membership",
        price: "$9.99/month",
        features: [
          "Borrow up to 10 books",
          "Access digital resources",
          "Priority event invitations",
        ],
      },
      {
        id: 3,
        name: "Elite Membership",
        price: "$19.99/month",
        features: [
          "Unlimited borrowing",
          "Exclusive book recommendations",
          "VIP event access",
        ],
      },
    ];
  
    return (
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple mb-4">
            Membership Plans
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose the membership plan that suits your reading habits. Enjoy exclusive benefits, access to a wide range of resources, and tailored privileges for every reader.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("hover started!")}
                key={plan.id}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-orange text-2xl font-semibold mb-4">
                  {plan.price}
                </p>
                <ul className="text-gray-600 text-left mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      - {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-purple text-white px-4 py-2 rounded">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default MembershipPlans;
  