import { Button } from "@/components/ui/button";
import usePlacePhoto from "@/hooks/useGetPhoto";
import { FC } from "react";
import { LuShare2 } from "react-icons/lu";
import { Printer } from "lucide-react";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Props = {
  trip: any;
};

const InformationSections: FC<Props> = ({ trip }) => {
  const photoUrl = usePlacePhoto(trip?.userSelection?.location?.label);
  const centralHub = trip?.tripData?.trip_details?.central_hub;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Trip to ${
            trip?.userSelection?.location?.label || "My Saved Trip"
          }`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Trip link copied to clipboard!");
    }
  };

  const handlePrint = (theme: "dark" | "light" = "dark") => {
    if (theme === "light") {
      document.body.classList.add("print-light-mode");
    } else {
      document.body.classList.remove("print-light-mode");
    }
    window.print();
    setTimeout(() => {
      document.body.classList.remove("print-light-mode");
    }, 1000);
  };

  return (
    <div className="trip-overview-header bg-[#09111f] p-4 sm:p-6 rounded-2xl shadow-xl mb-8 border border-gray-800 print:p-3 print:mb-3 print-avoid-break">
      <div className="relative overflow-hidden rounded-xl">
        <motion.img
          src={photoUrl!}
          alt="Destination"
          className="h-64 sm:h-80 w-full object-cover rounded-xl print:h-40 print:max-h-40"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09111f] via-transparent to-transparent opacity-80 print:hidden" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4 print:mt-2">
        <div className="flex flex-col gap-3 print:gap-1.5">
          <motion.h2
            className="text-2xl sm:text-4xl font-extrabold text-white print:text-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {trip?.userSelection?.location?.label}
          </motion.h2>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm print:text-xs print:gap-1.5">
            <div className="flex items-center bg-gray-800/80 border border-gray-700/60 p-2 px-3.5 rounded-full text-gray-200 print:p-1 print:px-2.5">
              <CalendarIcon className="w-4 h-4 mr-1.5 text-blue-400 print:w-3.5 print:h-3.5" />
              {trip?.userSelection?.noOfDays} Days
            </div>

            <div className="flex items-center bg-gray-800/80 border border-gray-700/60 p-2 px-3.5 rounded-full text-gray-200 print:p-1 print:px-2.5">
              <CurrencyDollarIcon className="w-4 h-4 mr-1.5 text-emerald-400 print:w-3.5 print:h-3.5" />
              {trip?.userSelection?.budget} Budget
            </div>

            <div className="flex items-center bg-gray-800/80 border border-gray-700/60 p-2 px-3.5 rounded-full text-gray-200 print:p-1 print:px-2.5">
              <UsersIcon className="w-4 h-4 mr-1.5 text-indigo-400 print:w-3.5 print:h-3.5" />
              {trip?.userSelection?.traveler}
            </div>

            {centralHub && (
              <div className="flex items-center bg-blue-950/60 border border-blue-800/50 p-2 px-3.5 rounded-full text-blue-200 print:p-1 print:px-2.5">
                <MapPinIcon className="w-4 h-4 mr-1.5 text-blue-400 print:w-3.5 print:h-3.5" />
                Base: {centralHub}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Save as PDF (Dark & Light) & Share */}
        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto no-print">
          <Button
            onClick={() => handlePrint("dark")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-3.5 py-2 flex items-center gap-1.5 shadow-md shadow-emerald-600/30 text-xs sm:text-sm font-medium transition cursor-pointer"
            title="Download PDF as sleek dark travel guide"
          >
            <Printer className="w-4 h-4" />
            <span>Save as PDF</span>
          </Button>

          <Button
            onClick={() => handlePrint("light")}
            variant="outline"
            className="border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition cursor-pointer"
            title="Download clean white PDF for ink-friendly printing"
          >
            <span>Ink-Friendly PDF</span>
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition cursor-pointer"
          >
            <LuShare2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationSections;
