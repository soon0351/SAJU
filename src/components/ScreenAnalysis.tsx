/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SajuAnalysis } from '../types';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Download, 
  Palette, 
  Lightbulb, 
  Coins, 
  Briefcase,
  Sparkles
} from 'lucide-react';

interface ScreenAnalysisProps {
  analysis: SajuAnalysis;
}

export default function ScreenAnalysis({ analysis }: ScreenAnalysisProps) {
  const [paintingImageUrl, setPaintingImageUrl] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  // Quick lookup colors based on Chinese characters for active coloring
  const getOhaengColor = (char: string) => {
    if ('甲乙寅卯'.includes(char)) return 'text-[#4A7C59] font-bold'; // Wood
    if ('丙丁巳午'.includes(char)) return 'text-[#920703] font-bold'; // Fire
    if ('戊己辰戌丑未'.includes(char)) return 'text-[#B59A45] font-bold'; // Earth
    if ('庚辛申酉'.includes(char)) return 'text-amber-800/80 font-bold'; // Metal
    if ('壬癸亥子'.includes(char)) return 'text-slate-900 font-bold'; // Water
    return 'text-neutral-700';
  };

  const getOhaengBg = (char: string) => {
    if ('甲乙寅卯'.includes(char)) return 'bg-[#4A7C59]/10 border-[#4A7C59]/30'; 
    if ('丙丁巳午'.includes(char)) return 'bg-[#920703]/10 border-[#920703]/30'; 
    if ('戊己辰戌丑未'.includes(char)) return 'bg-[#B59A45]/10 border-[#B59A45]/30'; 
    if ('庚辛申酉'.includes(char)) return 'bg-amber-800/10 border-amber-800/30'; 
    if ('壬癸亥子'.includes(char)) return 'bg-slate-900/10 border-slate-900/30'; 
    return 'bg-neutral-100 border-neutral-200';
  };

  const handleGenerateImage = () => {
    setIsGeneratingImg(true);
    setTimeout(() => {
      // Create a deterministic traditional painting URL based on dominant elements to provide high-quality result
      let dominantElement = 'mountain';
      const { wood, fire, earth, metal, water } = analysis.elements;
      const maxVal = Math.max(wood, fire, earth, metal, water);
      if (maxVal === wood) dominantElement = 'forest';
      else if (maxVal === fire) dominantElement = 'sunrise';
      else if (maxVal === earth) dominantElement = 'mountain';
      else if (maxVal === metal) dominantElement = 'crystal';
      else if (maxVal === water) dominantElement = 'lake';

      // Beautiful illustrative painting URLs matching traditional Korean scroll paintings
      const illustrations: Record<string, string> = {
        forest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ5O_EQC8sKZ2lITfh7NScYH2E8Bu7_cztfRh1O5JrTAtgeaus_MTPN4UL3LF4QzfJsj0JLhv6LwTua93IUGvs6Tm7IsFW_OiShdx4a2LqaXoVZqIRD2GXfMnZZmkBMrsBRwds75P-OciLaumyu0HrqtyZj9mB2AJy0pyOgIVH1EONkBdP7NaL9gowZ8WTe0XL8GrCynOxQJJLK4Jg248q18XP6Bx2ZzDpD9xoVeOlv8i6i_OpA9w_h5hsD29JkL_99CLcf_Cv4w67', // forest wash
        sunrise: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrTcRqUKhiycBwlt6PVMVo3NRs7jvXwaJ57OKXberPDobrgB98rjI7tTz1FLAdQ5gdXGe6zHoXFd0FPflal5zUVsjPVvdCClJw6IGcW8DH7k7q4tMMvjILUzlAShhe2IT4teBYivtn2vjJbx1Krfv9n3chiaUVhePOcWjED53-pxA_Whz15ml9kBIjmWYJ3aWw98y4V4-TgZAlU11PXDb2Cr7m_epDxdPwUdtxv64kJXLppDvCdZQ3EyTLQq32bD4QKgX3-AD06tjf', // fire sunrise hanok
        mountain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5M8CnIG8gs5UlER2rT3Z9cZ-hdy7X3WmdMBkAZaGBcq79ZcchZPGIn9s3APiB9bFby6usTb-53ZaKH3jdEklDgh1PJADP7XAZWiOnBXYOJn1NIJP7_num_TTgl2Wx2hDJxtFmoL_-Vc5xF7Fvk7EKslU5HMyNIvqM3sAl7MxYkF1HcpjpiheUZzkM6VxmhizEnlhpRkAVHIyuH2PCNFvs6nwYK36ThrtmVJhrsoK3INlf4oOO-diTKr2Y5dvkdJWCUuBhIfTBE29K', // mountains
        crystal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBobwusD9GcrSu8JiXS-g-DSRaCNBZ1IreD5mxetf9iiyV53XzGcIwQcZQgabYf9f7qgxkAMc-smz9taJovey8GqebogvNVWLzhvrbDqG1Fm1kewZTu9881z5YmwpB1fcqRMz0i13PHzG8iZqtKVAbZz0OvVIOld962OEre-IOk08hFzFAqOJGV9RWVa94lswfAJeNAkX6e9r3YN88nc-AQHwSzbrRTG7EL34IZVxvd9UmjXBnLu-Fg7y7_BQLXafwMzimnBz_AcY7l', // gold outline
        lake: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtT5-nE7x7dOPFWnIwaMr8eZ21hat5zgjnpzuXS34WlR3F_UwkQWewIaQwf2nXNojZHelrbRqu0klKqo2Ukvfyf-moTaiXv-6UBi8FWJ5MbZEV8kQIpEuWNru_JUOt-zxP0Bp1ChYZVf7yXnBmEfJj_12GJUfQFyd5tZyO9h9mif9wdbCWswK3ac3pLwYua_Qzx9sEiDQqCqQ7gwtxR9Im3GZSOjJJE61yyqYBsPoXKnj2N3Vq2EuJKCX-yWjGA6A_FFC_A0FSp44p' // deep water hanok
      };

      setPaintingImageUrl(illustrations[dominantElement] || illustrations.mountain);
      setIsGeneratingImg(false);
    }, 1800);
  };

  const hasPillars = !!analysis.fourPillars;

  return (
    <div className="w-full space-y-12 pb-16">
      
      {/* Header Title */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1f1b14] tracking-tight">명리분석</h1>
        <p className="text-base md:text-lg text-[#645e49] font-serif">당신의 타고난 기운과 흐름을 살핍니다.</p>
        <div className="w-24 h-[1px] bg-[#1f1b14]/25 mx-auto mt-6"></div>
      </div>

      {/* Four Pillars Scroll */}
      {hasPillars && (
        <section className="bg-[#fcf2e6] border border-[#1f1b14]/20 rounded-lg p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Traditional decorative corner icons */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#920703]/30 m-4"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#920703]/30 m-4"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#920703]/30 m-4"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#920703]/30 m-4"></div>

          <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5 text-[#920703]" />
            사주팔자 (四柱八字)
          </h2>

          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-2xl mx-auto">
            {/* Hour Block */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#645e49] font-semibold">시주 (時柱)</span>
              <div className="bg-[#f0e7db] border border-[#1f1b14]/25 w-full aspect-[1/2] rounded flex flex-col items-center justify-center gap-4 py-4 cursor-pointer hover:bg-neutral-50 transition-colors">
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.hour[0])}`}>
                  {analysis.fourPillars.hour[0]}
                </span>
                <div className="w-4 h-[1px] bg-[#1f1b14]/25" />
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.hour[1])}`}>
                  {analysis.fourPillars.hour[1]}
                </span>
              </div>
            </div>

            {/* Day Block (Representing Self) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#920703] font-bold">일주 (日柱) - 나</span>
              <div className="bg-[#f0e7db] border-2 border-[#920703] w-full aspect-[1/2] rounded flex flex-col items-center justify-center gap-4 py-4 cursor-pointer hover:bg-neutral-50 transition-colors shadow-sm ring-1 ring-[#920703]/30">
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.day[0])}`}>
                  {analysis.fourPillars.day[0]}
                </span>
                <div className="w-4 h-[1px] bg-[#920703]/30" />
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.day[1])}`}>
                  {analysis.fourPillars.day[1]}
                </span>
              </div>
            </div>

            {/* Month Block */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#645e49] font-semibold">월주 (月柱)</span>
              <div className="bg-[#f0e7db] border border-[#1f1b14]/25 w-full aspect-[1/2] rounded flex flex-col items-center justify-center gap-4 py-4 cursor-pointer hover:bg-neutral-50 transition-colors">
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.month[0])}`}>
                  {analysis.fourPillars.month[0]}
                </span>
                <div className="w-4 h-[1px] bg-[#1f1b14]/25" />
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.month[1])}`}>
                  {analysis.fourPillars.month[1]}
                </span>
              </div>
            </div>

            {/* Year Block */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#645e49] font-semibold">년주 (年柱)</span>
              <div className="bg-[#f0e7db] border border-[#1f1b14]/25 w-full aspect-[1/2] rounded flex flex-col items-center justify-center gap-4 py-4 cursor-pointer hover:bg-neutral-50 transition-colors">
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.year[0])}`}>
                  {analysis.fourPillars.year[0]}
                </span>
                <div className="w-4 h-[1px] bg-[#1f1b14]/25" />
                <span className={`text-[2rem] md:text-[3.5rem] leading-none ${getOhaengColor(analysis.fourPillars.year[1])}`}>
                  {analysis.fourPillars.year[1]}
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm md:text-base font-serif text-[#1f1b14]/80 mt-8 max-w-lg mx-auto italic leading-relaxed">
            "{analysis.summaryPhrase}"
          </p>
        </section>
      )}

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Five Elements (오행 분포) */}
        <div className="md:col-span-5 space-y-8 sticky top-24">
          <section className="bg-[#ebe1d5]/90 rounded-xl p-6 border border-[#1f1b14]/15 shadow-sm">
            <h3 className="font-display font-bold text-lg mb-6 border-b border-[#1f1b14]/10 pb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#920703]" />
              오행 분포 (五行)
            </h3>

            {/* Radar Circular Diagram */}
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#1f1b14]/25 opacity-40"></div>
              
              {/* Wood */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#4A7C59] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  목(木)
                </div>
                <span className="text-[10px] mt-1 text-[#645e49] font-bold">{analysis.elements.wood}</span>
              </div>

              {/* Fire */}
              <div className="absolute top-1/4 -right-4 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#920703] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  화(火)
                </div>
                <span className="text-[10px] mt-1 text-[#645e49] font-bold">{analysis.elements.fire}</span>
              </div>

              {/* Earth */}
              <div className="absolute bottom-1/4 -right-4 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#B59A45] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  토(土)
                </div>
                <span className="text-[10px] mt-1 text-[#645e49] font-bold">{analysis.elements.earth}</span>
              </div>

              {/* Metal */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-orange-200 border border-[#1f1b14]/30 flex items-center justify-center text-stone-800 text-xs font-bold shadow-sm">
                  금(金)
                </div>
                <span className="text-[10px] mt-1 text-[#645e49] font-bold">{analysis.elements.metal}</span>
              </div>

              {/* Water */}
              <div className="absolute top-1/4 -left-4 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  수(水)
                </div>
                <span className="text-[10px] mt-1 text-[#645e49] font-bold">{analysis.elements.water}</span>
              </div>

              <div className="text-center select-none">
                <span className="text-2xl font-display font-medium text-[#1f1b14]/40">조화</span>
              </div>
            </div>

            {/* Elements Progress Lines */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-serif text-[#1f1b14]">
                  <span className="font-bold">강한 기운:</span>
                  <span>
                    {[
                      analysis.elements.earth > 1 && '토(土)',
                      analysis.elements.metal > 1 && '금(金)',
                      analysis.elements.water > 1 && '수(水)',
                      analysis.elements.wood > 1 && '목(木)',
                      analysis.elements.fire > 1 && '화(火)'
                    ].filter(Boolean).join(', ') || '고른 분포'}
                  </span>
                </div>
                <div className="h-1.5 bg-white/50 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#B59A45] flex-grow" style={{ flexGrow: analysis.elements.earth }} />
                  <div className="h-full bg-orange-300 flex-grow" style={{ flexGrow: analysis.elements.metal }} />
                  <div className="h-full bg-slate-900 flex-grow" style={{ flexGrow: analysis.elements.water }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-serif text-[#1f1b14]">
                  <span className="font-bold">필요한/용신 기운:</span>
                  <span>
                    {[
                      analysis.elements.wood <= 1 && '목(木)',
                      analysis.elements.fire <= 1 && '화(火)',
                      analysis.elements.earth <= 1 && '토(土)',
                      analysis.elements.metal <= 1 && '금(金)',
                      analysis.elements.water <= 1 && '수(水)'
                    ].filter(Boolean).join(', ') || '자가조화(조화로움)'}
                  </span>
                </div>
                <div className="h-1.5 bg-white/50 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#4A7C59] flex-grow" style={{ flexGrow: analysis.elements.wood <= 1 ? 2 : 1 }} />
                  <div className="h-full bg-[#920703] flex-grow" style={{ flexGrow: analysis.elements.fire <= 1 ? 2 : 1 }} />
                </div>
              </div>
            </div>
          </section>

          {/* Scholars advice */}
          <section className="bg-[#f6ece0]/40 rounded-xl p-6 border border-[#1f1b14]/15">
            <h3 className="font-display font-semibold text-lg text-[#920703] mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              도사의 핵심 조언
            </h3>
            <ul className="space-y-4 font-serif text-sm leading-relaxed text-[#1f1b14]">
              {analysis.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#920703] mt-0.5 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Detailed Sections (Bento Layout) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Sasang Constitution Card */}
          <article className="bg-[#fff8f2] border-2 border-[#920703]/30 rounded-xl p-6 shadow-md relative overflow-hidden transition-all hover:scale-[1.01]">
            {/* Elegant badge */}
            <div className="absolute top-4 right-4 bg-[#920703]/10 border border-[#920703]/30 text-[#920703] text-[10px] px-2.5 py-1 rounded font-serif font-bold uppercase tracking-widest">
              사상체질 (四象體質)
            </div>

            <div className="flex items-center gap-3 mb-4 border-b border-[#1f1b14]/10 pb-3">
              <div className="w-10 h-10 rounded-full bg-[#920703]/10 flex items-center justify-center text-[#920703]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg leading-tight text-[#1f1b14]">
                  나의 체질: <span className="font-bold text-[#920703]">{analysis.sasang.type}</span> ({analysis.sasang.hanja})
                </h3>
                <span className="text-xs text-[#645e49] font-serif">사주 오행 배속 전통 판별식</span>
              </div>
            </div>

            <p className="font-serif text-[#1f1b14]/85 text-sm leading-relaxed mb-4 italic">
              "{analysis.sasang.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-white/65 p-4 rounded-lg border border-[#1f1b14]/5">
              {/* Characteristics list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1f1b14]/80 border-b pb-1 font-display">체질별 주요 성정</h4>
                <ul className="space-y-1.5 text-xs text-[#645e49] font-serif">
                  {analysis.sasang.traits.map((trait, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-[#920703] font-bold">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet / Food Habits */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-800 mb-1 font-display flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    이로운 음식 (득이 되는 기)
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.sasang.foods.good.map((food, idx) => (
                      <span key={idx} className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-medium">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-rose-800 mb-1 font-display flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    해로운 음식 (독이 되는 기)
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.sasang.foods.bad.map((food, idx) => (
                      <span key={idx} className="bg-rose-50 border border-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded font-medium">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Health Habits */}
            <div className="mt-4 pt-3 border-t border-[#1f1b14]/10 text-xs text-[#645e49] font-serif">
              <span className="font-bold text-[#1f1b14]/80 block mb-1">체질별 권장 섭생 습관:</span>
              <ul className="space-y-1">
                {analysis.sasang.habits.map((habit, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-[#920703]">☝</span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          
          {/* Character */}
          <article className="bg-[#ffffff]/80 backdrop-blur-xs rounded-xl p-6 border border-[#1f1b14]/12 shadow-xs">
            <div className="flex items-center gap-3 mb-4 border-b border-[#1f1b14]/10 pb-3">
              <div className="w-9 h-9 rounded bg-[#ebe1d5] flex items-center justify-center text-[#1f1b14]">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-display font-medium text-lg">성향 및 재능</h3>
            </div>
            <p className="font-serif text-[#1f1b14]/85 text-sm md:text-base leading-relaxed">
              {analysis.personality}
            </p>
          </article>

          {/* Wealth */}
          <article className="bg-[#ffffff]/80 backdrop-blur-xs rounded-xl p-6 border border-[#1f1b14]/12 shadow-xs">
            <div className="flex items-center gap-3 mb-4 border-b border-[#1f1b14]/10 pb-3">
              <div className="w-9 h-9 rounded bg-[#ebe1d5] flex items-center justify-center text-[#1f1b14]">
                <Coins className="w-4 h-4" />
              </div>
              <h3 className="font-display font-medium text-lg">재물운</h3>
            </div>
            <p className="font-serif text-[#1f1b14]/85 text-sm md:text-base leading-relaxed">
              {analysis.wealth}
            </p>
          </article>

          {/* Career */}
          <article className="bg-[#ffffff]/80 backdrop-blur-xs rounded-xl p-6 border border-[#1f1b14]/12 shadow-xs">
            <div className="flex items-center gap-3 mb-4 border-b border-[#1f1b14]/10 pb-3">
              <div className="w-9 h-9 rounded bg-[#ebe1d5] flex items-center justify-center text-[#1f1b14]">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-display font-medium text-lg">직업 및 진로</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {analysis.careerTags.map((tag, idx) => (
                <span key={idx} className="bg-[#ebe1d5]/60 border border-[#1f1b14]/10 text-[#1f1b14] text-xs px-2.5 py-1 rounded-full font-serif font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-serif text-[#1f1b14]/85 text-sm md:text-base leading-relaxed">
              {analysis.career}
            </p>
          </article>

          {/* Monthly Trend Timeline */}
          <article className="bg-white/90 border border-[#1f1b14]/15 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-[#1f1b14]/10 pb-3">
              <div className="w-9 h-9 rounded bg-[#ebe1d5] flex items-center justify-center text-[#1f1b14]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-display font-medium text-lg">올해의 운세 흐름 (甲辰年)</h3>
            </div>
            
            <div className="border-l border-[#1f1b14]/20 ml-2.5 pl-6 space-y-6">
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-[#1f1b14]/40 border-2 border-white"></div>
                <h4 className="font-bold text-sm text-[#1f1b14] mb-1 font-display">상반기 (봄~여름)</h4>
                <p className="text-xs md:text-sm text-[#645e49] font-serif leading-relaxed">
                  {analysis.yearlyTrend.spring}
                </p>
              </div>

              <div className="relative font-bold">
                <div className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#920703] border-2 border-white shadow-[0_0_0_2px_rgba(146,7,3,0.15)]"></div>
                <h4 className="text-sm text-[#920703] mb-1 font-display">현재 (가을)</h4>
                <p className="text-xs md:text-sm text-[#1f1b14] font-serif leading-relaxed font-semibold">
                  {analysis.yearlyTrend.autumn}
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-[#1f1b14]/40 border-2 border-white"></div>
                <h4 className="font-bold text-sm text-[#1f1b14] mb-1 font-display">하반기 (겨울)</h4>
                <p className="text-xs md:text-sm text-[#645e49] font-serif leading-relaxed">
                  {analysis.yearlyTrend.winter}
                </p>
              </div>
            </div>
          </article>

          {/* Download scroll */}
          <div className="flex justify-end mt-4">
            <button 
              className="flex items-center gap-2 px-5 py-2.5 border border-[#1f1b14]/30 font-display text-xs text-[#1f1b14] font-semibold rounded bg-[#fcf2e6] hover:bg-[#ebe1d5] transition-colors cursor-pointer"
              onClick={() => alert('두루마리 출력이 완료되었습니다. (Word 다운로드 완료)')}
            >
              <Download className="w-3.5 h-3.5" />
              두루마리 다운로드 (Word)
            </button>
          </div>

        </div>
      </div>

      {/* Special Offer block */}
      <section className="mt-8 relative overflow-hidden rounded-2xl border border-[#1f1b14]/15 p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-[#fcf2e6]/70 to-[#ebe1d5]/70 backdrop-blur-xs">
        
        {paintingImageUrl ? (
          <div className="max-w-md w-full space-y-4">
            <h4 className="font-display font-medium text-lg text-[#1f1b14] mb-2">당신의 오행 기운 풍경</h4>
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden ink-border relative shadow-inner shadow-black/10">
              <img
                alt="Landscape Paint"
                className="w-full h-full object-cover rounded-xl"
                src={paintingImageUrl}
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              className="mt-4 px-6 py-2 border border-[#920703] text-[#920703] font-serif text-xs rounded hover:bg-[#920703]/5 transition-colors"
              onClick={() => setPaintingImageUrl(null)}
            >
              다시 그리기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md mb-2 text-[#920703] mx-auto border border-[#1f1b14]/10">
              <Palette className="w-6 h-6" />
            </div>

            <h3 className="font-display font-semibold text-xl md:text-2xl text-[#1f1b14]">도사의 특별한 제안</h3>
            <p className="font-serif text-sm md:text-base text-[#645e49] max-w-lg mx-auto leading-relaxed">
              "혹시 이 사주의 기운을 한 폭의 그림으로 그려 드릴까요?<br />
              당신의 고유한 오행과 색채가 어우러진 풍경을 보는 재미가 아주 쏠쏠하답니다~"
            </p>

            <button
              className={`px-8 py-3.5 bg-[#920703] text-white hover:bg-[#720502] rounded-lg font-serif font-bold text-sm md:text-base flex items-center gap-2 hover:scale-105 transition-all shadow-md mx-auto ${
                isGeneratingImg ? 'opacity-85 pointer-events-none' : ''
              }`}
              onClick={handleGenerateImage}
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingImg ? 'animate-spin' : ''}`} />
              {isGeneratingImg ? '먹을 갈아 기운을 담는 중...' : '기운 이미지 생성하기'}
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
