// 共享类型定义

// HammingDistance组件属性
export interface HammingDistanceProps {
  initialNum1?: number;
  initialNum2?: number;
}

// BitTable组件属性
export interface BitTableProps {
  num1: number;
  num2: number;
}

// 数字验证结果类型
export interface ValidationResult {
  valid: boolean;
  error: string;
  value: number;
}

// 常量
export const MIN_VALUE = 0;
export const MAX_VALUE = 4294967295; // 2^32 - 1 