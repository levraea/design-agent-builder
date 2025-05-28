
import { Users, ShoppingCart, Database, Cloud, FileText, Globe, Camera, Music, BookOpen, Gamepad2, Heart } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('social') || categoryLower.includes('auth')) return Users;
  if (categoryLower.includes('shopping') || categoryLower.includes('business')) return ShoppingCart;
  if (categoryLower.includes('data') || categoryLower.includes('analytics')) return Database;
  if (categoryLower.includes('cloud') || categoryLower.includes('weather')) return Cloud;
  if (categoryLower.includes('document') || categoryLower.includes('text')) return FileText;
  if (categoryLower.includes('photo') || categoryLower.includes('image')) return Camera;
  if (categoryLower.includes('music') || categoryLower.includes('audio')) return Music;
  if (categoryLower.includes('books') || categoryLower.includes('news')) return BookOpen;
  if (categoryLower.includes('games') || categoryLower.includes('entertainment')) return Gamepad2;
  if (categoryLower.includes('health') || categoryLower.includes('medical')) return Heart;
  return Globe;
};
