
import { LucideIcon } from 'lucide-react';

export interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: 'active' | 'deprecated' | 'beta';
  icon: LucideIcon;
  link: string;
  auth: string;
  https: boolean;
  cors: string;
}

export interface APIRegistryProps {
  selectedAPIs: string[];
  onSelectionChange: (apis: string[]) => void;
}
