// src/components/CompanyComparisonCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, CheckCircle2 } from 'lucide-react';

interface CompanyOption {
  name: string;
  subtitle: string;
}

interface CompanyComparisonCardProps {
  companies?: CompanyOption[];
}

/**
 * Company selector – “Company to Analyse”
 */
const CompanyComparisonCard: React.FC<CompanyComparisonCardProps> = ({
  companies = [
    { name: 'Turkey Industrial Corp', subtitle: 'INVEO PORTFÖY YÖNETİMİ A.Ş.' },
    { name: 'Yapı Kredi Portfolio', subtitle: 'YAPI KREDİ PORTFÖY YÖNETİMİ A.Ş.' },
    { name: 'Deniz Portfolio', subtitle: 'DENİZ PORTFÖY YÖNETİMİ A.Ş.' },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (company: CompanyOption) => {
    setSelectedCompany(company);
    setIsOpen(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className="rounded-lg p-4 sm:p-5 md:p-6 mb-6"
      style={{ backgroundColor: '#0F1F35' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Title */}
      <h3 className="text-white font-medium text-base sm:text-lg mb-4 flex items-center gap-2">
        <Building2 size={20} style={{ color: '#0EA5E9' }} />
        Company to Analyse
      </h3>

      {/* Dropdown trigger */}
      <motion.div
        className="rounded-lg p-3 sm:p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border"
        style={{
          backgroundColor: '#0A1628',
          borderColor: isOpen ? 'rgba(14, 165, 233, 0.3)' : 'transparent',
        }}
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{
          scale: 1.01,
          borderColor: 'rgba(14, 165, 233, 0.3)',
          backgroundColor: 'rgba(31, 41, 55, 0.5)',
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <motion.div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
            }}
            whileHover={{ rotate: 5 }}
          >
            <Building2 size={18} className="sm:w-5 sm:h-5 text-white" />
          </motion.div>

          {/* Selected company text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {selectedCompany.name}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {selectedCompany.subtitle}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Dropdown list – positioned absolutely with z-index */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 right-0 mt-2 rounded-lg shadow-2xl overflow-hidden z-50 border"
            style={{
              backgroundColor: '#0F1F35',
              borderColor: '#374151',
              top: '100%',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className="p-3 sm:p-4 cursor-pointer transition-colors flex items-center justify-between group"
                style={{
                  backgroundColor:
                    hoveredIndex === index ? 'rgba(30, 58, 95, 0.3)' : 'transparent',
                }}
                onClick={() => handleSelect(company)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                    }}
                  >
                    <Building2 size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {company.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {company.subtitle}
                    </p>
                  </div>
                </div>

                {/* Checkmark when selected */}
                {selectedCompany.name === company.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="flex-shrink-0 ml-2"
                  >
                    <CheckCircle2 size={18} className="text-green-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CompanyComparisonCard;