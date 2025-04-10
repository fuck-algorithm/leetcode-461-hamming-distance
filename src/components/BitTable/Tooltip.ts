import { TooltipParams } from './types';

// 创建和显示工具提示
export const showTooltip = (
  params: TooltipParams,
  num1Binary: string,
  num2Binary: string
) => {
  const { event, position, value, type, index } = params;
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

// 隐藏工具提示
export const hideTooltip = () => {
  const tooltip = document.querySelector('.bit-tooltip');
  if (tooltip) {
    tooltip.classList.remove('visible');
    setTimeout(() => {
      tooltip.remove();
    }, 300);
  }
}; 