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
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLTableCellElement>(null);
  
  // 处理单元格鼠标悬停事件
  const handleCellMouseOver = (
    event: React.MouseEvent<HTMLTableCellElement>, 
    position: number, 
    value: string, 
    type: string, 
    index: number
  ) => {
    const cell = event.currentTarget;
    
    // 移除已有的提示
    const existingTooltip = document.querySelector('.bit-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
    
    // 创建工具提示
    const tooltip = document.createElement('div');
    tooltip.classList.add('bit-tooltip');
    
    // 设置工具提示内容
    if (type === 'num1') {
      tooltip.textContent = `整数1的第${index}位: ${value}`;
    } else if (type === 'num2') {
      tooltip.textContent = `整数2的第${index}位: ${value}`;
    } else if (type === 'diff') {
      const isDiff = num1Binary[position] !== num2Binary[position];
      if (isDiff) {
        tooltip.textContent = `第${index}位不同: ${num1Binary[position]} ≠ ${num2Binary[position]}`;
      } else {
        tooltip.textContent = `第${index}位相同: ${num1Binary[position]} = ${num2Binary[position]}`;
      }
    }
    
    // 添加工具提示到单元格
    cell.appendChild(tooltip);
    
    // 显示工具提示
    setTimeout(() => {
      tooltip.classList.add('visible');
    }, 10);
  };
  
  // 处理单元格鼠标离开事件
  const handleCellMouseOut = () => {
    const tooltip = document.querySelector('.bit-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
      setTimeout(() => {
        tooltip.remove();
      }, 300);
    }
  };
  
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
  
  // 当num1或num2更改时触发表格动画
  useEffect(() => {
    // 添加表格容器动画
    if (tableContainerRef.current) {
      tableContainerRef.current.classList.add('bit-table-container-animated');
      
      // 动画结束后移除类
      setTimeout(() => {
        if (tableContainerRef.current) {
          tableContainerRef.current.classList.remove('bit-table-container-animated');
        }
      }, 800);
    }
    
    // 只为不同位（值为1的单元格）和有值的单元格添加动画
    const diffCells = document.querySelectorAll('.bit-diff');
    diffCells.forEach((cell) => {
      cell.classList.add('bit-diff-animated');
      
      setTimeout(() => {
        cell.classList.remove('bit-diff-animated');
      }, 800);
    });
    
    // 为值为1的单元格添加动画
    const valueCells = document.querySelectorAll('.bit-1');
    valueCells.forEach((cell) => {
      const valueSpan = cell.querySelector('.bit-value');
      if (valueSpan) {
        valueSpan.classList.add('bit-value-animated');
        
        setTimeout(() => {
          valueSpan.classList.remove('bit-value-animated');
        }, 500);
      }
    });
  }, [num1, num2]);
  
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
      
      <div className="bit-table-container" ref={tableContainerRef}>
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
                    data-position={position}
                    data-value={bitValue}
                    onMouseOver={(event) => handleCellMouseOver(event, position, bitValue, 'num1', index)}
                    onMouseOut={handleCellMouseOut}
                  >
                    <span className="bit-value">{bitValue}</span>
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
                    data-position={position}
                    data-value={bitValue}
                    onMouseOver={(event) => handleCellMouseOver(event, position, bitValue, 'num2', index)}
                    onMouseOut={handleCellMouseOut}
                  >
                    <span className="bit-value">{bitValue}</span>
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
                    data-position={position}
                    data-value={isDiff ? '1' : '0'}
                    onMouseOver={(event) => handleCellMouseOver(event, position, isDiff ? '1' : '0', 'diff', index)}
                    onMouseOut={handleCellMouseOut}
                  >
                    <span className="bit-value">{isDiff ? '1' : '0'}</span>
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