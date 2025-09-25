import { CARDS_PER_PAGE } from "../constants/api";
import { TOTAL_POKEMONS } from "../constants/api";

interface PaginationProps {
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currPage, setCurrPage }: PaginationProps) {
  const MAX_PAGES = Math.ceil(TOTAL_POKEMONS / CARDS_PER_PAGE);

  const prevThreeNoArr: number[] = Array.from(
    { length: 3 },
    (_, idx) => currPage - 1 - idx
  )
    .filter((p) => p > 0)
    .reverse();

  const curr_nextThreeNoArr: number[] = Array.from(
    { length: 4 },
    (_, idx) => currPage + idx
  ).filter((p) => p <= MAX_PAGES);

  const pagesToRender = [...prevThreeNoArr, ...curr_nextThreeNoArr];

  const handlePrev = (): void => {
    console.log("handlePrevClicked");
    setCurrPage(currPage - 1);
  };

  const handleNext = (): void => {
    console.log("handleNextClicked");
    setCurrPage(currPage + 1);
  };

  const handlePagination = (page: number): void => {
    setCurrPage(page);
    console.log("pageclicked");
  };

  return (
    <div className="pagination flex justify-center space-x-2 mt-6 ">
      <button
        className="prev px-3 py-1 rounded border border-gray-300 bg-blue-700 cursor-pointer  hover:text-white transition-colors"
        disabled={currPage === 1}
        onClick={() => {
          handlePrev();
        }}
      >
        Prev
      </button>

      {pagesToRender.map((num: number) => {
        return (
          <button
            className={`px-3 py-1 rounded border border-gray-300 bg-gray-400 cursor-pointer hover:text-white transition-colors ${
              currPage === num ? "bg-red-500" : ""
            } `}
            key={num}
            onClick={() => handlePagination(num)}
          >
            {" "}
            {num}{" "}
          </button>
        );
      })}

      <button
        className="next px-3 py-1 rounded border border-gray-300 bg-blue-700 cursor-pointer  hover:text-white transition-colors"
        onClick={() => handleNext()}
        disabled={currPage >= MAX_PAGES}
      >
        Next
      </button>
    </div>
  );
}
