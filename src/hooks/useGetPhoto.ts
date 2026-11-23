/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPlaceDetails } from "@/service/globalApi";
import { useCallback, useEffect, useState } from "react";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const DEFAULT_FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

const usePlacePhoto = (name?: string) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    DEFAULT_FALLBACK_PHOTO
  );

  const fetchPlacePhoto = useCallback(async () => {
    if (!name || name.trim() === "") return;
    try {
      const data = {
        textQuery: name,
      };
      const resp = await getPlaceDetails(data);
      const photos = resp?.data?.places?.[0]?.photos;
      if (photos && photos.length > 0) {
        // Use the best available photo safely
        const chosenPhoto = photos[3] || photos[0];
        const url = PHOTO_REF_URL.replace("{NAME}", chosenPhoto.name);
        setPhotoUrl(url);
      }
    } catch (error) {
      // Keep default fallback on network or API limits
      console.warn("Using fallback photo for:", name);
    }
  }, [name]);

  useEffect(() => {
    fetchPlacePhoto();
  }, [fetchPlacePhoto]);

  return photoUrl || DEFAULT_FALLBACK_PHOTO;
};

export default usePlacePhoto;
