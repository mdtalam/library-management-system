import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Insights = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <div className="py-12 mt-10 mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-purple">
          Library Insights
        </h2>
        <p className='text-lg text-center mb-8'>Discover fascinating library trends, book reviews, and expert recommendations to enrich your reading journey and expand your knowledge.</p>
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-purple text-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold">Total Books</h3>
              <p className="text-4xl font-bold">
                {counterOn && <CountUp start={0} end={1230} duration={2} />}
              </p>
            </div>
            <div className="bg-orange text-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold">Total Users</h3>
              <p className="text-4xl font-bold">
                {counterOn && <CountUp start={0} end={542} duration={2} />}
              </p>
            </div>
            <div className="bg-crimson text-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold">Books Borrowed</h3>
              <p className="text-4xl font-bold">
                {counterOn && <CountUp start={0} end={320} duration={2} />}
              </p>
            </div>
            <div className="bg-limeGreen text-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold">Most Popular Category</h3>
              <p className="text-4xl font-bold">Fiction</p>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
};

export default Insights;
