const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

const copyDir = (source, destination) => {
  if (!fs.existsSync(source)) return;
  const stat = fs.statSync(source);
  if (!stat.isDirectory()) {
    fs.copyFileSync(source, destination);
    return;
  }

  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source)) {
    copyDir(path.join(source, entry), path.join(destination, entry));
  }
};

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

execSync('npx tailwindcss -i ./src/input.css -o ./public/output.css -m', {
  stdio: 'inherit',
});

['index.html'].forEach((fileName) => {
  const source = path.join(srcDir, fileName);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(publicDir, fileName));
  }
});

['Images', 'FontAwesome'].forEach((dirName) => {
  const source = path.join(srcDir, dirName);
  const destination = path.join(publicDir, dirName);
  copyDir(source, destination);
});

