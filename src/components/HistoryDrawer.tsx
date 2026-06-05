/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HistoryRecord } from '../types';
import { X, Calendar, Compass, Trash2 } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  records: HistoryRecord[];
  onSelectRecord: (record: HistoryRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  records,
  onSelectRecord,
  onDeleteRecord,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-serif select-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1f1b14]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xs md:max-w-md bg-[#fff8f2] border-l border-[#1f1b14]/15 h-full flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1f1b14]/10 bg-[#fcf2e6] flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-[#1f1b14] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#920703]" />
              운명의 성찰첩 (기록)
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#1f1b14]/60 hover:text-[#1f1b14] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {records.length === 0 ? (
              <div className="text-center py-20 text-[#645e49]/70 space-y-2">
                <Compass className="w-12 h-12 text-[#1f1b14]/15 mx-auto animate-spin" style={{ animationDuration: '24s' }} />
                <p className="text-sm">성찰첩에 보관된 운명 풀이가 장막 뒤에 깔려 있습니다.</p>
                <p className="text-xs">사주를 우선 입력하여 새 기록을 남기십시오.</p>
              </div>
            ) : (
              records.map((r) => (
                <div
                  key={r.id}
                  className="bg-white hover:bg-[#f6ece0]/50 border border-[#1f1b14]/12 hover:border-[#920703]/40 p-4 rounded-lg relative group transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  onClick={() => {
                    onSelectRecord(r);
                    onClose();
                  }}
                >
                  <div className="pr-8 space-y-2">
                    <div className="flex items-center gap-1.5 text-[#920703] font-bold text-sm">
                      <span>{r.birthInfo.gender === 'male' ? '남(Male)' : '여(Female)'}</span>
                      <span>•</span>
                      <span>{r.birthInfo.calendarType === 'solar' ? '양력' : '음력'}</span>
                    </div>

                    <div className="text-[#1f1b14] font-display text-base font-semibold leading-snug">
                      "{r.analysis.summaryPhrase.slice(0, 36)}..."
                    </div>

                    <div className="text-[11px] text-[#645e49] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>입력일: {r.birthInfo.birthDate}</span>
                      <span>|</span>
                      <span>시간: {r.birthInfo.birthTime.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Absolute positioning button for delete record */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteRecord(r.id);
                    }}
                    className="absolute top-4 right-4 p-1 rounded hover:bg-red-50 text-[#1f1b14]/45 hover:text-red-600 transition-colors"
                    title="기록 지우기"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer branding */}
          <div className="p-4 border-t border-[#1f1b14]/10 bg-[#fcf2e6]/50 text-center text-xs text-[#1f1b14]/40">
            천문명리 • 2026
          </div>

        </div>
      </div>
    </div>
  );
}
