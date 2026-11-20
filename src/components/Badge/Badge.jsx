
export const Badge = ({ label, colorScheme = 'green' }) => {
  return (
    <span className={`badge badge-${colorScheme}`}>
      {label}
    </span>
  );
};