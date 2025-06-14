import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';

// 🔁 Exporting types so they can be reused elsewhereAdd commentMore actions
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({
  title,
  data,
  columns,
  emptyMessage = 'No data available.',
}: TableProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={`px-4 py-2 font-medium ${col.className || ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((item, idx) => (
                  <tr key={idx}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className={`px-4 py-3 ${col.className || ''}`}>
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}