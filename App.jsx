import { useState } from "react";

const TABS = [
  { id: "days", label: "📅 Itinerary" },
  { id: "food", label: "🍽️ Food & Drink" },
  { id: "trail", label: "🎒 Trail Essentials" },
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
      { time: "Afternoon", icon: "🚗", title: "Travel to Oromocto / Fredericton Area (~1 hr)", details: "Oromocto is about 100km from Saint John — an easy one-hour drive. Get settled before tomorrow's wedding. This is also where you'll be staying overnight." },
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
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "14px 24px", border: "none", borderBottom: activeTab === t.id ? "3px solid #2D6A4F" : "3px solid transparent", background: "transparent", cursor: "pointer", fontSize: 14, color: activeTab === t.id ? "#1B4332" : "#666", fontWeight: activeTab === t.id ? "bold" : "normal", fontFamily: "Georgia, serif", transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "days" && <DaysTab />}
      {activeTab === "food" && <FoodTab />}
      {activeTab === "trail" && <TrailTab />}
    </div>
  );
}
