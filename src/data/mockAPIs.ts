
import { Database, Cloud, Globe } from 'lucide-react';
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
  }
];
