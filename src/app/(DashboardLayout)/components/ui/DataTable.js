export default function DataTable({ columns, data }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max text-sm sm:text-base">
        <thead className="bg-violet-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                scope="col"
                className="px-4 py-3 sm:px-3 sm:py-2 md:px-2 md:py-2 font-bold tracking-wide whitespace-nowrap text-left"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors text-slate-800 dark:text-violet-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-4 py-3 sm:px-3 sm:py-2 md:px-2 md:py-2 whitespace-nowrap"
                  >
                    {col.cell ? col.cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 sm:px-3 md:px-2 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
