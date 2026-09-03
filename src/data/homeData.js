export const ZODIAC_SIGNS = [
  { name: 'Aries',       glyph: '♈', range: 'Mar 21 – Apr 19',  blurb: 'Fire moves fast today. Choose one thing to start and let the rest wait.' },
  { name: 'Taurus',      glyph: '♉', range: 'Apr 20 – May 20',  blurb: 'Slowness is a strategy. Return to the body before you return to the plan.' },
  { name: 'Gemini',      glyph: '♊', range: 'May 21 – Jun 20',  blurb: 'A conversation you’ve been avoiding wants to happen. Keep it short and honest.' },
  { name: 'Cancer',      glyph: '♋', range: 'Jun 21 – Jul 22',  blurb: 'Home is a feeling before it is a place. Tend to yours in a small way tonight.' },
  { name: 'Leo',         glyph: '♌', range: 'Jul 23 – Aug 22',  blurb: 'Warmth without performance. Let people see you at rest, not just at play.' },
  { name: 'Virgo',       glyph: '♍', range: 'Aug 23 – Sep 22',  blurb: 'Precision serves you when it serves love. Ask what the work is actually for.' },
  { name: 'Libra',       glyph: '♎', range: 'Sep 23 – Oct 22',  blurb: 'Balance is not the middle of two opinions. It’s knowing which one is yours.' },
  { name: 'Scorpio',     glyph: '♏', range: 'Oct 23 – Nov 21',  blurb: 'You feel the undercurrent before others do. Trust it, and speak it plainly.' },
  { name: 'Sagittarius', glyph: '♐', range: 'Nov 22 – Dec 21',  blurb: 'A far horizon calls. Look up. Even a short walk today changes the mood.' },
  { name: 'Capricorn',   glyph: '♑', range: 'Dec 22 – Jan 19',  blurb: 'Steady is a superpower. Let one small commitment carry you through the day.' },
  { name: 'Aquarius',    glyph: '♒', range: 'Jan 20 – Feb 18',  blurb: 'Your outside view is a gift. Share it once, then let others sit with it.' },
  { name: 'Pisces',      glyph: '♓', range: 'Feb 19 – Mar 20',  blurb: 'Dreams are data. Write down whatever surfaces before you scroll anything else.' },
];

export const HOROSCOPE_FULL_TEXT = {
  Aries:       { stats: { mood: 'Fired up', lucky: '7', color: 'Crimson' }, love: 'Say the direct thing. Aries loves clean sentences, and the person on the other side of the conversation does too.', career: 'Start before you feel ready. One hour of visible work today outweighs a week of quiet planning.', wellness: 'Move your body first, think second. A short walk resets the nervous system faster than another cup of coffee.', spiritual: 'Fire is asking to be tended, not chased. Light a single candle and watch it for a full minute.' },
  Taurus:      { stats: { mood: 'Grounded', lucky: '4', color: 'Moss' }, love: 'Small, tender rituals matter more today than big gestures. Notice the person who notices you.', career: 'Protect your focus. One hour of unbroken attention will outperform five hours of half-attention.', wellness: 'Feed the senses gently. Warm food, warm shower, warm light. The body is asking for kindness.', spiritual: 'Return to what is already true. You do not have to become anything new today.' },
  Gemini:      { stats: { mood: 'Curious', lucky: '3', color: 'Silver' }, love: 'Speak first. A short message today does more work than a long one tomorrow.', career: 'Pick one thread and pull. Your best ideas are the ones you finish, not the ones you list.', wellness: 'Your nervous system likes rhythm. Ten slow breaths before your next meeting.', spiritual: 'Meaning arrives when you stop switching tabs. Sit with one question for five minutes.' },
  Cancer:      { stats: { mood: 'Tender', lucky: '2', color: 'Pearl' }, love: 'Home is a person as often as it is a place. Text the one who feels like both.', career: 'Trust the quiet read of the room. You know something the loud people do not.', wellness: 'Water, sleep, softness. Nothing dramatic is asked of you today.', spiritual: 'Memory is a form of prayer. Sit with one you love and don’t rush it.' },
  Leo:         { stats: { mood: 'Warm', lucky: '1', color: 'Gold' }, love: 'Generosity today is not about gifts. It is about time. Give yours to one person fully.', career: 'Lead by doing. One finished task will outshine three announcements.', wellness: 'Rest is not laziness when it follows effort. Let the body catch up.', spiritual: 'The sun does not compete with the moon. Neither should you.' },
  Virgo:       { stats: { mood: 'Clear', lucky: '5', color: 'Sage' }, love: 'Stop editing the text. Send the one that is true.', career: 'Perfectionism is fear with a nicer name. Ship the draft. Iterate tomorrow.', wellness: 'Your gut knows before your head does. Eat slowly and listen.', spiritual: 'Order is a prayer when it serves peace. Chaos is also prayer when it serves truth.' },
  Libra:       { stats: { mood: 'Balanced', lucky: '6', color: 'Rose' }, love: 'The fairest thing you can do today is choose. Indecision is its own answer.', career: 'Partner work flows naturally. Lean into collaboration, not solo sprints.', wellness: 'Beauty feeds the spirit. Arrange something lovely in your space today.', spiritual: 'Harmony starts inside. Find the note you are avoiding and hum it.' },
  Scorpio:     { stats: { mood: 'Intense', lucky: '9', color: 'Obsidian' }, love: 'Depth is your language. Find someone who speaks it and go one layer further.', career: 'You see what others miss. Today, name it out loud instead of holding it.', wellness: 'Release something small. A grudge, a habit, a tab you keep open.', spiritual: 'Transformation is not dramatic. It is one degree of heat, held steady.' },
  Sagittarius: { stats: { mood: 'Open', lucky: '3', color: 'Indigo' }, love: 'Adventure is not always a place. Today it is a question you ask someone close.', career: 'Aim for done, not perfect. You move fastest when you stop recalculating.', wellness: 'Go outside. Even ten minutes changes the chemistry of the day.', spiritual: 'Wonder is the beginning of wisdom. Let one thing genuinely surprise you.' },
  Capricorn:   { stats: { mood: 'Steady', lucky: '8', color: 'Slate' }, love: 'Reliability is romantic. Show up when you said you would.', career: 'Small, consistent progress beats a single heroic push. Keep going.', wellness: 'Structure is your comfort. Build a routine that holds the day together.', spiritual: 'Patience is not passivity. It is faith that the work will work.' },
  Aquarius:    { stats: { mood: 'Electric', lucky: '11', color: 'Cerulean' }, love: 'Your independence is attractive. So is vulnerability. Try one today.', career: 'The unconventional idea is the right one. Back it with evidence, then share it.', wellness: 'Community feeds you. Reach out to one person you have not spoken to in a while.', spiritual: 'The future is not an escape from the present. Be here, then imagine forward.' },
  Pisces:      { stats: { mood: 'Dreamy', lucky: '7', color: 'Sea glass' }, love: 'You absorb what is around you. Choose carefully who you spend time with today.', career: 'Intuition is data your conscious mind has not processed yet. Trust the hunch.', wellness: 'Water in all its forms. Drink more, take a bath, stand in the rain.', spiritual: 'The boundary between dream and waking is thin today. Write down what comes through.' },
};

export const QUICK_PROMPTS = {
  row1: [
    { label: 'What does my moon sign mean today?', color: '#7a6bd4', icon: 'M20 15A8 8 0 1 1 9 4a6 6 0 0 0 11 11Z' },
    { label: 'Best time to start something new?',  color: '#c98a3a', icon: 'M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5L16 7m-8 8-1.5 1.5m11-1.5L16 15m-8-8L6.5 5.5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' },
    { label: 'Read my birth chart',                color: '#4a9d7c', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18' },
  ],
  row2: [
    { label: 'How is Mercury affecting me?',       color: '#c65a4d', icon: 'M12 3v6m-4 3a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm4 4v5m-3 0h6' },
    { label: 'Compatibility with a Leo',           color: '#d05a9c', icon: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z' },
    { label: 'Explain my rising sign',             color: '#3a7ac9', icon: 'M4 20l6-16 4 10 3-6 3 12' },
  ],
};

export const FEATURE_CARDS = [
  { title: 'Generate kundali', subtitle: 'Vedic birth chart', bg: '#f6f2ea' },
  { title: 'Plan my events',   subtitle: 'Auspicious muhurats', bg: '#eef3f6' },
  { title: 'Check compatibility', subtitle: 'You & another', bg: '#f4eef6' },
  { title: 'Know past lives',  subtitle: 'Karmic patterns', bg: '#eef6f0' },
];

export const ASTROLOGERS = [
  { name: 'Devi Ramanan', specialty: 'Vedic · Kundali · Career', rating: '4.9', reviews: '1.2k', bg: '#e8dcf0' },
  { name: 'Arun Bhatt',   specialty: 'Jyotish · Relationships', rating: '4.8', reviews: '980', bg: '#f4dfc9' },
  { name: 'Priya Sharma',  specialty: 'Tarot · Numerology', rating: '4.9', reviews: '2.1k', bg: '#d9e4ed' },
  { name: 'Kabir Iyer',    specialty: 'KP System · Muhurta', rating: '4.7', reviews: '640', bg: '#dbe6d1' },
];

export const LEARN_ARTICLES = [
  { title: 'Mercury moves through your third house', tags: ['mercury', 'aries'], blurb: 'A soft opening for conversations. What you say lands; what you listen to lasts.', bg: '#0e1020' },
  { title: 'Reading the moon in your chart',         tags: ['moon', 'ritual'],   blurb: 'The moon holds the private self. Learn how its house shapes your inner weather.', bg: '#141726' },
  { title: 'What ascendants really tell you',        tags: ['rising', 'self'],   blurb: 'Not your personality — your first impression. A short guide to the ascendant.', bg: '#1b1224' },
  { title: 'Dashas: your personal timeline',         tags: ['jyotish', 'timing'],blurb: 'Why some years feel loud and others feel still. Reading planetary periods.', bg: '#121a26' },
];

export function computeSignIdx(month, day) {
  const cutoffs = [
    [1, 20, 'Capricorn'], [2, 19, 'Aquarius'], [3, 21, 'Pisces'], [4, 20, 'Aries'], [5, 21, 'Taurus'],
    [6, 21, 'Gemini'], [7, 23, 'Cancer'], [8, 23, 'Leo'], [9, 23, 'Virgo'], [10, 23, 'Libra'],
    [11, 22, 'Scorpio'], [12, 22, 'Sagittarius'], [12, 31, 'Capricorn'],
  ];
  for (const [m, d, name] of cutoffs) {
    if (month < m || (month === m && day < d)) {
      return ZODIAC_SIGNS.findIndex(s => s.name === name);
    }
  }
  return 0;
}
