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
  
  // 设置工具提示内容 - 更简洁的内容
  if (type === 'num1' || type === 'num2') {
    tooltip.innerHTML = `
      <div>位置: ${index} | 值: ${value}</div>
    `;
  } else if (type === 'diff') {
    const isDiff = num1Binary[position] !== num2Binary[position];
    if (isDiff) {
      tooltip.innerHTML = `
        <div>位置: ${index} | 不同位: ${num1Binary[position]}≠${num2Binary[position]}</div>
      `;
    } else {
      tooltip.innerHTML = `
        <div>位置: ${index} | 相同: ${num1Binary[position]}=${num2Binary[position]}</div>
      `;
    }
  }
  
  // 添加工具提示到单元格
  cell.appendChild(tooltip);
  
  // 显示工具提示，并设置自动隐藏
  setTimeout(() => {
    tooltip.classList.add('visible');
    
    // 3秒后自动隐藏提示
    setTimeout(() => {
      hideTooltip();
    }, 3000);
  }, 10);
};

// 隐藏工具提示
export const hideTooltip = () => {
  const tooltip = document.querySelector('.bit-tooltip');
  if (tooltip) {
    tooltip.classList.remove('visible');
    setTimeout(() => {
      tooltip.remove();
    }, 200);
  }
}; 