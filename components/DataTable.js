"use client";
import { ReactNode } from "react";

export default function DataTable({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
