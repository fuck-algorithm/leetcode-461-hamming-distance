// 单元格样式属性
export interface CellStyleProps {
  width: string;
  minWidth: string;
  maxWidth: string;
}

// 工具提示参数
export interface TooltipParams {
  event: React.MouseEvent<HTMLTableCellElement>;
  position: number;
  value: string;
  type: string;
  index: number;
}

// 表格行属性
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