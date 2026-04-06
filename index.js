#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CLI_VERSION = '1.1.1';
const LEONE_VERSION = '1.1.1';
const SOURCE_DIR = path.join(__dirname, '.leone-source');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  // Custom brand colors for gradient (5 steps for smooth transition)
  g0: '\x1b[38;2;10;176;209m',    // #0ab0d1 - Start (cyan blue)
  g1: '\x1b[38;2;22;178;195m',    // Step 1
  g2: '\x1b[38;2;33;180;182m',    // Step 2 (middle)
  g3: '\x1b[38;2;45;183;166m',    // Step 3
  g4: '\x1b[38;2;56;186;151m'     // #38ba97 - End (green)
};

const log = {
  info: (msg) => console.log(`${colors.blue}${colors.bright}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bright}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}${colors.bright}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}${colors.bright}✗${colors.reset} ${msg}`),
  lion: (msg) => console.log(`${colors.magenta}${colors.bright}🦁${colors.reset} ${msg}`)
};

function showLogo() {
  // LEONE ASCII art - ANSI Shadow style
  // Diagonal gradient: each letter has its own color
  
  const L = colors.g0;  // L - cyan blue #0ab0d1
  const E1 = colors.g1; // E - step 1
  const O = colors.g2;  // O - middle
  const N = colors.g3;  // N - step 2
  const E2 = colors.g4; // E - green #38ba97
  
  const row1 = `${L}██╗    ${E1} ███████╗${O} ██████╗ ${N}███╗   ██╗${E2}███████╗`;
  const row2 = `${L}██║    ${E1} ██╔════╝${O}██╔═══██╗${N}████╗  ██║${E2}██╔════╝`;
  const row3 = `${L}██║    ${E1} █████╗  ${O}██║   ██║${N}██╔██╗ ██║${E2}█████╗  `;
  const row4 = `${L}██║    ${E1} ██╔══╝  ${O}██║   ██║${N}██║╚██╗██║${E2}██╔══╝  `;
  const row5 = `${L}███████╗${E1}███████╗${O}╚██████╔╝${N}██║ ╚████║${E2}███████╗`;
  const row6 = `${L}╚══════╝${E1}╚══════╝ ${O}╚═════╝ ${N}╚═╝  ╚═══╝${E2}╚══════╝`;
  
  console.log(`
${row1}
${row2}
${row3}
${row4}
${row5}
${row6}
${colors.reset}
${colors.dim}  Lead your AI with confidence${colors.reset}
  ──────────────────────────────────────
`);
}

function showHelp() {
  showLogo();
  console.log(`
${colors.magenta}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║           LEONE CLI - AI Governance Methodology           ║
║              "Lead your AI with confidence"               ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}

${colors.cyan}${colors.bright}USAGE:${colors.reset}
  leone <command> [options]

${colors.cyan}${colors.bright}COMMANDS:${colors.reset}
  init              Install .leone/ AI Governance Methodology
  update            Check and install updates
  about             Show system information
  version           Show CLI version
  help              Show this help message

${colors.cyan}${colors.bright}OPTIONS:${colors.reset}
  --force, -f       Overwrite existing .leone/ directory
  --help, -h        Show help for specific command
  --version, -v     Show version

${colors.cyan}${colors.bright}EXAMPLES:${colors.reset}
  leone init           # Install in current folder
  leone init --force   # Overwrite existing
  leone update         # Check for updates
  leone about          # Learn about the system

${colors.cyan}${colors.bright}QUICK START:${colors.reset}
  1. cd your-project-folder
  2. leone init
  3. Open your AI assistant and start building!

${colors.cyan}${colors.bright}ABOUT LEONE:${colors.reset}
  LEONE = LEO (Lion 🦁) + NE (NETELITE)
  "The Lion of NETELITE"

  A development methodology for human-AI collaboration.
  Provides structured workflows, approval gates, and coding
  standards specifically designed for AI-native development.

  ${colors.dim}Not a framework, tool, or platform.${colors.reset}
  ${colors.dim}A methodology — a system of methods.${colors.reset}
`);
}

function showVersion() {
  showLogo();
  console.log(`
${colors.magenta}${colors.bright}🦁 LEONE CLI${colors.reset}
Version: ${colors.cyan}${CLI_VERSION}${colors.reset}
LEONE Method Version: ${colors.cyan}${LEONE_VERSION}${colors.reset}

${colors.dim}Lead your AI with confidence${colors.reset}
`);
}

function showAbout() {
  showLogo();
  console.log(`
${colors.magenta}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║                    LEONE METHOD                           ║
║              AI Governance Methodology                    ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}

${colors.cyan}${colors.bright}WHAT IS LEONE?${colors.reset}
LEONE is a development methodology for human-AI collaboration.
It provides structured workflows, approval gates, and coding
standards specifically designed for AI-native development.

${colors.cyan}${colors.bright}NAME & ORIGIN:${colors.reset}
  ${colors.magenta}LEONE${colors.reset} = ${colors.yellow}LEO${colors.reset} + ${colors.cyan}NE${colors.reset}
  
  • ${colors.yellow}LEO${colors.reset} (Latin: Lion 🦁)
  • ${colors.cyan}NE${colors.reset} (NETELITE) — The brand behind the methodology
  
  Together: ${colors.magenta}LEONE${colors.reset} — "The Lion of NETELITE"

${colors.cyan}${colors.bright}TAGLINE:${colors.reset}
  "${colors.magenta}Lead your AI with confidence${colors.reset}"

${colors.cyan}${colors.bright}KEY PRINCIPLES:${colors.reset}
  ✓ Plan before code
  ✓ Structured workflows
  ✓ Approval gates
  ✓ Coding standards for AI-native development
  ✓ Human-AI collaboration (1 Human + 1 AI)
  ✓ Auto-bootstrap via AGENTS.md
  ✓ Progress reporting & self-review

${colors.cyan}${colors.bright}VERSIONS:${colors.reset}
  CLI Version: ${colors.cyan}${CLI_VERSION}${colors.reset}
  Methodology Version: ${colors.cyan}${LEONE_VERSION}${colors.reset}

${colors.cyan}${colors.bright}NOT A:${colors.reset}
  ✗ Framework
  ✗ Tool
  ✗ Platform

${colors.cyan}${colors.bright}IS A:${colors.reset}
  ✓ Methodology — a system of methods for achieving
    consistent, high-quality AI-assisted development.

${colors.cyan}${colors.bright}KEY FEATURES:${colors.reset}
  ✓ AI Self-Review Checklist (11 items)
  ✓ Context Reset Procedure
  ✓ Stop & Redirect Commands
  ✓ Human Review Points (5 checkpoints)
  ✓ Smart Reuse Decision Tree
  ✓ Performance Budget (Frontend/Backend)
  ✓ i18n Workflow & Secret Management
  ✓ N+1 Query Prevention
  ✓ Vitest + Factories + Mocking

${colors.dim}Built by NETELITE for AI-native development${colors.reset}
`);
}

async function checkForUpdates() {
  showLogo();
  log.info(' Checking for updates...');
  
  // In a real implementation, this would check npm or a remote server
  // For now, we'll simulate the check
  console.log(`
${colors.cyan}${colors.bright}Update Check:${colors.reset}
  Current CLI Version: ${colors.green}${CLI_VERSION}${colors.reset}
  Current Methodology Version: ${colors.green}${LEONE_VERSION}${colors.reset}
  
  ${colors.dim}This is a local installation.${colors.reset}
  ${colors.dim}For updates, pull from the source repository.${colors.reset}
`);
  
  log.success('Update check complete');
}

function copyDirectory(src, dest, force = false) {
  // Check if destination exists
  if (fs.existsSync(dest)) {
    if (!force) {
      log.error(`.leone/ directory already exists at ${dest}`);
      log.info('Use --force to overwrite existing directory');
      return false;
    } else {
      log.warn('Removing existing .leone/ directory...');
      fs.rmSync(dest, { recursive: true, force: true });
    }
  }

  // Create destination directory
  fs.mkdirSync(dest, { recursive: true });

  // Copy files
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, force);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return true;
}

function initLeone(force = false) {
  const targetDir = path.join(process.cwd(), '.leone');
  const currentDir = process.cwd();
  
  showLogo();
  
  // If --force flag is used, skip confirmation
  if (force) {
    console.log(`
${colors.cyan}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║              INSTALLING LEONE METHODOLOGY                 ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}
`);
    log.info(`Installing LEONE methodology to: ${targetDir}`);
    performInstallation(targetDir, force);
    return;
  }
  
  // Ask for confirmation
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log(`
${colors.cyan}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║              INSTALLING LEONE METHODOLOGY                 ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}
`);
  
  log.info(` Current directory: ${colors.dim}${currentDir}${colors.reset}`);
  
  rl.question(`\n${colors.bright}🦁 Install LEONE methodology to this folder?${colors.reset} ${colors.dim}(Y/n):${colors.reset} `, (answer) => {
    rl.close();
    
    const confirmed = answer.toLowerCase().trim() !== 'n' && answer.toLowerCase().trim() !== 'no';
    
    if (confirmed) {
      log.info(`Installing LEONE methodology to: ${targetDir}`);
      performInstallation(targetDir, force);
    } else {
      console.log(`\n${colors.yellow}Installation cancelled.${colors.reset}\n`);
      process.exit(0);
    }
  });
}

function performInstallation(targetDir, force = false) {
  // Check if source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    log.error(`Source directory not found: ${SOURCE_DIR}`);
    log.info('Make sure .leone-source/ exists in the CLI directory');
    return;
  }
  
  const success = copyDirectory(SOURCE_DIR, targetDir, force);
  
  if (success) {
    console.log(`
${colors.green}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║                 INSTALLATION COMPLETE!                    ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}
`);
    
    log.success('LEONE methodology installed successfully!');
    
    console.log(`
${colors.cyan}${colors.bright}NEXT STEPS:${colors.reset}
  1. Review the ${colors.yellow}.leone/README.md${colors.reset} file
  2. Configure ${colors.yellow}.leone/STACK.md${colors.reset} for your tech stack
  3. Open your AI assistant and start building!

${colors.cyan}${colors.bright}QUICK REFERENCE:${colors.reset}
  • ${colors.yellow}AGENTS.md${colors.reset} — Auto-bootstrap entry point
  • ${colors.yellow}SYSTEM.md${colors.reset} — Operating principles & AI role
  • ${colors.yellow}RULES.md${colors.reset} — Coding standards
  • ${colors.yellow}WORKFLOW.md${colors.reset} — Feature development flow
  • ${colors.yellow}ARCHITECTURE.md${colors.reset} — Layer responsibilities
  • ${colors.yellow}DATA_LAYER.md${colors.reset} — DB rules, secrets, N+1 prevention
  • ${colors.yellow}TESTING.md${colors.reset} — Vitest, factories, mocking
  • ${colors.yellow}plans/${colors.reset} — Workflow templates (LIGHT/STANDARD/FULL)

${colors.magenta}🦁 Lead your AI with confidence!${colors.reset}
`);
  } else {
    log.error('Installation failed');
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const flags = args.slice(1);

  // No command provided - show logo + help
  if (!command) {
    showHelp();
    return;
  }

  // Parse flags
  const force = flags.includes('--force') || flags.includes('-f');
  const help = flags.includes('--help') || flags.includes('-h');

  switch (command) {
    case 'init':
      if (help) {
        showLogo();
        console.log(`
${colors.cyan}${colors.bright}USAGE:${colors.reset}
  leone init [options]

${colors.cyan}${colors.bright}DESCRIPTION:${colors.reset}
  Install the LEONE AI Governance Methodology in the current directory.
  Creates a .leone/ folder with all methodology files.

${colors.cyan}${colors.bright}OPTIONS:${colors.reset}
  --force, -f    Overwrite existing .leone/ directory

${colors.cyan}${colors.bright}EXAMPLES:${colors.reset}
  leone init           # Install in current folder
  leone init --force   # Overwrite existing
`);
      } else {
        initLeone(force);
      }
      break;

    case 'update':
      checkForUpdates();
      break;

    case 'about':
      showAbout();
      break;

    case 'version':
    case '-v':
    case '--version':
      showVersion();
      break;

    case 'help':
    case '-h':
    case '--help':
      showHelp();
      break;

    default:
      showLogo();
      log.error(`Unknown command: ${command}`);
      console.log(`Run '${colors.cyan}leone help${colors.reset}' for usage information`);
      process.exit(1);
  }
}

main();
