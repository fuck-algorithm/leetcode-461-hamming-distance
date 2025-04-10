import { MIN_VALUE, MAX_VALUE, ValidationResult } from './types';

// 生成32位范围内的随机整数
export const generateRandomInt = (): number => {
  return Math.floor(Math.random() * MAX_VALUE);
};

// 计算汉明距离的函数
export const calculateHammingDistance = (a: number, b: number): number => {
  const xor = a ^ b;
  let count = 0;
  
  // 计算设置位的数量
  for (let i = 0; i < 32; i++) {
    if ((xor & (1 << i)) !== 0) {
      count++;
    }
  }
  
  return count;
};

// 校验数字输入
export const validateNumber = (value: string): ValidationResult => {
  const trimmed = value.trim();
  
  // 如果是空字符串
  if (trimmed === '') {
    return { valid: false, error: '请输入一个数字', value: 0 };
  }
  
  // 检查是否是有效数字
  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, error: '请输入有效的整数', value: 0 };
  }
  
  const numValue = Number(trimmed);
  
  // 检查范围
  if (numValue < MIN_VALUE) {
    return { valid: false, error: `最小值为 ${MIN_VALUE}`, value: MIN_VALUE };
  }
  
  if (numValue > MAX_VALUE) {
    return { valid: false, error: `最大值为 ${MAX_VALUE}`, value: MAX_VALUE };
  }
  
  return { valid: true, error: '', value: numValue };
};

// 估算字符串所需的宽度
export const estimateStringWidth = (str: string): number => {
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
  return width + 30; // 额外的边距空间
};

// 数字格式化显示
export const formatNumber = (num: number): string => {
  // 对于大数，使用精简的格式
  if (num > 1000000000) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return num.toLocaleString();
}; 