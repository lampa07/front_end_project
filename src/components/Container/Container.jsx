
export const Container = ({ children, maxWidth = '1200px' }) => {
  return (
    <div className="container" style={{ maxWidth, margin: '0 auto', padding: '0 16px' }}>
      {children}
    </div>
  );
};