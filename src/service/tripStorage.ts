/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Trip {
  id: string;
  userSelection: {
    location?: { label: string };
    noOfDays?: number;
    budget?: string;
    traveler?: string;
    [key: string]: any;
  };
  tripData: any;
  createdAt: number;
}

const STORAGE_KEY = "ai_trips";

/**
 * Safely parse trips from localStorage.
 * Returns an empty array if data is missing, corrupted, or invalid.
 */
export const getStoredTrips = (): Trip[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn("Stored trips in localStorage is not an array, resetting.");
      return [];
    }
    return parsed;
  } catch (error) {
    console.error("Error reading trips from localStorage:", error);
    return [];
  }
};

/**
 * Retrieve a single trip by ID.
 */
export const getTripById = (id: string): Trip | null => {
  try {
    const trips = getStoredTrips();
    return trips.find((t) => String(t.id) === String(id)) || null;
  } catch (error) {
    console.error("Error retrieving trip by id:", error);
    return null;
  }
};

/**
 * Save a new trip to localStorage.
 * Generates a unique ID and persists the trip.
 */
export const saveTrip = (data: {
  userSelection: any;
  tripData: any;
}): Trip => {
  const trips = getStoredTrips();
  const newTrip: Trip = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    userSelection: data.userSelection,
    tripData: data.tripData,
    createdAt: Date.now(),
  };

  try {
    const updated = [newTrip, ...trips];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving trip to localStorage:", error);
  }

  return newTrip;
};

/**
 * Delete a trip from localStorage by its unique ID.
 */
export const deleteTrip = (id: string): boolean => {
  try {
    const trips = getStoredTrips();
    const filtered = trips.filter((t) => String(t.id) !== String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting trip from localStorage:", error);
    return false;
  }
};
