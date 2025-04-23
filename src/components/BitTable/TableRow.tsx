import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRowProps } from './types';

/**
 * 位表格行组件
 * 用于渲染位表格中的数据行，可以显示数字的二进制表示或两个数字之间的差异
 * 
 * @param {TableRowProps} props - 组件属性
 * @param {string} props.label - 行标签，如"整数1"，"整数2"或"差异位"
 * @param {string} props.binary - 整数的二进制表示（32位字符串，如'00000000000000000000000000001010'）
 * @param {'num1'|'num2'|'diff'} props.type - 行类型，可以是'num1'(第一个整数)、'num2'(第二个整数)或'diff'(差异)
 * @param {string} [props.num1Binary] - 第一个整数的二进制表示，仅在type='diff'时使用
 * @param {string} [props.num2Binary] - 第二个整数的二进制表示，仅在type='diff'时使用
 * @param {number[]} props.bitIndices - 位索引数组，通常是31到0的倒序排列
 * @param {React.CSSProperties} props.tableCellStyle - 表格单元格样式
 * @param {React.CSSProperties} props.labelStyle - 标签单元格样式
 * @param {Function} props.handleCellMouseOver - 单元格鼠标悬停处理函数
 * @param {Function} props.handleCellMouseOut - 单元格鼠标离开处理函数
 * @param {Function} props.formatNumber - 格式化数字显示的函数
 * @param {number} props.numValue - 行对应的整数值
 * 
 * @example
 * // 用法示例 - 显示一个整数的二进制表示
 * <TableRow 
 *   label="整数1"
 *   binary="00000000000000000000000000001010"
 *   type="num1"
 *   bitIndices={[31, 30, 29, ..., 0]}
 *   tableCellStyle={{width: '30px'}}
 *   labelStyle={{width: '150px'}}
 *   handleCellMouseOver={...}
 *   handleCellMouseOut={...}
 *   formatNumber={(num) => num.toString()}
 *   numValue={10}
 * />
 * 
 * @returns {JSX.Element} 表格行的JSX元素
 */
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
  
  /**
   * 追踪用户点击的单元格索引
   * 当用户点击一个单元格时，该单元格会被标记为"active"
   * 再次点击同一单元格会取消激活状态
   */
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  /**
   * 处理单元格点击事件
   * 
   * @param {number} index - 被点击的单元格索引
   */
  const handleCellClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  /**
   * 计算有效二进制位的信息
   * 对于普通数字行：标记从最高有效位到最低位的所有位
   * 对于差异行：只标记两个数字之间实际不同的位
   * 
   * @returns {Object} 包含有效位数组和最高有效位位置的对象
   * @property {boolean[]} effectiveBits - 32位布尔数组，标记每一位是否是有效位
   * @property {number} highestBitPos - 最高有效位的位置（从右往左，0-31）
   */
  const { effectiveBits, highestBitPos } = useMemo(() => {
    // 为每一位创建标记数组，false表示未使用位，true表示有效位
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
        // 计算最高有效位，如numValue=10 (1010)，则highest=3
        highest = Math.floor(Math.log2(numValue));
        
        // 标记所有有效位，比如对于数字10，会标记第1位和第3位
        for (let i = 0; i <= highest; i++) {
          bits[31-i] = true;
        }
      }
    }
    
    return { effectiveBits: bits, highestBitPos: highest };
  }, [num1Binary, num2Binary, numValue, type]);

  return (
    <tr>
      {/* 行标签单元格 */}
      <td className="bit-label" style={labelStyle}>
        {label} ({formatNumber(numValue)}):
      </td>
      
      {/* 遍历所有位索引，渲染每一位的单元格 */}
      {bitIndices.map(index => {
        const displayIndex = index; // 显示的索引号（0-31）
        const binaryPosition = 31 - displayIndex; // 二进制字符串中的位置（反转，因为最高位在左边）
        
        let bitValue: string;
        let className: string;
        
        // 检查该位是否是有效位（对于正数：不为0的最高位及以下位；对于差异：值不同的位）
        const isEffective = effectiveBits[binaryPosition];
        
        if (type === 'diff') {
          // 对于差异行，检查两个数在该位是否不同
          const isDiff = num1Binary && num2Binary && 
                        num1Binary[binaryPosition] !== num2Binary[binaryPosition];
          bitValue = isDiff ? '1' : '0'; // 不同显示1，相同显示0
          className = `bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`; // 不同使用高亮样式
        } else {
          // 对于普通数字行，直接显示该位的值
          bitValue = binary[binaryPosition];
          className = `bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`; // 1使用bit-1样式，0使用bit-0样式
        }

        // 添加有效位/未使用位的样式类
        if (!isEffective) {
          className += ' unused'; // 未使用的位添加灰色样式
        } else {
          className += ' effective-bit'; // 有效位添加正常样式
        }

        // 如果当前单元格被点击，添加激活类
        if (clickedIndex === displayIndex) {
          className += ' active'; // 被点击的单元格添加高亮样式
        }
        
        // 特殊标记：最高有效位
        if (31 - binaryPosition === highestBitPos) {
          className += ' highest-bit'; // 最高有效位添加特殊标记样式
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