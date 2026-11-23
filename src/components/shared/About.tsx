import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#09111f] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ROUTEWISE AI is an independent project built to modernize how travel itineraries are created. Powered by artificial intelligence, it structures connected daily journeys complete with route transit times, distances, and en-route food pitstops.
          </motion.p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 gap-6">
          <motion.div
            className="w-full md:w-1/2 bg-[#0c1527] border border-gray-800 p-6 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">The Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              The goal is to eliminate the stress of manual trip planning. Rather than generating a disconnected list of attractions, the platform plans realistic hop-by-hop routes from your central base, complete with roadside dining suggestions, timing advice, and one-click Google Maps navigation.
            </p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 bg-[#0c1527] border border-gray-800 p-6 rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-indigo-400">The Project</h3>
            <p className="text-gray-300 leading-relaxed">
              Created as an individual project, ROUTEWISE AI combines Google Maps Places API (New) with Google Gemini AI and client-side browser storage to deliver a private, database-free, and seamless travel planning experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
