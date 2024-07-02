import "../styles/Pagination.css"

interface PaginationProps {
  currentPage: number, 
  totalPages: number, 
  onSelectPage(n: number): void
}

function Pagination({currentPage, totalPages, onSelectPage}: PaginationProps) {
  const buttonBefore = <button key={"before"} className="btn-page" data-testid="before-btn" onClick={() => onSelectPage(currentPage-1)} disabled={currentPage == 1 ? true : false}>{"<"}</button>
  const buttonFirstPage = <button key={1} className="btn-page" onClick={() => onSelectPage(1)}>{"1"}</button>
  const buttonLastPage = <button key={"last-page"} className="btn-page" onClick={() => onSelectPage(totalPages)}>{totalPages}</button>
  const buttonAfter = <button key={"after"} className="btn-page" data-testid="after-btn" onClick={() => onSelectPage(currentPage+1)} disabled={currentPage == totalPages ? true : false}>{">"}</button>
  
  const buttons = [];
  const rangeFirst = currentPage <= 2 ? 1 : currentPage - 2;
  const rangeLast = currentPage <= 2 ? 5 : currentPage + 2;
  for (let i = rangeFirst; i <= rangeLast; i++) {
    if (i == currentPage) { 
      buttons.push(<button key={i} className="btn-current-page" data-testid="current-page-btn" onClick={() => onSelectPage(i)}>{i}</button>);
    } else if (i < totalPages) {
      buttons.push(<button key={i} className="btn-page" onClick={() => onSelectPage(i)}>{i}</button>);
    }
  }

  const moreBefore = <button key={"more-before"} className="btn-before-after" disabled={true}>{". . ."}</button>
  const moreAfter = <button key={"more-after"} className="btn-before-after" disabled={true}>{". . ."}</button>

  return (
    <>
      <div className="pagination">
        {buttonBefore}
        {rangeFirst !== 1 && buttonFirstPage}
        {rangeFirst !== 1 && moreBefore}
        {buttons}
        {rangeLast <= totalPages - 2 && moreAfter}
        {currentPage !== totalPages && buttonLastPage}
        {buttonAfter}
      </div>
    </>
  )
}

export default Pagination
