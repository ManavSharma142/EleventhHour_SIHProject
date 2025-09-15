import React from 'react';

const FlexoraLogo = () => (
    <svg className="text-[var(--primary-color)] h-8 w-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
      <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--background-color)]/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlexoraLogo />
          <h1 className="text-2xl font-bold">Flexora</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium border-b-2 border-[var(--primary-color)] pb-1" href="#">Home</a>
          <a className="text-sm font-medium text-[var(--text-secondary-color)] hover:text-white transition-colors" href="#">Workouts</a>
          <a className="text-sm font-medium text-[var(--text-secondary-color)] hover:text-white transition-colors" href="#">Nutrition</a>
          <a className="text-sm font-medium text-[var(--text-secondary-color)] hover:text-white transition-colors" href="#">Community</a>
          <a className="text-sm font-medium text-[var(--text-secondary-color)] hover:text-white transition-colors" href="#">FlexCoins</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-[var(--card-background-color)] px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-yellow-400">monetization_on</span>
            <span className="font-semibold text-sm">1,250</span>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center border-2 border-[var(--primary-color)]">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}