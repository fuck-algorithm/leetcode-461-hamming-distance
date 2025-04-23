import { TooltipParams } from './types';
import i18next from 'i18next';

/**
 * 创建和显示位表格单元格的工具提示
 * 在用户鼠标悬停在位表格单元格上时，显示该位的详细信息
 * 
 * @param {TooltipParams} params - 工具提示参数
 * @param {React.MouseEvent} params.event - 鼠标事件对象
 * @param {number} params.position - 位在二进制字符串中的位置(0-31)
 * @param {string} params.value - 位的值('0'或'1')
 * @param {string} params.type - 行类型('num1', 'num2', 或 'diff')
 * @param {number} params.index - 显示的位索引(0-31)
 * @param {string} num1Binary - 第一个整数的二进制表示(32位字符串)
 * @param {string} num2Binary - 第二个整数的二进制表示(32位字符串)
 * 
 * @example
 * // 使用示例
 * showTooltip(
 *   {
 *     event: mouseEvent,
 *     position: 28,
 *     value: '1',
 *     type: 'num1',
 *     index: 3
 *   },
 *   '00000000000000000000000000001010', // num1Binary
 *   '00000000000000000000000000000011'  // num2Binary
 * );
 */
export const showTooltip = (
  params: TooltipParams,
  num1Binary: string,
  num2Binary: string
) => {
  const { event, position, value, type, index } = params;
  const cell = event.currentTarget;
  
  // 移除已有的提示框，确保页面上只有一个提示框
  const existingTooltip = document.querySelector('.bit-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // 创建新的工具提示元素
  const tooltip = document.createElement('div');
  tooltip.classList.add('bit-tooltip');
  
  // 根据行类型设置工具提示内容
  if (type === 'num1' || type === 'num2') {
    // 对于普通数字行，显示位置和值
    tooltip.innerHTML = `
      <div>${i18next.t('tooltip.position', '位置')}: ${index} | ${i18next.t('tooltip.value', '值')}: ${value}</div>
    `;
  } else if (type === 'diff') {
    // 对于差异行，显示两个数字在该位上的比较结果
    const isDiff = num1Binary[position] !== num2Binary[position];
    if (isDiff) {
      // 不同位，显示不同的值
      tooltip.innerHTML = `
        <div>${i18next.t('tooltip.position', '位置')}: ${index} | ${i18next.t('tooltip.different', '不同位')}: ${num1Binary[position]}≠${num2Binary[position]}</div>
      `;
    } else {
      // 相同位，显示相同的值
      tooltip.innerHTML = `
        <div>${i18next.t('tooltip.position', '位置')}: ${index} | ${i18next.t('tooltip.same', '相同')}: ${num1Binary[position]}=${num2Binary[position]}</div>
      `;
    }
  }
  
  // 将工具提示添加到当前单元格
  cell.appendChild(tooltip);
  
  // 显示工具提示，使用延迟和CSS过渡效果使显示平滑
  setTimeout(() => {
    tooltip.classList.add('visible');
    
    // 3秒后自动隐藏提示，避免提示框一直停留
    setTimeout(() => {
      hideTooltip();
    }, 3000);
  }, 10);
};

/**
 * 隐藏工具提示
 * 当用户的鼠标离开单元格时，隐藏工具提示
 * 
 * @example
 * // 使用示例
 * hideTooltip();
 */
export const hideTooltip = () => {
  const tooltip = document.querySelector('.bit-tooltip');
  if (tooltip) {
    // 先移除可见类，触发CSS过渡效果
    tooltip.classList.remove('visible');
    // 等待过渡效果完成后移除元素
    setTimeout(() => {
      tooltip.remove();
    }, 200);
  }
};