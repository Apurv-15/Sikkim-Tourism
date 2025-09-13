// Sikkim Monasteries and Destinations Data
export interface MonasteryData {
  id: string;
  name: string;
  nearestTown: string;
  significance: string;
  image: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  altitude?: string;
  specialFeatures: string[];
  difficulty?: 'easy' | 'moderate' | 'difficult';
  requiresPermit?: boolean;
  view360?: string;
}

export interface RegionData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  monasteries: MonasteryData[];
  specialNote?: string;
}

// Import existing images
import tsomgoLake from '@/assets/tsomgo-lake.jpg';
import yumthangValley from '@/assets/yumthang-valley.jpg';
import monastery from '@/assets/monastery.jpg';
import sikkimHero1 from '@/assets/sikkim-hero-1.jpg';
import eastSikkimImage from '@/assets/destination images/IMG_1.jpg';
import southSikkimImage from '@/assets/destination images/img_2.jpg';

export const regionsData: RegionData[] = [
  {
    id: 'east',
    name: 'East Sikkim',
    subtitle: 'The Capital Region',
    description: 'The most accessible region, with the capital city, Gangtok, as its hub.',
    image: eastSikkimImage,
    monasteries: [
      {
        id: 'rumtek',
        name: 'Rumtek Monastery',
        nearestTown: 'Gangtok',
        significance: 'The largest monastery in Sikkim and the main seat of the Karma Kagyu lineage of Tibetan Buddhism. It\'s a mini-city in itself.',
        image: monastery,
        coordinates: { lat: 27.2904, lng: 88.5625 },
        altitude: '5,200 ft',
        specialFeatures: ['Karma Kagyu Lineage', 'Largest Monastery', 'Golden Stupa', 'Traditional Architecture'],
        view360: 'https://www.google.com/maps/embed?pb=!4v1757699738499!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHNqcnJmWUE.!2m2!1d27.3059104605377!2d88.53628917812625!3f26.221613!4f0!5f0.7820865974627469',
        difficulty: 'easy'
      },
      {
        id: 'enchey',
        name: 'Enchey Monastery',
        nearestTown: 'Gangtok',
        significance: 'An important 200-year-old monastery of the Nyingma order, located right within Gangtok, believed to be protected by spirits.',
        image: monastery,
        coordinates: { lat: 27.3389, lng: 88.6065 },
        altitude: '6,200 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757699828787!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0pzTXEzOWdF!2m2!1d27.33593677395685!2d88.61916587167339!3f44.015686!4f0!5f0.7820865974627469',
        specialFeatures: ['Nyingma Order', '200 Years Old', 'Spirit Protection', 'City Location'],
        difficulty: 'easy'
      },
      {
        id: 'dodrul',
        name: 'Do-Drul Chorten & Monastery',
        nearestTown: 'Gangtok',
        significance: 'A massive stupa built in 1945, surrounded by 108 prayer wheels. The complex includes a monastery and is a major landmark in Gangtok.',
        image: monastery,
        coordinates: { lat: 27.3225, lng: 88.6121 },
        altitude: '5,500 ft',
        specialFeatures: ['108 Prayer Wheels', 'Massive Stupa', 'Built in 1945', 'Major Landmark'],
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'west',
    name: 'West Sikkim',
    subtitle: 'The Historical Heartland',
    description: 'This region is where the first capital of Sikkim was established, making it rich with historical and sacred sites. Pelling and Yuksom are the main bases here.',
    image: monastery,
    monasteries: [
      {
        id: 'pemayangtse',
        name: 'Pemayangtse Monastery',
        nearestTown: 'Pelling',
        significance: 'One of the oldest and most important monasteries in Sikkim, known for its wooden sculptures and murals, and the perfect view of Kanchenjunga.',
        image: monastery,
        coordinates: { lat: 27.3074, lng: 88.2544 },
        altitude: '6,840 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757699922593!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0U3SXFEeFFF!2m2!1d27.30426034149243!2d88.30153660084635!3f268.7781!4f0!5f0.7820865974627469',
        specialFeatures: ['17th Century', 'Wooden Sculptures', 'Ancient Paintings', 'Sublime Perfect Lotus'],
        difficulty: 'easy'
      },
      {
        id: 'tashiding',
        name: 'Tashiding Monastery',
        nearestTown: 'Yuksom / Pelling',
        significance: 'Considered the most sacred and holy monastery in Sikkim. It is believed that a single glance at the monastery can cleanse one of all sins. It hosts the famous Bhumchu festival.',
        image: monastery,
        coordinates: { lat: 27.2833, lng: 88.2167 },
        altitude: '4,600 ft',
        specialFeatures: ['Most Sacred', 'Sin Cleansing', 'Bhumchu Festival', 'Hilltop Location'],
        difficulty: 'moderate'
      },
      {
        id: 'sanga',
        name: 'Sanga Choeling Monastery',
        nearestTown: 'Pelling',
        significance: 'Established in the 17th century, it is one of the oldest monasteries in the state, accessible via a scenic walking trail with stunning views of Kanchenjunga.',
        image: monastery,
        coordinates: { lat: 27.2167, lng: 88.2000 },
        altitude: '7,200 ft',
        specialFeatures: ['17th Century', 'Kanchenjunga Views', 'Scenic Trail', 'Island of Esoteric Teaching'],
        difficulty: 'moderate'
      },
      {
        id: 'dubdi',
        name: 'Dubdi Monastery',
        nearestTown: 'Yuksom',
        significance: 'The first monastery established in Sikkim in 1701, also known as the Hermit\'s Cell after the solitary meditators who lived there.',
        image: monastery,
        coordinates: { lat: 27.3667, lng: 88.2333 },
        altitude: '6,900 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700057067!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRFVpdHkxNndF!2m2!1d27.36655288826205!2d88.22999220879571!3f322.33299132072915!4f3.036182471849969!5f0.4000000000000002',
        specialFeatures: ['First Monastery', 'Est. 1701', 'Trekking Required', 'The Hermit\'s Cell'],
        difficulty: 'moderate'
      },
      {
        id: 'khecheopalri',
        name: 'Khecheopalri Lake & Monastery',
        nearestTown: 'Pelling',
        significance: 'A sacred lake and monastery complex considered one of the most sacred in Sikkim, known for its wish-fulfilling powers.',
        image: tsomgoLake,
        coordinates: { lat: 27.3500, lng: 88.2000 },
        altitude: '6,000 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700141366!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0ctZlhuNkFF!2m2!1d27.34922097771846!2d88.18827678962926!3f22.460953!4f0!5f0.7820865974627469',
        specialFeatures: ['Wish-fulfilling Lake', 'Buddhist & Hindu Sacred', 'Pristine Waters', 'Monastery Overlook'],
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'south',
    name: 'South Sikkim',
    subtitle: 'The Statue and Pilgrimage Hub',
    description: 'This region is famous for its massive, awe-inspiring statues and modern pilgrimage centres. Ravangla and Namchi are the key towns.',
    image: southSikkimImage,
    monasteries: [
      {
        id: 'sanga-choeling',
        name: 'Sanga Choeling Monastery',
        nearestTown: 'Pelling',
        significance: 'The oldest monastery in Sikkim, established in 1697, offering panoramic views of the Himalayan range.',
        image: monastery,
        coordinates: { lat: 27.3000, lng: 88.2167 },
        altitude: '6,500 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700009211!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREVnS3p0dlFF!2m2!1d27.29775170700695!2d88.22168671699492!3f245.1103!4f0!5f0.7820865974627469',
        specialFeatures: ['Largest in South Sikkim', 'Pang Lhabsol Festival', 'Grand Scale', 'Cultural Hub'],
        difficulty: 'easy'
      },
      {
        id: 'buddha-park',
        name: 'Buddha Park',
        nearestTown: 'Ravangla',
        significance: 'Home to a magnificent 130-foot tall statue of Lord Buddha, offering panoramic views of the Himalayan range.',
        image: monastery,
        coordinates: { lat: 27.3167, lng: 88.3500 },
        altitude: '7,000 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700338545!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ3h5UFdocGdF!2m2!1d27.31201738720143!2d88.36375632509409!3f90.75193!4f0!5f0.7820865974627469',
        specialFeatures: ['130ft Buddha Statue', 'Modern Pilgrimage', 'Landscaped Gardens', 'Monastery Complex'],
        difficulty: 'easy'
      },
      {
        id: 'samdruptse',
        name: 'Samdruptse Hill',
        nearestTown: 'Namchi',
        significance: 'Home to a massive 135-foot tall statue of Guru Padmasambhava with panoramic views of the Eastern Himalayas.',
        image: monastery,
        coordinates: { lat: 27.1833, lng: 88.3833 },
        altitude: '7,000 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700396425!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ1J1TTdwVUE.!2m2!1d27.17997430510306!2d88.37967751567115!3f242.2022723076923!4f0.6025641025641022!5f0.4000000000000002',
        specialFeatures: ['Former Palace', 'Sikkimese Princess', 'Peaceful Retreat', 'Historical Significance'],
        difficulty: 'easy'
      },
      {
        id: 'bon',
        name: 'Bon Monastery',
        nearestTown: 'Namchi',
        significance: 'The only Bon monastery in Sikkim, representing the indigenous pre-Buddhist religion of Tibet.',
        image: monastery,
        coordinates: { lat: 27.2667, lng: 88.3333 },
        altitude: '6,500 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757700472252!6m8!1m7!1sLgsokm0jHwYRunieRkxAjg!2m2!1d27.27885150435554!2d88.33447050699141!3f196.34445!4f0!5f0.7820865974627469',
        specialFeatures: ['Bon Tradition', 'Pre-Buddhist', 'Unique in Sikkim', 'Tibetan Religion'],
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'north',
    name: 'North Sikkim',
    subtitle: 'The Remote and Rugged Frontier',
    description: 'This is a region of breathtaking, high-altitude landscapes. Visiting requires special permits.',
    image: yumthangValley,
    specialNote: 'Special permits required for visiting this region',
    monasteries: [
      {
        id: 'do-drul',
        name: 'Do-Drul Chorten',
        nearestTown: 'Gangtok',
        significance: 'One of the most important stupas in Sikkim, housing rare religious objects and a complete set of the Kangyur scriptures.',
        image: monastery,
        coordinates: { lat: 27.3316, lng: 88.6138 },
        altitude: '5,500 ft',
        view360: 'https://www.google.com/maps/embed?pb=!4v1757699868116!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREpwTkQ3emdF!2m2!1d27.31284146711967!2d88.60483660425811!3f353.4361!4f0!5f0.7820865974627469',
        specialFeatures: ['Kagyupa Order', 'Ancient Murals', 'High Altitude', 'Important Site'],
        difficulty: 'moderate',
        requiresPermit: true
      },
      {
        id: 'phodong',
        name: 'Phodong Monastery',
        nearestTown: 'Mangan',
        significance: 'One of the most important monasteries in North Sikkim, belonging to the Kagyupa order, with beautifully preserved old mural paintings.',
        image: monastery,
        coordinates: { lat: 27.5167, lng: 88.5500 },
        altitude: '8,500 ft',
        specialFeatures: ['Kagyupa Order', 'Ancient Murals', 'High Altitude', 'Important Site'],
        difficulty: 'moderate',
        requiresPermit: true
      },
      {
        id: 'labrang',
        name: 'Labrang Monastery',
        nearestTown: 'Mangan',
        significance: 'Located near Phodong, this monastery is unique for its architectural style and is one of the premier Nyingmapa monasteries in Sikkim.',
        image: monastery,
        coordinates: { lat: 27.5167, lng: 88.5500 },
        altitude: '8,200 ft',
        specialFeatures: ['Nyingmapa Order', 'Unique Architecture', 'Premier Monastery', 'High Altitude'],
        difficulty: 'moderate',
        requiresPermit: true
      },
      {
        id: 'lachen',
        name: 'Lachen Monastery',
        nearestTown: 'Lachen',
        significance: 'The primary monastery for the remote Lachen valley, it is a picturesque and important spiritual centre for the local community.',
        image: yumthangValley,
        coordinates: { lat: 27.7833, lng: 88.5500 },
        altitude: '9,000 ft',
        specialFeatures: ['Valley Monastery', 'Spiritual Centre', 'Remote Location', 'Community Hub'],
        difficulty: 'difficult',
        requiresPermit: true
      },
      {
        id: 'lachung',
        name: 'Lachung Monastery',
        nearestTown: 'Lachung',
        significance: 'Situated amidst the stunning scenery of the Lachung valley (the gateway to Yumthang Valley), this monastery is a beautiful example of Tibetan architecture.',
        image: yumthangValley,
        coordinates: { lat: 27.7000, lng: 88.7500 },
        altitude: '8,610 ft',
        specialFeatures: ['Yumthang Gateway', 'Tibetan Architecture', 'Stunning Scenery', 'Valley Views'],
        difficulty: 'difficult',
        requiresPermit: true
      }
    ]
  }
];