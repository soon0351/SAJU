/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Shared types and utilities
import { ScreenType, BirthInfo, SajuAnalysis, HistoryRecord } from './types';
import { calculateSaju } from './utils/saju';

// Modular UI components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EmberEffect from './components/EmberEffect';
import ScreenGate from './components/ScreenGate';
import ScreenInput from './components/ScreenInput';
import ScreenAnalysis from './components/ScreenAnalysis';
import ScreenCompatibility from './components/ScreenCompatibility';
import HistoryDrawer from './components/HistoryDrawer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('천문명리');
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | 'none'>('none');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);

  // Default defaultInfo matching preview state: 1993년 8월 30일 자시 (癸酉 / 辛未 / 戊子 / 丁卯)
  const [userBirthInfo, setUserBirthInfo] = useState<BirthInfo>({
    birthDate: '930830',
    calendarType: 'solar',
    birthTime: 'ja',
    gender: 'male',
  });

  const [activeAnalysis, setActiveAnalysis] = useState<SajuAnalysis>(() => {
    return calculateSaju({
      birthDate: '930830',
      calendarType: 'solar',
      birthTime: 'ja',
      gender: 'male',
    });
  });

  // Load history records from localStorage on initial build
  useEffect(() => {
    try {
      const stored = localStorage.getItem('saju_history_list');
      if (stored) {
        setHistoryRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage load failed', e);
    }
  }, []);

  // Update localStorage helper
  const saveHistoryList = (newRecords: HistoryRecord[]) => {
    setHistoryRecords(newRecords);
    try {
      localStorage.setItem('saju_history_list', JSON.stringify(newRecords));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const handleNavigate = (target: ScreenType, transitionType: 'push' | 'push_back' | 'none') => {
    if (transitionType === 'push') {
      setTransitionDirection('forward');
    } else if (transitionType === 'push_back') {
      setTransitionDirection('backward');
    } else {
      setTransitionDirection('none');
    }
    
    setCurrentScreen(target);
  };

  const handleFormSubmit = (info: BirthInfo) => {
    setUserBirthInfo(info);
    
    // Perform dynamic Saju calculation using the custom engine
    const analysisResult = calculateSaju(info);
    setActiveAnalysis(analysisResult);

    // Save record to local state and persistence
    const newRecord: HistoryRecord = {
      id: Math.random().toString(36).slice(2, 11),
      timestamp: new Date().toLocaleString('ko-KR'),
      birthInfo: info,
      analysis: analysisResult,
    };

    const updated = [newRecord, ...historyRecords.slice(0, 19)]; // Limit to 20 items
    saveHistoryList(updated);

    // Transition to Screen 3 (명리분석) using the push animation
    handleNavigate('명리분석', 'push');
  };

  const handleSelectHistoryRecord = (record: HistoryRecord) => {
    setUserBirthInfo(record.birthInfo);
    setActiveAnalysis(record.analysis);
    
    // Jump straight to the analysis view with a fade none transition
    handleNavigate('명리분석', 'none');
  };

  const handleDeleteHistoryRecord = (id: string) => {
    const updated = historyRecords.filter((r) => r.id !== id);
    saveHistoryList(updated);
  };

  // Define dynamic Framer Motion sliding styles based on navigate intent
  const currentTransitionVariants = {
    initial: () => {
      if (transitionDirection === 'forward') return { x: '100%', opacity: 0 };
      if (transitionDirection === 'backward') return { x: '-100%', opacity: 0 };
      return { opacity: 0 };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 },
      },
    },
    exit: () => {
      if (transitionDirection === 'forward') return { x: '-100%', opacity: 0 };
      if (transitionDirection === 'backward') return { x: '100%', opacity: 0 };
      return { opacity: 0 };
    },
  };

  return (
    <div className="parchment-texture text-[#1f1b14] font-serif min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Mystical Floating Embers Backdrop */}
      <EmberEffect />

      {/* Top Navigation Banner */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      {/* Main Container View Gatekeeper with sliding Presence */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 py-8 w-full max-w-7xl mx-auto pb-24 md:pb-12 z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentScreen}
            custom={transitionDirection}
            variants={currentTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {currentScreen === '천문명리' && (
              <ScreenGate
                onNavigate={handleNavigate}
                onOpenHistory={() => setHistoryOpen(true)}
              />
            )}

            {currentScreen === '천기입력' && (
              <ScreenInput
                onNavigate={handleNavigate}
                onSubmit={handleFormSubmit}
                initialInfo={userBirthInfo}
              />
            )}

            {currentScreen === '명리분석' && (
              <ScreenAnalysis 
                analysis={activeAnalysis} 
              />
            )}

            {currentScreen === '인연궁합' && (
              <ScreenCompatibility 
                userBirthInfo={userBirthInfo} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Drawer Navigation (Bottom menu) */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      {/* Vintage Scholarly library lists of past runs */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        records={historyRecords}
        onSelectRecord={handleSelectHistoryRecord}
        onDeleteRecord={handleDeleteHistoryRecord}
      />
    </div>
  );
}
