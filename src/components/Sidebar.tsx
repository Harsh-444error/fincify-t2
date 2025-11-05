import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, BarChart3, PieChart, TrendingUp, Settings, HelpCircle, 
  LogOut, Menu, ChevronLeft 
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: PieChart, label: 'Portfolio' },
    { icon: TrendingUp, label: 'Performance' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <motion.aside
      className="bg-[#0f1f35] h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-gray-800"
      initial={false}
      animate={{ width: collapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-6 right-[-12px] w-6 h-6 bg-[#0EA5E9] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
      >
        {collapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Menu Items */}
      <div className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-2 cursor-pointer transition-all ${
              item.active 
                ? 'bg-[#0EA5E9] text-white shadow-lg' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
            whileHover={{ x: collapsed ? 0 : 4 }}
          >
            <item.icon size={20} className="flex-shrink-0" />
            <motion.span 
              className="font-medium text-sm whitespace-nowrap"
              animate={{
                opacity: collapsed ? 0 : 1,
                width: collapsed ? 0 : 'auto',
              }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <motion.div 
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer transition-all"
          whileHover={{ x: collapsed ? 0 : 4 }}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <motion.span 
            className="font-medium text-sm whitespace-nowrap"
            animate={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : 'auto',
            }}
            transition={{ duration: 0.2 }}
          >
            Logout
          </motion.span>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;