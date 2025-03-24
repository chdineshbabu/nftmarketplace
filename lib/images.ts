import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';

// Initialize the Unsplash API client
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '9jg5dRRE5i-OADaWOE9q-CHpkRm9RBZS_z8YRnGiU_Q',
});

// Function to get a random image URL
export async function getRandomImage(query: string = 'digital art', width: number = 400, height: number = 400): Promise<string> {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape',
      count: 1,
    });

    if (result.errors) {
      console.error('Error fetching image:', result.errors);
      return '/placeholder.svg';
    }

    const photo = result.response as Random;
    return `${photo.urls.raw}&w=${width}&h=${height}&fit=crop`;
  } catch (error) {
    console.error('Error fetching image:', error);
    return '/placeholder.svg';
  }
}

// Function to get multiple random images
export async function getRandomImages(count: number = 1, query: string = 'digital art'): Promise<string[]> {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape',
      count,
    });

    if (result.errors) {
      console.error('Error fetching images:', result.errors);
      return Array(count).fill('/placeholder.svg');
    }

    const photos = result.response as Random[];
    return photos.map(photo => `${photo.urls.raw}&w=400&h=400&fit=crop`);
  } catch (error) {
    console.error('Error fetching images:', error);
    return Array(count).fill('/placeholder.svg');
  }
} 