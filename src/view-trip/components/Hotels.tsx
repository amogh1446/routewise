import { FC } from "react";
import { HotelCard } from "./HotelCard";
import { motion } from "framer-motion";

type Props = {
  trip: any;
};

export const Hotels: FC<Props> = ({ trip }) => {
  return (
    <div className="hotel-section bg-[#09111f] p-6 rounded-lg shadow-md mb-8 print:p-2 print:mb-2 print-avoid-break">
      <h2 className="text-2xl font-bold text-white mb-4 print:text-xl print:mb-2">
        Hotel Recommendations
      </h2>
      <motion.div
        className="hotel-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 print:grid-cols-3 print:gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {trip?.tripData?.hotels?.map((hotel: any, index: number) => (
          <HotelCard hotel={hotel} key={index} />
        ))}
      </motion.div>
    </div>
  );
};
