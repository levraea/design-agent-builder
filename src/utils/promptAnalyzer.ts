
import { API } from '@/types/api';

export const analyzePromptForAPIs = (prompt: string, availableAPIs: API[]): string[] => {
  const lowerPrompt = prompt.toLowerCase();
  const relevantAPIs: string[] = [];

  // Weather-related keywords
  const weatherKeywords = ['weather', 'temperature', 'forecast', 'climate', 'rain', 'snow', 'humidity', 'wind'];
  if (weatherKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const weatherAPI = availableAPIs.find(api => api.id === 'openmeteo');
    if (weatherAPI) relevantAPIs.push(weatherAPI.id);
  }

  // Geography/Country-related keywords
  const geoKeywords = ['country', 'countries', 'nation', 'capital', 'population', 'geography', 'flag', 'currency', 'language'];
  if (geoKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const countryAPI = availableAPIs.find(api => api.id === 'restcountries');
    if (countryAPI) relevantAPIs.push(countryAPI.id);
  }

  // Drug/Medical-related keywords
  const medicalKeywords = ['drug', 'medication', 'medicine', 'pharmaceutical', 'health', 'medical', 'prescription', 'fda'];
  if (medicalKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const drugAPI = availableAPIs.find(api => api.id === 'fda-drugs');
    if (drugAPI) relevantAPIs.push(drugAPI.id);
  }

  // News-related keywords
  const newsKeywords = ['news', 'article', 'headline', 'breaking', 'current events', 'journalism'];
  if (newsKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const newsAPI = availableAPIs.find(api => api.id === 'newsapi');
    if (newsAPI) relevantAPIs.push(newsAPI.id);
  }

  // Cat-related keywords
  const catKeywords = ['cat', 'kitten', 'feline', 'meow', 'pet'];
  if (catKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const catAPI = availableAPIs.find(api => api.id === 'catfacts');
    if (catAPI) relevantAPIs.push(catAPI.id);
  }

  // Dog-related keywords
  const dogKeywords = ['dog', 'puppy', 'canine', 'bark', 'breed'];
  if (dogKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const dogAPI = availableAPIs.find(api => api.id === 'dog-ceo');
    if (dogAPI) relevantAPIs.push(dogAPI.id);
  }

  // Finance-related keywords
  const financeKeywords = ['crypto', 'cryptocurrency', 'bitcoin', 'exchange', 'trading', 'price', 'market'];
  if (financeKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const cryptoAPI = availableAPIs.find(api => api.id === 'coindesk');
    if (cryptoAPI) relevantAPIs.push(cryptoAPI.id);
  }

  // If no specific APIs were identified, return a balanced default set
  if (relevantAPIs.length === 0) {
    const defaultAPIs = ['openmeteo', 'restcountries', 'fda-drugs'];
    return defaultAPIs.filter(id => availableAPIs.some(api => api.id === id));
  }

  return relevantAPIs;
};
