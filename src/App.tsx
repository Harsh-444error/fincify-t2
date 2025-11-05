import CompanyComparisonCard from './components/CompanyComparisonCard';
import StatsBox from './components/StatsBox';
import PerformanceChart from './components/PerformanceChart';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ComparisonTable from './components/ComparisonTable';
import { comparisonData } from './data/comparisonData';
import { useState } from 'react';

function App() {
  const [compareMode, setCompareMode] = useState<'sector' | 'company'>('company');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main
        className={`pt-20 p-6 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <h1 className="text-white text-2xl font-semibold mb-6">Company Internal Comparison</h1>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setCompareMode('sector')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
              compareMode === 'sector'
                ? 'bg-[#0A1628] border-gray-600 text-white'
                : 'border-gray-700 text-gray-400 hover:text-gray-300'
            }`}
          >
            Compare with Sector
          </button>
          <button
            onClick={() => setCompareMode('company')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
              compareMode === 'company'
                ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white'
                : 'border-gray-700 text-gray-400 hover:text-gray-300'
            }`}
          >
            Compare Within Company
          </button>
        </div>

        <CompanyComparisonCard />

        <div className="bg-[#1a2332] rounded-lg p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-white font-medium text-lg">Company Analysis</h3>
            <a href="#" className="text-[#0EA5E9] text-sm hover:underline">
              Compare with Sector
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsBox label="Total Fund Count" value="75" />
            <StatsBox label="Total AUM" value="75.7B TL" />
            <StatsBox label="Avg Management Fee" value="2.03%" />
            <StatsBox label="Avg 1Y Return" value="23.61%" />
          </div>
        </div>

        {compareMode === 'company' ? (
          <>
            <ComparisonTable data={comparisonData} />
            <PerformanceChart />
          </>
        ) : (
          <div className="bg-[#0F1F35] rounded-lg p-12 text-center">
            <h3 className="text-white text-xl font-semibold mb-4">Sector Comparison View</h3>
            <p className="text-gray-400 mb-6">
              This view compares the selected company with sector averages.
            </p>
            <span className="inline-block px-6 py-3 bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg">
              Coming Soon
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;