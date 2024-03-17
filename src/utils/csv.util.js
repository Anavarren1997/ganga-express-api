import papa from 'papaparse';
import fs from 'fs';

export const csvToJson = async ({ filePath }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        papa.parse(data, {
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            reject(error);
          },
          header: true,
        });
      }
    });
  });
};
