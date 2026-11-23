/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { VisitCard } from "./VisitCard";
import { TransitLegConnector } from "./TransitLegConnector";
import { EnRouteFoodCard, FoodStopData } from "./EnRouteFoodCard";
import { DayRouteHeader } from "./DayRouteHeader";
import { DayInsiderTips } from "./DayInsiderTips";
import { Route, LayoutGrid, Hotel } from "lucide-react";

type Props = {
  trip: any;
};

// Helper to provide realistic contextual defaults for legacy trips
const generateEnRouteFoodFallback = (
  destination: string,
  activityName: string,
  index: number
): FoodStopData => {
  const isMorning = index === 0;
  return {
    restaurant_name: isMorning
      ? `The Estate Café & Roastery`
      : `Heritage Kitchen & Garden Restaurant`,
    location_context: `Located conveniently along the highway 5 mins before reaching ${activityName}`,
    cuisine: `Local ${destination} specialties & artisan beverages`,
    must_try_dish: isMorning
      ? `Signature Cardamom Coffee & Traditional Steamed Bread`
      : `Traditional Thali & Fresh Seasonal Fruit Cooler`,
    approx_cost: `₹200 - ₹450 for two`,
    rating: 4.5,
  };
};

export const PlacesToVisit: FC<Props> = ({ trip }) => {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const itinerary = trip?.tripData?.itinerary;
  const destination =
    trip?.userSelection?.location?.label ||
    trip?.tripData?.trip_details?.destination ||
    "Destination";
  const centralHub =
    trip?.tripData?.trip_details?.central_hub ||
    trip?.tripData?.hotels?.[0]?.name ||
    `Central ${destination} Base`;

  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#09111f] p-4 sm:p-6 rounded-2xl shadow-xl mb-8 border border-gray-800/80">
      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <span>Connected Travel Itinerary</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Sequential day-by-day route with transit distances & en-route food pitstops
          </p>
        </div>

        {/* View Switcher: Journey Route vs Compact Grid */}
        <div className="flex items-center gap-1 bg-[#0c1527] p-1 rounded-xl border border-gray-800 self-start sm:self-auto no-print">
          <button
            onClick={() => setViewMode("timeline")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === "timeline"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>Journey Timeline</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === "grid"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card Grid</span>
          </button>
        </div>
      </div>

      {/* Days Loop */}
      {itinerary.map((dayItem: any, dayIdx: number) => {
        const activities: any[] = dayItem?.activities || [];
        const routePlaceNames: string[] = activities
          .map((a: any) => a?.name)
          .filter(Boolean);

        const startingPoint =
          dayItem?.starting_point || centralHub || "Hotel Base";

        const daySummary = dayItem?.day_summary;
        const totalDistance =
          daySummary?.total_distance || `approx ${activities.length * 6 + 4} km`;
        const totalCommute =
          daySummary?.total_commute_time ||
          daySummary?.total_travel_time ||
          `approx ${activities.length * 15 + 10} mins`;
        const estimatedCost =
          daySummary?.estimated_cost ||
          daySummary?.estimated_day_cost ||
          trip?.userSelection?.budget;

        return (
          <motion.div
            key={`${dayItem.day || dayIdx + 1}-${dayIdx}`}
            className="mb-12 last:mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: dayIdx * 0.1 }}
          >
            {/* Day Route Header */}
            <DayRouteHeader
              dayNumber={dayItem.day || dayIdx + 1}
              dayTitle={dayItem.day_title}
              startingPoint={startingPoint}
              totalDistance={totalDistance}
              totalCommuteTime={totalCommute}
              estimatedCost={estimatedCost}
              stopsCount={activities.length}
              foodCount={activities.length > 0 ? 1 : 0}
              routePlaces={routePlaceNames}
            />

            {/* View Mode 1: Connected Journey Route Flow */}
            {viewMode === "timeline" ? (
              <div className="relative pl-1 sm:pl-4">
                {/* Hub Starting Node */}
                <div className="flex items-center gap-3 bg-[#0d172a] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-gray-200 mb-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-300 flex-shrink-0">
                    <Hotel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider block">
                      Departure Hub (Morning ~9:00 AM)
                    </span>
                    <span className="text-white font-bold">{startingPoint}</span>
                  </div>
                </div>

                {activities.map((activity: any, actIdx: number) => {
                  const previousPlace =
                    actIdx === 0
                      ? startingPoint
                      : activities[actIdx - 1]?.name || "Previous Stop";

                  // Extract transit details (AI or smart computed)
                  const transit = activity?.travel_from_previous;
                  const distanceStr =
                    transit?.distance || `${(actIdx + 1) * 4.2 + 2.5} km`;
                  const durationStr =
                    transit?.duration || `${12 + actIdx * 6} mins`;
                  const transitMode = transit?.transit_mode || "Drive / Cab";
                  const scenicNote =
                    transit?.scenic_note ||
                    `Scenic local route connecting to ${activity.name}`;

                  // En-route food stop (AI or smart fallback)
                  const foodStop: FoodStopData =
                    activity?.en_route_food_stop ||
                    (actIdx === 0
                      ? generateEnRouteFoodFallback(
                          destination,
                          activity.name,
                          actIdx
                        )
                      : null);

                  return (
                    <React.Fragment key={actIdx}>
                      {/* Transit Leg From Previous Stop */}
                      <TransitLegConnector
                        legNumber={actIdx + 1}
                        from={previousPlace}
                        to={activity.name}
                        distance={distanceStr}
                        duration={durationStr}
                        transitMode={transitMode}
                        scenicNote={scenicNote}
                      />

                      {/* Main Attraction Card */}
                      <div className="my-2">
                        <VisitCard
                          visitData={activity}
                          stopIndex={actIdx}
                          bestTimeToVisit={dayItem?.best_time_to_visit}
                          travelTime={durationStr}
                        />
                      </div>

                      {/* En-Route Food / Restaurant Stop */}
                      {foodStop && (
                        <EnRouteFoodCard
                          foodStop={foodStop}
                          destinationContext={destination}
                          nextAttraction={activity.name}
                        />
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Day Return to Hub Node */}
                <div className="relative pl-4 sm:pl-8 border-l-2 border-dashed border-gray-700 ml-4 sm:ml-6 py-2 my-4">
                  <div className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-800 border-2 border-gray-500 flex items-center justify-center text-gray-300">
                    <Hotel className="w-3 h-3" />
                  </div>
                  <div className="bg-[#0b1323] border border-gray-800 rounded-xl p-3 text-xs sm:text-sm text-gray-300">
                    <span className="text-gray-400 font-medium">
                      Evening Wrap-up:
                    </span>{" "}
                    Return commute back to <strong className="text-white">{startingPoint}</strong> for dinner & rest.
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode 2: Compact Card Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity: any, actIdx: number) => (
                  <VisitCard
                    key={actIdx}
                    visitData={activity}
                    stopIndex={actIdx}
                    bestTimeToVisit={dayItem?.best_time_to_visit}
                    travelTime={dayItem?.travel_time?.between_locations}
                  />
                ))}
              </div>
            )}

            {/* AI Local Insider Tips & Hacks */}
            <DayInsiderTips tips={dayItem?.insider_tips} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlacesToVisit;
