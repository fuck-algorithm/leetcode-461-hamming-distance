import React, { useState, useEffect, useRef } from 'react';
import './HammingDistance.css';
import BitTable from './BitTable';

interface HammingDistanceProps {
  initialNum1?: number;
  initialNum2?: number;
}

const HammingDistance: React.FC<HammingDistanceProps> = ({
  initialNum1 = 1,
  initialNum2 = 4,
}) => {
  const [num1, setNum1] = useState<number>(initialNum1);
  const [num2, setNum2] = useState<number>(initialNum2);
  const [distance, setDistance] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const distanceValueRef = useRef<HTMLSpanElement>(null);

  // 计算汉明距离的函数
  const calculateHammingDistance = (a: number, b: number): number => {
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

  // 生成随机示例
  const generateRandomExample = () => {
    // 生成1到最大32位整数之间的随机整数
    const maxInt = 4294967295; // 2^32 - 1
    const newNum1 = Math.floor(Math.random() * maxInt);
    const newNum2 = Math.floor(Math.random() * maxInt);
    
    setNum1(newNum1);
    setNum2(newNum2);
    
    // 直接计算汉明距离，不添加任何视觉效果
    setDistance(calculateHammingDistance(newNum1, newNum2));
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isNum1: boolean) => {
    const value = e.target.value;
    const numValue = parseInt(value) || 0;
    
    if (isNum1) {
      setNum1(numValue);
    } else {
      setNum2(numValue);
    }
  };

  // 当数字变化时更新计算结果
  useEffect(() => {
    const updateCalculation = () => {
      const result = calculateHammingDistance(num1, num2);
      setDistance(result);
    };
    
    updateCalculation();
  }, [num1, num2]);

  return (
    <div className="hamming-distance-container">
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="num1">整数 1:</label>
          <input
            type="text"
            id="num1"
            value={num1}
            onChange={(e) => handleInputChange(e, true)}
          />
          <div className="input-limit">请输入 0 至 4,294,967,295 之间的整数</div>
        </div>
        
        <div className="input-group">
          <label htmlFor="num2">整数 2:</label>
          <input
            type="text"
            id="num2"
            value={num2}
            onChange={(e) => handleInputChange(e, false)}
          />
          <div className="input-limit">请输入 0 至 4,294,967,295 之间的整数</div>
        </div>
        
        <button 
          className="random-button" 
          onClick={generateRandomExample}
          ref={buttonRef}
        >
          🎲 随机示例
        </button>
      </div>
      
      <div className="result-section">
        <h2 className="result-title">
          汉明距离: <span className="distance-value" ref={distanceValueRef}>{distance}</span>
        </h2>
        
        <div className="bit-visualization">
          <h3>32位二进制表示</h3>
          <BitTable num1={num1} num2={num2} />
        </div>
      </div>
    </div>
  );
};

export default HammingDistance; 