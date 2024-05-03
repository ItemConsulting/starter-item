const fs = require('fs');

const folderPath = 'src/main/resources/assets';
const regExpPattern = '(^.?|\.[^d]|[^.]d|[^.][^d])\.tsx?$';

function checkFilesRecursively(folderPath) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = `${folderPath}/${file}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      checkFilesRecursively(filePath); // Recursively check subdirectories
    } else if (file.match(regExpPattern)) {
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
