/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { getTripById } from "@/service/tripStorage";
import InformationSections from "../components/InformationSections";
import { Hotels } from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { Button } from "@/components/ui/button";

const ViewTrips = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<any>();
  const [notFound, setNotFound] = useState(false);

  const getTripData = useCallback(() => {
    if (!tripId) return;
    const foundTrip = getTripById(tripId);
    if (foundTrip) {
      setTrip(foundTrip);
      setNotFound(false);
    } else {
      setNotFound(true);
      toast("No trip found");
    }
  }, [tripId]);

  useEffect(() => {
    getTripData();
  }, [getTripData]);

  if (notFound) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 bg-[#09111f] min-h-screen text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Trip Not Found</h2>
        <p className="text-gray-400 mb-6">
          The requested trip could not be found in your saved trips.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/history">
            <Button variant="outline" className="text-white border-gray-600">
              View All Trips
            </Button>
          </Link>
          <Link to="/create-trip">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Plan New Trip
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-trip-wrapper max-w-5xl mx-auto px-4 py-10 bg-[#09111f] min-h-screen text-white print:max-w-full print:p-0 print:m-0 print:min-h-0 print:bg-transparent">
      <InformationSections trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
    </div>
  );
};

export default ViewTrips;
