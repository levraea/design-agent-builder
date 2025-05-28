
import { Database, Cloud, Camera, Globe, BookOpen } from 'lucide-react';
import { API } from '@/types/api';

export const mockAPIs: API[] = [
  {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder',
    description: 'Free fake REST API for testing and prototyping',
    category: 'Development',
    version: 'v1.0.0',
    status: 'active',
    icon: Database,
    link: 'https://jsonplaceholder.typicode.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
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
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Beautiful, free photos gifted by the worlds most generous community',
    category: 'Photography',
    version: 'v1.0',
    status: 'active',
    icon: Camera,
    link: 'https://unsplash.com/developers',
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
    id: 'quotegarden',
    name: 'QuoteGarden',
    description: 'REST API for famous quotes',
    category: 'Text',
    version: 'v3.0',
    status: 'active',
    icon: BookOpen,
    link: 'https://quotegarden.herokuapp.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  }
];
