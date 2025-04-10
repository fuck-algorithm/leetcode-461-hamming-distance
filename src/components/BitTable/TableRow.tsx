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
        
        return (
          <td
            key={`${type}-${displayIndex}`}
            className={className}
            style={tableCellStyle}
            data-position={binaryPosition}
            data-value={bitValue}
            onMouseOver={(event) => handleCellMouseOver(event, binaryPosition, bitValue, type, displayIndex)}
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