import usePlacePhoto from "@/hooks/useGetPhoto";
import { FC } from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, BanknotesIcon, StarIcon } from "@heroicons/react/24/solid";
import { CiLocationArrow1 } from "react-icons/ci";
import { motion } from "framer-motion";

type Props = {
  hotel: any;
};

export const HotelCard: FC<Props> = ({ hotel }) => {
  const photoUrl = usePlacePhoto(hotel?.name);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name} ${hotel?.address}`}
      target="_blank"
    >
      <motion.div
        className="hotel-card-item bg-[#0d1b2a] p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer print:p-2.5 print:rounded-lg print:border print:border-gray-800"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={photoUrl!}
          alt={hotel.name}
          className="w-full h-40 object-cover rounded-lg mb-4 print:h-20 print:mb-1.5"
        />
        <div className="flex flex-col gap-2 print:gap-1">
          <h2 className="text-xl font-semibold text-white print:text-sm print:leading-tight">{hotel?.name}</h2>
          <p className="text-sm text-gray-300 flex items-center print:text-[11px] print:leading-tight">
            <MapPinIcon className="w-5 h-5 text-green-400 mr-2 print:w-3.5 print:h-3.5 print:mr-1" />
            <span className="line-clamp-1">{hotel?.address}</span>
          </p>
          <p className="text-sm text-gray-300 flex items-center print:text-[11px]">
            <BanknotesIcon className="w-5 h-5 text-yellow-400 mr-2 print:w-3.5 print:h-3.5 print:mr-1" />
            {hotel?.price}
          </p>
          <p className="text-sm text-gray-300 flex items-center print:text-[11px]">
            <StarIcon className="w-5 h-5 text-yellow-400 mr-2 print:w-3.5 print:h-3.5 print:mr-1" />
            {hotel?.rating}
          </p>
        </div>
        <div className="mt-4 no-print">
          <motion.div
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CiLocationArrow1 className="w-5 h-5" />
            <span>View on Map</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};
