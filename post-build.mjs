import { promises as fs } from 'fs';

const deleteImageFolder = async () => {
  try {
    await fs.rm('./dist/images', { recursive: true, force: true });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

const start = async () => {
  try {
    await deleteImageFolder();
  } catch (e) {
    console.log(e);
  }
};

start();
