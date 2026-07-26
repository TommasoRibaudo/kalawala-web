#!/usr/bin/env node
/**
 * generate-llms-full.js
 * 
 * Generates llms-full.txt by expanding the llms.txt links into inline content.
 * This gives AI agents the complete site content in a single fetch.
 * 
 * Run after generate-md-pages.js as part of the build pipeline.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://www.reservaskalawala.com';

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found: ${BUILD_DIR}`);
    process.exit(1);
  }

  // Read the base llms.txt
  const llmsTxtPath = path.join(BUILD_DIR, 'llms.txt');
  if (!fs.existsSync(llmsTxtPath)) {
    console.error('llms.txt not found in build directory');
    process.exit(1);
  }

  let output = '';

  // Start with the full llms.txt content
  const llmsTxt = fs.readFileSync(llmsTxtPath, 'utf-8');
  output += llmsTxt;
  output += '\n\n---\n\n';
  output += '# Full Property Details\n\n';
  output += 'Below is the expanded content for each property and blog post listed above.\n\n';

  // Find all .md files (excluding ES versions and index.html.md to keep it focused)
  const mdFiles = [
    'Geco.md', 'Rana.md', 'Tucano.md', 'Pappagallo.md', 'Delfin.md',
    'Areka.md', 'Giulia.md', 'Plumeria.md', 'VillaMar.md', 'VillaCoral.md',
    'twodaysinpuertoviejo.md', 'gettingtogandoca.md', 'puertoviejobyplane.md',
    'travellingtopuertoviejo.md', 'TenHoursInPuerto.md', 'bushours.md',
    'cahuitaparkwhattodo.md', 'indigenousTravelPV.md', 'bestTimeToVisitPuerto.md',
    'puertoHiddenGems.md'
  ];

  mdFiles.forEach(filename => {
    const filePath = path.join(BUILD_DIR, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      output += `<page url="${BASE_URL}/${filename.replace('.md', '')}">\n`;
      output += content;
      output += `\n</page>\n\n`;
    }
  });

  fs.writeFileSync(path.join(BUILD_DIR, 'llms-full.txt'), output);
  console.log('✅ Generated llms-full.txt');
}

main();
