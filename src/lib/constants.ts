import type { Category } from './types';

export const DEFAULT_CATS: Category[] = [
  { name: '식비',      emoji: '🍽️', color: '#c05621', bg: '#feebc8' },
  { name: '교통',      emoji: '🚌', color: '#2b6cb0', bg: '#bee3f8' },
  { name: '주거/생활', emoji: '🏠', color: '#276749', bg: '#c6f6d5' },
  { name: '경조사',    emoji: '🎉', color: '#97266d', bg: '#fed7e2' },
  { name: '의료/건강', emoji: '💊', color: '#c53030', bg: '#fed7d7' },
  { name: '쇼핑',      emoji: '🛍️', color: '#553c9a', bg: '#e9d8fd' },
  { name: '문화/여가', emoji: '🎭', color: '#086f83', bg: '#c4f1f9' },
  { name: '기타',      emoji: '📦', color: '#4a5568', bg: '#e2e8f0' },
];

export const CAT_PALETTE: Pick<Category, 'color' | 'bg'>[] = [
  { color: '#744210', bg: '#fefcbf' },
  { color: '#1a365d', bg: '#dbeafe' },
  { color: '#22543d', bg: '#d1fae5' },
  { color: '#702459', bg: '#fce7f3' },
  { color: '#3b1f6e', bg: '#ede9fe' },
  { color: '#134e4a', bg: '#ccfbf1' },
];
