import React from 'react';
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
  return (
    <tr>
      <td className="bit-label" style={labelStyle}>
        {label} ({formatNumber(numValue)}):
      </td>
      
      {bitIndices.map(index => {
        const position = index;
        let bitValue: string;
        let className: string;
        
        if (type === 'diff') {
          const isDiff = num1Binary![position] !== num2Binary![position];
          bitValue = isDiff ? '1' : '0';
          className = `bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`;
        } else {
          bitValue = binary[position];
          className = `bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`;
        }
        
        return (
          <td
            key={`${type}-${index}`}
            className={className}
            style={tableCellStyle}
            data-position={position}
            data-value={bitValue}
            onMouseOver={(event) => handleCellMouseOver(event, position, bitValue, type, index)}
            onMouseOut={handleCellMouseOut}
          >
            <span className="bit-value">{bitValue}</span>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow; 