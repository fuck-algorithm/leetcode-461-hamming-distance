import React, { useState, useEffect, useRef } from 'react';
import { HammingDistanceProps } from '../types';
import { generateRandomInt, calculateHammingDistance, validateNumber } from '../utils';
import InputSection from './InputSection';
import ResultSection from './ResultSection';
import './HammingDistance.css';
import '../common.css';

/**
 * 汉明距离计算器组件
 * 用于计算两个非负整数的汉明距离（二进制表示中不同位的数量）
 * 
 * @param {HammingDistanceProps} props - 组件属性
 * @param {number} [props.initialNum1] - 初始第一个整数，如果未提供则随机生成
 * @param {number} [props.initialNum2] - 初始第二个整数，如果未提供则随机生成
 * 
 * @example
 * // 使用随机数初始化
 * <HammingDistance />
 * 
 * // 使用指定初始值
 * <HammingDistance initialNum1={10} initialNum2={3} />
 * 
 * @returns {JSX.Element} 汉明距离计算器的JSX元素
 */
const HammingDistance: React.FC<HammingDistanceProps> = ({
  initialNum1,
  initialNum2,
}) => {
  // 如果未提供初始值，则生成随机数
  const randomNum1 = initialNum1 ?? generateRandomInt();
  const randomNum2 = initialNum2 ?? generateRandomInt();

  /**
   * 组件状态定义
   * @property {number} num1 - 第一个整数的值
   * @property {number} num2 - 第二个整数的值
   * @property {string} num1Input - 第一个整数的输入字符串
   * @property {string} num2Input - 第二个整数的输入字符串
   * @property {string} num1Error - 第一个整数的输入错误信息
   * @property {string} num2Error - 第二个整数的输入错误信息
   * @property {number|null} distance - 计算的汉明距离结果
   */
  const [num1, setNum1] = useState<number>(randomNum1);
  const [num2, setNum2] = useState<number>(randomNum2);
  const [num1Input, setNum1Input] = useState<string>(randomNum1.toString());
  const [num2Input, setNum2Input] = useState<string>(randomNum2.toString());
  const [num1Error, setNum1Error] = useState<string>('');
  const [num2Error, setNum2Error] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  
  // DOM引用，用于操作UI元素
  const buttonRef = useRef<HTMLButtonElement>(null);  // 随机示例按钮引用
  const distanceValueRef = useRef<HTMLSpanElement>(null);  // 显示距离的元素引用

  /**
   * 生成随机示例
   * 生成两个随机整数作为示例，并计算它们的汉明距离
   */
  const generateRandomExample = () => {
    const newNum1 = generateRandomInt();
    const newNum2 = generateRandomInt();
    
    // 更新状态
    setNum1(newNum1);
    setNum2(newNum2);
    setNum1Input(newNum1.toString());
    setNum2Input(newNum2.toString());
    setNum1Error('');
    setNum2Error('');
    
    // 直接计算汉明距离
    setDistance(calculateHammingDistance(newNum1, newNum2));
  };

  /**
   * 处理输入变化
   * 当用户在输入框中输入时，验证输入并更新状态
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - 输入事件
   * @param {boolean} isNum1 - 是否为第一个整数的输入
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isNum1: boolean) => {
    const value = e.target.value;
    
    if (isNum1) {
      // 处理第一个整数的输入
      setNum1Input(value);
      const validation = validateNumber(value);
      setNum1Error(validation.error);
      if (validation.valid) {
        setNum1(validation.value);
      }
    } else {
      // 处理第二个整数的输入
      setNum2Input(value);
      const validation = validateNumber(value);
      setNum2Error(validation.error);
      if (validation.valid) {
        setNum2(validation.value);
      }
    }
  };

  /**
   * 处理键盘上下键
   * 允许用户使用键盘上下箭头键微调输入值
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 键盘事件
   * @param {boolean} isNum1 - 是否为第一个整数的输入
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, isNum1: boolean) => {
    // 只处理上下箭头键事件
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      return;
    }
    
    e.preventDefault(); // 阻止默认行为，防止光标移动

    const currentValue = isNum1 ? num1 : num2;
    
    let newValue: number;
    
    if (e.key === 'ArrowUp') {
      // 上箭头键，增加1
      newValue = currentValue + 1;
      // 确保不超过最大值 (2^32 - 1)
      if (newValue > 4294967295) {
        newValue = 4294967295;
      }
    } else {
      // 下箭头键，减少1
      newValue = currentValue - 1;
      // 确保不小于0
      if (newValue < 0) {
        newValue = 0;
      }
    }
    
    const newInputValue = newValue.toString();
    
    if (isNum1) {
      // 更新第一个整数
      setNum1(newValue);
      setNum1Input(newInputValue);
      setNum1Error('');
    } else {
      // 更新第二个整数
      setNum2(newValue);
      setNum2Input(newInputValue);
      setNum2Error('');
    }
  };

  /**
   * 处理输入框失去焦点
   * 当输入框失去焦点时，验证输入并恢复有效值
   * 
   * @param {boolean} isNum1 - 是否为第一个整数的输入
   */
  const handleInputBlur = (isNum1: boolean) => {
    const value = isNum1 ? num1Input : num2Input;
    const validation = validateNumber(value);
    
    if (isNum1) {
      // 处理第一个整数的输入
      if (!validation.valid) {
        // 如果输入无效，恢复为之前的有效值
        setNum1Input(num1.toString());
        setNum1Error('');
      }
    } else {
      // 处理第二个整数的输入
      if (!validation.valid) {
        // 如果输入无效，恢复为之前的有效值
        setNum2Input(num2.toString());
        setNum2Error('');
      }
    }
  };

  /**
   * 当数字变化时更新计算结果
   * 自动计算两个整数的汉明距离
   */
  useEffect(() => {
    setDistance(calculateHammingDistance(num1, num2));
  }, [num1, num2]);

  return (
    <div className="hamming-distance-container">
      {/* 输入部分，包含两个数字输入框和随机示例按钮 */}
      <InputSection 
        num1Input={num1Input}
        num2Input={num2Input}
        num1Error={num1Error}
        num2Error={num2Error}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputBlur}
        handleKeyDown={handleKeyDown}
        generateRandomExample={generateRandomExample}
        buttonRef={buttonRef}
      />
      
      {/* 结果部分，显示汉明距离和二进制表示 */}
      <ResultSection
        distance={distance}
        num1={num1}
        num2={num2}
        distanceValueRef={distanceValueRef}
      />
    </div>
  );
};

export default HammingDistance; 