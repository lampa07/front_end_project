import { Button } from '../Button/Button';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <Button
        text="← Previous"
        variant="outline"
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      />
      <span className="page-info">Page {currentPage} of {totalPages}</span>
      <Button
        text="Next →"
        variant="outline"
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      />
    </div>
  );
};