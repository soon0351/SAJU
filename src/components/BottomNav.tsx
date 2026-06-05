/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, transition: 'push' | 'push_back' | 'none') => void;
  onOpenHistory?: () => void;
}

export default function BottomNav({ currentScreen, onNavigate, onOpenHistory }: BottomNavProps) {
  const handleLinkClick = (e: React.MouseEvent, target: ScreenType) => {
    e.preventDefault();
    onNavigate(target, 'none');
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-4 pt-2 bg-[#fcf2e6] border-t border-[#1f1b14]/15 shadow-lg">
      <a
        href="#cheonmun"
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 ${
          currentScreen === '천문명리'
            ? 'bg-[#920703] text-white'
            : 'text-[#645e49] opacity-75'
        }`}
        onClick={(e) => handleLinkClick(e, '천문명리')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="text-xs font-semibold">천문</span>
      </a>

      <a
        href="#saju"
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 ${
          currentScreen === '명리분석'
            ? 'bg-[#920703] text-white'
            : 'text-[#645e49] opacity-75'
        }`}
        onClick={(e) => handleLinkClick(e, '명리분석')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="text-xs font-semibold">사주</span>
      </a>

      <a
        href="#gunghap"
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 ${
          currentScreen === '인연궁합'
            ? 'bg-[#920703] text-white'
            : 'text-[#645e49] opacity-75'
        }`}
        onClick={(e) => handleLinkClick(e, '인연궁합')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-xs font-semibold">궁합</span>
      </a>

      <a
        href="#history"
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[#645e49] opacity-75 hover:opacity-100 transition-all duration-200"
        onClick={(e) => {
          e.preventDefault();
          if (onOpenHistory) onOpenHistory();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-semibold">기록</span>
      </a>
    </nav>
  );
}
