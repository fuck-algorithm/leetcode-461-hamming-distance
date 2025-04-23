import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BitTableProps } from '../types';
import { formatNumber, estimateStringWidth } from '../utils';
import { showTooltip, hideTooltip } from './Tooltip';
import Header from './Header';
import TableRow from './TableRow';
import '../styles/BitTable.css';

/**
 * 位表格组件
 * 用于可视化显示两个整数的二进制表示及它们的汉明距离（差异位）
 * 
 * @param {BitTableProps} props - 组件属性
 * @param {number} props.num1 - 第一个整数
 * @param {number} props.num2 - 第二个整数
 * 
 * @example
 * // 使用示例 - 显示两个整数的二进制比较
 * <BitTable num1={10} num2={3} />
 * 
 * @returns {JSX.Element} 位表格的JSX元素
 */
const BitTable: React.FC<BitTableProps> = ({ num1, num2 }) => {
  const { t } = useTranslation();
  
  /**
   * 将数字转换为32位二进制字符串
   * 例如: 10 => "00000000000000000000000000001010"
   */
  const num1Binary = num1.toString(2).padStart(32, '0');
  const num2Binary = num2.toString(2).padStart(32, '0');
  
  /**
   * 创建一个从0到31的位索引数组（小端模式：低位在右，高位在左）
   * 数组为[31,30,29,...,1,0]
   */
  const bitIndices = Array.from({ length: 32 }, (_, i) => 31 - i);
  
  // 用于存储计算出的单元格尺寸和标签宽度
  const [cellSize, setCellSize] = useState(30); // 默认单元格尺寸为30px
  const [labelWidth, setLabelWidth] = useState(250); // 默认标签宽度为250px
  
  // 组件引用，用于获取DOM元素
  const containerRef = useRef<HTMLDivElement>(null); // 整个组件的容器
  const tableContainerRef = useRef<HTMLDivElement>(null); // 表格的容器
  
  /**
   * 处理单元格鼠标悬停事件
   * 当用户将鼠标悬停在某个位单元格上时，显示工具提示
   * 
   * @param {React.MouseEvent<HTMLTableCellElement>} event - 鼠标事件
   * @param {number} position - 位在二进制表示中的位置(0-31)
   * @param {string} value - 位的值('0'或'1')
   * @param {string} type - 行类型('num1', 'num2', 或 'diff')
   * @param {number} index - 显示的位索引(0-31)
   */
  const handleCellMouseOver = (
    event: React.MouseEvent<HTMLTableCellElement>, 
    position: number, 
    value: string, 
    type: string, 
    index: number
  ) => {
    showTooltip({ event, position, value, type, index }, num1Binary, num2Binary);
  };

  /**
   * 计算单元格尺寸的函数
   * 根据容器宽度和数字长度动态调整单元格和标签的尺寸
   * 确保表格在各种屏幕尺寸上都能正确显示
   */
  const calculateCellSize = () => {
    if (!containerRef.current) return;
    
    // 获取容器宽度
    const containerWidth = containerRef.current.clientWidth;
    
    // 计算所需的标签宽度，基于最长标签文本
    const num1String = formatNumber(num1);
    const num2String = formatNumber(num2);
    const label1 = `${t('bitTable.int1')} (${num1String}):`;
    const label2 = `${t('bitTable.int2')} (${num2String}):`;
    const label3 = `${t('bitTable.diffBits')}:`;
    
    // 估算每个标签的宽度
    const label1Width = estimateStringWidth(label1);
    const label2Width = estimateStringWidth(label2);
    const label3Width = estimateStringWidth(label3);
    
    // 取最大的宽度，确保所有标签都能完整显示
    const estimatedLabelWidth = Math.max(label1Width, label2Width, label3Width, 100);
    
    // 更新标签宽度状态
    setLabelWidth(estimatedLabelWidth);
    
    // 计算适合当前容器的单元格尺寸
    // 减去标签宽度和一些额外空间，然后平均分配给32个单元格
    const availableWidth = containerWidth - estimatedLabelWidth - 50; // 50px额外空间用于边距等
    const calculatedCellSize = Math.floor(availableWidth / 32);
    
    // 更新单元格尺寸，确保其在合理范围内（最小20px，最大40px）
    setCellSize(Math.min(Math.max(calculatedCellSize, 20), 40));
  };
  
  /**
   * 在数字变化时重新计算布局尺寸
   * 确保表格能够适应不同长度的数字
   */
  useEffect(() => {
    calculateCellSize();
  }, [num1, num2]); // 数字变化时重新计算
  
  /**
   * 监听窗口大小变化，重新计算单元格尺寸
   * 确保表格在窗口调整大小时保持响应式
   */
  useEffect(() => {
    // 初始计算
    calculateCellSize();
    
    // 添加窗口调整大小事件监听器
    const handleResize = () => {
      calculateCellSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理事件监听器，避免内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组确保只运行一次
  
  // 动态样式对象，用于设置单元格和标签的尺寸
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
      <h3>{t('result.binaryRepresentation')}</h3>
      
      <div className="bit-table-container" ref={tableContainerRef}>
        <table className="bit-table">
          {/* 表格头部，显示位索引(31到0) */}
          <Header 
            bitIndices={bitIndices}
            labelStyle={labelStyle}
            tableCellStyle={tableCellStyle}
          />
          <tbody>
            {/* 第一个整数的二进制表示行 */}
            <TableRow 
              label={t('bitTable.int1')}
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
            {/* 第二个整数的二进制表示行 */}
            <TableRow 
              label={t('bitTable.int2')}
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
            {/* 差异位行，显示两个整数二进制表示中不同的位 */}
            <TableRow 
              label={t('bitTable.diffBits')}
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