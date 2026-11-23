/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  API_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { chatSession } from "@/service/aiModal";
import AsyncSelect from "react-select/async";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { toast } from "sonner";
import { saveTrip } from "@/service/tripStorage";
import { useForm } from "@/hooks/useForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Import modern icons from Heroicons
import {
  GlobeAltIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Counter from "@/components/shared/Counter";

interface PlaceOption {
  label: string;
  value: {
    place_id: string;
    description: string;
    main_text?: string;
    secondary_text?: string;
  };
}

const CreateTrip = () => {
  const { formData, handleInputChange } = useForm({});
  const [place, setPlace] = useState<PlaceOption | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();

  const placesLibRef = useRef<google.maps.PlacesLibrary | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    if (!apiKey) {
      console.warn("VITE_GOOGLE_PLACE_API_KEY is missing in environment variables.");
      return;
    }

    if (typeof window !== "undefined" && !window.google?.maps?.importLibrary) {
      setOptions({
        key: apiKey,
        v: "weekly",
      });
    }

    importLibrary("places")
      .then((lib) => {
        placesLibRef.current = lib;
        sessionTokenRef.current = new lib.AutocompleteSessionToken();
      })
      .catch((err) => {
        console.error("Error preloading Google Maps places library:", err);
      });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const loadOptions = (inputValue: string): Promise<PlaceOption[]> => {
    return new Promise((resolve) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (!inputValue || !inputValue.trim()) {
        resolve([]);
        return;
      }

      timerRef.current = setTimeout(async () => {
        try {
          let placesLib = placesLibRef.current;
          if (!placesLib) {
            const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
            if (typeof window !== "undefined" && !window.google?.maps?.importLibrary) {
              setOptions({
                key: apiKey,
                v: "weekly",
              });
            }
            placesLib = await importLibrary("places");
            placesLibRef.current = placesLib;
          }

          if (!sessionTokenRef.current) {
            sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
          }

          const request: google.maps.places.AutocompleteRequest = {
            input: inputValue,
            sessionToken: sessionTokenRef.current,
          };

          const response =
            await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
              request
            );

          if (!response || !response.suggestions) {
            resolve([]);
            return;
          }

          const options: PlaceOption[] = response.suggestions
            .filter((s) => s.placePrediction)
            .map((s) => {
              const pred = s.placePrediction!;
              const text = pred.text ? pred.text.toString() : "";
              return {
                label: text,
                value: {
                  place_id: pred.placeId,
                  description: text,
                  main_text: pred.mainText ? pred.mainText.toString() : "",
                  secondary_text: pred.secondaryText
                    ? pred.secondaryText.toString()
                    : "",
                },
              };
            });

          resolve(options);
        } catch (error) {
          console.error("Error fetching autocomplete suggestions:", error);
          resolve([]);
        }
      }, 250);
    });
  };

  const handleGenerateTrip = async () => {
    if (
      !formData.location ||
      !formData.noOfDays ||
      formData.noOfDays > 5 ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details (maximum 5 days).");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = API_PROMPT.replace(
        "{location}",
        formData.location.label
      )
        .replace("{totalDays}", formData.noOfDays.toString())
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      saveAITrips(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAITrips = (tripData: any) => {
    try {
      let cleanedData = typeof tripData === "string" ? tripData.trim() : "";

      // Clean markdown code blocks if present
      cleanedData = cleanedData
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // Extract JSON substring between the first { and the last }
      const firstBrace = cleanedData.indexOf("{");
      const lastBrace = cleanedData.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedData = cleanedData.substring(firstBrace, lastBrace + 1);
      }

      const parsedTripData =
        typeof cleanedData === "string" ? JSON.parse(cleanedData) : cleanedData;

      const newTrip = saveTrip({
        userSelection: formData,
        tripData: parsedTripData,
      });

      toast("Trip generated and saved successfully!");
      navigation(`/view-trip/${newTrip.id}`);
    } catch (error) {
      console.error("Error parsing or saving trip data:", error);
      toast("Failed to parse trip response. Please try again.");
    }
  };

  const handleCounterChange = (increment: number) => {
    const currentValue = formData.noOfDays ?? 0;
    const newValue = currentValue + increment;
    handleInputChange("noOfDays", newValue >= 0 ? newValue : 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-r from-[#1a202c] to-[#2d3748] text-white rounded-lg shadow-lg">
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Plan Your Trip
      </motion.h2>
      <p className="text-lg text-gray-300 mb-10 text-center">
        Answer a few questions to get a personalized itinerary based on your
        preferences.
      </p>
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            What's your destination?
          </h3>
          <AsyncSelect
            value={place}
            loadOptions={loadOptions}
            onChange={(v) => {
              setPlace(v);
              handleInputChange("location", v);
              if (placesLibRef.current) {
                sessionTokenRef.current =
                  new placesLibRef.current.AutocompleteSessionToken();
              }
            }}
            placeholder="Select..."
            isClearable
            styles={{
              input: (provided) => ({
                ...provided,
                color: "blue",
              }),
              option: (provided) => ({
                ...provided,
                color: "blue",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "blue",
              }),
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            How many days are you planning?
          </h3>
          <Counter
            value={formData.noOfDays || 0}
            onIncrement={() => handleCounterChange(1)}
            onDecrement={() => handleCounterChange(-1)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">What's your budget?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SelectBudgetOptions.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 border border-gray-700 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  formData.budget === item.title
                    ? "bg-gray-900 border-blue-500 shadow-xl"
                    : "bg-gray-800"
                }`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {item.icon === "globe" && (
                  <GlobeAltIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "calendar" && (
                  <CalendarIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "dollar" && (
                  <CurrencyDollarIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "users" && (
                  <UsersIcon className="w-8 h-8 mb-3" />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Who is traveling with you?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SelectTravelsList.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-6 border border-gray-700 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  formData.traveler === item.people
                    ? "bg-gray-900 border-blue-500 shadow-xl"
                    : "bg-gray-800"
                }`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {item.icon === "globe" && (
                  <GlobeAltIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "calendar" && (
                  <CalendarIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "dollar" && (
                  <CurrencyDollarIcon className="w-8 h-8 mb-3" />
                )}
                {item.icon === "users" && (
                  <UsersIcon className="w-8 h-8 mb-3" />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          disabled={loading}
          onClick={handleGenerateTrip}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateTrip;
