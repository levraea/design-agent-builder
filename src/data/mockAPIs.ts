
import { Database, Cloud, Globe, Apple, Pill, Wheat, Heart, Building2 } from 'lucide-react';
import { API } from '@/types/api';

export const mockAPIs: API[] = [
  {
    id: 'openmeteo',
    name: 'Open-Meteo',
    description: 'Free weather API with historical weather data, weather forecasts, and climate data',
    category: 'GDAA Platform',
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
    id: 'fda-drugs',
    name: 'OpenFDA Drugs',
    description: 'FDA drug information including labeling, adverse events, and enforcement reports',
    category: 'Pharmaceutical',
    version: 'v1',
    status: 'active',
    icon: Pill,
    link: 'https://api.fda.gov/drug/',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'fda-food',
    name: 'OpenFDA Food',
    description: 'FDA food safety data including recalls, enforcement reports, and adverse events',
    category: 'Food Safety',
    version: 'v1',
    status: 'active',
    icon: Apple,
    link: 'https://api.fda.gov/food/',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'dailymed',
    name: 'DailyMed',
    description: 'Medication labeling and package information from the National Library of Medicine',
    category: 'Pharmaceutical',
    version: 'v1',
    status: 'active',
    icon: Pill,
    link: 'https://dailymed.nlm.nih.gov/dailymed/services.cfm',
    auth: 'None',
    https: true,
    cors: 'unknown'
  },
  {
    id: 'rxnorm',
    name: 'RxNorm API',
    description: 'Standardized medication names and codes from the National Library of Medicine',
    category: 'Pharmaceutical',
    version: 'v1',
    status: 'active',
    icon: Pill,
    link: 'https://rxnav.nlm.nih.gov/RxNormAPIs.html',
    auth: 'None',
    https: true,
    cors: 'unknown'
  },
  {
    id: 'world-bank-agriculture',
    name: 'World Bank Agriculture Data',
    description: 'Global agricultural indicators and development data',
    category: 'Agriculture',
    version: 'v2',
    status: 'active',
    icon: Wheat,
    link: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392',
    auth: 'None',
    https: true,
    cors: 'yes'
  },
  {
    id: 'fao-agricultural-data',
    name: 'FAO Agricultural Data',
    description: 'Food and Agriculture Organization global food security and agricultural statistics',
    category: 'Agriculture',
    version: 'v1',
    status: 'active',
    icon: Wheat,
    link: 'http://www.fao.org/faostat/en/#data',
    auth: 'None',
    https: false,
    cors: 'unknown'
  },
  {
    id: 'cdc-health-data',
    name: 'CDC Health Data',
    description: 'Public health data and statistics from the Centers for Disease Control',
    category: 'Health',
    version: 'v1',
    status: 'active',
    icon: Heart,
    link: 'https://data.cdc.gov/',
    auth: 'None',
    https: true,
    cors: 'unknown'
  },
  {
    id: 'data-gov-agriculture',
    name: 'Data.gov Agriculture',
    description: 'US government agricultural datasets and statistics',
    category: 'Agriculture',
    version: 'v1',
    status: 'active',
    icon: Building2,
    link: 'https://catalog.data.gov/dataset?groups=agriculture',
    auth: 'None',
    https: true,
    cors: 'unknown'
  }
];
