import "../styles/Pagination.css"

interface PaginationProps {
  currentPage: number, 
  totalPages: number, 
  onSelectPage(n: number): void
}

function Pagination({currentPage, totalPages, onSelectPage}: PaginationProps) {
  const buttons = [];
  buttons.push(<button key={"before"} className="btn-page" onClick={() => onSelectPage(currentPage-1)} disabled={currentPage == 1 ? true : false}>{"<"}</button>);
  for (let i = 1; i <= totalPages; i++) {
    if (i == currentPage) { 
      buttons.push(<button key={i} className="btn-current-page" onClick={() => onSelectPage(i)}>{i}</button>);
    } else {
      buttons.push(<button key={i} className="btn-page" onClick={() => onSelectPage(i)}>{i}</button>);
    }
  }
  buttons.push(<button key={"after"} className="btn-page" onClick={() => onSelectPage(currentPage+1)} disabled={currentPage == totalPages ? true : false}>{">"}</button>);

  return (
    <>
      {buttons}
    </>
  )
}

export default Pagination
