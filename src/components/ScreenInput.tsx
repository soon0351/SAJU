/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, BirthInfo } from '../types';
import { ArrowLeft, Sparkles, Calendar, Clock, Users, HelpCircle } from 'lucide-react';

interface ScreenInputProps {
  onNavigate: (screen: ScreenType, transition: 'push' | 'push_back' | 'none') => void;
  onSubmit: (info: BirthInfo) => void;
  initialInfo?: BirthInfo;
}

export default function ScreenInput({ onNavigate, onSubmit, initialInfo }: ScreenInputProps) {
  const [birthDate, setBirthDate] = useState(initialInfo?.birthDate || '930830');
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>(initialInfo?.calendarType || 'solar');
  const [birthTime, setBirthTime] = useState(initialInfo?.birthTime || 'ja');
  const [gender, setGender] = useState<'male' | 'female'>(initialInfo?.gender || 'male');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Simple validation
    const cleanDate = birthDate.replace(/[^0-9]/g, '');
    if (cleanDate.length !== 6 && cleanDate.length !== 8) {
      setErrorMsg('생년월일은 6자리(예: 930830) 또는 8자리(예: 19930830) 숫자로 채워주십시오.');
      return;
    }

    onSubmit({
      birthDate: cleanDate,
      calendarType,
      birthTime,
      gender,
    });
  };

  return (
    <div className="w-full max-w-md bg-[#fcf2e6]/30 px-4 py-8 rounded-xl z-10 flex flex-col items-center">
      
      {/* Header back & navigation bar simulated internally */}
      <div className="w-full flex justify-between items-center mb-8 pb-4 border-b border-[#1f1b14]/10">
        {/* xpath match: //button[@aria-label='Back'] */}
        <button
          aria-label="Back"
          className="text-[#1f1b14]/70 hover:text-[#920703] transition-colors p-2 rounded-full hover:bg-[#1f1b14]/5"
          onClick={() => onNavigate('천문명리', 'push_back')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-display font-bold text-lg text-[#1f1b14]">천기입력</span>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="text-center mb-8 max-w-sm">
        <Sparkles className="w-9 h-9 text-[#920703] mx-auto mb-4 opacity-80" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1f1b14] mb-3">천기입력</h2>
        <p className="text-sm md:text-base text-[#645e49] leading-relaxed px-2">
          사주의 네 기둥을 세우기 위해 귀하의 탄생 기록을 남겨주십시오.
        </p>
      </div>

      {/* Main input document frame */}
      <div className="w-full bg-white/95 border border-[#1f1b14]/15 p-6 md:p-8 rounded-xl shadow-md relative overflow-hidden">
        {/* Decorative Traditional Document Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#1f1b14]/30 rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#1f1b14]/30 rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#1f1b14]/30 rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#1f1b14]/30 rounded-br-md"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Birth Date */}
          <div className="space-y-2">
            <label htmlFor="birthDate" className="text-xs font-semibold uppercase tracking-wider text-[#645e49] flex items-center gap-1.5 font-display">
              <Calendar className="w-3.5 h-3.5 text-[#920703]" />
              생년월일 (Birth Date)
            </label>
            <input
              type="text"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="YY / MM / DD"
              className="w-full text-center tracking-[0.15em] font-serif border-b-2 border-slate-200 focus:border-b-[#920703] py-2 text-lg focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Calendar Selector */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#645e49] flex items-center gap-1.5 font-display">
              <HelpCircle className="w-3.5 h-3.5 text-[#920703]" />
              역법 (Calendar)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-2.5 px-4 rounded font-serif border text-center transition-all ${
                  calendarType === 'solar'
                    ? 'bg-[#ebe1d5] border-[#1f1b14] text-[#1f1b14] font-bold'
                    : 'border-slate-200 text-[#645e49] hover:bg-neutral-50'
                }`}
                onClick={() => setCalendarType('solar')}
              >
                양력 (Solar)
              </button>
              <button
                type="button"
                className={`py-2.5 px-4 rounded font-serif border text-center transition-all ${
                  calendarType === 'lunar'
                    ? 'bg-[#ebe1d5] border-[#1f1b14] text-[#1f1b14] font-bold'
                    : 'border-slate-200 text-[#645e49] hover:bg-neutral-50'
                }`}
                onClick={() => setCalendarType('lunar')}
              >
                음력 (Lunar)
              </button>
            </div>
          </div>

          {/* Birth Time Select Dropdown */}
          <div className="space-y-2">
            <label htmlFor="birthTime" className="text-xs font-semibold uppercase tracking-wider text-[#645e49] flex items-center gap-1.5 font-display">
              <Clock className="w-3.5 h-3.5 text-[#920703]" />
              태어난 시간 (Birth Time)
            </label>
            <div className="relative">
              <select
                id="birthTime"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full outline-none text-center bg-transparent border-b-2 border-slate-200 focus:border-b-[#920703] py-2.5 pr-2 pl-6 cursor-pointer font-serif text-slate-800"
              >
                <option value="ja">자시 (23:30 ~ 01:29)</option>
                <option value="chuk">축시 (01:30 ~ 03:29)</option>
                <option value="in">인시 (03:30 ~ 05:29)</option>
                <option value="myo">묘시 (05:30 ~ 07:29)</option>
                <option value="jin">진시 (07:30 ~ 09:29)</option>
                <option value="sa">사시 (09:30 ~ 11:29)</option>
                <option value="o">오시 (11:30 ~ 13:29)</option>
                <option value="mi">미시 (13:30 ~ 15:29)</option>
                <option value="sin">신시 (15:30 ~ 17:29)</option>
                <option value="yu">유시 (17:30 ~ 19:29)</option>
                <option value="sul">술시 (19:30 ~ 21:29)</option>
                <option value="hae">해시 (21:30 ~ 23:29)</option>
                <option value="unknown">모름</option>
              </select>
            </div>
          </div>

          {/* Gender Selector */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#645e49] flex items-center gap-1.5 font-display">
              <Users className="w-3.5 h-3.5 text-[#920703]" />
              성별 (Gender)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-2.5 px-4 rounded font-serif border text-center transition-all ${
                  gender === 'male'
                    ? 'bg-[#ebe1d5] border-[#1f1b14] text-[#1f1b14] font-bold'
                    : 'border-slate-200 text-[#645e49] hover:bg-neutral-50'
                }`}
                onClick={() => setGender('male')}
              >
                남 (Male)
              </button>
              <button
                type="button"
                className={`py-2.5 px-4 rounded font-serif border text-center transition-all ${
                  gender === 'female'
                    ? 'bg-[#ebe1d5] border-[#1f1b14] text-[#1f1b14] font-bold'
                    : 'border-slate-200 text-[#645e49] hover:bg-neutral-50'
                }`}
                onClick={() => setGender('female')}
              >
                여 (Female)
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-xs text-center font-serif py-1">{errorMsg}</p>
          )}

          {/* Submit Button */}
          {/* xpath match: //button[contains(., '운명을 읽으시오')] */}
          <button
            type="submit"
            className="w-full mt-6 bg-[#920703] hover:bg-[#410000] text-white py-4 rounded-lg text-lg font-serif font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer border-2 border-[#5a0402]"
          >
            <span className="tracking-[0.15em]">운명을 읽으시오</span>
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-[#1f1b14]/50 text-xs tracking-widest font-serif opacity-75">
        <p>天道無親 常與善人</p>
      </div>
    </div>
  );
}
