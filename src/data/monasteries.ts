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

export const regionsData: RegionData[] = [
  {
    id: 'east',
    name: 'East Sikkim',
    subtitle: 'The Capital Region',
    description: 'The most accessible region, with the capital city, Gangtok, as its hub.',
    image: sikkimHero1,
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
        significance: 'One of the oldest and most important monasteries in Sikkim, founded in the 17th century. It features incredible wooden sculptures and paintings.',
        image: monastery,
        coordinates: { lat: 27.2065, lng: 88.2126 },
        altitude: '6,840 ft',
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
        significance: 'The very first monastery established in Sikkim in 1701. Reaching it requires a moderate trek, making it a pilgrimage for the determined.',
        image: monastery,
        coordinates: { lat: 27.3667, lng: 88.2167 },
        altitude: '6,800 ft',
        specialFeatures: ['First Monastery', 'Est. 1701', 'Trekking Required', 'The Hermit\'s Cell'],
        difficulty: 'moderate'
      },
      {
        id: 'khecheopalri',
        name: 'Khecheopalri Lake & Monastery',
        nearestTown: 'Pelling / Yuksom',
        significance: 'A sacred, wish-fulfilling lake for both Buddhists and Hindus. A small monastery overlooks this serene and pristine waterbody.',
        image: tsomgoLake,
        coordinates: { lat: 27.3167, lng: 88.2167 },
        altitude: '5,650 ft',
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
    image: sikkimHero1,
    monasteries: [
      {
        id: 'ralang',
        name: 'Ralang Monastery',
        nearestTown: 'Ravangla',
        significance: 'The largest monastery in South Sikkim, famous for its grand scale and for hosting the spectacular Pang Lhabsol festival.',
        image: monastery,
        coordinates: { lat: 27.2833, lng: 88.5167 },
        altitude: '4,200 ft',
        specialFeatures: ['Largest in South Sikkim', 'Pang Lhabsol Festival', 'Grand Scale', 'Cultural Hub'],
        difficulty: 'easy'
      },
      {
        id: 'buddha-park',
        name: 'Buddha Park (Tathagata Tsal)',
        nearestTown: 'Ravangla',
        significance: 'A major modern pilgrimage site featuring a 130-foot-high statue of the Buddha, set in beautifully landscaped gardens with a monastery within the complex.',
        image: monastery,
        coordinates: { lat: 27.2833, lng: 88.5167 },
        altitude: '7,000 ft',
        specialFeatures: ['130ft Buddha Statue', 'Modern Pilgrimage', 'Landscaped Gardens', 'Monastery Complex'],
        difficulty: 'easy'
      },
      {
        id: 'samdruptse',
        name: 'Samdruptse Hill (Guru Padmasambhava Statue)',
        nearestTown: 'Namchi',
        significance: 'Home to the world\'s largest statue of Guru Padmasambhava (Guru Rinpoche), the patron saint of Sikkim. The hill offers panoramic views.',
        image: sikkimHero1,
        coordinates: { lat: 27.1667, lng: 88.3667 },
        altitude: '5,500 ft',
        specialFeatures: ['World\'s Largest Statue', 'Guru Rinpoche', 'Panoramic Views', 'Patron Saint'],
        difficulty: 'easy'
      },
      {
        id: 'ngadak',
        name: 'Ngadak Monastery',
        nearestTown: 'Namchi',
        significance: 'An older, serene monastery that promises a peaceful retreat. It was once a palace for a Sikkimese princess.',
        image: monastery,
        coordinates: { lat: 27.1667, lng: 88.3667 },
        altitude: '4,800 ft',
        specialFeatures: ['Former Palace', 'Sikkimese Princess', 'Peaceful Retreat', 'Historical Significance'],
        difficulty: 'easy'
      },
      {
        id: 'bon',
        name: 'Bon Monastery',
        nearestTown: 'Ravangla',
        significance: 'The only monastery in Sikkim that belongs to the Bon tradition, which is a pre-Buddhist Tibetan religion. A unique cultural site.',
        image: monastery,
        coordinates: { lat: 27.2833, lng: 88.5167 },
        altitude: '6,200 ft',
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