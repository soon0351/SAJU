/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScreenType } from '../types';
import { Sparkles, FileText, History } from 'lucide-react';

interface ScreenGateProps {
  onNavigate: (screen: ScreenType, transition: 'push' | 'push_back' | 'none') => void;
  onOpenHistory?: () => void;
}

export default function ScreenGate({ onNavigate, onOpenHistory }: ScreenGateProps) {
  // Atmospheric Hanok study image matching the design preview exactly
  const studyImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5M8CnIG8gs5UlER2rT3Z9cZ-hdy7X3WmdMBkAZaGBcq79ZcchZPGIn9s3APiB9bFby6usTb-53ZaKH3jdEklDgh1PJADP7XAZWiOnBXYOJn1NIJP7_num_TTgl2Wx2hDJxtFmoL_-Vc5xF7Fvk7EKslU5HMyNIvqM3sAl7MxYkF1HcpjpiheUZzkM6VxmhizEnlhpRkAVHIyuH2PCNFvs6nwYK36ThrtmVJhrsoK3INlf4oOO-diTKr2Y5dvkdJWCUuBhIfTBE29K';

  return (
    <div className="w-full max-w-3xl flex flex-col items-center text-center gap-8 relative pb-12 mt-4">
      {/* Decorative Traditional Border Image Container */}
      <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden ink-border relative shadow-md">
        <img
          alt="Mystical Study"
          className="w-full h-full object-cover opacity-90"
          src={studyImg}
          referrerPolicy="no-referrer"
        />
        {/* Soft Parchment-tone Gradient Blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f2] via-transparent to-transparent opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f2]/20 to-transparent"></div>
      </div>

      {/* Traditional Scholarly Decal Card */}
      <div className="bg-[#fcf2e6]/90 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-[#1f1b14]/15 -mt-20 md:-mt-32 relative z-10 shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-9 h-9 text-[#920703] animate-pulse" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-display text-[#1f1b14] mb-6 leading-relaxed font-bold">
          "운명의 문을 두드리는 이여,<br />이 늙은 도사에게 사주를 알려주시겠소?"
        </h2>
        
        <p className="text-[#645e49] text-base md:text-lg mb-8 font-serif leading-relaxed">
          천지자연의 이치와 음양오행의 조화를 통해<br className="hidden md:block" />
          당신의 걸어갑 길을 조용히 비춰드리리다.
        </p>

        {/* Cloud Divider Motif */}
        <div className="cloud-divider w-full mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* xpath target: //button[contains(., '사주 입력하기')] */}
          <button
            className="w-full sm:w-auto bg-[#920703] hover:bg-[#ba1a1a] text-white font-serif py-3.5 px-8 rounded border-2 border-[#5a0402] text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => onNavigate('천기입력', 'push')}
          >
            <FileText className="w-4 h-4" />
            사주 입력하기
          </button>
          
          <button
            className="w-full sm:w-auto bg-transparent hover:bg-[#1f1b14]/5 text-[#1f1b14] border border-[#1f1b14]/40 font-serif py-3.5 px-8 rounded text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            onClick={onOpenHistory}
          >
            <History className="w-4 h-4" />
            이전 기록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
