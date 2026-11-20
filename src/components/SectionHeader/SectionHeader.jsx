
export const SectionHeader = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`section-header text-${align}`}>
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};