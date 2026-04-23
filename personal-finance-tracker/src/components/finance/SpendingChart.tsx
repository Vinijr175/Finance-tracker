import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import styles from './SpendingChart.module.css';
import { CATEGORIES } from '../../core/constant/categories';

interface Props {
  data: { name: string; value: number }[];
  title: string; // Added prop
}

export const SpendingChart: React.FC<Props> = ({ data, title }) => {
  const chartData = data.map(item => {
    const cat = CATEGORIES.find(c => c.id === item.name);
    return {
      name: cat?.label || item.name,
      value: item.value,
      color: cat?.color || '#cbd5e1'
    };
  });

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      {data.length === 0 ? (
        <div className={styles.emptyChart}>No data recorded yet 📊</div>
      ) : (
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
