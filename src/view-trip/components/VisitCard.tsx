import { FC } from "react";
import { Button } from "@/components/ui/button";
import usePlacePhoto from "@/hooks/useGetPhoto";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Ticket,
  Star,
  ExternalLink,
  Hourglass,
  Tag,
} from "lucide-react";

type Props = {
  visitData: any;
  bestTimeToVisit?: string;
  travelTime?: string;
  stopIndex?: number;
};

export const VisitCard: FC<Props> = ({
  visitData,
  bestTimeToVisit,
  travelTime,
  stopIndex,
}) => {
  const photoUrl = usePlacePhoto(visitData?.name);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    visitData?.name || ""
  )}`;

  return (
    <motion.div
      className="visit-card-item print-avoid-break bg-gradient-to-br from-[#0e172a] via-[#101b33] to-[#0a1222] border border-gray-800/80 hover:border-blue-500/50 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 hover:shadow-blue-500/10 group text-white print:p-2.5 print:rounded-xl print:border print:border-gray-800 print:mb-1.5"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start print:gap-3">
        {/* Place Thumbnail with Stop Index Badge */}
        <div className="relative w-full sm:w-44 h-48 sm:h-44 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800 shadow-inner print:w-28 print:h-24 print:min-w-[112px]">
          <img
            src={photoUrl!}
            alt={visitData?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {stopIndex !== undefined && (
            <div className="absolute top-2.5 left-2.5 bg-blue-600/90 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-md border border-blue-400/30 print:top-1 print:left-1 print:text-[10px] print:px-1.5 print:py-0.5">
              Stop #{stopIndex + 1}
            </div>
          )}
          {visitData?.rating && (
            <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md text-amber-300 font-bold text-xs px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/30 print:bottom-1 print:left-1 print:text-[10px] print:px-1.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 print:w-2.5 print:h-2.5" />
              <span>{visitData.rating}</span>
            </div>
          )}
        </div>

        {/* Place Information & Details */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            {/* Top Tag Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-2 print:gap-1 print:mb-1">
              {visitData?.category && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                  <Tag className="w-2.5 h-2.5" />
                  {visitData.category}
                </span>
              )}
              {visitData?.time_of_day && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300">
                  <Clock className="w-2.5 h-2.5" />
                  {visitData.time_of_day}
                </span>
              )}
              {visitData?.recommended_duration && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                  <Hourglass className="w-2.5 h-2.5" />
                  Stay {visitData.recommended_duration}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors print:text-sm print:leading-tight">
              {visitData?.name}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed line-clamp-3 print:text-[11px] print:line-clamp-2 print:mt-1 print:leading-tight">
              {visitData?.details}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-800/80 text-xs text-gray-400 print:mt-1.5 print:pt-1.5 print:text-[10px] print:gap-1">
            {visitData?.opening_hours && (
              <div className="flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="truncate">{visitData.opening_hours}</span>
              </div>
            )}
            {visitData?.ticket_pricing && (
              <div className="flex items-center gap-1.5 truncate">
                <Ticket className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate text-emerald-300 font-medium">
                  {visitData.ticket_pricing}
                </span>
              </div>
            )}
            {(travelTime || bestTimeToVisit) && (
              <div className="col-span-2 flex items-center gap-1.5 text-gray-400 truncate mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">
                  {travelTime ? `Transit: ${travelTime}` : ""}
                  {travelTime && bestTimeToVisit ? " • " : ""}
                  {bestTimeToVisit ? `Best time: ${bestTimeToVisit}` : ""}
                </span>
              </div>
            )}
          </div>

          {/* Action Link Button */}
          <div className="mt-4 no-print">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 rounded-xl transition shadow-sm h-9"
              >
                <span>Navigate to {visitData?.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitCard;
