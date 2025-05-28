

import { Database, Cloud, Globe, Apple } from 'lucide-react';
import { API } from '@/types/api';

export const mockAPIs: API[] = [
  {
    id: 'openweather',
    name: 'OpenWeatherMap',
    description: 'Weather data including current weather, forecasts, and historical data',
    category: 'Weather',
    version: 'v2.5',
    status: 'active',
    icon: Cloud,
    link: 'https://openweathermap.org/api',
    auth: 'API Key',
    https: true,
    cors: 'yes'
  },
  {
    id: 'restcountries',
    name: 'REST Countries',
    description: 'Get information about countries via a RESTful API',
    category: 'Geography',
    version: 'v3.1',
    status: 'active',
    icon: Globe,
    link: 'https://restcountries.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'usda-food-central',
    name: 'USDA Food Central',
    description: 'Search and retrieve nutrition data for foods from the USDA Food Data Central database',
    category: 'Food & Nutrition',
    version: 'v1',
    status: 'active',
    icon: Apple,
    link: 'https://api.nal.usda.gov/fdc/v1/foods/search',
    auth: 'API Key',
    https: true,
    cors: 'unknown'
  }
];

