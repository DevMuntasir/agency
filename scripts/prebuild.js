const fs = require('fs');
const path = require('path');

// Ensure Tailwind CLI binary is executable on POSIX environments
if (process.platform === 'win32') {
  process.exit(0);
}

const binPath = path.join(process.cwd(), 'node_modules', '.bin', 'tailwindcss');

try {
  fs.chmodSync(binPath, 0o755);
} catch (error) {
  if (error.code && ['ENOENT', 'ENOTSUP', 'EPERM'].includes(error.code)) {
    process.exit(0);
  }
  throw error;
}
