import { matchSorter } from "match-sorter";
import React from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Pagination from "../pagination/Pagination";

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        // console.log('filter', e.target.value);
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      type="search"
      placeholder={`Search here..`}
      className="mt-2 rounded-md border-[0.7px] border-slate-500 bg-slate-50 py-1 px-2 font-poppins font-thin outline-none placeholder:text-slate-600"
    />
  );
};
export const statusFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  return (
    <input
      onChange={(e) => {
        if (
          e.target.value.toLowerCase().includes("no") ||
          e.target.value.startsWith("no")
        ) {
          setFilter(
            "Verification Pending" || "Rejected" || "Pending Verification"
          );
        } else if (
          e.target.value.toLowerCase() === "yes" ||
          e.target.value.startsWith("yes")
        ) {
          setFilter("Verified" || "Approved" || true);
        } else if (
          (e.target.value.length > 0 &&
            e.target.value.toLowerCase() !== "no") ||
          e.target.value.toLowerCase() !== "yes"
        ) {
          // console.log('notelse');
          setFilter("");
        } else if (e.target.value <= 0) {
          // console.log('else');
          setFilter(undefined);
        }
      }}
      type="search"
      placeholder={`Search here..`}
      className="mt-2 rounded-md border-[0.7px] border-slate-500 bg-slate-50 py-1 px-2 font-poppins font-thin outline-none placeholder:text-slate-600"
    />
  );
};

export const statusBooleanFilter = ({ column: { setFilter } }) => {
  return (
    <input
      onChange={(e) => {
        if (
          e.target.value.toLowerCase().includes("no") ||
          e.target.value.startsWith("no")
        ) {
          setFilter(false);
        } else if (
          e.target.value.toLowerCase() === "yes" ||
          e.target.value.startsWith("yes")
        ) {
          setFilter(true);
        } else if (
          (e.target.value.length > 0 &&
            e.target.value.toLowerCase() !== "no") ||
          e.target.value.toLowerCase() !== "yes"
        ) {
          setFilter("");
        } else if (e.target.value <= 0) {
          setFilter(undefined);
        }
      }}
      type="search"
      placeholder={`Search here..`}
      className="mt-2 rounded-md border-[0.7px] border-slate-500 bg-slate-50 py-1 px-2 font-poppins font-thin outline-none placeholder:text-slate-600"
    />
  );
};

const filterGreaterThan = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
};

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
};

fuzzyTextFilterFn.autoRemove = (val) => !val;

export const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableprops,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="overflow-x-scroll py-4 px-1">
        <table
          {...getTableprops}
          className="mt-5 w-full border-separate border-spacing-0 overflow-x-scroll"
        >
          <thead>
            {headerGroups?.map((headersGrp) => (
              <tr
                {...headersGrp.getHeaderGroupProps()}
                className="text-md first:rounded-tl-lg"
              >
                {headersGrp.headers.map((cols) => (
                  <th
                    {...cols.getHeaderProps(cols.getSortByToggleProps())}
                    className={`p-3 text-start font-medium tracking-wide last:rounded-tr-lg	 ${
                      cols.Header === "Action" ? "w-10" : ""
                    }`}
                  >
                    {cols.render("Header")}
                    <span>
                      {cols.isSorted ? (cols.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                    {cols.Header === "Action" ? null : (
                      <div>{cols.canFilter ? cols.render("Filter") : null}</div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="text-md odd:bg-slate-200 even:bg-white"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-3 text-start">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination
            canPreviousPage={canPreviousPage}
            gotoPage={gotoPage}
            nextPage={nextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            pageSize={pageSize}
            previousPage={previousPage}
            setPageSize={setPageSize}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};
