/**
 * 单元格样式属性接口
 * 定义位表格中单元格的尺寸样式
 * 
 * @interface CellStyleProps
 * @property {string} width - 单元格宽度，如'30px'
 * @property {string} minWidth - 单元格最小宽度，如'30px'
 * @property {string} maxWidth - 单元格最大宽度，如'30px'
 */
export interface CellStyleProps {
  width: string;
  minWidth: string;
  maxWidth: string;
}

/**
 * 工具提示参数接口
 * 定义显示位单元格工具提示所需的参数
 * 
 * @interface TooltipParams
 * @property {React.MouseEvent<HTMLTableCellElement>} event - 触发工具提示的鼠标事件
 * @property {number} position - 位在二进制表示中的位置(0-31)
 * @property {string} value - 位的值('0'或'1')
 * @property {string} type - 行类型('num1', 'num2', 或 'diff')
 * @property {number} index - 显示的位索引(0-31)
 */
export interface TooltipParams {
  event: React.MouseEvent<HTMLTableCellElement>;
  position: number;
  value: string;
  type: string;
  index: number;
}

/**
 * 表格行属性接口
 * 定义位表格中每一行组件所需的属性
 * 
 * @interface TableRowProps
 * @property {string} label - 行标签，如"整数1"，"整数2"或"差异位"
 * @property {string} binary - 整数的二进制表示(32位字符串)
 * @property {'num1'|'num2'|'diff'} type - 行类型
 * @property {string} [num1Binary] - 第一个整数的二进制表示，仅在type='diff'时使用
 * @property {string} [num2Binary] - 第二个整数的二进制表示，仅在type='diff'时使用
 * @property {number[]} bitIndices - 位索引数组，通常是31到0的倒序排列
 * @property {React.CSSProperties} tableCellStyle - 表格单元格样式
 * @property {React.CSSProperties} labelStyle - 标签单元格样式
 * @property {Function} handleCellMouseOver - 单元格鼠标悬停处理函数
 * @property {Function} handleCellMouseOut - 单元格鼠标离开处理函数
 * @property {Function} formatNumber - 格式化数字显示的函数
 * @property {number} numValue - 行对应的整数值
 */
export interface TableRowProps {
  label: string;
  binary: string;
  type: 'num1' | 'num2' | 'diff';
  num1Binary?: string;
  num2Binary?: string;
  bitIndices: number[];
  tableCellStyle: React.CSSProperties;
  labelStyle: React.CSSProperties;
  handleCellMouseOver: (event: React.MouseEvent<HTMLTableCellElement>, position: number, value: string, type: string, index: number) => void;
  handleCellMouseOut: () => void;
  formatNumber: (num: number) => string;
  numValue: number;
} 