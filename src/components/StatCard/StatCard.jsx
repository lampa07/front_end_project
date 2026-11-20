
export const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="stat-card">
      <span className="stat-title">{title}</span>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '▲' : '▼'} {change}
      </div>
    </div>
  );
};