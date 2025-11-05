import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import type { TableRow } from '../data/comparisonData';

interface ComparisonTableProps {
  data: TableRow[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<keyof TableRow | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const headers = [
    { key: 'company', label: 'Company' },
    { key: 'points', label: 'Point Count' },
    { key: 'budget', label: 'Total Budget (₺)' },
    { key: 'avgGorne', label: 'Avg Gröne (%)' },
    { key: 'avgGrneli', label: 'Avg Grneli (%)' },
    { key: 'volatility', label: 'Avg Volatility (%)' },
  ] as const;

  const handleSort = (column: keyof TableRow) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const numA = parseFloat(aVal);
      const numB = parseFloat(bVal);
      const compare = isNaN(numA) || isNaN(numB)
        ? aVal.localeCompare(bVal)
        : numA - numB;
      return sortDirection === 'asc' ? compare : -compare;
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <motion.div className="bg-[#1a2332] rounded-lg p-6 mb-6 overflow-hidden">
      <h3 className="text-white font-medium text-lg mb-4">Company-Based Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-700">
              {headers.map((header, i) => (
                <motion.th
                  key={header.key}
                  className="text-left text-gray-400 text-sm font-medium py-3 px-4 cursor-pointer hover:text-white group"
                  onClick={() => handleSort(header.key)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(30, 58, 95, 0.2)' }}
                >
                  <div className="flex items-center gap-2">
                    {header.label}
                    <motion.div className="text-gray-600 group-hover:text-gray-400">
                      {sortColumn === header.key ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </motion.div>
                  </div>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedData.map((row, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-gray-800 hover:bg-gray-800/30 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                >
                  <td className="py-4 px-4 text-white text-sm">{row.company}</td>
                  <td className="py-4 px-4 text-white text-sm">
                    <motion.span className="inline-block px-2 py-1 bg-blue-900/30 rounded group-hover:bg-blue-800/50" whileHover={{ scale: 1.1 }}>
                      {row.points}
                    </motion.span>
                  </td>
                  <td className="py-4 px-4 text-white text-sm font-medium">{row.budget}</td>
                  <td className="py-4 px-4 text-white text-sm">{row.avgGorne}</td>
                  <td className="py-4 px-4 text-white text-sm">{row.avgGrneli}</td>
                  <td className="py-4 px-4 text-white text-sm">
                    <motion.span className="inline-block" whileHover={{ scale: 1.1 }}>
                      {row.volatility}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;