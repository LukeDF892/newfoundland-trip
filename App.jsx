import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "days", label: "📅 Itinerary" },
  { id: "food", label: "🍽️ Food & Drink" },
  { id: "trail", label: "🎒 Trail Essentials" },
  { id: "map", label: "🗺️ Map & Route" },
  { id: "packing", label: "🧳 Packing Lists" },
];

const days = [
  {
    date: "August 28", day: "Friday", label: "Travel Day + St. John's Arrival",
    location: "Thunder Bay → Toronto → St. John's", emoji: "✈️", color: "#2D6A4F",
    timing: { alert: "⏰ 3:30AM WAKEUP IN THUNDER BAY — AC 1188 departs YQT at 5:10am. Be at Thunder Bay Airport by 3:30–4:00am." },
    accommodation: { name: "JAG Hotel — St. John's Downtown", booked: false, note: "Boutique hotel, walkable to everything · jaghotel.ca · Delta Hotel is a solid backup" },
    sections: [
      { time: "3:30am", icon: "⏰", title: "Wake Up — Thunder Bay", timing: true, details: "Very early start. Pack the night before. Head to Thunder Bay Airport (YQT) — bags need to be dropped by 4:25am." },
      { time: "5:10am", icon: "✈️", title: "AC 1188 — Thunder Bay → Toronto Pearson", details: "Boeing 737 MAX 8. 1hr 47min. Seats 13A & 13B. Arrive Toronto Terminal 1 at 6:57am ET." },
      { time: "8:00am", icon: "✈️", title: "AC 2052 — Toronto → St. John's (Air Canada Rouge)", details: "Airbus A320-200 with Wi-Fi. 3hr 06min. Seats 16E & 16F. Air Canada Bistro available ($). Arrive St. John's at 12:36pm NST." },
      { time: "~1:30pm", icon: "🚗", title: "Pick Up Rental Car & Head Downtown", timing: true, details: "Pick up the Avis car at St. John's International Airport. Check into the JAG Hotel, drop bags, and freshen up." },
      { time: "Afternoon", icon: "🏙️", title: "Explore St. John's — Jellybean Row & Water Street", details: "Walk Gower St and Victoria St for the iconic colourful row houses. Browse Water Street shops and boutiques. The Rooms Museum is nearby if you want a culture stop (closes 5pm)." },
      { time: "Evening", icon: "🍽️", title: "Dinner — First Night in Newfoundland", details: "A proper sit-down dinner to celebrate the start of the trip. The Merchant or Adelaide Oyster House on Water St are both excellent. Or the Duke of Duckworth for a more casual NL experience — get the dressing. See Food & Drink tab." },
      { time: "Night", icon: "🎵", title: "Warmup on George Street (Optional)", details: "George Street is steps from the JAG. A drink or two at Green Sleeves or any pub on the strip is a great way to ease into NL. Don't overdo it — tomorrow starts at 9:30am and Saturday night is the real George Street night." },
    ],
  },
  {
    date: "August 29", day: "Saturday", label: "Avalon Day + Screech-In",
    location: "St. John's Area", emoji: "🥾", color: "#1B4332",
    timing: null,
    accommodation: { name: "Bay Bulls Oceanfront Apartment", booked: false, note: "~25 min south of St. John's · Your base for 2 nights" },
    sections: [
      { time: "Morning", icon: "☕", title: "Check Out of JAG & Drive to Bay Bulls", details: "No early alarm today. Check out of the JAG, drop bags at the Bay Bulls apartment, and head back into the city for the day." },
      { time: "9:30am", icon: "⚡", title: "Signal Hill — North Head Trail", details: "North Head Trail from the base — steep stairs down to the harbour narrows with jaw-dropping Atlantic views. ~2 hours. Rated 4.8/5 by 6,000+ visitors. Cabot Tower at the summit, site of Marconi's first transatlantic wireless transmission." },
      { time: "12:00pm", icon: "🏛️", title: "The Rooms Museum (Optional, 45 min)", details: "Right near Signal Hill. NL's premier cultural space — art, history, and archaeology galleries plus stunning harbour views." },
      { time: "1:00pm", icon: "🐟", title: "Quidi Vidi Village", details: "Wander the harbour 'gut'. Quidi Vidi Brewery for a midday beer. Check out the Quidi Vidi Village Plantation — local artists work in historic fishing sheds." },
      { time: "2:30pm", icon: "🍽️", title: "Lunch — Mallard Cottage ⭐", details: "Book reservations ahead — fills up fast. Best known for brunch/lunch, locally sourced NL cuisine. Your cousin's top pick." },
      { time: "4:00pm", icon: "🌊", title: "Cobbler's Path — East Coast Trail (Logy Bay)", details: "Rugged cliffside trail rated 4.9/5. Easy-moderate, ~1.5–2 hrs return. Cinematic Atlantic views. Whales spotted from these cliffs. Park at the dead end on Doran's Lane." },
      { time: "Evening", icon: "🎵", title: "Green Sleeves Pub — Live Music, George Street", details: "Start your Saturday night at Green Sleeves — live music and great NL pub atmosphere. Saturday night on George Street at its finest." },
      { time: "Later", icon: "🥃", title: "Screech-In — Christian's Pub, George Street ⭐", details: "Steps from Green Sleeves. Kiss the cod, down a shot of Screech rum, recite the oath, become Honorary Newfoundlanders. Enjoy the night — but remember Sunday starts at 5:45am." },
    ],
  },
  {
    date: "August 30", day: "Sunday", label: "Sunrise + Puffins + Road North",
    location: "Bay Bulls → Cape Spear → Elliston → Twillingate", emoji: "🌅", color: "#40916C",
    timing: { alert: "⏰ EARLY START — Alarm at 5:45am. Sunrise at the easternmost point of North America, then the best puffin viewing on the continent. Note: this is the morning after Saturday night on George Street — keep it reasonable." },
    accommodation: { name: "Twillingate Airbnb", booked: true, note: "Already booked ✓" },
    sections: [
      { time: "5:45am", icon: "⏰", title: "Drive to Cape Spear", timing: true, details: "Only 20 minutes from Bay Bulls. Cape Spear is the easternmost point of North America — you'll be among the first people on the continent to see the sun rise. Bring a blanket and something warm." },
      { time: "6:20am", icon: "🌅", title: "Sunrise at the Edge of North America", details: "Watch the sun come up over the Atlantic. Lighthouse behind you, open ocean in front. 🥂 Perfect moment for a small sparkling wine." },
      { time: "7:30am", icon: "🚗", title: "Head North — Toward Elliston (~3 hrs)", details: "Drive back through Bay Bulls, pick up the highway north through St. John's toward the Bonavista Peninsula. Pack a road breakfast." },
      { time: "10:30am", icon: "🐦", title: "Elliston Puffin Viewing Site", timing: true, details: "The best land-based puffin viewing in North America. Free entry. Puffins walk within a meter of you. Morning is peak activity — perfectly timed after the sunrise. Spend 1.5–2 hrs. Watch for whales offshore and explore the historic root cellars." },
      { time: "1:00pm", icon: "🛒", title: "Drive via Gander — Stock Up", details: "Stop in Gander for lunch. Grab wine, cheese, and charcuterie for the OME night on Aug 31 — better selection than in Twillingate. See Food & Drink tab." },
      { time: "4:00pm", icon: "🧊", title: "Arrive Twillingate", details: "Drop bags. If you have energy, walk Long Point Trail to the lighthouse before dinner — stunning coastline over Notre Dame Bay." },
      { time: "Evening", icon: "🦞", title: "Dinner in Twillingate", details: "See Food & Drink tab for picks. Ask your accommodation for their current favourite." },
    ],
  },
  {
    date: "August 31", day: "Monday", label: "Ochre Hill → OME Wine & Cheese",
    location: "Twillingate → Springdale → Burlington", emoji: "🏕️", color: "#52796F",
    timing: { alert: "OME check-in is 2:00pm. Use the morning for Ochre Hill in Springdale — right on your route with panoramic views over the Bay of Islands." },
    accommodation: { name: "'Ome Sweet 'Ome Glamping", booked: true, note: "Already booked ✓ · Check-in 2pm" },
    sections: [
      { time: "Morning", icon: "☕", title: "Pack Up & Depart Twillingate", details: "Aim to be on the road by 9–9:30am. Confirm you have your wine and cheese supplies from yesterday's Gander stop." },
      { time: "11:00am", icon: "⛰️", title: "Ochre Hill, Springdale", details: "Hidden gem most tourists drive past. Short climb (1–1.5 hrs return) with panoramic views over the Bay of Islands and Long Range Mountains. Right on your route, no detour needed." },
      { time: "2:00pm", icon: "🏕️", title: "Check in — 'Ome Sweet 'Ome", details: "Beautifully decorated glamping tents with proper beds and real linens. Private and quiet. Mention any special occasion to staff on arrival — they have a history of lovely surprises." },
      { time: "Afternoon", icon: "🌿", title: "Decompress", details: "No agenda. Short walk along the Burlington shore if the mood strikes. Read, nap, sit outside. Let the trip breathe." },
      { time: "Evening", icon: "🧀", title: "Wine & Cheese Night ✨", details: "Set up your spread from Gander outside or inside the tent. A good bottle of red, local NL cheeses, charcuterie, crackers. No itinerary, no hiking boots. Just the two of you and rural Newfoundland at night." },
    ],
  },
  {
    date: "September 1", day: "Tuesday", label: "West Coast Arrival",
    location: "Burlington → York Harbour", emoji: "🌊", color: "#354F52",
    timing: null,
    accommodation: { name: "Salt Spray Landing, York Harbour", booked: true, note: "Already booked ✓ · Private Barrel Sauna included" },
    sections: [
      { time: "Morning", icon: "☕", title: "Slow Start at OME", details: "Enjoy the morning at the property before checkout. Last genuinely unhurried morning before the Gros Morne push." },
      { time: "Late Morning", icon: "🚗", title: "Drive to York Harbour (~3.5 hrs)", details: "West on TCH-1 then south to the Bay of Islands. The drive becomes dramatically beautiful approaching the Long Range Mountains." },
      { time: "Afternoon", icon: "🏔️", title: "Arrive & Explore York Harbour", details: "Drop bags at Salt Spray Landing. Short coastal walk — mountain-meets-ocean scenery as a preview of tomorrow's hikes." },
      { time: "Evening", icon: "🍽️", title: "Dinner in Corner Brook (~20 min)", details: "Corner Brook has great restaurant options. See Food & Drink tab for picks." },
      { time: "Night", icon: "🔥", title: "Barrel Sauna", details: "End the evening in your private barrel sauna. Perfect body prep for two big hiking days ahead." },
    ],
  },
  {
    date: "September 2", day: "Wednesday", label: "Gros Morne Full Day",
    location: "Gros Morne National Park", emoji: "⛰️", color: "#1B4332",
    timing: { alert: "⏰ TIMING CRITICAL — 7:30am Tablelands start makes both hikes possible. Pack food, lots of water, and layers — Green Gardens drops to exposed coastline. See Trail Essentials for full packing list." },
    accommodation: { name: "Salt Spray Landing, York Harbour", booked: true, note: "Night 2 · Barrel Sauna" },
    sections: [
      { time: "7:30am", icon: "🪨", title: "The Tablelands", timing: true, details: "Exposed mantle rock from 480 million years ago. Rust-orange and completely alien. At 7:30am you'll almost have it to yourselves. Flat trail, 4km return, ~1.5–2 hours. 🥂 Bring a small sparkling split for a toast on the otherworldly landscape." },
      { time: "9:30am", icon: "🚗", title: "Drive to Green Gardens Trailhead (~20 min)", details: "North through Woody Point into the park toward the Trout River trailhead." },
      { time: "10:00am", icon: "🌿", title: "Green Gardens Trail", timing: true, details: "~9km return with real elevation — lush wildflower meadows descending to volcanic sea stacks at the ocean. Allow 3–3.5 hours. 🧺 Best picnic spot of the trip — sit at the sea stacks with packed lunch and wine." },
      { time: "1:30pm", icon: "🍽️", title: "Late Lunch — The Old Loft, Woody Point", details: "Right on the water with great local seafood and views over Bonne Bay. A perfect post-hike reward." },
      { time: "3:30pm", icon: "🚗", title: "Return to Salt Spray Landing", details: "Back to York Harbour to shower and decompress. Two of the best hikes in Atlantic Canada done in one day." },
      { time: "Evening", icon: "🔥", title: "Barrel Sauna — Last Chance ✨", details: "Your final sauna night — enjoy it fully. Early dinner, sauna, early bed." },
    ],
  },
  {
    date: "September 3", day: "Thursday", label: "Western Brook Pond + Ferry",
    location: "Gros Morne → Corner Brook → Port aux Basques", emoji: "⛴️", color: "#2C3E50",
    timing: { alert: "⏰ TIMING — Must be at the Western Brook Pond parking lot by 11:30am (1 hour before 12:30pm tour). Leave York Harbour by 10:00am. Parking: Western Brook Pond Trail, NL A0K 3V0 — 26km north of Rocky Harbour." },
    accommodation: { name: "Marine Atlantic Ferry — Reserved Seats", booked: true, note: "Booking #5033496 · Port aux Basques → North Sydney · Departs 23:45 · Arrives ~07:00" },
    sections: [
      { time: "10:00am", icon: "🚗", title: "Depart York Harbour", timing: true, details: "Leave by 10:00am. About 1.5 hours to the parking lot — need to arrive by 11:30am per BonTours instructions." },
      { time: "11:30am", icon: "🅿️", title: "Arrive Western Brook Pond Parking Lot", timing: true, details: "26km north of Rocky Harbour. Collect tickets and boarding passes at Dock Side Café at the end of the trail. Golf cart available ($10 CASH, no reservations)." },
      { time: "11:30am", icon: "🥾", title: "Hike to the Dock (45–60 min)", details: "Flat 3km boardwalk through boreal forest and open fen. A gentle stroll. Arrive at the dock just before 12:30pm." },
      { time: "12:30pm", icon: "🛥️", title: "Western Brook Pond Boat Tour ✓ BOOKED (2 hrs)", timing: true, details: "Sail into a landlocked fjord between 600m walls of billion-year-old Precambrian rock. Waterfalls pour from the clifftops. Dress in layers — cold on the water. 🥂 Bring something celebratory." },
      { time: "2:30pm", icon: "🥾", title: "Hike Back Out (~45 min)", details: "Back at the parking lot by ~3:15pm. All hiking is now done." },
      { time: "4:00pm", icon: "🖋️", title: "Tattoos — Corner Brook ⭐ (Optional)", details: "Drive ~40 min south to Corner Brook. Book ahead (search 'tattoo Corner Brook NL'). Allow 1.5–2 hours. All hiking done, no sauna tonight, just a drive to Port aux Basques then the ferry." },
      { time: "~6:30pm", icon: "🚗", title: "Drive to Port aux Basques (~2.5 hrs)", details: "Head south on Route 1. Grab dinner in Port aux Basques. Fuel the car before boarding." },
      { time: "9:00pm", icon: "⛴️", title: "Ferry Check-in Opens", timing: true, details: "Marine Atlantic recommends arriving 2 hours before departure. Get your boarding pass, load the car. You have reserved seats — beeline for the reclining chairs when you board, and bring an eye mask and blanket. Bar and restaurant on board." },
      { time: "11:45pm", icon: "🌙", title: "Depart Port aux Basques", details: "Overnight crossing to North Sydney, NS (~6.5 hours). Reserved seats — bring your blanket and eye mask as TVs stay on overnight. Wake up in Nova Scotia." },
    ],
  },
  {
    date: "September 4", day: "Friday", label: "Ferry Arrives + Drive to NB",
    location: "North Sydney → Saint John, NB", emoji: "🚗", color: "#4A4E69",
    timing: { alert: "⚠️ CAR DROP-OFF LOGISTICS — The Avis rental is booked to drop at Saint John Water Street by 5pm. But the Sep 5 wedding is in Oromocto (near Fredericton), ~1 hour away. Consider changing the drop-off to Fredericton, extending the rental to Sep 6, or arranging a ride with family." },
    accommodation: { name: "Accommodation near Oromocto / Fredericton", booked: false, note: "To book — needed for Sep 5 wedding night" },
    sections: [
      { time: "~7:00am", icon: "🌅", title: "Dock in North Sydney, NS", details: "Off the ferry. Grab breakfast in North Sydney or Sydney before hitting the highway. Fresh tattoos if you got them: unwrap, clean gently, let them breathe." },
      { time: "Morning", icon: "🚗", title: "Drive to Saint John, NB (~5.5 hrs)", details: "Trans-Canada through Cape Breton and mainland Nova Scotia. Coffee stop in Amherst or Moncton." },
      { time: "~1:00pm", icon: "🏁", title: "Return Avis Car — Water Street, Saint John", timing: true, details: "Drop-off at Saint John — Water Street (Ref: 14902711CA5). See the timing alert above about getting to Oromocto/Fredericton from here." },
      { time: "Afternoon", icon: "🚗", title: "Travel to Oromocto / Fredericton Area (~1 hr)", details: "Oromocto is about 100km from Saint John — an easy one-hour drive. Get settled before tomorrow's wedding." },
      { time: "Evening", icon: "🛏️", title: "Settle in Near Fredericton", details: "Rest up after the long ferry and drive day. The wedding tomorrow doesn't start until 5pm so there's no rush in the morning." },
    ],
  },
  {
    date: "September 5", day: "Saturday", label: "Julia & Andrew's Wedding 🎊",
    location: "Oromocto, New Brunswick", emoji: "🎊", color: "#7B5EA7",
    timing: null,
    accommodation: { name: "Accommodation near Oromocto / Fredericton", booked: false, note: "Night 2 near Fredericton — close to YFC airport for morning flight" },
    sections: [
      { time: "Morning", icon: "☕", title: "Slow Morning in Fredericton Area", details: "The wedding doesn't start until 5pm — enjoy a relaxed morning. Fredericton is a lovely small city with a great waterfront trail along the Saint John River if you want a walk." },
      { time: "Afternoon", icon: "👔", title: "Get Ready — Cocktail Attire", details: "Dress code is cocktail attire. The Douglas Hazen Centre is in Oromocto, about 15 minutes from Fredericton. Guest parking is available on site." },
      { time: "5:00pm", icon: "💍", title: "Wedding Ceremony", details: "Julia Howland & Andrew Atkinson. Douglas Hazen Centre, 994 Onondaga Street, Oromocto NB. Outdoor ceremony in the covered gazebo in front of the centre. Cocktail attire." },
      { time: "6:30pm", icon: "🍽️", title: "Dinner", details: "Seated dinner following the ceremony." },
      { time: "Evening", icon: "💃", title: "Dancing", details: "Dance to follow dinner. A wonderful end to a very full trip." },
    ],
  },
  {
    date: "September 6", day: "Sunday", label: "Return Flights Home",
    location: "Fredericton → Toronto (→ Thunder Bay)", emoji: "✈️", color: "#2D6A4F",
    timing: { alert: "⏰ Check-in closes 60 min before departure. Be at Fredericton Airport (YFC) by 10:15am for the 12:15pm flight. Oromocto to YFC is only 15 minutes." },
    accommodation: null,
    sections: [
      { time: "Morning", icon: "☕", title: "Pack Up & Head to Fredericton Airport (YFC)", details: "Short 15-minute drive from Oromocto to the airport. Aim to arrive by 10:15am. Last chance for breakfast in Fredericton before heading to the gate." },
      { time: "12:15pm", icon: "✈️", title: "AC 2003 — Fredericton → Toronto Pearson", details: "Air Canada Rouge, Airbus A321-200 with Wi-Fi. 1hr 58min. Seats 28E & 28F (together). Arrive Toronto at 1:13pm ET. Booking refs: CNNWIN (Luke) · CNM5DB (Alexa)." },
      { time: "1:13pm", icon: "🔀", title: "Toronto Pearson — Connection for Alexa", details: "Luke's journey ends in Toronto. Alexa continues on AC 1965 (departing 15:35, Airbus A319-100) to Thunder Bay, arriving 17:24. You'll say goodbye at Pearson." },
      { time: "1:13pm", icon: "🏁", title: "Luke Arrives Home — Toronto", details: "Trip complete. From the edge of North America at dawn, to puffins, to billion-year-old fjords, to a wedding in New Brunswick. What a ten days." },
    ],
  },
];

const foodData = [
  {
    location: "St. John's & Bay Bulls", color: "#1B4332", emoji: "🏙️",
    note: "⚠️ Always mention nut allergies when seated. NL cuisine is largely seafood and game-based (naturally nut-free) but always confirm. ★ = local recommendations.",
    restaurants: [
      { name: "Mallard Cottage ★", type: "NL Cuisine · Brunch/Lunch", vibe: "Rustic, local, Quidi Vidi", must: "Best known for brunch — book reservations ASAP, they fill fast. Locally sourced everything, one of the best meals in the province.", nutNote: "Farm-to-table, accommodating with allergies. Ask your server." },
      { name: "Adelaide Oyster House ★", type: "Seafood · Dinner", vibe: "Lively, downtown — 334 Water St", must: "Oysters, local fish, NL charcuterie boards. Lively environment.", nutNote: "Seafood-forward, naturally nut-free. Confirm condiments." },
      { name: "The Merchant ★", type: "Modern NL · Dinner", vibe: "Upscale casual — 291 Water St", must: "Contemporary NL cuisine with a rotating local menu.", nutNote: "Flag allergy on reservation and arrival." },
      { name: "Duke of Duckworth ★", type: "Fish & Chips · Casual", vibe: "Classic NL pub — 325 Duckworth St", must: "Best fish and chips in St. John's. ORDER THE DRESSING — Newfoundland stuffing, completely unique to NL.", nutNote: "Classic fish and chips — nut-free. Confirm the dressing." },
      { name: "Raymond's", type: "Fine Dining · Dinner", vibe: "Upscale, special occasion", must: "Consistently ranked one of Canada's best restaurants. The splurge dinner option.", nutNote: "High-end kitchen — very allergy-aware. Call ahead." },
      { name: "The Little Sparo", type: "Italian · Dinner", vibe: "Intimate, romantic", must: "House-made pastas, great wine list.", nutNote: "Pasta dishes generally safe — confirm sauces." },
      { name: "Also Worth Trying ★", type: "Various", vibe: "All near downtown / Water St", must: "The Gypsy Tea Room, Oliver's Restaurant, Blue On Water, St. John's Fish Exchange Kitchen & Wet Bar, Saltwater, Yellowbelly (brewery + kitchen).", nutNote: "Varies — always mention any allergies." },
    ],
  },
  {
    location: "Twillingate", color: "#40916C", emoji: "🧊",
    note: "Small town — options are limited but quality is high for fresh seafood.",
    restaurants: [
      { name: "Prime Berth Twillingate", type: "Seafood · Dinner", vibe: "Casual, waterfront", must: "Fresh lobster, fish and chips, chowder. Quintessential NL.", nutNote: "Seafood-focused, naturally nut-free. Confirm chowder base." },
      { name: "Anchor Inn Restaurant", type: "NL Cuisine · Dinner", vibe: "Hotel dining room, comfortable", must: "Reliable local staple after a long driving day.", nutNote: "Standard NL menu — should be accommodating." },
    ],
  },
  {
    location: "Gros Morne Area (Norris Point / Woody Point)", color: "#354F52", emoji: "⛰️",
    note: "The best food in western NL is concentrated around Norris Point and Woody Point.",
    restaurants: [
      { name: "The Old Loft Restaurant", type: "Seafood · Lunch/Dinner", vibe: "Waterfront, Woody Point", must: "Iconic Gros Morne restaurant. Fresh fish, moose dishes, stunning Bonne Bay views. Post-hike lunch on Sep 2.", nutNote: "Seafood and wild game — naturally nut-free. Confirm with server." },
      { name: "Java Jack's Restaurant & Gallery", type: "Café · Breakfast/Lunch", vibe: "Artsy, Norris Point", must: "Best breakfast in the park. Local ingredients, homemade bread, great coffee.", nutNote: "Homestyle cooking — flag any allergies." },
      { name: "Black Spruce (Wigwam Restaurant)", type: "NL Cuisine · Dinner", vibe: "Rustic, Norris Point", must: "Wild game, local fish, foraged ingredients. One of the most unique dinners in NL.", nutNote: "Adventurous menu — call ahead about any allergies." },
    ],
  },
  {
    location: "Corner Brook", color: "#2C3E50", emoji: "🏔️",
    note: "Second-largest city in NL — best food options on the west coast.",
    restaurants: [
      { name: "Vic's Take-Out", type: "Fish & Chips · Casual", vibe: "NL institution", must: "Legendary fish and chips. A rite of passage. Cash only.", nutNote: "Nut-free, but ask about fryer oil cross-contamination." },
      { name: "Sorrento Restaurant", type: "Italian · Dinner", vibe: "Cozy, local favourite", must: "Best sit-down dinner in Corner Brook. Good pasta and seafood.", nutNote: "Confirm pasta sauces and desserts." },
      { name: "Newfound Sushi", type: "Japanese · Lunch/Dinner", vibe: "Casual, fresh", must: "Excellent sushi using local NL seafood. Good post-tattoo option on Sep 3.", nutNote: "Confirm any special rolls or sauces." },
    ],
  },
];

const wineAndCheese = [
  {
    category: "🥂 Celebratory Moments",
    items: [
      { name: "Cape Spear Sunrise (Aug 30)", detail: "A small split (187ml) of sparkling wine at the edge of the world as the sun rises — then straight north to the puffins." },
      { name: "Tablelands Summit (Sep 2)", detail: "Another small split. You're standing on the Earth's mantle. That deserves a drink." },
      { name: "Green Gardens Sea Stacks (Sep 2)", detail: "Best picnic spot of the trip. Bring a proper picnic lunch AND a half bottle of rosé or white. Sit at the volcanic sea stacks and take your time." },
      { name: "Western Brook Pond Fjord (Sep 3)", detail: "A cold beer or small bottle of sparkling on the boat between the fjord walls." },
      { name: "OME Wine & Cheese Night (Aug 31)", detail: "Your main wine event. Bring 2–3 bottles. Details below." },
    ],
  },
  {
    category: "🧀 OME Wine & Cheese — Stock Up in Gander (Aug 30)",
    items: [
      { name: "Wine", detail: "One red (Côtes du Rhône, Malbec, or NL's Rodrigues Winery), one white or rosé (Sancerre or Pinot Gris), one sparkling. Buy at the NL Liquor Corporation in Gander." },
      { name: "Cheese", detail: "Quebec aged cheddar, brie, or local NL dairy. Any IGA or Sobeys. Check labels for nut-free." },
      { name: "Charcuterie", detail: "Pre-sliced salami, prosciutto, or smoked meat from any grocery store." },
      { name: "Extras", detail: "Water crackers (Stonemill or Breton original), fig jam, Dijon, cornichons, grapes, dark chocolate." },
    ],
  },
];

const picnicSpots = [
  { spot: "Green Gardens Sea Stacks", day: "Sep 2 — ~12:00pm", rating: "⭐⭐⭐⭐⭐", detail: "The best picnic spot of the entire trip. Lush coastal meadows with volcanic sea stacks dropping to the ocean. Sit here for 30–45 minutes with packed lunch and wine." },
  { spot: "Cape Spear Cliffs", day: "Aug 30 — Dawn", rating: "⭐⭐⭐⭐⭐", detail: "The perfect sunrise sparkling wine moment before heading north to the puffins." },
  { spot: "Western Brook Pond Fen", day: "Sep 3 — Hike in", rating: "⭐⭐⭐⭐", detail: "The flat boardwalk passes through stunning open fen and boreal forest. Great spot to stop and have a snack before the boat tour." },
  { spot: "Tablelands Trail End", day: "Sep 2 — ~9:00am", rating: "⭐⭐⭐⭐", detail: "Sweeping view of rust-orange barren rock. Perfect for a quiet moment with coffee and a snack." },
  { spot: "Long Point Lighthouse, Twillingate", day: "Aug 30 — Evening", rating: "⭐⭐⭐⭐", detail: "The lighthouse walk ends at a dramatic headland over Notre Dame Bay. Bring a cold beer and watch the sun set." },
];

const trailEssentials = {
  snacks: [
    { item: "Seed & Dried Fruit Mix", detail: "Pumpkin seeds, sunflower seeds, dried cranberries, dried apricots, coconut chips. Nut-free, high energy, lightweight." },
    { item: "Made Good Granola Bars", detail: "Certified nut-free facility. Widely available at Canadian grocery stores. Stock up before leaving." },
    { item: "Babybel Cheese Wheels", detail: "Individual wax-wrapped wheels. No refrigeration needed for a few hours. Great protein hit on the trail." },
    { item: "Medjool Dates", detail: "Natural sugar bomb. Pair with a seed butter packet (sunflower or pumpkin — nut-free) for fat and protein." },
    { item: "Jerky / Meat Sticks", detail: "High protein, lightweight, no refrigeration needed. Most plain jerky is nut-free — check labels." },
    { item: "Dark Chocolate", detail: "Lindt 70% Dark original or Camino dark chocolate — both nut-free." },
    { item: "Sandwiches / Wraps", detail: "Make the night before for Sep 2. A proper lunch for the Green Gardens sea stacks picnic." },
    { item: "Fresh Fruit", detail: "Apples and oranges travel well. Hydrating and refreshing at a viewpoint." },
    { item: "Electrolyte Packets", detail: "Nuun or Liquid IV. Add to water on the longer hikes." },
    { item: "Coffee Thermos", detail: "For early starts. A hot drink at 6am at Cape Spear is perfect." },
  ],
  gear: [
    { item: "Layering System", detail: "Coastal NL can be 8°C and windy in late August, especially at Cape Spear and on the boat tour. Base layer + fleece mid-layer + waterproof shell." },
    { item: "Waterproof Jacket", detail: "Non-negotiable. NL weather changes in 20 minutes. Essential for Western Brook Pond and Cobbler's Path." },
    { item: "Hiking Footwear", detail: "Waterproof trail runners or light hiking boots. Green Gardens has wet sections and mud near the coast." },
    { item: "Trekking Poles (optional)", detail: "Helpful for North Head Trail stairs and Green Gardens descent." },
    { item: "Daypack (20–25L each)", detail: "Large enough for snacks, water, layers, and a picnic lunch." },
    { item: "Water Bottles", detail: "At least 1.5–2L each for Green Gardens and Tablelands." },
    { item: "Small Cooler Bag", detail: "For keeping wine splits cold and the Sep 2 picnic lunch fresh." },
    { item: "First Aid Kit (basic)", detail: "Blister pads (Compeed), ibuprofen, bandages, antiseptic wipes." },
    { item: "Sunscreen & Bug Spray", detail: "NL has blackflies and mosquitoes especially in Burlington and central NL. DEET-based spray recommended." },
    { item: "Camera or Phone Mount", detail: "Cape Spear, Green Gardens sea stacks, and Western Brook Pond are extraordinary photo opportunities. A GorillaPod lets you get shots together." },
  ],
  wine: [
    { item: "Small Sparkling Splits (187ml × 4)", detail: "Cape Spear sunrise, Tablelands, Western Brook Pond, one spare. Fits easily in a daypack." },
    { item: "Half Bottle Rosé or White (375ml × 1–2)", detail: "For the Green Gardens sea stacks picnic on Sep 2. A cold dry rosé or crisp white." },
    { item: "Full Bottles for OME Night (2–3)", detail: "Stock up in Gander on Aug 30. See Wine & Cheese in Food tab." },
    { item: "Collapsible Wine Glasses", detail: "Lightweight, pack flat, make any summit feel like a proper celebration. Available at MEC." },
  ],
};

const accommodationSummary = [
  { dates: "Aug 28", location: "St. John's, NL", name: "JAG Hotel (Downtown Boutique)", booked: false },
  { dates: "Aug 29–30", location: "Bay Bulls, NL", name: "Oceanfront Apartment", booked: false },
  { dates: "Aug 30–31", location: "Twillingate, NL", name: "Twillingate Airbnb", booked: true },
  { dates: "Aug 31–Sep 1", location: "Burlington, NL", name: "'Ome Sweet 'Ome Glamping", booked: true },
  { dates: "Sep 1–3", location: "York Harbour, NL", name: "Salt Spray Landing (Barrel Sauna)", booked: true },
  { dates: "Sep 3–4", location: "At Sea / North Sydney", name: "Marine Atlantic Ferry (Reserved Seats)", booked: true },
  { dates: "Sep 4–6", location: "Oromocto / Fredericton, NB", name: "Near Wedding Venue", booked: false },
];

const highlights = [
  { icon: "🌅", label: "Cape Spear Sunrise", sub: "Aug 30 · Before the Puffins" },
  { icon: "🐦", label: "Elliston Puffins", sub: "Aug 30 · Morning" },
  { icon: "🎵", label: "George St. Saturday Night", sub: "Aug 29 · Green Sleeves + Screech" },
  { icon: "🧀", label: "Wine & Cheese Night", sub: "Aug 31 · OME" },
  { icon: "🪨", label: "Tablelands + Green Gardens", sub: "Sep 2 · Full Day" },
  { icon: "🛥️", label: "Western Brook Fjord ✓", sub: "Sep 3 · 12:30pm Booked" },
  { icon: "🎊", label: "Julia & Andrew's Wedding", sub: "Sep 5 · Oromocto, NB" },
];

// ── MAP DATA ──────────────────────────────────────────────────────────────────

const mapRoutePoints = [
  { name: "St. John's", coords: [47.56, -52.71], day: "Aug 28–29", emoji: "🏙️", color: "#1B4332", note: "JAG Hotel · Signal Hill · George Street · Screech-In" },
  { name: "Bay Bulls", coords: [47.32, -52.81], day: "Aug 29–30", emoji: "🌊", color: "#1B4332", note: "Oceanfront Apartment · Cobbler's Path East Coast Trail" },
  { name: "Cape Spear", coords: [47.525, -52.623], day: "Aug 30 — 6:20am", emoji: "🌅", color: "#C07000", note: "Sunrise · Easternmost point of North America" },
  { name: "Elliston", coords: [48.64, -53.10], day: "Aug 30 — 10:30am", emoji: "🐦", color: "#40916C", note: "Best land-based puffin viewing in North America" },
  { name: "Gander", coords: [48.96, -54.61], day: "Aug 30 — Lunch", emoji: "🛒", color: "#777", note: "Lunch stop · Stock up wine & cheese for OME night" },
  { name: "Twillingate", coords: [49.65, -54.78], day: "Aug 30–31", emoji: "🧊", color: "#40916C", note: "Twillingate Airbnb · Long Point Lighthouse" },
  { name: "Springdale (Ochre Hill)", coords: [49.50, -56.06], day: "Aug 31 — Morning", emoji: "⛰️", color: "#52796F", note: "Hidden gem — panoramic views over the Bay of Islands" },
  { name: "Burlington ('Ome Sweet 'Ome)", coords: [49.41, -56.53], day: "Aug 31–Sep 1", emoji: "🏕️", color: "#52796F", note: "Glamping · Wine & Cheese Night ✨" },
  { name: "York Harbour", coords: [49.08, -58.23], day: "Sep 1–3", emoji: "🔥", color: "#354F52", note: "Salt Spray Landing · Private Barrel Sauna (2 nights)" },
  { name: "Gros Morne NP", coords: [49.51, -57.87], day: "Sep 2", emoji: "⛰️", color: "#1B4332", note: "Tablelands 7:30am + Green Gardens Trail · Full hike day" },
  { name: "Western Brook Pond", coords: [49.73, -57.89], day: "Sep 3 — 12:30pm", emoji: "🛥️", color: "#2C3E50", note: "Boat Tour ✓ Booked · Landlocked fjord · 600m walls" },
  { name: "Corner Brook", coords: [48.95, -57.94], day: "Sep 3 — Afternoon", emoji: "🖋️", color: "#2C3E50", note: "Optional tattoo stop · Vic's Fish & Chips" },
  { name: "Port aux Basques", coords: [47.58, -59.14], day: "Sep 3 — 11:45pm", emoji: "⛴️", color: "#2C3E50", note: "Ferry departs overnight → North Sydney NS · Booking #5033496" },
  { name: "North Sydney, NS", coords: [46.21, -60.25], day: "Sep 4 — ~7:00am", emoji: "🌅", color: "#4A4E69", note: "Ferry arrives · Drive west through Nova Scotia → New Brunswick" },
  { name: "Saint John, NB", coords: [45.27, -66.07], day: "Sep 4 — ~1:00pm", emoji: "🚗", color: "#4A4E69", note: "Avis car drop-off · Water Street (Ref: 14902711CA5)" },
  { name: "Oromocto / Fredericton, NB", coords: [45.85, -66.48], day: "Sep 4–6", emoji: "🎊", color: "#7B5EA7", note: "Julia & Andrew's Wedding · Sep 5 at 5pm · Douglas Hazen Centre" },
];

// ── PACKING DATA ──────────────────────────────────────────────────────────────

const packingData = {
  luke: [
    {
      bag: "🛒 To Buy Before Trip",
      accent: "#C0392B",
      sections: [
        {
          title: "📷 Camera Gear",
          items: [
            { id: "l-buy-cam1", item: "Camera body", note: "Compact mirrorless recommended — Sony ZV-E10 II or Fujifilm X-T50 are excellent travel options" },
            { id: "l-buy-cam2", item: "Spare camera batteries (×2)" },
            { id: "l-buy-cam3", item: "Memory cards — 64GB+ (×2)", note: "Bring extras — 10 days of hiking & scenery fills cards fast" },
            { id: "l-buy-cam4", item: "GorillaPod or mini tripod", note: "Essential for couple shots at Cape Spear, sea stacks, and the fjord" },
            { id: "l-buy-cam5", item: "Camera strap or Peak Design clip" },
          ],
        },
        {
          title: "Trail Supplies",
          items: [
            { id: "l-buy-t1", item: "Electrolyte packets — Nuun or Liquid IV (×20+)", note: "For Tablelands, Green Gardens, and Western Brook hike days" },
            { id: "l-buy-t2", item: "Made Good granola bars (×2 boxes)", note: "Certified nut-free — buy before leaving, rural NL may not stock these" },
            { id: "l-buy-t3", item: "DEET bug spray (×2)", note: "Blackflies and mosquitoes in Burlington and central NL" },
            { id: "l-buy-t4", item: "Sunscreen SPF 50+ (×2)" },
          ],
        },
        {
          title: "Celebratory Drinks",
          items: [
            { id: "l-buy-w1", item: "Sparkling wine splits 187ml (×4–6)", note: "Cape Spear, Tablelands, Western Brook Pond, spare — or buy in St. John's" },
            { id: "l-buy-w2", item: "Collapsible wine glasses (×2)", note: "MEC or Amazon — makes any summit feel like a proper celebration" },
          ],
        },
      ],
    },
    {
      bag: "🧳 Carry-On",
      accent: "#2980B9",
      sections: [
        {
          title: "Documents & Money",
          items: [
            { id: "l-co-d1", item: "Government-issued photo ID or passport" },
            { id: "l-co-d2", item: "Boarding passes — digital + printed backup" },
            { id: "l-co-d3", item: "Car rental confirmation — Avis Ref: 14902711CA5" },
            { id: "l-co-d4", item: "Ferry booking — Marine Atlantic #5033496" },
            { id: "l-co-d5", item: "All accommodation confirmations" },
            { id: "l-co-d6", item: "Wallet + credit/debit card" },
            { id: "l-co-d7", item: "Cash (Canadian)", note: "Some rural NL spots are cash-only: Vic's Fish & Chips, ferry golf cart ($10)" },
          ],
        },
        {
          title: "Ferry & Flight Comfort",
          items: [
            { id: "l-co-c1", item: "Eye mask", note: "The overnight ferry keeps TVs on all night — essential" },
            { id: "l-co-c2", item: "Small travel blanket or packable layer" },
            { id: "l-co-c3", item: "Ear plugs or noise-cancelling headphones" },
            { id: "l-co-c4", item: "Neck pillow (optional)" },
          ],
        },
        {
          title: "Essentials",
          items: [
            { id: "l-co-e1", item: "Change of clothes (1 full outfit)", note: "In case checked luggage is delayed on the 3:30am departure" },
            { id: "l-co-e2", item: "Travel-size toiletries (<100ml each)" },
            { id: "l-co-e3", item: "Nut-free snacks for flights" },
            { id: "l-co-e4", item: "Empty reusable water bottle" },
            { id: "l-co-e5", item: "Book or e-reader" },
            { id: "l-co-e6", item: "Sunglasses" },
            { id: "l-co-e7", item: "Phone charger + power bank" },
          ],
        },
      ],
    },
    {
      bag: "🎒 Backpack (Day Hiking)",
      accent: "#27AE60",
      sections: [
        {
          title: "Hiking Gear",
          items: [
            { id: "l-bp-h1", item: "2× water bottles (750ml) or 2L hydration bladder" },
            { id: "l-bp-h2", item: "First aid kit", note: "Blister pads (Compeed), ibuprofen, bandages, antiseptic wipes" },
            { id: "l-bp-h3", item: "Headlamp + spare batteries", note: "Cape Spear 6am start, overnight ferry navigation" },
            { id: "l-bp-h4", item: "Offline maps downloaded (Maps.me or AllTrails)", note: "Cell coverage is spotty in Gros Morne and Twillingate" },
            { id: "l-bp-h5", item: "Trekking poles (optional)", note: "North Head Trail stairs and Green Gardens descent" },
            { id: "l-bp-h6", item: "Small insulated cooler pouch", note: "For keeping summit wine splits cold" },
          ],
        },
        {
          title: "Camera & Tech",
          items: [
            { id: "l-bp-cam1", item: "Camera + lenses in protective case" },
            { id: "l-bp-cam2", item: "Spare camera batteries + charger" },
            { id: "l-bp-cam3", item: "Memory cards" },
            { id: "l-bp-cam4", item: "GorillaPod / tripod" },
            { id: "l-bp-cam5", item: "Power bank (charged)" },
          ],
        },
      ],
    },
    {
      bag: "📦 Large Suitcase",
      accent: "#8E44AD",
      sections: [
        {
          title: "Clothing — Everyday",
          items: [
            { id: "l-ls-c1", item: "Casual t-shirts / long-sleeves", qty: "×6", note: "Mix of everyday wear for city days and nicer dinners" },
            { id: "l-ls-c2", item: "Moisture-wicking hiking shirts", qty: "×3" },
            { id: "l-ls-c3", item: "Casual pants / jeans", qty: "×2" },
            { id: "l-ls-c4", item: "Hiking pants", qty: "×1" },
            { id: "l-ls-c5", item: "Underwear", qty: "×10" },
            { id: "l-ls-c6", item: "Hiking socks — merino wool", qty: "×5", note: "Prevent blisters on longer trails" },
            { id: "l-ls-c7", item: "Casual socks", qty: "×5" },
            { id: "l-ls-c8", item: "Sleep shorts / pajamas", qty: "×2 sets" },
            { id: "l-ls-c9", item: "Swimsuit / trunks", qty: "×1", note: "Barrel sauna at Salt Spray Landing (Sep 1–3)" },
          ],
        },
        {
          title: "Clothing — Layers",
          items: [
            { id: "l-ls-l1", item: "Waterproof rain jacket", note: "Non-negotiable — NL weather changes in 20 minutes" },
            { id: "l-ls-l2", item: "Fleece or heavy sweater (mid-layer)" },
            { id: "l-ls-l3", item: "Thermal base layer top + bottom", qty: "×1 set", note: "For the 6am Cape Spear sunrise on Aug 30" },
          ],
        },
        {
          title: "Clothing — Wedding (Sep 5, Cocktail Attire)",
          items: [
            { id: "l-ls-w1", item: "Dress shirt", qty: "×1" },
            { id: "l-ls-w2", item: "Sport jacket or blazer", qty: "×1" },
            { id: "l-ls-w3", item: "Dress pants or chinos", qty: "×1" },
          ],
        },
        {
          title: "Footwear",
          items: [
            { id: "l-ls-f1", item: "Waterproof hiking boots", qty: "×1 pair", note: "Wear on the plane to save suitcase space" },
            { id: "l-ls-f2", item: "Dress shoes", qty: "×1 pair", note: "Wedding Sep 5" },
            { id: "l-ls-f3", item: "Casual everyday shoes / sneakers", qty: "×1 pair" },
          ],
        },
        {
          title: "Toiletries",
          items: [
            { id: "l-ls-t1", item: "Shampoo + conditioner" },
            { id: "l-ls-t2", item: "Body wash" },
            { id: "l-ls-t3", item: "Deodorant" },
            { id: "l-ls-t4", item: "Toothbrush + toothpaste" },
            { id: "l-ls-t5", item: "Razor + shaving cream" },
            { id: "l-ls-t6", item: "Moisturizer / SPF face lotion" },
          ],
        },
        {
          title: "Other",
          items: [
            { id: "l-ls-o1", item: "Medications (daily + as-needed)" },
            { id: "l-ls-o2", item: "Packable tote bag", note: "For wine runs, grocery stops, beach days" },
          ],
        },
      ],
    },
  ],
  alexa: [
    {
      bag: "🛒 To Buy Before Trip",
      accent: "#C0392B",
      sections: [
        {
          title: "📷 Camera (Shared with Luke)",
          items: [
            { id: "a-buy-cam1", item: "Camera body (shared)", note: "Sony ZV-E10 II or Fujifilm X-T50 — compact and excellent for hiking and travel" },
            { id: "a-buy-cam2", item: "GorillaPod / mini tripod (shared)", note: "Key for couple shots at Cape Spear, Green Gardens, Western Brook Pond" },
          ],
        },
        {
          title: "Trail & Health Supplies",
          items: [
            { id: "a-buy-t1", item: "Electrolyte packets — Nuun or Liquid IV (×20+)" },
            { id: "a-buy-t2", item: "Nut-free snacks (Made Good bars, seed mixes)", note: "Stock up before leaving — rural NL has limited specialty stock" },
            { id: "a-buy-t3", item: "DEET bug spray (×2)" },
            { id: "a-buy-t4", item: "Sunscreen SPF 50+ (×2)" },
            { id: "a-buy-t5", item: "Antihistamines — Reactine + Benadryl (backup stock)" },
          ],
        },
      ],
    },
    {
      bag: "🧳 Carry-On",
      accent: "#2980B9",
      sections: [
        {
          title: "⚠️ Allergy Essentials — Always in Carry-On",
          items: [
            { id: "a-co-a1", item: "EpiPen (×2)", note: "Always in carry-on, NEVER in checked luggage — keep one accessible during the whole trip" },
            { id: "a-co-a2", item: "Antihistamines — Benadryl (fast-acting) + Reactine (daily)" },
            { id: "a-co-a3", item: "Written allergy action plan", note: "Helpful at rural restaurants where staff may be less familiar with nut allergies" },
          ],
        },
        {
          title: "Documents & Money",
          items: [
            { id: "a-co-d1", item: "Government-issued photo ID or passport" },
            { id: "a-co-d2", item: "Boarding passes — Ref: CNM5DB (return AC 1965 Sep 6, Thunder Bay)" },
            { id: "a-co-d3", item: "Wallet + credit/debit card" },
            { id: "a-co-d4", item: "Cash (Canadian)", note: "Cash-only spots: Vic's Fish & Chips, ferry golf cart" },
          ],
        },
        {
          title: "Ferry & Flight Comfort",
          items: [
            { id: "a-co-c1", item: "Eye mask", note: "The overnight ferry (Sep 3→4) keeps TVs on all night" },
            { id: "a-co-c2", item: "Small travel blanket or packable layer" },
            { id: "a-co-c3", item: "Ear plugs or noise-cancelling headphones" },
          ],
        },
        {
          title: "Essentials",
          items: [
            { id: "a-co-e1", item: "Change of clothes (1 full outfit)", note: "In case luggage is delayed on the early morning Aug 28 departure" },
            { id: "a-co-e2", item: "Travel-size toiletries (<100ml)" },
            { id: "a-co-e3", item: "Nut-free snacks for flights" },
            { id: "a-co-e4", item: "Empty reusable water bottle" },
            { id: "a-co-e5", item: "Book or e-reader" },
            { id: "a-co-e6", item: "Sunglasses" },
            { id: "a-co-e7", item: "Phone charger + power bank" },
            { id: "a-co-e8", item: "Lip balm + hand cream" },
          ],
        },
      ],
    },
    {
      bag: "🎒 Backpack (Day Hiking)",
      accent: "#27AE60",
      sections: [
        {
          title: "Hiking Gear",
          items: [
            { id: "a-bp-h1", item: "2× water bottles (750ml) or 2L hydration bladder" },
            { id: "a-bp-h2", item: "First aid kit", note: "Blister pads (Compeed), ibuprofen, bandages, antiseptic wipes" },
            { id: "a-bp-h3", item: "Headlamp + spare batteries" },
            { id: "a-bp-h4", item: "Offline maps downloaded (AllTrails)", note: "Cell coverage unreliable in Gros Morne and Twillingate" },
            { id: "a-bp-h5", item: "Feminine hygiene products (trail supply)" },
          ],
        },
        {
          title: "Tech",
          items: [
            { id: "a-bp-t1", item: "Phone + charger + power bank" },
            { id: "a-bp-t2", item: "AirPods / earbuds" },
          ],
        },
      ],
    },
    {
      bag: "📦 Large Suitcase",
      accent: "#8E44AD",
      sections: [
        {
          title: "Clothing — Everyday",
          items: [
            { id: "a-ls-c1", item: "Casual tops / blouses", qty: "×6" },
            { id: "a-ls-c2", item: "Moisture-wicking hiking shirts", qty: "×3" },
            { id: "a-ls-c3", item: "Casual dresses or sundresses", qty: "×2–3", note: "Great for nicer dinners and warmer city days" },
            { id: "a-ls-c4", item: "Jeans or casual pants", qty: "×2–3" },
            { id: "a-ls-c5", item: "Hiking pants or leggings", qty: "×1–2" },
            { id: "a-ls-c6", item: "Underwear", qty: "×10" },
            { id: "a-ls-c7", item: "Sports bras", qty: "×3" },
            { id: "a-ls-c8", item: "Regular bras", qty: "×3" },
            { id: "a-ls-c9", item: "Hiking socks — merino wool", qty: "×5" },
            { id: "a-ls-c10", item: "Casual socks", qty: "×5" },
            { id: "a-ls-c11", item: "Sleep clothes / pajamas", qty: "×2 sets" },
            { id: "a-ls-c12", item: "Swimsuit", qty: "×1", note: "Barrel sauna at Salt Spray Landing — Sep 1–3" },
          ],
        },
        {
          title: "Clothing — Layers",
          items: [
            { id: "a-ls-l1", item: "Waterproof rain jacket", note: "Non-negotiable — NL weather changes fast, especially coastal" },
            { id: "a-ls-l2", item: "Cozy sweater or cardigan" },
            { id: "a-ls-l3", item: "Fleece mid-layer" },
            { id: "a-ls-l4", item: "Thermal base layer top + bottom", qty: "×1 set", note: "For 6am Cape Spear sunrise — cliff-top Atlantic wind in late August" },
          ],
        },
        {
          title: "Clothing — Wedding (Sep 5, Cocktail Attire)",
          items: [
            { id: "a-ls-w1", item: "Cocktail dress 🎊", note: "Douglas Hazen Centre, Oromocto NB — outdoor ceremony, semi-formal reception" },
            { id: "a-ls-w2", item: "Wrap or light jacket", note: "Evening in NB can be cool in early September" },
            { id: "a-ls-w3", item: "Wedding jewelry & accessories" },
            { id: "a-ls-w4", item: "Nail care touch-up kit" },
          ],
        },
        {
          title: "Footwear",
          items: [
            { id: "a-ls-f1", item: "Waterproof hiking boots or trail runners", qty: "×1 pair", note: "Wear on the plane — Green Gardens has wet, muddy coastal sections" },
            { id: "a-ls-f2", item: "Heels or dressy sandals", qty: "×1 pair", note: "Wedding Sep 5 — note outdoor ceremony area" },
            { id: "a-ls-f3", item: "Casual everyday shoes", qty: "×1 pair" },
          ],
        },
        {
          title: "Hair & Beauty",
          items: [
            { id: "a-ls-b1", item: "Hair straightener or curling iron" },
            { id: "a-ls-b2", item: "Heat protectant spray" },
            { id: "a-ls-b3", item: "Dry shampoo", note: "Lifesaver on early-morning hike days" },
            { id: "a-ls-b4", item: "Hair ties, bobby pins, clips" },
            { id: "a-ls-b5", item: "Compact makeup bag", note: "Light everyday + full for wedding night" },
          ],
        },
        {
          title: "Toiletries",
          items: [
            { id: "a-ls-t1", item: "Shampoo + conditioner" },
            { id: "a-ls-t2", item: "Body wash" },
            { id: "a-ls-t3", item: "Deodorant" },
            { id: "a-ls-t4", item: "Toothbrush + toothpaste" },
            { id: "a-ls-t5", item: "Razor" },
            { id: "a-ls-t6", item: "Skincare routine (cleanser, moisturizer, SPF)" },
            { id: "a-ls-t7", item: "Feminine hygiene products (main supply)" },
          ],
        },
        {
          title: "Other",
          items: [
            { id: "a-ls-o1", item: "Medications (daily + as-needed)" },
            { id: "a-ls-o2", item: "Packable tote bag" },
          ],
        },
      ],
    },
  ],
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function DaysTab() {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];
  return (
    <div>
      <div style={{ overflowX: "auto", background: "#fff", borderBottom: "1px solid #e0d9ce", display: "flex", scrollbarWidth: "none" }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)} style={{ flex: "0 0 auto", padding: "11px 12px", border: "none", borderBottom: activeDay === i ? `3px solid ${d.color}` : "3px solid transparent", background: activeDay === i ? "#f9f6f1" : "transparent", cursor: "pointer", textAlign: "center", minWidth: 64, transition: "all 0.2s" }}>
            <div style={{ fontSize: 16 }}>{d.emoji}</div>
            <div style={{ fontSize: 9, color: activeDay === i ? d.color : "#888", fontWeight: activeDay === i ? "bold" : "normal", marginTop: 3 }}>{d.date.split(" ")[1]}</div>
            <div style={{ fontSize: 8, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5 }}>{d.day.slice(0, 3)}</div>
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ borderLeft: `4px solid ${day.color}`, paddingLeft: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: day.color, textTransform: "uppercase" }}>{day.date} · {day.day}</div>
          <h2 style={{ margin: "4px 0 2px", fontSize: 26, fontWeight: "normal" }}>{day.label}</h2>
          <div style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>📍 {day.location}</div>
        </div>
        {day.timing && <div style={{ background: "#FFF3CD", border: "1px solid #E8C84A", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#5C4A00", lineHeight: 1.55 }}>{day.timing.alert}</div>}
        <div>
          {day.sections.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 4 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 68, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: day.color, fontWeight: "bold", textAlign: "center", paddingTop: 16, lineHeight: 1.2 }}>{s.time}</div>
                {i < day.sections.length - 1 && <div style={{ width: 1, flex: 1, background: "#d0c9be", marginTop: 6, minHeight: 20 }} />}
              </div>
              <div style={{ flex: 1, background: s.timing ? "#FFFBF0" : "#fff", border: `1px solid ${s.timing ? "#E8C84A" : "#e8e0d5"}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontWeight: "bold", fontSize: 15 }}>{s.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.65 }}>{s.details}</p>
              </div>
            </div>
          ))}
        </div>
        {day.accommodation && (
          <div style={{ marginTop: 8, background: day.accommodation.booked ? "#D8F3DC" : "#EEF2FF", border: `1px solid ${day.accommodation.booked ? "#40916C" : "#C7D2FE"}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🛏️</span>
            <div>
              <div style={{ fontSize: 11, color: day.accommodation.booked ? "#1B4332" : "#3730A3", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 0.5 }}>{day.accommodation.booked ? "✓ Booked" : "To Book"}</div>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>{day.accommodation.name}</div>
              <div style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>{day.accommodation.note}</div>
            </div>
          </div>
        )}
      </div>
      <div style={{ background: "#1B4332", padding: "32px 16px", color: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#95D5B2", fontWeight: "normal" }}>Accommodation Summary</h3>
          {accommodationSummary.map((acc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < accommodationSummary.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: acc.booked ? "#52B788" : "#74C69D", border: acc.booked ? "2px solid #52B788" : "2px dashed #74C69D" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#D8F3DC", fontWeight: "bold" }}>{acc.name}</div>
                <div style={{ fontSize: 11, color: "#95D5B2", marginTop: 2 }}>{acc.dates} · {acc.location}</div>
              </div>
              <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: acc.booked ? "rgba(82,183,136,0.3)" : "rgba(255,255,255,0.1)", color: acc.booked ? "#52B788" : "#aaa", letterSpacing: 0.5, textTransform: "uppercase" }}>
                {acc.booked ? "✓ Booked" : "To Book"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodTab() {
  const [section, setSection] = useState("restaurants");
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[{ id: "restaurants", label: "🍽️ Restaurants" }, { id: "wine", label: "🍷 Wine & Cheese" }, { id: "picnic", label: "🧺 Picnic Spots" }].map(t => (
          <button key={t.id} onClick={() => setSection(t.id)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${section === t.id ? "#2D6A4F" : "#d0c9be"}`, background: section === t.id ? "#2D6A4F" : "#fff", color: section === t.id ? "#fff" : "#444", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {t.label}
          </button>
        ))}
      </div>
      {section === "restaurants" && (
        <div>
          <div style={{ background: "#FFF3CD", border: "1px solid #E8C84A", borderRadius: 8, padding: "10px 14px", marginBottom: 24, fontSize: 13, color: "#5C4A00" }}>
            ⚠️ <strong>Nut Allergy:</strong> Always mention when seated. NL cuisine is largely seafood and game-based but always confirm with your server.
          </div>
          {foodData.map((loc, li) => (
            <div key={li} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{loc.emoji}</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: "normal", color: loc.color }}>{loc.location}</h3>
              </div>
              {loc.note && <p style={{ fontSize: 12, color: "#888", fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.5 }}>{loc.note}</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {loc.restaurants.map((r, ri) => (
                  <div key={ri} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: 15 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{r.type} · {r.vibe}</div>
                    <p style={{ margin: "8px 0 4px", fontSize: 13, color: "#4a4a4a", lineHeight: 1.6 }}>{r.must}</p>
                    <div style={{ fontSize: 12, color: "#5C4A00", background: "#FFFBF0", border: "1px solid #E8C84A", borderRadius: 6, padding: "4px 10px", marginTop: 6, display: "inline-block" }}>🥜 {r.nutNote}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {section === "wine" && (
        <div>
          {wineAndCheese.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 17, fontWeight: "normal", color: "#1B4332", marginBottom: 14, borderBottom: "1px solid #e8e0d5", paddingBottom: 8 }}>{cat.category}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cat.items.map((item, ii) => (
                  <div key={ii} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{item.name}</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.65 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {section === "picnic" && (
        <div>
          <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", marginBottom: 20, lineHeight: 1.6 }}>Several spots on this trip are exceptional for a proper sit-down outdoor meal.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {picnicSpots.map((p, pi) => (
              <div key={pi} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ fontWeight: "bold", fontSize: 15 }}>🧺 {p.spot}</div>
                  <div style={{ fontSize: 13 }}>{p.rating}</div>
                </div>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.day}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.65 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrailTab() {
  const [section, setSection] = useState("snacks");
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[{ id: "snacks", label: "🍎 Trail Snacks" }, { id: "gear", label: "🎒 Gear List" }, { id: "wine", label: "🥂 Summit Drinks" }].map(t => (
          <button key={t.id} onClick={() => setSection(t.id)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${section === t.id ? "#1B4332" : "#d0c9be"}`, background: section === t.id ? "#1B4332" : "#fff", color: section === t.id ? "#fff" : "#444", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {t.label}
          </button>
        ))}
      </div>
      {section === "snacks" && (
        <div>
          <div style={{ background: "#D8F3DC", border: "1px solid #40916C", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#1B4332" }}>
            ✓ All snacks below are <strong>nut-free</strong>. Always check packaging for "may contain traces of nuts."
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {trailEssentials.snacks.map((s, si) => (
              <div key={si} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#40916C", flexShrink: 0, marginTop: 5 }} />
                <div><div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{s.item}</div><p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.6 }}>{s.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {section === "gear" && (
        <div>
          <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", marginBottom: 20, lineHeight: 1.6 }}>Newfoundland coastal hiking requires being prepared for rapid weather changes.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {trailEssentials.gear.map((g, gi) => (
              <div key={gi} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1B4332", flexShrink: 0, marginTop: 5 }} />
                <div><div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{g.item}</div><p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.6 }}>{g.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {section === "wine" && (
        <div>
          <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", marginBottom: 20, lineHeight: 1.6 }}>A cold drink at the right moment makes a great view unforgettable.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {trailEssentials.wine.map((w, wi) => (
              <div key={wi} style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2C3E50", flexShrink: 0, marginTop: 5 }} />
                <div><div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{w.item}</div><p style={{ margin: 0, fontSize: 13, color: "#4a4a4a", lineHeight: 1.6 }}>{w.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MapTab() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      if (mapInstanceRef.current || !mapRef.current) return;
      const L = window.L;
      const map = L.map(mapRef.current).fitBounds([[45.0, -66.8], [49.9, -52.5]]);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 14,
      }).addTo(map);

      L.polyline(mapRoutePoints.map(p => p.coords), {
        color: "#2D6A4F", weight: 2.5, dashArray: "6, 5", opacity: 0.7,
      }).addTo(map);

      mapRoutePoints.forEach((point) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:30px;height:30px;border-radius:50%;background:${point.color};border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer;">${point.emoji}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
        L.marker(point.coords, { icon }).addTo(map).bindPopup(
          `<div style="font-family:Georgia,serif;min-width:180px;"><div style="font-weight:bold;font-size:14px;margin-bottom:4px;">${point.emoji} ${point.name}</div><div style="font-size:11px;color:#666;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">${point.day}</div><div style="font-size:12px;color:#333;line-height:1.5;">${point.note}</div></div>`,
          { maxWidth: 240 }
        );
      });
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 48px" }}>
      <p style={{ fontSize: 13, color: "#666", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.6 }}>
        Click any marker for details about that stop. The dashed line traces the full route from St. John's to Fredericton.
      </p>
      <div ref={mapRef} style={{ height: 480, borderRadius: 12, border: "1px solid #e8e0d5", overflow: "hidden", background: "#e8e4df", marginBottom: 24 }} />
      <div style={{ background: "#fff", border: "1px solid #e8e0d5", borderRadius: 12, padding: "20px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#2D6A4F", textTransform: "uppercase", marginBottom: 14, fontWeight: "bold" }}>
          Route — {mapRoutePoints.length} Stops
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 8 }}>
          {mapRoutePoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 8, background: "#F9F6F1", border: "1px solid #ede8e0" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: point.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                {point.emoji}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: "bold", lineHeight: 1.3 }}>{point.name}</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{point.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackingTab() {
  const [person, setPerson] = useState("luke");
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem("nfld-packing-checked"); return s ? JSON.parse(s) : {}; }
    catch { return {}; }
  });

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem("nfld-packing-checked", JSON.stringify(next)); } catch {}
  };

  const data = packingData[person];
  const allIds = data.flatMap(bag => bag.sections.flatMap(sec => sec.items.map(it => it.id)));
  const checkedCount = allIds.filter(id => checked[id]).length;

  const clearPerson = () => {
    const next = { ...checked };
    allIds.forEach(id => delete next[id]);
    setChecked(next);
    try { localStorage.setItem("nfld-packing-checked", JSON.stringify(next)); } catch {}
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        {[{ id: "luke", label: "🧔 Luke" }, { id: "alexa", label: "👩 Alexa" }].map(p => (
          <button key={p.id} onClick={() => setPerson(p.id)} style={{ padding: "10px 22px", borderRadius: 24, border: `2px solid ${person === p.id ? "#2D6A4F" : "#d0c9be"}`, background: person === p.id ? "#2D6A4F" : "#fff", color: person === p.id ? "#fff" : "#444", fontSize: 14, fontWeight: person === p.id ? "bold" : "normal", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s" }}>
            {p.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#666" }}>{checkedCount} / {allIds.length} packed</div>
          {checkedCount > 0 && (
            <button onClick={clearPerson} style={{ fontSize: 11, color: "#999", background: "none", border: "1px solid #ddd", borderRadius: 12, padding: "4px 10px", cursor: "pointer", fontFamily: "Georgia, serif" }}>Clear</button>
          )}
        </div>
      </div>
      <div style={{ height: 4, background: "#e8e0d5", borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${allIds.length ? (checkedCount / allIds.length) * 100 : 0}%`, background: "#2D6A4F", borderRadius: 2, transition: "width 0.3s ease" }} />
      </div>
      {data.map((bag, bi) => (
        <div key={bi} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 10, borderBottom: `2px solid ${bag.accent}33` }}>
            <div style={{ width: 4, height: 28, background: bag.accent, borderRadius: 2, flexShrink: 0 }} />
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: "bold", color: bag.accent }}>{bag.bag}</h3>
          </div>
          {bag.sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{sec.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sec.items.map(it => (
                  <label key={it.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 14px", background: checked[it.id] ? "#F0FAF4" : "#fff", border: `1px solid ${checked[it.id] ? "#52B788" : "#e8e0d5"}`, borderRadius: 9, cursor: "pointer", transition: "all 0.15s" }}>
                    <input type="checkbox" checked={!!checked[it.id]} onChange={() => toggle(it.id)} style={{ marginTop: 2, accentColor: "#2D6A4F", width: 15, height: 15, flexShrink: 0, cursor: "pointer" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: "500", color: checked[it.id] ? "#999" : "#1a1a1a", textDecoration: checked[it.id] ? "line-through" : "none", lineHeight: 1.4 }}>
                        {it.item}
                        {it.qty && <span style={{ fontSize: 11, color: "#bbb", marginLeft: 6 }}>{it.qty}</span>}
                      </div>
                      {it.note && <div style={{ fontSize: 11, color: "#888", marginTop: 3, lineHeight: 1.5, fontStyle: "italic" }}>{it.note}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function Itinerary() {
  const [activeTab, setActiveTab] = useState("days");
  const [showHighlights, setShowHighlights] = useState(false);
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#F5F0E8", minHeight: "100vh", color: "#1a1a1a" }}>
      <div style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)", padding: "36px 24px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#95D5B2", textTransform: "uppercase", marginBottom: 8 }}>A Complete Travel Plan</div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: "normal", color: "#fff", letterSpacing: 1 }}>Newfoundland & Home</h1>
          <div style={{ fontSize: 14, color: "#B7E4C7", marginTop: 6, fontStyle: "italic" }}>August 28 – September 6, 2026</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {[{ label: "10 Days", icon: "📅" }, { label: "East & West Coast", icon: "🗺️" }, { label: "Boat Tour ✓", icon: "🛥️" }, { label: "Ferry ✓", icon: "⛴️" }].map(b => (
              <div key={b.label} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "#D8F3DC", letterSpacing: 0.5 }}>{b.icon} {b.label}</div>
            ))}
          </div>
          <button onClick={() => setShowHighlights(!showHighlights)} style={{ marginTop: 14, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "7px 18px", color: "#fff", fontSize: 12, cursor: "pointer" }}>
            {showHighlights ? "▲ Hide Highlights" : "★ Trip Highlights"}
          </button>
        </div>
      </div>
      {showHighlights && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e0d9ce", padding: "20px 16px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#2D6A4F", textTransform: "uppercase", marginBottom: 14, fontWeight: "bold" }}>Key Moments</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ background: "#F9F6F1", border: "1px solid #e8e0d5", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: "bold", lineHeight: 1.3 }}>{h.label}</div>
                    <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ background: "#fff", borderBottom: "2px solid #e0d9ce", display: "flex", justifyContent: "center", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "14px 20px", border: "none", borderBottom: activeTab === t.id ? "3px solid #2D6A4F" : "3px solid transparent", background: "transparent", cursor: "pointer", fontSize: 13, color: activeTab === t.id ? "#1B4332" : "#666", fontWeight: activeTab === t.id ? "bold" : "normal", fontFamily: "Georgia, serif", transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>
      {activeTab === "days" && <DaysTab />}
      {activeTab === "food" && <FoodTab />}
      {activeTab === "trail" && <TrailTab />}
      {activeTab === "map" && <MapTab />}
      {activeTab === "packing" && <PackingTab />}
    </div>
  );
}
