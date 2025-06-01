
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

  // Finance-related keywords
  const financeKeywords = ['crypto', 'cryptocurrency', 'bitcoin', 'exchange', 'trading', 'price', 'market'];
  if (financeKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const cryptoAPI = availableAPIs.find(api => api.id === 'coindesk');
    if (cryptoAPI) relevantAPIs.push(cryptoAPI.id);
  }

  // Agriculture-related keywords
  const agricultureKeywords = ['agriculture', 'farming', 'crop', 'harvest', 'food', 'agricultural', 'farm'];
  if (agricultureKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const worldBankAgriAPI = availableAPIs.find(api => api.id === 'world-bank-agriculture');
    const faoAPI = availableAPIs.find(api => api.id === 'fao-agricultural-data');
    const dataGovAgriAPI = availableAPIs.find(api => api.id === 'data-gov-agriculture');
    
    if (worldBankAgriAPI) relevantAPIs.push(worldBankAgriAPI.id);
    if (faoAPI) relevantAPIs.push(faoAPI.id);
    if (dataGovAgriAPI) relevantAPIs.push(dataGovAgriAPI.id);
  }

  // Health/Food Safety-related keywords
  const healthKeywords = ['health', 'safety', 'recall', 'cdc', 'public health', 'disease', 'outbreak'];
  if (healthKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const cdcAPI = availableAPIs.find(api => api.id === 'cdc-health-data');
    const fdaFoodAPI = availableAPIs.find(api => api.id === 'fda-food');
    
    if (cdcAPI) relevantAPIs.push(cdcAPI.id);
    if (fdaFoodAPI) relevantAPIs.push(fdaFoodAPI.id);
  }

  // Biological/Genomic research keywords (EBI Search API, LAPIS, Ensembl, UCSC)
  const biologicalKeywords = ['protein', 'gene', 'sequence', 'genomic', 'dna', 'rna', 'nucleotide', 'bioinformatics', 'molecular', 'genome', 'sars-cov-2', 'covid', 'virus', 'variant', 'ensembl', 'ucsc', 'chromosome', 'annotation', 'brca', 'genomics', 'comparative genomics', 'species'];
  if (biologicalKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const ebiAPI = availableAPIs.find(api => api.id === 'ebi-search');
    const lapisAPI = availableAPIs.find(api => api.id === 'lapis');
    const ensemblAPI = availableAPIs.find(api => api.id === 'ensembl');
    const ucscAPI = availableAPIs.find(api => api.id === 'ucsc-genome');
    
    if (ebiAPI) relevantAPIs.push(ebiAPI.id);
    if (lapisAPI) relevantAPIs.push(lapisAPI.id);
    if (ensemblAPI) relevantAPIs.push(ensemblAPI.id);
    if (ucscAPI) relevantAPIs.push(ucscAPI.id);
  }

  // Academic/Research keywords (OpenAlex)
  const academicKeywords = ['research', 'academic', 'paper', 'publication', 'scholar', 'journal', 'citation', 'author', 'institution', 'bibliometric', 'scientific'];
  if (academicKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const openAlexAPI = availableAPIs.find(api => api.id === 'openalex');
    if (openAlexAPI) relevantAPIs.push(openAlexAPI.id);
  }

  // Astronomy/Space keywords (Go-APOD)
  const astronomyKeywords = ['astronomy', 'space', 'nasa', 'picture', 'apod', 'galaxy', 'planet', 'star', 'universe', 'cosmic', 'telescope', 'nebula'];
  if (astronomyKeywords.some(keyword => lowerPrompt.includes(keyword))) {
    const apodAPI = availableAPIs.find(api => api.id === 'go-apod');
    if (apodAPI) relevantAPIs.push(apodAPI.id);
  }

  // If no specific APIs were identified, return a balanced default set focused on core business areas
  if (relevantAPIs.length === 0) {
    const defaultAPIs = ['openmeteo', 'restcountries', 'fda-drugs'];
    return defaultAPIs.filter(id => availableAPIs.some(api => api.id === id));
  }

  return relevantAPIs;
};
