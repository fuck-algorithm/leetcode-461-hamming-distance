import React, { useRef, useEffect, useState } from 'react';
import './BitTable.css';

interface BitTableProps {
  num1: number;
  num2: number;
}

const BitTable: React.FC<BitTableProps> = ({ num1, num2 }) => {
  // 将数字转换为32位二进制字符串
  const num1Binary = num1.toString(2).padStart(32, '0');
  const num2Binary = num2.toString(2).padStart(32, '0');
  
  // 计算不同位数
  let diffCount = 0;
  for (let i = 0; i < 32; i++) {
    if (num1Binary[i] !== num2Binary[i]) {
      diffCount++;
    }
  }
  
  console.log("BitTable 组件中的值:");
  console.log(`num1: ${num1} (${num1Binary})`);
  console.log(`num2: ${num2} (${num2Binary})`);
  console.log(`不同位数: ${diffCount}`);
  
  // 创建一个从31到0的位索引数组
  const bitIndices = Array.from({ length: 32 }, (_, i) => 31 - i);
  
  // 检测数值级别和长度，用于动态调整样式
  const num1String = formatNumber(num1);
  const num2String = formatNumber(num2);
  const maxLabelLength = Math.max(num1String.length, num2String.length);
  
  // 用于存储计算出的单元格尺寸
  const [cellSize, setCellSize] = useState(30);
  const [labelWidth, setLabelWidth] = useState(250); // 初始值设置更大
  
  // 组件挂载后计算布局
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLTableCellElement>(null);
  
  // 估算字符串所需的宽度
  // 不同字符宽度不同，数字和标点通常比字母窄
  const estimateStringWidth = (str: string): number => {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char >= '0' && char <= '9') {
        width += 7; // 数字
      } else if (char === ',' || char === '.') {
        width += 3; // 标点
      } else if (char === '(' || char === ')' || char === ':') {
        width += 5; // 括号和冒号
      } else {
        width += 9; // 其他字符（如字母）
      }
    }
    return width + 30; // 减少额外的边距空间
  };
  
  // 动态计算布局尺寸
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 获取容器宽度
    const containerWidth = containerRef.current.clientWidth;
    
    // 计算所需的标签宽度
    const label1 = `整数1 (${num1String}):`;
    const label2 = `整数2 (${num2String}):`;
    const label3 = `不同位:`;
    
    const label1Width = estimateStringWidth(label1);
    const label2Width = estimateStringWidth(label2);
    const label3Width = estimateStringWidth(label3);
    
    // 取最大的宽度，确保所有标签都能完整显示
    // 但是减少额外空间，只保留足够的宽度
    const estimatedLabelWidth = Math.max(label1Width, label2Width, label3Width, 100);
    
    // 计算剩余可用宽度
    const availableWidth = Math.max(containerWidth - estimatedLabelWidth, 800);
    
    // 剩余宽度按32个单元格平均分配
    const calculatedCellSize = Math.floor(availableWidth / 32);
    
    // 更新状态
    setLabelWidth(estimatedLabelWidth);
    setCellSize(Math.min(Math.max(calculatedCellSize, 20), 40)); // 设置最小20px，最大40px
  }, [num1String, num2String]);
  
  // 数字格式化显示，同时返回格式化后的字符串供尺寸计算
  function formatNumber(num: number): string {
    // 对于大数，使用精简的格式
    if (num > 1000000000) {
      return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return num.toLocaleString();
  }
  
  // 动态样式
  const tableCellStyle = {
    width: `${cellSize}px`,
    minWidth: `${cellSize}px`,
    maxWidth: `${cellSize}px`,
  };
  
  const labelStyle = {
    width: `${labelWidth}px`,
    minWidth: `${labelWidth}px`,
  };
  
  // 根据数字大小设置类名
  const getTableClassNames = () => {
    const classNames = ['bit-table-wrapper'];
    if (maxLabelLength > 15) classNames.push('extra-large-number');
    else if (maxLabelLength > 10) classNames.push('large-number');
    return classNames.join(' ');
  };
  
  return (
    <div className={getTableClassNames()} ref={containerRef}>
      <h3>32位二进制表示</h3>
      
      <div className="bit-table-container">
        <table className="bit-table" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th className="bit-label" style={labelStyle}></th>
              {bitIndices.map(index => (
                <th 
                  key={`header-${index}`} 
                  className="bit-header"
                  style={tableCellStyle}
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bit-label" style={labelStyle} ref={labelRef}>
                整数1 ({formatNumber(num1)}):
              </td>
              {bitIndices.map(index => {
                const position = 31 - index;
                const bitValue = num1Binary[position];
                return (
                  <td
                    key={`num1-${index}`}
                    className={`bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`}
                    style={tableCellStyle}
                  >
                    {bitValue}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="bit-label" style={labelStyle}>
                整数2 ({formatNumber(num2)}):
              </td>
              {bitIndices.map(index => {
                const position = 31 - index;
                const bitValue = num2Binary[position];
                return (
                  <td
                    key={`num2-${index}`}
                    className={`bit-cell ${bitValue === '1' ? 'bit-1' : 'bit-0'}`}
                    style={tableCellStyle}
                  >
                    {bitValue}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="bit-label" style={labelStyle}>不同位:</td>
              {bitIndices.map(index => {
                const position = 31 - index;
                const isDiff = num1Binary[position] !== num2Binary[position];
                return (
                  <td
                    key={`diff-${index}`}
                    className={`bit-cell ${isDiff ? 'bit-diff' : 'bit-0'}`}
                    style={tableCellStyle}
                  >
                    {isDiff ? '1' : '0'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BitTable; 