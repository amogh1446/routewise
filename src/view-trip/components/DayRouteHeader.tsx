import React from "react";
import { Map, Navigation, Clock, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayRouteHeaderProps {
  dayNumber: number;
  dayTitle?: string;
  startingPoint?: string;
  totalDistance?: string;
  totalCommuteTime?: string;
  estimatedCost?: string;
  stopsCount: number;
  foodCount: number;
  routePlaces: string[];
}

export const DayRouteHeader: React.FC<DayRouteHeaderProps> = ({
  dayNumber,
  dayTitle,
  startingPoint = "Hotel / Central Base",
  totalDistance = "~18-25 km",
  totalCommuteTime = "~45-60 mins",
  estimatedCost,
  stopsCount,
  foodCount,
  routePlaces = [],
}) => {
  // Construct a multi-stop Google Maps Directions URL
  const buildGoogleMapsRouteUrl = () => {
    if (routePlaces.length === 0) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        startingPoint
      )}`;
    }

    const origin = encodeURIComponent(startingPoint);
    const destination = encodeURIComponent(
      routePlaces[routePlaces.length - 1] || startingPoint
    );

    // Intermediate waypoints
    const intermediate = routePlaces.slice(0, -1);
    const waypointsParam =
      intermediate.length > 0
        ? `&waypoints=${intermediate.map((p) => encodeURIComponent(p)).join("|")}`
        : "";

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=driving`;
  };

  return (
    <div className="day-header-card print-avoid-break bg-gradient-to-r from-[#0d182b] via-[#101e38] to-[#0c1626] border border-blue-800/40 rounded-2xl p-5 mb-5 shadow-lg print:p-3 print:mb-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:gap-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5 print:mb-0.5">
            <span className="px-3 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider print:text-[10px] print:px-2">
              Day {dayNumber} Journey
            </span>
            {startingPoint && (
              <span className="text-xs text-gray-400 print:text-[10px]">
                Hub: <span className="text-gray-200">{startingPoint}</span>
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white print:text-base print:leading-tight">
            {dayTitle || `Day ${dayNumber}: Highlights & Hidden Gems`}
          </h3>
        </div>

        {/* Action Button: Google Maps Full Route */}
        <a
          href={buildGoogleMapsRouteUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 no-print"
        >
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-600/30 flex items-center gap-2 rounded-xl h-10 px-4 transition"
          >
            <Map className="w-4 h-4 text-blue-200" />
            <span>Open Day Route in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>
      </div>

      {/* Route Quick Stats Bar */}
      <div className="day-header-stats grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-gray-800/80 text-xs print:grid-cols-4 print:gap-1.5 print:mt-2 print:pt-2 print:text-[10px]">
        <div className="flex items-center gap-2 bg-[#09111f]/60 p-2.5 rounded-xl border border-gray-800/60">
          <Navigation className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <div>
            <span className="text-gray-400 block text-[11px]">Route Stops</span>
            <span className="text-white font-semibold">
              {stopsCount} spots {foodCount > 0 ? `+ ${foodCount} food` : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#09111f]/60 p-2.5 rounded-xl border border-gray-800/60">
          <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <div>
            <span className="text-gray-400 block text-[11px]">Drive Commute</span>
            <span className="text-white font-semibold">
              {totalDistance} ({totalCommuteTime})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#09111f]/60 p-2.5 rounded-xl border border-gray-800/60">
          <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="text-gray-400 block text-[11px]">Est. Day Budget</span>
            <span className="text-white font-semibold">
              {estimatedCost || "Moderate"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#09111f]/60 p-2.5 rounded-xl border border-gray-800/60">
          <Map className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <span className="text-gray-400 block text-[11px]">Starting Point</span>
            <span className="text-white font-semibold truncate max-w-[110px] block">
              {startingPoint}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayRouteHeader;
