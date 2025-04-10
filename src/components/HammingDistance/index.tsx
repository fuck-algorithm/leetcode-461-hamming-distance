import React, { useState, useEffect, useRef } from 'react';
import { HammingDistanceProps } from '../types';
import { generateRandomInt, calculateHammingDistance, validateNumber } from '../utils';
import InputSection from './InputSection';
import ResultSection from './ResultSection';
import '../styles/HammingDistance.css';

const HammingDistance: React.FC<HammingDistanceProps> = ({
  initialNum1,
  initialNum2,
}) => {
  // 如果未提供初始值，则生成随机数
  const randomNum1 = initialNum1 ?? generateRandomInt();
  const randomNum2 = initialNum2 ?? generateRandomInt();

  const [num1, setNum1] = useState<number>(randomNum1);
  const [num2, setNum2] = useState<number>(randomNum2);
  const [num1Input, setNum1Input] = useState<string>(randomNum1.toString());
  const [num2Input, setNum2Input] = useState<string>(randomNum2.toString());
  const [num1Error, setNum1Error] = useState<string>('');
  const [num2Error, setNum2Error] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const distanceValueRef = useRef<HTMLSpanElement>(null);

  // 生成随机示例
  const generateRandomExample = () => {
    const newNum1 = generateRandomInt();
    const newNum2 = generateRandomInt();
    
    setNum1(newNum1);
    setNum2(newNum2);
    setNum1Input(newNum1.toString());
    setNum2Input(newNum2.toString());
    setNum1Error('');
    setNum2Error('');
    
    // 直接计算汉明距离
    setDistance(calculateHammingDistance(newNum1, newNum2));
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isNum1: boolean) => {
    const value = e.target.value;
    
    if (isNum1) {
      setNum1Input(value);
      const validation = validateNumber(value);
      setNum1Error(validation.error);
      if (validation.valid) {
        setNum1(validation.value);
      }
    } else {
      setNum2Input(value);
      const validation = validateNumber(value);
      setNum2Error(validation.error);
      if (validation.valid) {
        setNum2(validation.value);
      }
    }
  };

  // 处理输入框失去焦点
  const handleInputBlur = (isNum1: boolean) => {
    const value = isNum1 ? num1Input : num2Input;
    const validation = validateNumber(value);
    
    if (isNum1) {
      if (!validation.valid) {
        setNum1Input(num1.toString());
        setNum1Error('');
      }
    } else {
      if (!validation.valid) {
        setNum2Input(num2.toString());
        setNum2Error('');
      }
    }
  };

  // 当数字变化时更新计算结果
  useEffect(() => {
    setDistance(calculateHammingDistance(num1, num2));
  }, [num1, num2]);

  return (
    <div className="hamming-distance-container">
      <InputSection 
        num1Input={num1Input}
        num2Input={num2Input}
        num1Error={num1Error}
        num2Error={num2Error}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputBlur}
        generateRandomExample={generateRandomExample}
        buttonRef={buttonRef}
      />
      
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