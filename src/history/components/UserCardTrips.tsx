/* eslint-disable @typescript-eslint/no-explicit-any */
import usePlacePhoto from "@/hooks/useGetPhoto";
import { motion } from "framer-motion";
import { FC } from "react";
import { BanknotesIcon, CalendarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type Props = {
  trip: any;
  onDelete?: (id: string) => void;
};

const UserCardTrips: FC<Props> = ({ trip, onDelete }) => {
  const photoUrl = usePlacePhoto(trip?.userSelection?.location?.label);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && trip?.id) {
      onDelete(trip.id);
    }
  };

  return (
    <div className="relative group">
      <Link to={`/view-trip/${trip?.id}`}>
        <motion.div
          className="bg-[#0d1b2a] p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer h-full flex flex-col justify-between"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div>
            <div className="relative">
              <img
                src={photoUrl || "/placeholder.jpg"}
                alt={trip?.userSelection?.location?.label || "Trip destination"}
                className="w-full h-40 object-cover rounded-lg mb-4 bg-gray-800"
              />
              {onDelete && (
                <button
                  onClick={handleDelete}
                  title="Delete trip"
                  className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full shadow transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white line-clamp-1">
                {trip?.userSelection?.location?.label || "Destination"}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                {trip?.userSelection?.noOfDays && (
                  <span className="flex items-center">
                    <CalendarIcon className="w-4 h-4 text-blue-400 mr-1" />
                    {trip.userSelection.noOfDays} Days
                  </span>
                )}
                {trip?.userSelection?.budget && (
                  <span className="flex items-center">
                    <BanknotesIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    {trip.userSelection.budget}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-200">
              <span className="text-sm font-medium">View Itinerary</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default UserCardTrips;
