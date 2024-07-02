import "../styles/Pagination.css"

interface PaginationProps {
  currentPage: number, 
  totalPages: number, 
  onSelectPage(n: number): void
}

function Pagination({currentPage, totalPages, onSelectPage}: PaginationProps) {
  const buttonBefore = <button key={"before"} className="btn-page" onClick={() => onSelectPage(currentPage-1)} disabled={currentPage == 1 ? true : false}>{"<"}</button>
  const buttonLastPage = <button key={"last-page"} className="btn-page" onClick={() => onSelectPage(totalPages)}>{totalPages}</button>
  const buttonAfter = <button key={"after"} className="btn-page" onClick={() => onSelectPage(currentPage+1)} disabled={currentPage == totalPages ? true : false}>{">"}</button>
  
  const buttons = [];
  const rangeInitial = currentPage <= 2 ? 1 : currentPage - 2;
  const rangeLast = currentPage <= 1 ? 3 : currentPage;
  for (let i = rangeInitial; i <= rangeLast + 2; i++) {
    if (i == currentPage) { 
      buttons.push(<button key={i} className="btn-current-page" onClick={() => onSelectPage(i)}>{i}</button>);
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
        {rangeInitial !== 1 && moreBefore}
        {buttons}
        {rangeLast < totalPages - 2 && moreAfter}
        {buttonLastPage}
        {buttonAfter}
      </div>
    </>
  )
}

export default Pagination
