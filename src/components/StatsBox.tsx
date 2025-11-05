interface StatsBoxProps {
  label: string;
  value: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ label, value }) => (
  <div className="bg-[#0f1f35] rounded-lg p-4">
    <div className="text-gray-400 text-xs">{label}</div>
    <div className="text-white text-xl font-semibold mt-1">{value}</div>
  </div>
);

export default StatsBox;