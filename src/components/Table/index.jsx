import classNames from "classnames";
import React from "react";

const Table = ({ tableHeads, children }) => {
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="min-w-full table-auto border-collapse border border-[#EDEDED]">
          <thead className="bg-white">
            <tr>
              {tableHeads.map((t, key) => (
                <th
                  key={key}
                  className="border border-[#EDEDED] px-4 py-5 font-bold text-[#252B42]"
                >
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};

Table.Row = ({ children, classname }) => {
  return <tr className={classname}>{children}</tr>;
};

Table.Cell = ({ children, classname }) => {
  return (
    <td
      className={classNames(
        classname,
        `border border-[#EDEDED] text-[#252B42] px-4 py-3 font-light`
      )}
    >
      {children}
    </td>
  );
};

export default Table;
