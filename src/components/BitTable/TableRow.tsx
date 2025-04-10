import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
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

  // 计算有效二进制位的信息
  const { effectiveBits, highestBitPos } = useMemo(() => {
    // 为每一位创建标记数组
    const bits = new Array(32).fill(false);
    let highest = -1;
    
    if (type === 'diff') {
      // 对于差异行，只显示两个数实际不同的位
      if (num1Binary && num2Binary) {
        for (let i = 0; i < 32; i++) {
          // 标记实际不同的位
          if (num1Binary[i] !== num2Binary[i]) {
            bits[i] = true;
            highest = Math.max(highest, i);
          }
        }
      }
    } else {
      // 对于普通数字行，显示从最高位1到最低位的所有位
      if (numValue > 0) {
        // 计算最高有效位
        highest = Math.floor(Math.log2(numValue));
        
        // 标记所有有效位
        for (let i = 0; i <= highest; i++) {
          bits[31-i] = true;
        }
      }
    }
    
    return { effectiveBits: bits, highestBitPos: highest };
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
        
        // 检查该位是否是有效位
        const isEffective = effectiveBits[binaryPosition];
        
        if (type === 'diff') {
          const isDiff = num1Binary && num2Binary && 
                        num1Binary[binaryPosition] !== num2Binary[binaryPosition];
          bitValue = isDiff ? '1' : '0';
          className = `bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`;
        } else {
          bitValue = binary[binaryPosition];
          className = `bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`;
        }

        // 添加有效位/未使用位的样式类
        if (!isEffective) {
          className += ' unused';
        } else {
          className += ' effective-bit';
        }

        // 如果当前单元格被点击，添加激活类
        if (clickedIndex === displayIndex) {
          className += ' active';
        }
        
        // 特殊标记：最高有效位
        if (31 - binaryPosition === highestBitPos) {
          className += ' highest-bit';
        }
        
        return (
          <td
            key={`${type}-${displayIndex}`}
            className={className}
            style={tableCellStyle}
            data-position={binaryPosition}
            data-value={bitValue}
            data-bit-position={31 - binaryPosition}
            data-effective={isEffective ? 'true' : 'false'}
            onMouseOver={(event) => handleCellMouseOver(event, binaryPosition, bitValue, type, displayIndex)}
            onMouseOut={handleCellMouseOut}
            onClick={() => handleCellClick(displayIndex)}
            title={isEffective 
              ? t('bitTable.effectiveBit', {position: 31 - binaryPosition}) 
              : t('bitTable.unusedBit', {position: 31 - binaryPosition})}
          >
            <span className="bit-value">{bitValue}</span>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow; 