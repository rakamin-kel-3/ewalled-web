import React from "react";

const Table = ({ tableHeads, data }) => {
  const getFormattedDate = (inp) => {
    const date = new Date(inp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  };

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
          <tbody>
            {data.map((d, key) => {
              const bg = key % 2 == 0 ? "bg-[#F6F6F6]" : "bg-white";
              const fc = d.inout == "in" ? "text-green-600" : "text-[#252B42]";
              return (
                <tr key={key}>
                  <td
                    className={`border border-[#EDEDED] ${bg} text-[#252B42] px-4 py-3 font-light`}
                  >
                    {getFormattedDate(d.createdAt)}
                  </td>
                  <td
                    className={`border border-[#EDEDED] ${bg} text-[#252B42] px-4 py-3 font-light`}
                  >
                    {d.type}
                  </td>
                  <td
                    className={`border border-[#EDEDED] ${bg} text-[#252B42] px-4 py-3 font-light`}
                  >
                    {d.fromto}
                  </td>
                  <td
                    className={`border border-[#EDEDED] ${bg} text-[#252B42] px-4 py-3 font-light`}
                  >
                    {d.description}
                  </td>
                  <td className={`border border-[#EDEDED] ${bg} ${fc} p-3`}>
                    {d.inout == "in" ? "+" : "-"} {d.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
