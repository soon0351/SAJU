/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType = 
  | '천문명리' // Initial Screen (운명의 문)
  | '천기입력' // Input screen (생년월일시 정보)
  | '명리분석' // Info analysis (운명의 풀이)
  | '인연궁합'; // Compatibility (인연의 실타래)

export interface BirthInfo {
  birthDate: string; // e.g., "950415" or "1995-04-15"
  calendarType: 'solar' | 'lunar';
  birthTime: string; // e.g., "ja", "chuk", or "unknown"
  gender: 'male' | 'female';
}

export interface FourPillars {
  year: [string, string]; // e.g., ["癸", "酉"] (Heavenly Stem, Earthly Branch)
  month: [string, string]; // e.g., ["辛", "未"]
  day: [string, string];   // e.g., ["戊", "子"]
  hour: [string, string];  // e.g., ["丁", "卯"]
}

export interface ElementDistribution {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface SasangInfo {
  type: '태양인' | '소양인' | '태음인' | '소음인';
  hanja: string;
  description: string;
  traits: string[];
  foods: {
    good: string[];
    bad: string[];
  };
  habits: string[];
}

export interface SajuAnalysis {
  fourPillars: FourPillars;
  summaryPhrase: string;
  elements: ElementDistribution;
  highlights: string[];
  personality: string;
  wealth: string;
  career: string;
  careerTags: string[];
  yearlyTrend: {
    spring: string;
    autumn: string;
    winter: string;
  };
  sasang: SasangInfo;
}

export interface PartnerInfo {
  name: string;
  birthDate: string;
  calendarType: 'solar' | 'lunar';
  birthTime: string;
  gender: 'male' | 'female';
}

export interface CompatibilityAnalysis {
  score: number;
  grade: string;
  userElement: string;
  userElementKorean: string;
  partnerElement: string;
  partnerElementKorean: string;
  growthSummary: string;
  cautionSummary: string;
  tags: string[];
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  birthInfo: BirthInfo;
  analysis: SajuAnalysis;
}
