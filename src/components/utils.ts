import { MIN_VALUE, MAX_VALUE, ValidationResult } from './types';
import i18next from 'i18next';

// 生成随机整数，使用指数分布使小数字和大数字出现的概率更平衡
export const generateRandomInt = (): number => {
  // 随机数生成策略:
  // 1. 33%概率生成0-100的小数字
  // 2. 33%概率生成100-10000的中等数字
  // 3. 34%概率生成10000-MAX_VALUE的大数字
  const rand = Math.random();
  
  if (rand < 0.33) {
    // 小数字 (0-100)
    return Math.floor(Math.random() * 100);
  } else if (rand < 0.66) {
    // 中等数字 (100-10000)
    return Math.floor(Math.random() * 9900) + 100;
  } else {
    // 大数字 (10000-MAX_VALUE)
    // 使用对数分布使得较小的大数字出现的概率高于非常大的数字
    const exponent = Math.random() * Math.log2(MAX_VALUE - 10000);
    return Math.floor(Math.pow(2, exponent)) + 10000;
  }
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
    return { valid: false, error: i18next.t('validation.invalidNumber'), value: 0 };
  }
  
  // 检查是否是有效数字
  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, error: i18next.t('validation.invalidNumber'), value: 0 };
  }
  
  const numValue = Number(trimmed);
  
  // 检查范围
  if (numValue < MIN_VALUE || numValue > MAX_VALUE) {
    return { 
      valid: false, 
      error: i18next.t('validation.outOfRange'), 
      value: numValue < MIN_VALUE ? MIN_VALUE : MAX_VALUE 
    };
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