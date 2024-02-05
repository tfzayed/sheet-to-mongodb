import { Item } from "@/types/Type";

export default function SheetTable({ items }: { items: Item }) {
  return (
    <div>
      <h1>Preview</h1>
      <table className="table-auto w-1/2 border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border border-slate-600">
              Name
            </th>
            <th className="px-4 py-2 text-right border border-slate-600">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, i) => (
            <tr key={i}>
              <td className="px-4 py-2 border border-slate-700">{item.Name}</td>
              <td className="px-4 py-2 text-right border border-slate-700">
                {item.Age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
