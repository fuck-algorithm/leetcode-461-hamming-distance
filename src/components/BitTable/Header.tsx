import React from 'react';

/**
 * 位表格头部组件接口定义
 * @interface HeaderProps
 * @property {number[]} bitIndices - 位索引数组，通常是0-31的数字，表示32位整数的每一位
 * @property {React.CSSProperties} labelStyle - 标签单元格的样式
 * @property {React.CSSProperties} tableCellStyle - 表格单元格的样式
 */
interface HeaderProps {
  bitIndices: number[];
  labelStyle: React.CSSProperties;
  tableCellStyle: React.CSSProperties;
}

/**
 * 位表格头部组件
 * 用于渲染位表格的头部，显示各个位的索引编号
 * 
 * @param {HeaderProps} props - 组件属性
 * @param {number[]} props.bitIndices - 位索引数组，通常是31到0的倒序排列
 * @param {React.CSSProperties} props.labelStyle - 应用于空标签单元格的样式
 * @param {React.CSSProperties} props.tableCellStyle - 应用于每个位单元格的样式
 * 
 * @example
 * // 用法示例
 * <Header 
 *   bitIndices={[31, 30, 29, ..., 0]} 
 *   labelStyle={{width: '150px'}} 
 *   tableCellStyle={{width: '30px'}} 
 * />
 * 
 * @returns {JSX.Element} 表格头部的JSX元素
 */
const Header: React.FC<HeaderProps> = ({
  bitIndices,
  labelStyle,
  tableCellStyle
}) => {
  return (
    <thead>
      <tr>
        {/* 空标签单元格，位于表格左上角 */}
        <th className="bit-label" style={labelStyle}></th>
        {/* 遍历位索引数组，为每一位创建表头单元格 */}
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
  );
};

export default Header; 