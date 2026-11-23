import React from "react";
import { Utensils, Coffee, MapPin, Star, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FoodStopData {
  restaurant_name: string;
  location_context?: string;
  cuisine?: string;
  must_try_dish?: string;
  approx_cost?: string;
  rating?: number | string;
}

interface EnRouteFoodCardProps {
  foodStop?: FoodStopData;
  destinationContext?: string;
  nextAttraction?: string;
}

export const EnRouteFoodCard: React.FC<EnRouteFoodCardProps> = ({
  foodStop,
  destinationContext,
  nextAttraction,
}) => {
  if (!foodStop || !foodStop.restaurant_name) {
    return null;
  }

  const mapQuery = encodeURIComponent(
    `${foodStop.restaurant_name} ${destinationContext || ""}`.trim()
  );

  const isCafe =
    foodStop.restaurant_name.toLowerCase().includes("cafe") ||
    foodStop.restaurant_name.toLowerCase().includes("coffee") ||
    foodStop.restaurant_name.toLowerCase().includes("tea");

  return (
    <div className="relative my-4 ml-4 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-dashed border-amber-500/50">
      {/* Food Icon Pin */}
      <div className="absolute -left-[13px] top-6 w-6 h-6 rounded-full bg-amber-950 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
        {isCafe ? (
          <Coffee className="w-3 h-3 text-amber-300" />
        ) : (
          <Utensils className="w-3 h-3 text-amber-300" />
        )}
      </div>

      <div className="bg-gradient-to-br from-[#1c1408]/95 via-[#131b2e]/95 to-[#0b1220]/95 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 rounded-2xl p-4 sm:p-5 shadow-xl text-white">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>En-Route Food Pitstop</span>
            {nextAttraction && (
              <span className="text-gray-300 font-normal">
                • Before {nextAttraction}
              </span>
            )}
          </div>

          {foodStop.rating && (
            <div className="inline-flex items-center gap-1 bg-amber-950/70 border border-amber-700/40 text-amber-300 px-2 py-0.5 rounded-md text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{foodStop.rating}</span>
            </div>
          )}
        </div>

        {/* Restaurant Name & Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              {foodStop.restaurant_name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                {foodStop.location_context ||
                  "Conveniently situated along your driving route"}
              </span>
            </p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 no-print"
          >
            <Button
              size="sm"
              variant="outline"
              className="border-amber-500/40 text-amber-200 hover:bg-amber-500/20 hover:text-white text-xs flex items-center gap-1.5 h-8"
            >
              <span>Directions</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-500/20 text-xs">
          {foodStop.must_try_dish && (
            <div className="bg-amber-950/40 rounded-lg p-2 border border-amber-900/30">
              <span className="text-amber-400 font-semibold block mb-0.5">
                🍲 Must-Try Signature:
              </span>
              <span className="text-gray-200">{foodStop.must_try_dish}</span>
            </div>
          )}

          {foodStop.cuisine && (
            <div className="bg-gray-900/40 rounded-lg p-2 border border-gray-800/40">
              <span className="text-gray-400 font-semibold block mb-0.5">
                🏷️ Cuisine Style:
              </span>
              <span className="text-gray-200">{foodStop.cuisine}</span>
            </div>
          )}

          {foodStop.approx_cost && (
            <div className="bg-gray-900/40 rounded-lg p-2 border border-gray-800/40">
              <span className="text-emerald-400 font-semibold block mb-0.5">
                💵 Budget:
              </span>
              <span className="text-gray-200">{foodStop.approx_cost}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnRouteFoodCard;
