import React, { useState, useMemo } from 'react';
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

  // 计算有效二进制位的最高位置
  const highestBitPosition = useMemo(() => {
    if (type === 'diff') {
      if (!num1Binary || !num2Binary) return -1;
      
      // 对于差异行，最高有效位是两个数字中较大的那个的最高有效位
      const num1 = parseInt(num1Binary, 2);
      const num2 = parseInt(num2Binary, 2);
      const maxNum = Math.max(num1, num2);
      
      if (maxNum === 0) return -1;
      return Math.floor(Math.log2(maxNum));
    } else {
      // 对于普通数字行，直接计算最高有效位
      if (numValue === 0) return -1;
      return Math.floor(Math.log2(numValue));
    }
  }, [num1Binary, num2Binary, numValue, type]);

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
        let isUsedBit = false;
        
        if (type === 'diff') {
          const isDiff = num1Binary && num2Binary && 
                        num1Binary[binaryPosition] !== num2Binary[binaryPosition];
          bitValue = isDiff ? '1' : '0';
          className = `bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`;
          
          // 对于差异行，有两种情况算作"有效"：
          // 1. 这一位两个数字确实不同（isDiff为true）
          // 2. 这一位在有效范围内（即位置 <= 最高有效位）
          isUsedBit = isDiff || (highestBitPosition >= 0 && (31 - binaryPosition) <= highestBitPosition);
        } else {
          bitValue = binary[binaryPosition];
          className = `bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`;
          
          // 对于数字行，有效位是从最低位到最高有效位的所有位
          isUsedBit = highestBitPosition >= 0 && (31 - binaryPosition) <= highestBitPosition;
        }

        // 如果位不是有效的，添加未使用类
        if (!isUsedBit) {
          className += ' unused';
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