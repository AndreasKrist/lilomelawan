import Head from 'next/head';
import { useState } from 'react';
import PoliticalAlignmentTest from '../components/experimental/PoliticalAlignmentTest';
import ThoughtExperiments from '../components/experimental/ThoughtExperiments';
import IndonesiaEconomicDashboard from '../components/dashboard/IndonesiaEconomicDashboard';

// Import components directly
let MotionMain, MotionH1, MotionDiv;

// Try to import from framer-motion, fall back to regular HTML elements
try {
  const { motion } = require('framer-motion');
  MotionMain = motion.main;
  MotionH1 = motion.h1;
  MotionDiv = motion.div;
} catch (e) {
  // Simple fallbacks that just render the children
  MotionMain = ({ children, ...props }) => <main {...props}>{children}</main>;
  MotionH1 = ({ children, ...props }) => <h1 {...props}>{children}</h1>;
  MotionDiv = ({ children, ...props }) => <div {...props}>{children}</div>;
}

export default function Experimental() {
  const [activeTab, setActiveTab] = useState('political-test');

  return (
    <>
      <Head>
        <title>Eksperimental | LiloMelawan</title>
        <meta name="description" content="Jelajahi fitur interaktif eksperimental" />
        <meta property="og:title" content="Eksperimental | LiloMelawan" />
        <meta property="og:description" content="Jelajahi fitur interaktif eksperimental" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilomelawan.com/experimental" />
      </Head>

      <MotionMain 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-narrow py-16"
      >
        <MotionH1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 font-serif"
        >
          Eksperimental
        </MotionH1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Selamat datang di bagian fitur eksperimental kami. Di sini Anda akan menemukan alat interaktif yang melampaui artikel tradisional.
          Fitur-fitur ini membantu Anda mengeksplorasi orientasi politik, eksperimen pemikiran filosofis, dan tren ekonomi Indonesia.
        </p>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('political-test')}
            className={`px-4 py-2 font-medium rounded-t-lg transition flex-1 sm:flex-none ${
              activeTab === 'political-test' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Tes Orientasi Politik
          </button>
          <button
            onClick={() => setActiveTab('thought-experiment')}
            className={`px-4 py-2 font-medium rounded-t-lg transition flex-1 sm:flex-none ${
              activeTab === 'thought-experiment' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Eksperimen Pemikiran
          </button>
          <button
            onClick={() => setActiveTab('economic-dashboard')}
            className={`px-4 py-2 font-medium rounded-t-lg transition flex-1 sm:flex-none ${
              activeTab === 'economic-dashboard' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Dashboard Ekonomi
          </button>
        </div>
        
        {/* Tab Content */}
        <MotionDiv
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'political-test' && <PoliticalAlignmentTest />}
          {activeTab === 'thought-experiment' && <ThoughtExperiments />}
          {activeTab === 'economic-dashboard' && <IndonesiaEconomicDashboard />}
        </MotionDiv>
      </MotionMain>
    </>
  );
}