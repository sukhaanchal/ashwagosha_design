export const LOCATIONS = [
  { city: 'Kolkata', tz: 'Asia/Calcutta' },
  { city: 'Mumbai', tz: 'Asia/Kolkata' },
  { city: 'Delhi', tz: 'Asia/Kolkata' },
  { city: 'Bengaluru', tz: 'Asia/Kolkata' },
  { city: 'Dubai', tz: 'Asia/Dubai' },
  { city: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
  { city: 'San Francisco', tz: 'America/Los_Angeles' },
];

export const PANCHANG = {
  tithi: { name: 'Shukla Shashthi', until: '17:51', label: 'Tithi', devanagari: 'तिथि', paksha: 'Shukla paksha', fullName: 'Shashthi', then: 'then Saptami begins', description: 'The sixth lunar day of the waxing moon. Traditionally kind to health, healing, and matters begun with steady intention. Avoid confrontation in the afternoon.' },
  nakshatra: { name: 'Swati', until: '6:47', pada: 'Pada 1', label: 'Nakshatra', devanagari: 'नक्षत्र', then: 'then Vishakha', description: 'Ruled by Vayu, the wind. Independence, movement, learning. Deity: Vayu. Symbol: young shoot in the breeze. Favourable for travel, negotiation, and creative solo work.' },
  yoga: { name: 'Shukla', until: '3:23', label: 'Yoga', devanagari: 'योग', description: 'Auspicious for study, teaching, and formal beginnings.' },
  karana: { name: 'Taitila', until: '17:51', label: 'Karana', devanagari: 'करण', description: 'Soft, favourable half-day for domestic and social matters.' },
  sunrise: '6:19',
  sunset: '19:03',
  sunDay: 'Thursday',
  sunNak: 'Shravana',
  moonrise: '10:42',
  moonset: '22:18',
  moonRashi: 'Tula',
  sunSign: 'Simha',
  rahuKaal: { start: '15:52', end: '17:27', note: 'Avoid new beginnings' },
  abhijit: { start: '12:15', end: '13:06', note: 'Auspicious window' },
  vara: { name: 'Guru vara', sub: 'Thursday · Jupiter' },
  ayana: { name: 'Dakshinayana', sub: 'Varsha (Monsoon)' },
  intro: 'A soft Shashthi under Swati — a day for gentle beginnings, patient conversations, and the small acts that steady a week.',
};

export const WINDOWS = [
  { name: 'Abhijit muhurta', sub: 'Auspicious window', time: '12:15 – 13:06' },
  { name: 'Brahma muhurta', sub: 'Sadhana & study', time: '4:41 – 5:30' },
  { name: 'Amrit kaal', sub: 'Nectarine hour', time: '9:22 – 10:54' },
  { name: 'Godhuli', sub: 'Twilight window', time: '18:48 – 19:12' },
];

export const AVOID_WINDOWS = [
  { name: 'Rahu kaal', time: '15:52 – 17:27' },
  { name: 'Yamaganda', time: '6:19 – 7:54' },
  { name: 'Gulika kaal', time: '9:29 – 11:04' },
  { name: 'Varjyam', time: '21:04 – 22:36' },
];

export const HORA = [
  { time: '6:19', planet: 'Jupiter' },
  { time: '7:23', planet: 'Mars' },
  { time: '8:26', planet: 'Sun' },
  { time: '9:29', planet: 'Venus' },
  { time: '10:33', planet: 'Mercury' },
  { time: '11:36', planet: 'Moon' },
];

export const SAMVAT = {
  vikram: '2083 · Kalayukta',
  shaka: '1948 · Vishvavasu',
  amanta: 'Shravana',
  purnimanta: 'Bhadrapada',
};

export const CHANDRA_BALA = 'Mesha, Mithuna, Simha, Tula, Dhanu, Kumbha';
export const TARA_BALA = 'Ashwini, Rohini, Pushya, Magha, Hasta, Anuradha, Uttara Ashadha, Shatabhisha';

export const COMING_UP = [
  { name: 'Shravana Putrada Ekadashi', meta: 'in 5 days · Sun 23 Aug · Shravana · Varsha (Monsoon) · Vrat', icon: 'spark' },
  { name: 'Raksha Bandhan', meta: 'in 9 days · Thu 27 Aug · Shravana · Sharad (Autumn) · Festival', icon: 'party' },
  { name: 'Shravana Purnima', meta: 'in 10 days · Fri 28 Aug · Shravana · Sharad (Autumn) · Full moon', icon: 'sun' },
  { name: 'Krishna Janmashtami', meta: 'in 17 days · Fri 4 Sept · Bhadrapada · Sharad (Autumn) · Festival', icon: 'party' },
];
