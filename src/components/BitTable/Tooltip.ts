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
  
  // 计算十进制值
  const decimalValue = type !== 'diff' ? Math.pow(2, position) : 0;
  
  // 设置工具提示内容
  if (type === 'num1') {
    tooltip.innerHTML = `
      <div><strong>位置</strong>: ${index}</div>
      <div><strong>二进制值</strong>: ${value}</div>
      <div><strong>十进制值</strong>: ${value === '1' ? decimalValue : 0}</div>
    `;
  } else if (type === 'num2') {
    tooltip.innerHTML = `
      <div><strong>位置</strong>: ${index}</div>
      <div><strong>二进制值</strong>: ${value}</div>
      <div><strong>十进制值</strong>: ${value === '1' ? decimalValue : 0}</div>
    `;
  } else if (type === 'diff') {
    const isDiff = num1Binary[position] !== num2Binary[position];
    if (isDiff) {
      tooltip.innerHTML = `
        <div><strong>位置</strong>: ${index}</div>
        <div><strong>差异</strong>: ${num1Binary[position]} ≠ ${num2Binary[position]}</div>
        <div><strong>贡献</strong>: 1 位汉明距离</div>
      `;
    } else {
      tooltip.innerHTML = `
        <div><strong>位置</strong>: ${index}</div>
        <div><strong>状态</strong>: 相同 (${num1Binary[position]} = ${num2Binary[position]})</div>
        <div><strong>贡献</strong>: 0 位汉明距离</div>
      `;
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