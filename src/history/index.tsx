/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import UserCardTrips from "./components/UserCardTrips";
import { getStoredTrips, deleteTrip } from "@/service/tripStorage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const History = () => {
  const [trips, setTrips] = useState<any[]>([]);

  const loadTrips = useCallback(() => {
    const stored = getStoredTrips();
    setTrips(stored);
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const handleDeleteTrip = (id: string) => {
    const success = deleteTrip(id);
    if (success) {
      setTrips((prev) => prev.filter((t) => String(t.id) !== String(id)));
      toast("Trip deleted successfully.");
    } else {
      toast("Failed to delete trip.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-[#09111f] min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-gray-400 mt-1">
            Your saved travel itineraries (stored locally in this browser)
          </p>
        </div>
        <Link to="/create-trip">
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Plan New Trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-[#0d1b2a] rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-2">No Trips Saved Yet</h2>
          <p className="text-gray-400 mb-6">
            You haven't generated any trips yet. Start planning your next adventure!
          </p>
          <Link to="/create-trip">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create a Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trips.map((item: any) => (
            <UserCardTrips
              trip={item}
              key={item.id}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
};
