"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
};

/** Compact page list with ellipsis, e.g. 1 … 4 [5] 6 … 12 */
function pageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "gap")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("gap");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("gap");
  items.push(total);

  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  label = "Pagination",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const base =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple focus-visible:ring-offset-2";

  return (
    <nav aria-label={label} className="flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={`${base} border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </li>

        {pageItems(currentPage, totalPages).map((item, i) =>
          item === "gap" ? (
            <li
              key={`gap-${i}`}
              aria-hidden="true"
              className="px-1 text-gray-400 select-none"
            >
              &hellip;
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                className={
                  item === currentPage
                    ? `${base} border-transparent bg-gradient-to-r from-brandBlue to-brandPurple text-white shadow-[0_8px_20px_rgba(29,78,216,0.3)]`
                    : `${base} border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-brandPurple/40 hover:text-brandPurple`
                }
              >
                {item}
              </button>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`${base} border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
