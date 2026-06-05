/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenType } from '../types';
import { Menu } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, transition: 'push' | 'push_back' | 'none') => void;
  onOpenHistory?: () => void;
}

export default function Header({ currentScreen, onNavigate, onOpenHistory }: HeaderProps) {
  // Traditional Dosa avatar matching the scholarly ink wash preview image
  const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5RpoKFtjtAuZoyaD7hO0unmsp6nYXuZEUx5ENx-BWxFwdeRfppUjYUDyCWoemtFdpvoMxiz1fRelA460KYI6zAAu9yDMpXsBdfWbXUfqKEZQsQlexlG3LvI8V1xMtvFt_7liWml5_RvNHPp6bwV7q4ipF4tExQghceW-8KGCtqsXtd925eouNkuiAGJrVc38sWWRFudpxTaFFNIgorvklFT_7HD7Ho-vCK48chd2rHv5vcTvN9aqP-Wn_F56LuxoEwkYNV1irNiG';

  const handleLinkClick = (e: React.MouseEvent, target: ScreenType) => {
    e.preventDefault();
    onNavigate(target, 'none');
  };

  return (
    <header className="bg-[#fcf2e6] dark:bg-[#353028] border-b border-[#1f1b14]/10 flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-7xl mx-auto sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-[#1f1b14]/20">
          <img 
            alt="Dosa Character" 
            className="w-full h-full object-cover" 
            src={avatarUrl}
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 
          className="text-[#1f1b14] dark:text-[#ffb4a8] font-bold text-xl md:text-2xl font-display cursor-pointer"
          onClick={(e) => handleLinkClick(e as any, '천문명리')}
        >
          천문명리
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex gap-4">
          <a
            href="#cheonmun"
            className={`font-medium text-sm lg:text-base px-3 py-1.5 rounded transition-colors ${
              currentScreen === '천문명리' 
                ? 'text-[#920703] font-bold bg-[#ebe1d5]/45' 
                : 'text-[#1f1b14]/70 hover:text-[#1f1b14] hover:bg-[#ebe1d5]/20'
            }`}
            onClick={(e) => handleLinkClick(e, '천문명리')}
          >
            천문
          </a>
          <a
            href="#saju"
            className={`font-medium text-sm lg:text-base px-3 py-1.5 rounded transition-colors ${
              currentScreen === '명리분석' 
                ? 'text-[#920703] font-bold bg-[#ebe1d5]/45' 
                : 'text-[#1f1b14]/70 hover:text-[#1f1b14] hover:bg-[#ebe1d5]/20'
            }`}
            onClick={(e) => handleLinkClick(e, '명리분석')}
          >
            사주
          </a>
          <a
            href="#gunghap"
            className={`font-medium text-sm lg:text-base px-3 py-1.5 rounded transition-colors ${
              currentScreen === '인연궁합' 
                ? 'text-[#920703] font-bold bg-[#ebe1d5]/45' 
                : 'text-[#1f1b14]/70 hover:text-[#1f1b14] hover:bg-[#ebe1d5]/20'
            }`}
            onClick={(e) => handleLinkClick(e, '인연궁합')}
          >
            궁합
          </a>
          <a
            href="#history"
            className="font-medium text-sm lg:text-base px-3 py-1.5 rounded text-[#1f1b14]/70 hover:text-[#1f1b14] hover:bg-[#ebe1d5]/20 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenHistory) onOpenHistory();
            }}
          >
            기록
          </a>
        </nav>
      </div>

      {/* Mobile Drawer trigger / status indicator */}
      <div className="md:hidden flex items-center gap-2">
        <button 
          onClick={onOpenHistory}
          className="p-2 text-[#1f1b14]/70 hover:text-[#1f1b14] transition-colors"
          title="이전 기록"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
