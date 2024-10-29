// src/HowItWorks.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Using React Router for navigation

const steps = [
  {
    title: '1. Register or Login',
    description: 'Create an account or log in to access the platform.',
    icon: '🚀',
  },
  {
    title: '2. Subscribe and Pay',
    description: 'Choose a plan and unlock full access to features.',
    icon: '💳',
  },
  {
    title: '3. Browse Categories and Products',
    description: 'Explore our vast collection of products and categories.',
    icon: '🛒',
  },
  {
    title: '4. Select Product or Variant',
    description: 'Pick a product and customize it to suit your needs.',
    icon: '📦',
  },
  {
    title: '5. Customize Manufacturing, Inspection, Sourcing',
    description: 'Distribute manufacturing tasks, inspect quality, or source products directly.',
    icon: '⚙️',
  },
  {
    title: '6. Receive Your Customized Product',
    description: 'Get your custom product delivered to your doorstep.',
    icon: '📬',
  },
];

const HowItWorks = () => {
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleBackToHome = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-600 via-purple-800 to-indigo-700 text-white p-6">        <h1 className="text-center text-4xl font-bold mb-2">How It Works</h1>
        <p className="text-center text-lg">
          Follow these simple steps to create your customized product.
        </p>
      </header>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} />
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-10">
        <motion.button
          onClick={handleBackToHome}
          className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

const StepCard = ({ step }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl mb-4">{step.icon}</div>
      <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
      <p className="text-gray-600">{step.description}</p>
    </motion.div>
  );
};

export default HowItWorks;


