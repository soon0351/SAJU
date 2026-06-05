/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BirthInfo, CompatibilityAnalysis, PartnerInfo } from '../types';
import { calculateCompatibility } from '../utils/saju';
import { Heart, Sun, AlertTriangle, Bookmark, Sparkles, Sliders } from 'lucide-react';

interface ScreenCompatibilityProps {
  userBirthInfo: BirthInfo;
}

export default function ScreenCompatibility({ userBirthInfo }: ScreenCompatibilityProps) {
  // Configured with standard default fallback matching screenshot but fully user-computable!
  const [partner, setPartner] = useState<PartnerInfo>({
    name: '상대방',
    birthDate: '950512',
    calendarType: 'lunar',
    birthTime: 'unknown',
    gender: 'female',
  });

  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [tempDate, setTempDate] = useState(partner.birthDate);
  const [tempCalendar, setTempCalendar] = useState<'solar' | 'lunar'>(partner.calendarType);
  const [hasSavedAnalysis, setHasSavedAnalysis] = useState(false);

  // Compute live compatibility dynamically
  let comp: CompatibilityAnalysis = calculateCompatibility(userBirthInfo, partner);

  const handleUpdatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDate = tempDate.replace(/[^0-9]/g, '');
    if (cleanDate.length !== 6 && cleanDate.length !== 8) {
      alert('생년월일을 6자리 혹은 8자리 숫자로 완벽히 다듬어주십시오.');
      return;
    }
    setPartner((prev) => ({
      ...prev,
      birthDate: cleanDate,
      calendarType: tempCalendar,
    }));
    setIsEditingPartner(false);
    setHasSavedAnalysis(false);
  };

  const handleSaveAnalysis = () => {
    setHasSavedAnalysis(true);
    alert('인품의 장에 두루마리 궁합지가 소중히 보관되었습니다.');
  };

  // Profile avatar images matching pre-designed preview exactly
  const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ5O_EQC8sKZ2lITfh7NScYH2E8Bu7_cztfRh1O5JrTAtgeaus_MTPN4UL3LF4QzfJsj0JLhv6LwTua93IUGvs6Tm7IsFW_OiShdx4a2LqaXoVZqIRD2GXfMnZZmkBMrsBRwds75P-OciLaumyu0HrqtyZj9mB2AJy0pyOgIVH1EONkBdP7NaL9gowZ8WTe0XL8GrCynOxQJJLK4Jg248q18XP6Bx2ZzDpD9xoVeOlv8i6i_OpA9w_h5hsD29JkL_99CLcf_Cv4w67';
  const partnerAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtT5-nE7x7dOPFWnIwaMr8eZ21hat5zgjnpzuXS34WlR3F_UwkQWewIaQwf2nXNojZHelrbRqu0klKqo2Ukvfyf-moTaiXv-6UBi8FWJ5MbZEV8kQIpEuWNru_JUOt-zxP0Bp1ChYZVf7yXnBmEfJj_12GJUfQFyd5tZyO9h9mif9wdbCWswK3ac3pLwYua_Qzx9sEiDQqCqQ7gwtxR9Im3GZSOjJJE61yyqYBsPoXKnj2N3Vq2EuJKCX-yWjGA6A_FFC_A0FSp44p';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-16">
      
      {/* Header Topic */}
      <section className="text-center space-y-4">
        <h2 className="font-display font-medium text-3xl md:text-4xl text-[#1f1b14] font-bold">인연궁합</h2>
        <p className="font-serif text-[#645e49] max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          두 사람의 기운이 만나 이루는 조화와 균형을 살핍니다.<br />
          음양오행의 흐름을 통해 인연의 깊이를 확인해보세요.
        </p>
      </section>

      {/* Editor Drawer for Partner custom attributes in-app */}
      {isEditingPartner ? (
        <form onSubmit={handleUpdatePartner} className="max-w-md mx-auto p-6 bg-white border border-[#1f1b14]/20 rounded-xl space-y-4 shadow-md">
          <h4 className="font-display font-bold text-sm text-[#1f1b14] border-b pb-2 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#920703]" />
            상대방 기운 입력
          </h4>

          <div>
            <label className="text-xs font-semibold text-[#645e49] block mb-1">인연 생년월일 (예: 950512)</label>
            <input
              type="text"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded font-serif text-center focus:border-[#920703] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`py-2 px-3 border rounded text-xs font-serif ${
                tempCalendar === 'solar' ? 'bg-[#ebe1d5] border-[#1f1b14]' : 'border-slate-200'
              }`}
              onClick={() => setTempCalendar('solar')}
            >
              양력 (Solar)
            </button>
            <button
              type="button"
              className={`py-2 px-3 border rounded text-xs font-serif ${
                tempCalendar === 'lunar' ? 'bg-[#ebe1d5] border-[#1f1b14]' : 'border-slate-200'
              }`}
              onClick={() => setTempCalendar('lunar')}
            >
              음력 (Lunar)
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2 rounded bg-[#920703] hover:bg-[#720502] text-white font-serif text-xs font-bold transition-all"
            >
              운명 조율하기
            </button>
            <button
              type="button"
              className="px-3 py-2 border rounded font-serif text-xs hover:bg-neutral-50"
              onClick={() => setIsEditingPartner(false)}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setIsEditingPartner(true)}
            className="px-4 py-2 bg-[#ebe1d5]/70 hover:bg-[#ebe1d5] text-xs font-serif font-bold text-[#1f1b14] border border-[#1f1b14]/25 rounded-full flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#920703] animate-pulse" />
            상대방 사주 직접 넣기
          </button>
        </div>
      )}

      {/* Main interactive threads landscape */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative py-4">
        
        {/* User Card */}
        <div className="bg-[#FCF9F2] p-8 border border-[#1f1b14]/15 rounded-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-[#1f1b14]/10 bg-slate-100">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src={userAvatar}
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-display font-bold text-lg mb-2">나</h3>
          
          <div className="flex gap-2 mb-4">
            <span className="bg-[#ebe1d5] border border-[#1f1b14]/10 text-[#1f1b14] text-[10px] px-2.5 py-1 rounded font-serif font-bold uppercase tracking-wider">
              {comp.userElementKorean} (원소)
            </span>
            <span className="bg-[#ebe1d5] border border-[#1f1b14]/10 text-[#1f1b14] text-[10px] px-2.5 py-1 rounded font-serif font-bold uppercase tracking-wider">
              陽 (태양기)
            </span>
          </div>

          <p className="text-sm font-serif text-center text-[#645e49] leading-relaxed">
            {comp.userElementKorean === '토' 
              ? '비옥하고 묵묵하게 온 생명을 길러내는 흙. 우직하고 든든한 성정.' 
              : '따뜻한 봄의 기운을 가득 품은 거목. 올곧고 진지한 성정.'
            }
          </p>
        </div>

        {/* Dynamic score thread controller */}
        <div className="flex flex-col items-center justify-center space-y-4 relative py-8 md:py-0 select-none">
          {/* Grid visual center line */}
          <div className="hidden md:block absolute top-[40%] left-[-15%] right-[-15%] h-[1px] bg-gradient-to-r from-transparent via-[#920703]/25 to-transparent z-0"></div>
          
          {/* Circular SVG Harmony Counter */}
          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#fff8f2] relative overflow-hidden border border-[#1f1b14]/20 shadow-inner z-10">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="44" stroke="#ebe1d5" strokeWidth="6" />
              <circle
                className="transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="none"
                r="44"
                stroke="#920703"
                strokeWidth="6"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * comp.score) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>

            <div className="text-center z-10 flex flex-col items-center">
              <span className="block font-display text-2xl font-black text-[#920703] leading-none">{comp.score}%</span>
              <span className="block text-[10px] text-[#645e49] font-bold mt-1 tracking-wider uppercase font-display">조화도</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#920703] z-10 bg-[#fff8f2] px-3.5 py-1 rounded-full border border-[#920703]/20">
            <Heart className="w-4 h-4 fill-[#920703]" />
            <span className="text-xs md:text-sm font-semibold font-serif">{comp.grade}</span>
          </div>
        </div>

        {/* Partner Card */}
        <div className="bg-[#FCF9F2] p-8 border border-[#1f1b14]/15 rounded-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-[#1f1b14]/10 bg-slate-100">
            <img
              alt="Partner profile"
              className="w-full h-full object-cover"
              src={partnerAvatar}
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-display font-bold text-lg mb-2">상대방</h3>
          
          <div className="flex gap-2 mb-4">
            <span className="bg-[#ebe1d5] border border-[#1f1b14]/10 text-[#1f1b14] text-[10px] px-2.5 py-1 rounded font-serif font-bold uppercase tracking-wider">
              {comp.partnerElementKorean} (원소)
            </span>
            <span className="bg-[#ebe1d5] border border-[#1f1b14]/10 text-[#1f1b14] text-[10px] px-2.5 py-1 rounded font-serif font-bold uppercase tracking-wider">
              陰 (달의기)
            </span>
          </div>

          <p className="text-sm font-serif text-center text-[#645e49] leading-relaxed">
            {comp.partnerElementKorean === '수' 
              ? '깊고 고요하지만 마르지 않는 넓은 호수. 사색과 지혜를 품은 영성.' 
              : '창명하게 타오르고 영감을 뿜어내는 정화불의 따스함. 명쾌한 기상.'
            }
          </p>
        </div>

      </section>

      {/* Analysis Card Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Growth points */}
        <div className="bg-[#FCF9F2] p-6 md:p-8 border border-[#1f1b14]/15 rounded-xl flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#1f1b14]/10 pb-4">
              <Sun className="w-5 h-5 text-[#920703]" />
              <h3 className="font-display font-medium text-lg text-[#1f1b14]">성장의 기운 (상생)</h3>
            </div>
            <p className="font-serif text-sm leading-relaxed text-[#1f1b14]/85">
              {comp.growthSummary}
            </p>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {comp.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 bg-[#fff8f2] rounded-full border border-[#1f1b14]/12 text-[#645e49] font-medium font-serif">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Warning points */}
        <div className="bg-[#FCF9F2] p-6 md:p-8 border border-[#1f1b14]/15 rounded-xl flex flex-col gap-4 relative overflow-hidden">
          {/* Aesthetic lotus watermark ornament */}
          <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-stone-800 select-none pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>

          <div className="flex items-center gap-3 border-b border-[#1f1b14]/10 pb-4 relative z-10">
            <AlertTriangle className="w-5 h-5 text-[#920703]" />
            <h3 className="font-display font-medium text-lg text-[#1f1b14]">주의할 기운 (상극)</h3>
          </div>
          <p className="font-serif text-sm leading-relaxed text-[#1f1b14]/85 relative z-10">
            {comp.cautionSummary}
          </p>
        </div>

      </section>

      {/* Traditional action stamp button */}
      <section className="flex justify-center pt-8 border-t border-dashed border-[#1f1b14]/20">
        <button
          className={`px-8 py-4 rounded font-serif font-bold text-sm md:text-base flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer ${
            hasSavedAnalysis 
              ? 'bg-[#645e49] text-[#ebe1d5] border border-stone-600 cursor-default pointer-events-none opacity-85'
              : 'bg-[#920703] text-white border-2 border-[#5a0402] hover:bg-[#ba1a1a]'
          }`}
          onClick={handleSaveAnalysis}
        >
          {hasSavedAnalysis ? '궁합지 보관 완료' : '상세 풀이 보관하기'}
          <Bookmark className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
