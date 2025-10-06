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

  const handlePagination = (
    action: "prev" | "next" | "individual-page",
    page?: number
  ): void => {
    const newPage =
      action === "prev"
        ? currPage - 1
        : action === "next"
        ? currPage + 1
        : page ?? currPage;
    setCurrPage(newPage);
    console.log("pageclicked");
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination flex justify-center space-x-2 mt-10 mb-10 ">
      <button
        className={`prev px-3 py-1 rounded border border-gray-300 ${
          currPage !== 1
            ? "bg-blue-700 cursor-pointer  hover:text-white transition-colors"
            : ""
        } `}
        disabled={currPage === 1}
        onClick={() => {
          handlePagination("prev");
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
            onClick={() => handlePagination("individual-page", num)}
          >
            {num}
          </button>
        );
      })}

      <button
        className={`next px-3 py-1 rounded border border-gray-300 ${
          currPage < MAX_PAGES
            ? " bg-blue-700 cursor-pointer  hover:text-white transition-colors"
            : ""
        }`}
        onClick={() => handlePagination("next")}
        disabled={currPage >= MAX_PAGES}
      >
        Next
      </button>
    </div>
  );
}
