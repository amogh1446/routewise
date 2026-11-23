export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventurers",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const API_PROMPT = `Generate a unique, highly practical sequential travel itinerary for {location} for {totalDays} days for {traveler} on a {budget} budget.
Crucial requirement: Plan the route step-by-step from the central base/hotel to the first place, then from that place to the next place with exact distances, transit times, and recommend authentic local food spots/cafés directly en-route between attractions.
Respond ONLY with a valid JSON object without any Markdown formatting or code fences.

JSON Structure:
{
  "trip_details": {
    "destination": "{location}",
    "duration": "{totalDays} Days",
    "budget": "{budget}",
    "travelers": "{traveler}",
    "central_hub": "Name of recommended central base or hotel area"
  },
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Full Street Address",
      "price": "$$ price range per night",
      "image_url": "https://example.com/hotel.jpg",
      "geo_coordinates": { "latitude": 12.42, "longitude": 75.73 },
      "rating": 4.5,
      "description": "Short description of amenities and vibe"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "day_title": "Theme for the day (e.g., Waterfalls, Coffee Plantations & Sunset)",
      "starting_point": "Hotel / Central Hub",
      "day_summary": {
        "total_distance": "approx 24 km",
        "total_commute_time": "approx 55 mins driving",
        "estimated_cost": "approx $25 / ₹1,200 per person"
      },
      "insider_tips": {
        "secret_hack": "Specific local tip to beat crowds or enjoy a unique experience",
        "best_photo_spot": "Exact scenic vantage point and ideal time",
        "packing_or_weather": "Practical clothing or gear advice for today's weather/terrain"
      },
      "activities": [
        {
          "name": "Attraction Name",
          "details": "What makes this place special and what to see",
          "category": "Nature / Heritage / Viewpoint / Culture / Adventure",
          "time_of_day": "Morning (9:30 AM - 11:30 AM)",
          "ticket_pricing": "Ticket price or Free",
          "opening_hours": "9:00 AM - 5:00 PM",
          "recommended_duration": "1.5 hours",
          "rating": 4.6,
          "travel_from_previous": {
            "from": "Hotel / Central Hub (or previous place name)",
            "distance": "5.8 km",
            "duration": "14 mins",
            "transit_mode": "Drive / Cab / Walk",
            "scenic_note": "Scenic winding road with plantation views"
          },
          "en_route_food_stop": {
            "restaurant_name": "Famous local café or eatery on the way",
            "location_context": "Conveniently located along the route 5 mins before destination",
            "cuisine": "Regional local cuisine / café",
            "must_try_dish": "Signature dish or beverage to try",
            "approx_cost": "Affordable / ₹200-400 for two",
            "rating": 4.5
          }
        }
      ]
    }
  ]
}`;
