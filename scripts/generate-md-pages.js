#!/usr/bin/env node
/**
 * generate-md-pages.js
 * 
 * Generates static .md files for each property and blog page in the build directory.
 * These serve as clean markdown versions of each page, following the llms.txt companion spec.
 * AI agents and tools can fetch /Geco.md instead of parsing the full HTML.
 * 
 * Run after `react-scripts build` (or react-snap) as part of the build pipeline.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://www.reservaskalawala.com';

// Property data — mirrors src/utils/constants.ts houseDataList (English only, ES pages link back)
const properties = [
  {
    slug: 'Geco',
    name: 'Casa Geco',
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: 'Private fenced parking',
    petFriendly: true,
    description: 'Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer. Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.',
    amenities: ['Private Equipped Bathroom', 'Private Equipped Kitchen', 'A/C (2 units)', 'Private Fenced Parking', '100Mbps WiFi', 'Pet Friendly', 'Roku TV with HDMI', 'Towels & Toiletries', 'Bed Linens', 'Cleaning service (5+ nights)', '15% bakery discount'],
    neighborhood: 'Close to beach access leading to Cocles. Spot wildlife and natural coral pools along the jungle path. Two National Parks nearby: Manzanillo and Cahuita. Vibrant nightlife in town.'
  },
  {
    slug: 'Rana',
    name: 'Casa Rana',
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: 'Private fenced parking',
    petFriendly: true,
    description: 'Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Strongly recommended if you are planning to travel with your pet, as it offers a small, fenced garden.',
    amenities: ['Private Equipped Bathroom', 'Private Equipped Kitchen', 'A/C (2 units)', 'Private Fenced Parking', '100Mbps WiFi', 'Pet Friendly', 'Fenced Garden', 'Roku TV with HDMI', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Near beach path to Cocles with diverse wildlife and natural coral pools. Two National Parks nearby: Manzanillo and Cahuita.'
  },
  {
    slug: 'Tucano',
    name: 'Casa Tucano',
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: 'Outside parking',
    petFriendly: true,
    description: 'Charming wooden apartment located above an Italian bakery in the heart of Puerto Viejo. Features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units. Complimentary cleaning services for stays of 5 nights or more.',
    amenities: ['Private Equipped Bathroom', 'Private Equipped Kitchen', 'A/C (2 units)', 'Outside Parking', '100Mbps WiFi', 'Pet Friendly', 'Terrace', 'Roku TV with HDMI', 'Towels & Toiletries', 'Bed Linens', '15% bakery discount'],
    neighborhood: 'Above Italian bakery in town center. Near beach path to Cocles. Two National Parks nearby: Manzanillo and Cahuita.'
  },
  {
    slug: 'Pappagallo',
    name: 'Casa Pappagallo',
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: 'Outside parking',
    petFriendly: true,
    description: 'Charming wooden apartment above an Italian bakery in the heart of Puerto Viejo. Built entirely of wood, remodeled by a Spanish interior designer in June 2021. Equipped with a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well-equipped bathroom.',
    amenities: ['Private Equipped Bathroom', 'Private Equipped Kitchen', 'A/C (2 units)', 'Outside Parking', '100Mbps WiFi', 'Pet Friendly', 'Terrace', 'Roku TV with HDMI', 'Towels & Toiletries', 'Bed Linens', '15% bakery discount'],
    neighborhood: 'Above Italian bakery in town center. Near beach path to Cocles. Two National Parks nearby: Manzanillo and Cahuita.'
  },
  {
    slug: 'Delfin',
    name: 'Casa Delfin',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: 'Private parking',
    petFriendly: false,
    description: 'Located in the heart of town, this house accommodates up to 6 guests with a fully equipped kitchen, bathroom, 2 A/C units (not in kitchen or living room), and private parking.',
    amenities: ['2 Private Equipped Bathrooms', 'Private Equipped Kitchen', 'A/C (2 units)', 'Private Parking', '100Mbps WiFi', 'Roku TV with HDMI', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Close to beach access leading to Cocles. Two National Parks nearby: Manzanillo and Cahuita. Vibrant nightlife.'
  },
  {
    slug: 'Areka',
    name: 'Casa Areka',
    guests: null,
    bedrooms: null,
    bathrooms: null,
    location: 'Playa Negra, Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: null,
    petFriendly: null,
    description: 'Vacation rental in the Playa Negra area, near the beautiful black sand beach of Puerto Viejo.',
    amenities: ['Fully Equipped Kitchen', 'A/C', '100Mbps WiFi', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Playa Negra area, near black sand beach.'
  },
  {
    slug: 'Giulia',
    name: 'Casa Giulia',
    guests: null,
    bedrooms: null,
    bathrooms: null,
    location: 'Playa Negra, Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: null,
    petFriendly: null,
    description: 'Vacation rental in the Playa Negra area, near the beautiful black sand beach of Puerto Viejo.',
    amenities: ['Fully Equipped Kitchen', 'A/C', '100Mbps WiFi', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Playa Negra area, near black sand beach.'
  },
  {
    slug: 'Plumeria',
    name: 'Casa Plumeria',
    guests: null,
    bedrooms: null,
    bathrooms: null,
    location: 'Playa Negra, Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: null,
    petFriendly: null,
    description: 'Vacation rental in the Playa Negra area, near the beautiful black sand beach of Puerto Viejo.',
    amenities: ['Fully Equipped Kitchen', 'A/C', '100Mbps WiFi', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Playa Negra area, near black sand beach.'
  },
  {
    slug: 'VillaMar',
    name: 'Villa Mar',
    guests: null,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: null,
    petFriendly: null,
    description: 'Villa with private pool, king-size bed with 10-inch thick mattress, dedicated workspace with ethernet connection, and fully equipped kitchen. All spaces are completely private.',
    amenities: ['Private Pool', 'King Size Bed', 'Dedicated Workspace with Ethernet', 'Fully Equipped Kitchen', 'A/C', '100Mbps WiFi', 'Towels & Toiletries', 'Bed Linens', 'Cleaning service for longer stays'],
    neighborhood: 'Puerto Viejo de Talamanca, near beaches and national parks.'
  },
  {
    slug: 'VillaCoral',
    name: 'Villa Coral',
    guests: null,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Puerto Viejo de Talamanca, Limón, Costa Rica',
    parking: null,
    petFriendly: null,
    description: 'Villa with private pool, king-size bed with 10-inch thick mattress, dedicated workspace with ethernet connection, and fully equipped kitchen. All spaces are completely private.',
    amenities: ['Private Pool', 'King Size Bed', 'Dedicated Workspace with Ethernet', 'Fully Equipped Kitchen', 'A/C', '100Mbps WiFi', 'Towels & Toiletries', 'Bed Linens'],
    neighborhood: 'Puerto Viejo de Talamanca, near beaches and national parks.'
  }
];

const blogPosts = [
  { slug: 'twodaysinpuertoviejo', title: 'Two Days in Puerto Viejo', description: 'A complete 2-day itinerary for visiting Puerto Viejo de Talamanca, Costa Rica. Covers beaches, restaurants, wildlife, and nightlife.' },
  { slug: 'gettingtogandoca', title: 'Getting to Gandoca-Manzanillo', description: 'How to reach the Gandoca-Manzanillo Wildlife Refuge from Puerto Viejo. Transport options, tips, and what to expect.' },
  { slug: 'puertoviejobyplane', title: 'Puerto Viejo by Plane', description: 'Flight options and airport transfers to reach Puerto Viejo de Talamanca, Costa Rica.' },
  { slug: 'travellingtopuertoviejo', title: 'Travelling to Puerto Viejo', description: 'Complete transport guide covering buses, flights, shuttles, and driving to Puerto Viejo de Talamanca.' },
  { slug: 'TenHoursInPuerto', title: '10 Hours in Puerto Viejo', description: 'Quick visit itinerary for a day trip or layover in Puerto Viejo de Talamanca.' },
  { slug: 'bushours', title: 'Bus Hours — Puerto Viejo', description: 'Public bus schedules and routes for Puerto Viejo de Talamanca, including connections to Cahuita, Manzanillo, and Sixaola.' },
  { slug: 'cahuitaparkwhattodo', title: 'Cahuita National Park Guide', description: 'What to do in Cahuita National Park, Costa Rica. Trails, wildlife, snorkeling, and practical tips.' },
  { slug: 'indigenousTravelPV', title: 'Indigenous Travel in Puerto Viejo', description: 'Cultural tourism guide for indigenous communities near Puerto Viejo de Talamanca.' },
  { slug: 'bestTimeToVisitPuerto', title: 'Best Time to Visit Puerto Viejo', description: 'Seasonal weather patterns, rainy and dry seasons, and travel tips for planning your visit to Puerto Viejo.' },
  { slug: 'puertoHiddenGems', title: 'Puerto Viejo Hidden Gems', description: 'Off-the-beaten-path spots and local secrets in Puerto Viejo de Talamanca, Costa Rica.' }
];

function generatePropertyMd(prop) {
  let md = `# ${prop.name}\n\n`;
  md += `> Vacation rental in ${prop.location}. Book direct at [reservaskalawala.com](${BASE_URL}/${prop.slug}) for the best price.\n\n`;

  if (prop.guests) md += `- **Guests**: up to ${prop.guests}\n`;
  if (prop.bedrooms) md += `- **Bedrooms**: ${prop.bedrooms}\n`;
  if (prop.bathrooms) md += `- **Bathrooms**: ${prop.bathrooms}\n`;
  if (prop.parking) md += `- **Parking**: ${prop.parking}\n`;
  if (prop.petFriendly !== null) md += `- **Pet Friendly**: ${prop.petFriendly ? 'Yes' : 'No'}\n`;
  md += `- **Location**: ${prop.location}\n`;
  md += `\n## Description\n\n${prop.description}\n`;
  md += `\n## Amenities\n\n`;
  prop.amenities.forEach(a => { md += `- ${a}\n`; });
  md += `\n## Neighborhood\n\n${prop.neighborhood}\n`;
  md += `\n## Booking\n\nBook directly at [${BASE_URL}/${prop.slug}](${BASE_URL}/${prop.slug}) for the best rate.\n`;
  md += `Last-minute discounts available — prices updated daily.\n`;
  md += `\nAlso available in Spanish: [${BASE_URL}/${prop.slug}ES](${BASE_URL}/${prop.slug}ES)\n`;
  md += `\n---\n*Part of [Reservas Kalawala](${BASE_URL}) — vacation rentals in Puerto Viejo, Costa Rica.*\n`;
  return md;
}

function generateBlogMd(post) {
  let md = `# ${post.title}\n\n`;
  md += `> ${post.description}\n\n`;
  md += `Read the full article at [reservaskalawala.com/${post.slug}](${BASE_URL}/${post.slug})\n\n`;
  md += `Also available in Spanish: [${BASE_URL}/${post.slug}ES](${BASE_URL}/${post.slug}ES)\n`;
  md += `\n---\n*Part of [Reservas Kalawala](${BASE_URL}) — vacation rentals in Puerto Viejo, Costa Rica.*\n`;
  return md;
}

// Generate homepage .md
function generateHomeMd() {
  let md = `# Reservas Kalawala — Vacation Rentals in Puerto Viejo, Costa Rica\n\n`;
  md += `> Family-run vacation rental company with 10 fully equipped houses and villas in Puerto Viejo de Talamanca, Costa Rica. Book direct for the best rates.\n\n`;
  md += `## Our Properties\n\n`;
  properties.forEach(p => {
    const details = [p.guests ? `sleeps ${p.guests}` : null, p.bedrooms ? `${p.bedrooms} bed` : null, p.petFriendly ? 'pet friendly' : null].filter(Boolean).join(', ');
    md += `- [${p.name}](${BASE_URL}/${p.slug})${details ? ` — ${details}` : ''}\n`;
  });
  md += `\n## Travel Guides\n\n`;
  blogPosts.forEach(b => {
    md += `- [${b.title}](${BASE_URL}/${b.slug})\n`;
  });
  md += `\n## Book Direct\n\nVisit [reservaskalawala.com](${BASE_URL}) for availability and the best rates.\n`;
  md += `\n---\n*Reservas Kalawala — Puerto Viejo de Talamanca, Limón, Costa Rica*\n`;
  return md;
}

// Main
function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found: ${BUILD_DIR}`);
    console.error('Run "npm run build" first.');
    process.exit(1);
  }

  let count = 0;

  // Homepage
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html.md'), generateHomeMd());
  count++;

  // Properties (EN + ES pointer)
  properties.forEach(prop => {
    const md = generatePropertyMd(prop);
    fs.writeFileSync(path.join(BUILD_DIR, `${prop.slug}.md`), md);
    count++;
    // ES version points to English md with a note
    const esMd = `# ${prop.name} (Español)\n\n> Esta propiedad también está disponible en inglés: [${prop.name} (English)](${BASE_URL}/${prop.slug})\n\n` + md;
    fs.writeFileSync(path.join(BUILD_DIR, `${prop.slug}ES.md`), esMd);
    count++;
  });

  // Blog posts (EN + ES pointer)
  blogPosts.forEach(post => {
    const md = generateBlogMd(post);
    fs.writeFileSync(path.join(BUILD_DIR, `${post.slug}.md`), md);
    count++;
    const esMd = `# ${post.title} (Español)\n\n> Este artículo también está disponible en inglés: [${post.title} (English)](${BASE_URL}/${post.slug})\n\n` + md;
    fs.writeFileSync(path.join(BUILD_DIR, `${post.slug}ES.md`), esMd);
    count++;
  });

  console.log(`✅ Generated ${count} .md files in ${BUILD_DIR}`);
}

main();
