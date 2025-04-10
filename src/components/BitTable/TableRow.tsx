import React, { useState } from 'react';
import { TableRowProps } from './types';

const TableRow: React.FC<TableRowProps> = ({
  label,
  binary,
  type,
  num1Binary,
  num2Binary,
  bitIndices,
  tableCellStyle,
  labelStyle,
  handleCellMouseOver,
  handleCellMouseOut,
  formatNumber,
  numValue
}) => {
  // 追踪点击的单元格
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  // 处理单元格点击
  const handleCellClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  return (
    <tr>
      <td className="bit-label" style={labelStyle}>
        {label} ({formatNumber(numValue)}):
      </td>
      
      {bitIndices.map(index => {
        const displayIndex = index;
        const binaryPosition = 31 - displayIndex;
        
        let bitValue: string;
        let className: string;
        
        if (type === 'diff') {
          const isDiff = num1Binary![binaryPosition] !== num2Binary![binaryPosition];
          bitValue = isDiff ? '1' : '0';
          className = `bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`;
        } else {
          bitValue = binary[binaryPosition];
          className = `bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`;
        }

        // 如果当前单元格被点击，添加激活类
        if (clickedIndex === displayIndex) {
          className += ' active';
        }
        
        return (
          <td
            key={`${type}-${displayIndex}`}
            className={className}
            style={tableCellStyle}
            data-position={binaryPosition}
            data-value={bitValue}
            onMouseOver={(event) => handleCellMouseOver(event, binaryPosition, bitValue, type, displayIndex)}
            onMouseOut={handleCellMouseOut}
            onClick={() => handleCellClick(displayIndex)}
          >
            <span className="bit-value">{bitValue}</span>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow; 