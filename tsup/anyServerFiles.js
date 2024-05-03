const fs = require('fs');

const folderPath = 'src/main/resources';
const pattern = '(^.?|\.[^d]|[^.]d|[^.][^d])\.ts$';
const ignoredPaths = ['src/main/resources/assets'];

function checkFilesRecursively(folderPath) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = `${folderPath}/${file}`;
    if (ignoredPaths.some(d => filePath.includes(d))) {
      // console.debug('ignoredPath:', filePath);
      continue; // Skip ignored folders
    }
    if (fs.lstatSync(filePath).isDirectory()) {
      // console.debug('filePath:', filePath);
      checkFilesRecursively(filePath);
    } else if (file.match(pattern)) {
      // console.debug('File found:', filePath);
      return true; // Exit with code 0 if a matching file is found
    }
  }
  return false; // No matching files found in this directory
}

if (checkFilesRecursively(folderPath)) {
  process.exit(0);
} else {
  // console.debug('No files found matching the pattern.');
  process.exit(1);
}
