import React from "react";
import { Car, Navigation, Footprints, Compass } from "lucide-react";

interface TransitLegProps {
  from?: string;
  to?: string;
  distance?: string;
  duration?: string;
  transitMode?: string;
  scenicNote?: string;
  legNumber?: number;
}

export const TransitLegConnector: React.FC<TransitLegProps> = ({
  from = "Central Hotel Hub",
  to = "Next Attraction",
  distance = "approx 4.5 km",
  duration = "12-15 mins",
  transitMode = "Drive / Cab",
  scenicNote,
  legNumber,
}) => {
  const isWalking = transitMode.toLowerCase().includes("walk");

  return (
    <div className="transit-leg-item print-avoid-break relative my-4 pl-4 sm:pl-8 border-l-2 border-dashed border-blue-500/40 ml-4 sm:ml-6 py-2 print:my-1.5 print:py-1">
      {/* Transit Pulse Pin */}
      <div className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30 print:w-5 print:h-5 print:-left-[11px]">
        {isWalking ? (
          <Footprints className="w-3 h-3 text-blue-300 print:w-2.5 print:h-2.5" />
        ) : (
          <Car className="w-3 h-3 text-blue-300 print:w-2.5 print:h-2.5" />
        )}
      </div>

      <div className="transit-leg-box bg-[#0c1527]/90 border border-blue-900/40 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-300 shadow-md backdrop-blur-sm hover:border-blue-700/60 transition print:p-2 print:text-xs print:rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 font-medium text-white">
            <span className="text-blue-400 font-semibold">
              {legNumber ? `Transit Leg #${legNumber}:` : "Commute Leg:"}
            </span>
            <span className="text-gray-200 line-clamp-1">{from}</span>
            <span className="text-blue-400">➔</span>
            <span className="text-blue-200 font-semibold line-clamp-1">{to}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-blue-950/70 border border-blue-800/50 text-blue-300 px-2 py-0.5 rounded-full text-xs font-semibold">
              <Navigation className="w-3 h-3 text-blue-400" />
              {distance}
            </span>
            <span className="inline-flex items-center gap-1 bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 px-2 py-0.5 rounded-full text-xs font-semibold">
              <Compass className="w-3 h-3 text-indigo-400" />
              {duration}
            </span>
          </div>
        </div>

        {scenicNote && (
          <p className="text-xs text-gray-400 italic flex items-center gap-1.5 mt-1">
            <span className="text-emerald-400 not-italic">🌿 Scenic Route:</span>
            {scenicNote}
          </p>
        )}
      </div>
    </div>
  );
};

export default TransitLegConnector;
