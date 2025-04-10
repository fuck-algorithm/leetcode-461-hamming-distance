import React, { useRef, useEffect, useState } from 'react';
import { BitTableProps } from '../types';
import { formatNumber, estimateStringWidth } from '../utils';
import { showTooltip, hideTooltip } from './Tooltip';
import Header from './Header';
import TableRow from './TableRow';
import '../styles/BitTable.css';

const BitTable: React.FC<BitTableProps> = ({ num1, num2 }) => {
  // 将数字转换为32位二进制字符串
  const num1Binary = num1.toString(2).padStart(32, '0');
  const num2Binary = num2.toString(2).padStart(32, '0');
  
  // 创建一个从0到31的位索引数组（小端模式：低位在右，高位在左）
  const bitIndices = Array.from({ length: 32 }, (_, i) => 31 - i);
  
  // 用于存储计算出的单元格尺寸
  const [cellSize, setCellSize] = useState(30);
  const [labelWidth, setLabelWidth] = useState(250);
  
  // 组件引用
  const containerRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  // 处理单元格鼠标悬停事件
  const handleCellMouseOver = (
    event: React.MouseEvent<HTMLTableCellElement>, 
    position: number, 
    value: string, 
    type: string, 
    index: number
  ) => {
    showTooltip({ event, position, value, type, index }, num1Binary, num2Binary);
  };

  // 计算单元格尺寸的函数
  const calculateCellSize = () => {
    if (!containerRef.current) return;
    
    // 获取容器宽度
    const containerWidth = containerRef.current.clientWidth;
    
    // 计算所需的标签宽度
    const num1String = formatNumber(num1);
    const num2String = formatNumber(num2);
    const label1 = `整数1 (${num1String}):`;
    const label2 = `整数2 (${num2String}):`;
    const label3 = `不同位:`;
    
    const label1Width = estimateStringWidth(label1);
    const label2Width = estimateStringWidth(label2);
    const label3Width = estimateStringWidth(label3);
    
    // 取最大的宽度
    const estimatedLabelWidth = Math.max(label1Width, label2Width, label3Width, 100);
    
    // 保留标签宽度，剩余宽度全部用于表格单元格
    setLabelWidth(estimatedLabelWidth);
    
    // 计算适合当前容器的单元格尺寸
    // 减去标签宽度和一些额外空间，然后平均分配给32个单元格
    const availableWidth = containerWidth - estimatedLabelWidth - 50; // 50px额外空间用于边距等
    const calculatedCellSize = Math.floor(availableWidth / 32);
    
    // 更新单元格尺寸，确保其在合理范围内
    setCellSize(Math.min(Math.max(calculatedCellSize, 20), 40));
  };
  
  // 动态计算布局尺寸（初始加载和数字变化时）
  useEffect(() => {
    calculateCellSize();
  }, [num1, num2]); // 数字变化时重新计算
  
  // 监听窗口大小变化，重新计算单元格尺寸
  useEffect(() => {
    // 初始计算
    calculateCellSize();
    
    // 添加窗口调整大小事件监听器
    const handleResize = () => {
      calculateCellSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组确保只运行一次
  
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
  
  return (
    <div className="bit-table-wrapper" ref={containerRef}>
      <h3>32位二进制表示</h3>
      
      <div className="bit-table-container" ref={tableContainerRef}>
        <table className="bit-table">
          <Header 
            bitIndices={bitIndices}
            labelStyle={labelStyle}
            tableCellStyle={tableCellStyle}
          />
          <tbody>
            <TableRow 
              label="整数1"
              binary={num1Binary}
              type="num1"
              bitIndices={bitIndices}
              tableCellStyle={tableCellStyle}
              labelStyle={labelStyle}
              handleCellMouseOver={handleCellMouseOver}
              handleCellMouseOut={hideTooltip}
              formatNumber={formatNumber}
              numValue={num1}
            />
            <TableRow 
              label="整数2"
              binary={num2Binary}
              type="num2"
              bitIndices={bitIndices}
              tableCellStyle={tableCellStyle}
              labelStyle={labelStyle}
              handleCellMouseOver={handleCellMouseOver}
              handleCellMouseOut={hideTooltip}
              formatNumber={formatNumber}
              numValue={num2}
            />
            <TableRow 
              label="不同位"
              binary=""
              type="diff"
              num1Binary={num1Binary}
              num2Binary={num2Binary}
              bitIndices={bitIndices}
              tableCellStyle={tableCellStyle}
              labelStyle={labelStyle}
              handleCellMouseOver={handleCellMouseOver}
              handleCellMouseOut={hideTooltip}
              formatNumber={() => ""}
              numValue={0}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BitTable; 