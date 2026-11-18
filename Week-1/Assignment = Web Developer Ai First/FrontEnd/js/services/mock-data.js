/**
 * Mock Data Store
 * Provides realistic destination data for development and testing
 * 
 * Data Structure (matching Destination model schema):
 * - id: string (unique identifier)
 * - name: string (destination name)
 * - location: string (location/country)
 * - description: string (short description, max 200 chars)
 * - fullDescription: string (detailed description, 100-2000 chars)
 * - price: number (price per person in USD)
 * - imageUrl: string (main image URL)
 * - additionalImages: array<string> (additional image URLs)
 * - tags: array<string> (searchable tags)
 */

export const mockDestinations = [
  {
    id: 'dest-001',
    name: 'Bali Paradise Beach',
    location: 'Bali, Indonesia',
    description: 'Experience pristine beaches, ancient temples, and vibrant culture in the Island of Gods. Perfect blend of relaxation and adventure.',
    fullDescription: 'Bali is a tropical paradise that offers something for every traveler. From the stunning beaches of Seminyak and Nusa Dua to the cultural heart of Ubud, Bali combines natural beauty with rich traditions. Explore ancient temples like Tanah Lot and Uluwatu, witness breathtaking rice terraces, practice yoga overlooking jungle valleys, or surf world-class waves. The island\'s warm hospitality, delicious cuisine, and spiritual atmosphere create an unforgettable experience. Whether you seek adventure, relaxation, or cultural immersion, Bali delivers it all in one enchanting destination.',
    price: 1299,
    imageUrl: 'assets/images/destinations/bali-beach.jpg',
    additionalImages: [
      'assets/images/destinations/bali-temple.jpg',
      'assets/images/destinations/bali-rice-terrace.jpg'
    ],
    tags: ['beach', 'culture', 'temples', 'indonesia', 'surfing', 'yoga']
  },
  {
    id: 'dest-002',
    name: 'Bangkok City Experience',
    location: 'Bangkok, Thailand',
    description: 'Discover the vibrant capital of Thailand with its grand palaces, bustling markets, street food paradise, and exciting nightlife.',
    fullDescription: 'Bangkok is a city that never sleeps, offering an intoxicating blend of tradition and modernity. Marvel at the golden spires of the Grand Palace and Wat Phra Kaew, cruise along the Chao Phraya River, and explore floating markets. The city is a food lover\'s dream with world-renowned street food, Michelin-starred restaurants, and rooftop bars offering stunning skyline views. Shop at massive malls or traditional markets, visit ornate temples, and experience the famous Thai massage. Bangkok\'s energy, affordability, and endless activities make it perfect for first-time visitors and seasoned travelers alike.',
    price: 899,
    imageUrl: 'assets/images/destinations/bangkok-palace.jpg',
    additionalImages: [
      'assets/images/destinations/bangkok-market.jpg',
      'assets/images/destinations/bangkok-temple.jpg'
    ],
    tags: ['city', 'culture', 'temples', 'thailand', 'street food', 'shopping', 'nightlife']
  },
  {
    id: 'dest-003',
    name: 'Ha Long Bay Cruise',
    location: 'Quang Ninh, Vietnam',
    description: 'Sail through emerald waters surrounded by thousands of limestone karsts and explore hidden caves in this UNESCO World Heritage Site.',
    fullDescription: 'Ha Long Bay is one of the world\'s most spectacular natural wonders. This UNESCO World Heritage Site features nearly 2,000 limestone islands rising dramatically from emerald waters. Experience the magic aboard a traditional junk boat, cruising past towering karsts, exploring mystical caves like Sung Sot Cave, and kayaking through hidden lagoons. Visit floating fishing villages, try your hand at Vietnamese cooking classes on deck, and watch stunning sunsets paint the karsts golden. The bay offers luxury cruises with fine dining and spa treatments, or budget-friendly options for backpackers. It\'s a photographer\'s paradise and a must-visit destination in Southeast Asia.',
    price: 1599,
    imageUrl: 'assets/images/destinations/halong-bay.jpg',
    additionalImages: [
      'assets/images/destinations/halong-boat.jpg',
      'assets/images/destinations/halong-cave.jpg'
    ],
    tags: ['nature', 'cruise', 'unesco', 'vietnam', 'islands', 'caves', 'kayaking']
  },
  {
    id: 'dest-004',
    name: 'Boracay Island Getaway',
    location: 'Aklan, Philippines',
    description: 'Relax on powdery white sand beaches, enjoy crystal-clear waters, and experience world-class island hospitality.',
    fullDescription: 'Boracay is famous for its stunning White Beach, consistently ranked among the world\'s best beaches. The island offers 4 kilometers of powdery white sand, crystal-clear turquoise waters perfect for swimming, and spectacular sunsets. Beyond the beach, enjoy island hopping to nearby spots, try thrilling water sports like parasailing and jet skiing, or go scuba diving to explore vibrant coral reefs. The island has transformed into a sustainable paradise after its rehabilitation, with improved facilities while maintaining its natural beauty. From budget hostels to luxury resorts, beachfront dining to fire dancing shows, Boracay provides the ultimate tropical island experience.',
    price: 1150,
    imageUrl: 'assets/images/destinations/boracay-beach.jpg',
    additionalImages: [
      'assets/images/destinations/boracay-sunset.jpg',
      'assets/images/destinations/boracay-water-sports.jpg'
    ],
    tags: ['beach', 'island', 'philippines', 'water sports', 'diving', 'sunset', 'relaxation']
  },
  {
    id: 'dest-005',
    name: 'Angkor Wat Temple Complex',
    location: 'Siem Reap, Cambodia',
    description: 'Explore the magnificent ancient temple complex, one of the most important archaeological sites in Southeast Asia.',
    fullDescription: 'Angkor Wat is the crown jewel of Cambodia and the largest religious monument in the world. This UNESCO World Heritage Site spans over 400 square kilometers and contains the remains of the Khmer Empire from the 9th to 15th centuries. Watch sunrise over Angkor Wat\'s iconic towers, explore the tree-entwined ruins of Ta Prohm (made famous by Tomb Raider), and marvel at the enigmatic faces of Bayon Temple. Beyond the temples, Siem Reap offers vibrant night markets, traditional Apsara dance performances, and delicious Khmer cuisine. The site requires 2-3 days to explore properly, offering a profound journey through history and spirituality.',
    price: 950,
    imageUrl: 'assets/images/destinations/angkor-wat.jpg',
    additionalImages: [
      'assets/images/destinations/angkor-bayon.jpg',
      'assets/images/destinations/angkor-ta-prohm.jpg'
    ],
    tags: ['culture', 'temples', 'unesco', 'cambodia', 'history', 'archaeology', 'sunrise']
  },
  {
    id: 'dest-006',
    name: 'Phuket Beach Resort',
    location: 'Phuket, Thailand',
    description: 'Thailand\'s largest island offers stunning beaches, vibrant nightlife, and excellent diving opportunities in the Andaman Sea.',
    fullDescription: 'Phuket is Thailand\'s most famous island destination, offering everything from serene beaches to pulsing nightlife. Patong Beach provides the action with beach clubs, restaurants, and the famous Bangla Road nightlife. For tranquility, head to Kata, Karon, or the upscale Surin Beach. Take a day trip to the stunning Phi Phi Islands, go diving or snorkeling in crystal-clear waters, or visit the Big Buddha for panoramic views. The island offers luxury resorts with world-class spas, fresh seafood at beachfront restaurants, and cultural experiences at local temples and markets. Phuket perfectly balances relaxation with adventure.',
    price: 1099,
    imageUrl: 'assets/images/destinations/phuket-beach.jpg',
    additionalImages: [
      'assets/images/destinations/phuket-sunset.jpg',
      'assets/images/destinations/phuket-diving.jpg'
    ],
    tags: ['beach', 'island', 'thailand', 'nightlife', 'diving', 'resorts', 'day trips']
  },
  {
    id: 'dest-007',
    name: 'Komodo Island Adventure',
    location: 'East Nusa Tenggara, Indonesia',
    description: 'Encounter the legendary Komodo dragons and explore pristine diving spots with incredible marine biodiversity.',
    fullDescription: 'Komodo Island offers one of the world\'s most unique wildlife experiences - seeing Komodo dragons in their natural habitat. These ancient reptiles, the world\'s largest lizards, roam freely across the rugged landscape of Komodo National Park, a UNESCO World Heritage Site. Beyond the dragons, the park offers world-class diving and snorkeling with manta rays, sea turtles, and vibrant coral reefs. Trek to panoramic viewpoints like Padar Island, relax on the rare pink sand beaches, and witness stunning sunsets. This remote destination combines adventure, wildlife, and underwater wonders, making it perfect for nature enthusiasts and divers seeking something extraordinary.',
    price: 1750,
    imageUrl: 'assets/images/destinations/komodo-dragon.jpg',
    additionalImages: [
      'assets/images/destinations/komodo-island.jpg',
      'assets/images/destinations/komodo-diving.jpg'
    ],
    tags: ['wildlife', 'adventure', 'indonesia', 'diving', 'unesco', 'nature', 'islands']
  },
  {
    id: 'dest-008',
    name: 'Kuala Lumpur City Break',
    location: 'Kuala Lumpur, Malaysia',
    description: 'Experience Malaysia\'s modern capital with iconic Petronas Towers, diverse cuisine, and blend of cultural influences.',
    fullDescription: 'Kuala Lumpur is a dynamic metropolis where gleaming skyscrapers stand alongside colonial architecture and ancient temples. The iconic Petronas Twin Towers dominate the skyline, offering breathtaking views from the sky bridge. Explore the colorful Batu Caves, shop at massive malls or vibrant street markets in Chinatown, and sample incredible food at Jalan Alor food street. The city showcases Malaysia\'s multicultural heritage with Hindu temples, Chinese shophouses, and Islamic mosques coexisting harmoniously. Visit during festivals to experience the city\'s cultural diversity. With excellent public transport, affordable prices, and endless dining options, KL is perfect for urban explorers.',
    price: 799,
    imageUrl: 'assets/images/destinations/kuala-lumpur-towers.jpg',
    additionalImages: [
      'assets/images/destinations/kl-batu-caves.jpg',
      'assets/images/destinations/kl-street-food.jpg'
    ],
    tags: ['city', 'malaysia', 'culture', 'food', 'shopping', 'modern', 'temples']
  },
  {
    id: 'dest-009',
    name: 'Luang Prabang Heritage',
    location: 'Luang Prabang, Laos',
    description: 'Step back in time in this UNESCO town with French colonial architecture, Buddhist temples, and serene riverside setting.',
    fullDescription: 'Luang Prabang is a living museum where time seems to stand still. This UNESCO World Heritage town sits at the confluence of the Mekong and Nam Khan rivers, surrounded by mountains. Wake early to witness the daily alms-giving ceremony where hundreds of monks collect offerings. Explore golden temples like Wat Xieng Thong, climb Mount Phousi for sunset views, and wander through night markets selling handmade crafts. Visit the stunning Kuang Si Waterfalls with their turquoise pools, take a slow boat along the Mekong, and savor French-Lao fusion cuisine. The town\'s peaceful atmosphere and preserved heritage offer a spiritual retreat from modern Southeast Asia.',
    price: 850,
    imageUrl: 'assets/images/destinations/luang-prabang-temple.jpg',
    additionalImages: [
      'assets/images/destinations/luang-prabang-monks.jpg',
      'assets/images/destinations/luang-prabang-waterfall.jpg'
    ],
    tags: ['culture', 'unesco', 'laos', 'temples', 'heritage', 'spiritual', 'waterfalls']
  },
  {
    id: 'dest-010',
    name: 'Raja Ampat Diving Paradise',
    location: 'West Papua, Indonesia',
    description: 'Dive into the heart of the Coral Triangle with the world\'s most biodiverse marine life and pristine islands.',
    fullDescription: 'Raja Ampat is the holy grail for divers and marine enthusiasts. Located in the Coral Triangle, this remote archipelago boasts the world\'s richest marine biodiversity with over 1,500 fish species and 600 coral species. Dive sites like Cape Kri offer incredible underwater experiences with schools of fish, manta rays, sharks, and vibrant coral gardens. Above water, limestone karsts covered in jungle rise from turquoise waters, creating a surreal landscape. Visit traditional villages, kayak through hidden lagoons, and witness spectacular sunsets. While remote and requiring effort to reach, Raja Ampat rewards adventurers with untouched natural beauty and world-class diving.',
    price: 2450,
    imageUrl: 'assets/images/destinations/raja-ampat-islands.jpg',
    additionalImages: [
      'assets/images/destinations/raja-ampat-diving.jpg',
      'assets/images/destinations/raja-ampat-underwater.jpg'
    ],
    tags: ['diving', 'islands', 'indonesia', 'nature', 'adventure', 'marine life', 'remote']
  },
  {
    id: 'dest-011',
    name: 'Hoi An Ancient Town',
    location: 'Quang Nam, Vietnam',
    description: 'Wander through lantern-lit streets of this charming UNESCO town with preserved architecture and tailoring shops.',
    fullDescription: 'Hoi An is a perfectly preserved ancient trading port that transports visitors to a bygone era. By day, explore Japanese bridges, Chinese assembly halls, and French colonial buildings painted in distinctive yellow. As night falls, thousands of colorful lanterns illuminate the streets, reflecting in the Thu Bon River, creating a magical atmosphere. The town is famous for custom tailoring - get clothes made to measure in 24 hours. Try local specialties like cao lau noodles and banh mi, take a cooking class, or cycle through nearby rice paddies to the beach. The nearby My Son ruins and marble mountains add cultural depth to your visit.',
    price: 899,
    imageUrl: 'assets/images/destinations/hoi-an-lanterns.jpg',
    additionalImages: [
      'assets/images/destinations/hoi-an-bridge.jpg',
      'assets/images/destinations/hoi-an-street.jpg'
    ],
    tags: ['culture', 'unesco', 'vietnam', 'heritage', 'food', 'shopping', 'lanterns']
  },
  {
    id: 'dest-012',
    name: 'Chiang Mai Mountain Retreat',
    location: 'Chiang Mai, Thailand',
    description: 'Discover Northern Thailand\'s cultural capital with ancient temples, mountain landscapes, and elephant sanctuaries.',
    fullDescription: 'Chiang Mai offers a more laid-back alternative to Bangkok, surrounded by mountains and steeped in Lanna culture. The old city contains over 300 temples, including the stunning Wat Phra That Doi Suthep perched on a mountain. Visit ethical elephant sanctuaries, trek through hill tribe villages, and explore night markets selling handicrafts. The city has become a digital nomad hub with excellent cafes and coworking spaces. Take cooking classes to learn Thai cuisine, get traditional massages, or join a meditation retreat. Adventure seekers can zip-line through jungles, white-water raft, or motorcycle through scenic mountain roads. The cool season (November-February) offers pleasant weather.',
    price: 749,
    imageUrl: 'assets/images/destinations/chiang-mai-temple.jpg',
    additionalImages: [
      'assets/images/destinations/chiang-mai-elephant.jpg',
      'assets/images/destinations/chiang-mai-market.jpg'
    ],
    tags: ['culture', 'thailand', 'temples', 'mountains', 'elephants', 'trekking', 'food']
  },
  {
    id: 'dest-013',
    name: 'Singapore City State',
    location: 'Singapore',
    description: 'Explore the futuristic Garden City with world-class attractions, diverse food scene, and immaculate urban planning.',
    fullDescription: 'Singapore is a marvel of modern urban planning where nature and technology coexist harmoniously. Marvel at Gardens by the Bay with its futuristic Supertrees and climate-controlled domes, explore diverse neighborhoods from historic Chinatown to Little India to Arab Street, and enjoy world-class dining from hawker centers to Michelin-starred restaurants. Visit Marina Bay Sands for rooftop views, walk through the lush Botanical Gardens (UNESCO site), and experience universal studios and the night safari. Despite being expensive, Singapore is safe, clean, and efficient with excellent public transport. The city-state\'s multicultural character, strict laws, and impressive attractions make it a unique Southeast Asian destination.',
    price: 1399,
    imageUrl: 'assets/images/destinations/singapore-marina-bay.jpg',
    additionalImages: [
      'assets/images/destinations/singapore-gardens.jpg',
      'assets/images/destinations/singapore-chinatown.jpg'
    ],
    tags: ['city', 'singapore', 'modern', 'food', 'shopping', 'gardens', 'diverse']
  },
  {
    id: 'dest-014',
    name: 'Palawan Island Paradise',
    location: 'Palawan, Philippines',
    description: 'Discover pristine beaches, underground rivers, and limestone cliffs in the Philippines\' last frontier.',
    fullDescription: 'Palawan has been voted the world\'s best island multiple times, and it\'s easy to see why. El Nido offers dramatic limestone cliffs, hidden lagoons, and island-hopping adventures. Coron provides world-class wreck diving in crystal-clear waters and stunning mountain-top lake views. The Puerto Princesa Underground River is a UNESCO World Heritage Site featuring a navigable subterranean river through a cave system. Port Barton offers a more relaxed vibe for those seeking tranquility. The island maintains a relatively undeveloped feel compared to other Philippine destinations, with incredible marine biodiversity, white sand beaches, and friendly locals. It\'s perfect for adventurers and beach lovers.',
    price: 1250,
    imageUrl: 'assets/images/destinations/palawan-el-nido.jpg',
    additionalImages: [
      'assets/images/destinations/palawan-lagoon.jpg',
      'assets/images/destinations/palawan-beach.jpg'
    ],
    tags: ['beach', 'island', 'philippines', 'diving', 'nature', 'unesco', 'adventure']
  },
  {
    id: 'dest-015',
    name: 'Mount Bromo Sunrise Trek',
    location: 'East Java, Indonesia',
    description: 'Witness spectacular volcanic sunrise views and explore the otherworldly landscape of the Tengger caldera.',
    fullDescription: 'Mount Bromo offers one of Southeast Asia\'s most spectacular sunrise experiences. Wake before dawn for a jeep ride across the Sea of Sand, a vast volcanic plain, then hike to a viewpoint as the sun rises over the smoking Bromo crater and surrounding peaks. The landscape feels like another planet, with Mount Semeru (Java\'s highest peak) often visible in the background. After sunrise, descend to explore the crater rim, feeling the earth\'s power as sulfurous smoke rises from the active volcano. Visit traditional Tenggerese villages that maintain their unique culture and Hindu beliefs. The cool mountain air and dramatic scenery make this a must-visit for adventure photographers and nature lovers.',
    price: 699,
    imageUrl: 'assets/images/destinations/mount-bromo.jpg',
    additionalImages: [
      'assets/images/destinations/bromo-crater.jpg',
      'assets/images/destinations/bromo-sea-of-sand.jpg'
    ],
    tags: ['volcano', 'adventure', 'indonesia', 'nature', 'trekking', 'sunrise', 'photography']
  }
];

