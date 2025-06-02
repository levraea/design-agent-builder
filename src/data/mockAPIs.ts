import { Database, Cloud, Globe, Apple, Pill, Wheat, Heart, Building2, Microscope, Dna, GraduationCap, Telescope, Users, Baby } from 'lucide-react';
import { API } from '@/types/api';

export const mockAPIs: API[] = [
  {
    id: 'openmeteo',
    name: 'Open-Meteo',
    description: 'Free weather API with historical weather data, weather forecasts, and climate data',
    category: 'CS Global Data Assets & Analytics Platform',
    version: 'v1',
    status: 'active',
    icon: Cloud,
    link: 'https://open-meteo.com/en/docs',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'restcountries',
    name: 'REST Countries',
    description: 'Get information about countries via a RESTful API',
    category: 'Enterprise Data & Analytics Platform',
    version: 'v3.1',
    status: 'active',
    icon: Globe,
    link: 'https://restcountries.com',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
    {
    id: 'faostat-agriculture',
    name: 'FAOSTAT Agriculture',
    description: 'FAO statistical agriculture data including production, trade, and consumption statistics',
    category: 'CS Global Data Assets & Analytics Platform',
    version: 'v1',
    status: 'active',
    icon: Wheat,
    link: 'https://ft9rfwu9wi.execute-api.us-east-2.amazonaws.com/agriculture',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'who-health',
    name: 'WHO Health',
    description: 'World Health Organization global health statistics and indicators',
    category: 'CH Data Assets, Analytics, and AI Platform',
    version: 'v1',
    status: 'active',
    icon: Heart,
    link: 'https://yem7yxwgge.execute-api.us-east-2.amazonaws.com/health',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'gnr-nutrition',
    name: 'Global Nutrition Report',
    description: 'Global nutrition data and statistics worldwide',
    category: 'CH Data Assets, Analytics, and AI Platform',
    version: 'v1',
    status: 'active',
    icon: Apple,
    link: 'https://0ih68gj8ei.execute-api.us-east-2.amazonaws.com/nutrition',
    auth: 'None',
    https: true,
    cors: 'yes'
  }
];
