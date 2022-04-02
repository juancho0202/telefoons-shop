import axios from 'axios';

export default async function getPhoneFeed(): Promise<any> {
  const response = await axios.get('/phone_feed.json');
  const appSettings = await response.data;
  if (appSettings) {
    return appSettings;
  }
  const error = 'Failed to retrieve phone_feed.json from server';
  throw new Error(error);
}
