#!/usr/bin/env node

/**
 * Build Analysis Script for Next.js
 * 
 * This script runs after the build process to analyze bundle sizes,
 * performance metrics, and provides optimization suggestions.
 * 
 * Usage:
 * 1. Run `node scripts/analyze-build.js` after a build
 * 2. View the analysis report in the console
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BUNDLE_SIZE_THRESHOLD = 200 * 1024; // 200 KB
const BUNDLE_WARNING_THRESHOLD = 100 * 1024; // 100 KB
const BUILD_DIR = path.join(process.cwd(), '.next');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

/**
 * Print a section header
 */
function printHeader(text) {
  console.log(`\n${colors.bold}${colors.cyan}=== ${text} ===${colors.reset}\n`);
}

/**
 * Format byte size to human readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Get color based on bundle size
 */
function getSizeColor(size) {
  if (size > BUNDLE_SIZE_THRESHOLD) return colors.red;
  if (size > BUNDLE_WARNING_THRESHOLD) return colors.yellow;
  return colors.green;
}

/**
 * Check if build directory exists
 */
function checkBuildDir() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`${colors.red}Error: Build directory (.next) not found.${colors.reset}`);
    console.error(`Please run 'npm run build' before running this script.`);
    process.exit(1);
  }
}

/**
 * Read and parse build manifest
 */
function readBuildManifest() {
  try {
    const manifestPath = path.join(BUILD_DIR, 'build-manifest.json');
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}Error reading build manifest: ${error.message}${colors.reset}`);
    return null;
  }
}

/**
 * Read and parse middleware manifest
 */
function readMiddlewareManifest() {
  try {
    const manifestPath = path.join(BUILD_DIR, 'server/middleware-manifest.json');
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
    return null;
  } catch (error) {
    console.error(`${colors.red}Error reading middleware manifest: ${error.message}${colors.reset}`);
    return null;
  }
}

/**
 * Analyze server build manifests
 */
function analyzeServerComponents() {
  printHeader('Server Components Analysis');
  
  try {
    // Read the app-paths-manifest.json
    const appPathsManifestPath = path.join(BUILD_DIR, 'server/app-paths-manifest.json');
    if (!fs.existsSync(appPathsManifestPath)) {
      console.log(`${colors.yellow}App paths manifest not found. This might be a pages router app.${colors.reset}`);
      return;
    }
    
    const appPathsManifest = JSON.parse(fs.readFileSync(appPathsManifestPath, 'utf8'));
    console.log(`${colors.blue}App Router Pages:${colors.reset}`);
    
    Object.entries(appPathsManifest.pageFiles).forEach(([route, file]) => {
      console.log(`  ${colors.magenta}${route}${colors.reset} => ${file}`);
    });
    
    console.log(`\n${colors.blue}Total Routes:${colors.reset} ${Object.keys(appPathsManifest.pageFiles).length}`);
  } catch (error) {
    console.error(`${colors.red}Error analyzing server components: ${error.message}${colors.reset}`);
  }
}

/**
 * Analyze client build
 */
function analyzeClientBundle() {
  printHeader('Client Bundle Analysis');
  
  try {
    const statsPath = path.join(BUILD_DIR, 'build-manifest.json');
    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
    
    // Analyze main pages
    const pages = Object.keys(stats.pages).filter(page => page !== '/_app' && page !== '/_error');
    
    console.log(`${colors.blue}Pages:${colors.reset} ${pages.length}`);
    
    // Analyze JS files in static directory
    const staticDir = path.join(BUILD_DIR, 'static');
    const chunks = {};
    let totalSize = 0;
    
    if (fs.existsSync(staticDir)) {
      const jsDir = path.join(staticDir, 'chunks');
      
      if (fs.existsSync(jsDir)) {
        fs.readdirSync(jsDir).forEach(file => {
          if (file.endsWith('.js')) {
            const filePath = path.join(jsDir, file);
            const stats = fs.statSync(filePath);
            chunks[file] = stats.size;
            totalSize += stats.size;
          }
        });
      }
    }
    
    // Sort chunks by size (largest first)
    const sortedChunks = Object.entries(chunks)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    console.log(`\n${colors.blue}Largest Chunks:${colors.reset}`);
    sortedChunks.forEach(([file, size]) => {
      const coloredSize = getSizeColor(size);
      console.log(`  ${file}: ${coloredSize}${formatBytes(size)}${colors.reset}`);
    });
    
    console.log(`\n${colors.blue}Total Bundle Size:${colors.reset} ${formatBytes(totalSize)}`);
    
    // Check for large dependencies
    try {
      const packageLockPath = path.join(process.cwd(), 'package-lock.json');
      if (fs.existsSync(packageLockPath)) {
        const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
        const dependencies = packageLock.packages ? 
          Object.entries(packageLock.packages)
            .filter(([name]) => name !== '')
            .map(([name]) => name.replace('node_modules/', '')) : 
          [];
        
        printHeader('Large Dependencies Analysis');
        
        // Try to run npm list
        try {
          const npmList = execSync('npm list --depth=0 --json', { encoding: 'utf8' });
          const npmListData = JSON.parse(npmList);
          
          const depsWithSizes = Object.entries(npmListData.dependencies || {})
            .map(([name, info]) => {
              let size = 0;
              try {
                const depPath = path.join(process.cwd(), 'node_modules', name);
                size = getDirectorySize(depPath);
              } catch (e) {
                // Ignore
              }
              return [name, size];
            })
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
          
          console.log(`${colors.blue}Top 10 largest dependencies:${colors.reset}`);
          depsWithSizes.forEach(([name, size]) => {
            const coloredSize = getSizeColor(size);
            console.log(`  ${name}: ${coloredSize}${formatBytes(size)}${colors.reset}`);
          });
        } catch (e) {
          console.log(`${colors.yellow}Couldn't analyze dependencies sizes: ${e.message}${colors.reset}`);
        }
      }
    } catch (e) {
      console.log(`${colors.yellow}Couldn't analyze dependencies: ${e.message}${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}Error analyzing client bundle: ${error.message}${colors.reset}`);
  }
}

/**
 * Get the size of a directory recursively
 */
function getDirectorySize(dirPath) {
  let size = 0;
  if (!fs.existsSync(dirPath)) return size;
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      size += stats.size;
    }
  }
  
  return size;
}

/**
 * Print optimization suggestions
 */
function printOptimizationSuggestions() {
  printHeader('Optimization Suggestions');
  
  console.log(`${colors.green}1. Dynamic Imports${colors.reset}
  Use dynamic imports for large components that aren't needed on initial load:
  const HeavyComponent = dynamic(() => import('./HeavyComponent'), { ssr: false });
  
${colors.green}2. Image Optimization${colors.reset}
  Ensure all images use the next/image component with proper 'sizes' attribute.
  Consider using WebP or AVIF formats.
  
${colors.green}3. Fonts${colors.reset}
  Use next/font to automatically optimize and load fonts with zero layout shift.
  
${colors.green}4. Third-party Scripts${colors.reset}
  Load non-critical third-party scripts using next/script with strategy='lazyOnload'
  
${colors.green}5. Tree-shaking${colors.reset}
  Import only what you need: import { Button } from 'ui-library' instead of import Library from 'ui-library'
  
${colors.green}6. Code-splitting${colors.reset}
  Create smaller pages and use more components to improve code-splitting.
  
${colors.green}7. API Routes${colors.reset}
  Use Edge Runtime for API routes that don't need the full Node.js runtime.
  
${colors.green}8. Middleware${colors.reset}
  Keep middleware small and focused on routing logic only.`);
}

/**
 * Main analysis function
 */
function analyzeNextBuild() {
  console.log(`\n${colors.bold}${colors.magenta}===== Next.js Build Analysis =====${colors.reset}\n`);
  
  checkBuildDir();
  analyzeServerComponents();
  analyzeClientBundle();
  printOptimizationSuggestions();
  
  console.log(`\n${colors.bold}${colors.green}===== Analysis Complete =====${colors.reset}\n`);
}

// Run the analysis
analyzeNextBuild(); 