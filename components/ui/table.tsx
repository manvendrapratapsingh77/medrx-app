import React from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  /**
   * Table header cells – array of strings.
   */
  columns: string[];
  /**
   * Table rows – each row is an array of cell values (string or ReactNode).
   */
  data: React.ReactNode[][];
  /**
   * Optional className for the table container.
   */
  className?: string;
}

/**
 * Simple responsive table component styled with the MedRx palette.
 * - Uses striped rows, primary text color, and subtle borders.
 * - On small screens the table scrolls horizontally.
 */
export const Table: React.FC<TableProps> = ({ columns, data, className = '' }) => (
  <div className={cn('overflow-x-auto', className)}>
    <table className="min-w-full border border-border text-sm">
      <thead className="bg-primary-light">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              className="px-4 py-2 text-left font-medium text-primary"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rIdx) => (
          <tr
            key={rIdx}
            className={rIdx % 2 === 0 ? 'bg-white' : 'bg-primary-light'}
          >
            {row.map((cell, cIdx) => (
              <td key={cIdx} className="px-4 py-2 text-primary">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
