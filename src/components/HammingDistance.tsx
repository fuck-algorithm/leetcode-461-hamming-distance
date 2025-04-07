import React, { useState, useEffect } from 'react';
import './HammingDistance.css';
import BitTable from './BitTable';

const HammingDistance: React.FC = () => {
  // 定义最大值：2^32 - 1
  const MAX_VALUE = 4294967295; // (2^32 - 1)
  const MIN_VALUE = 0;
  
  // 生成随机数的函数
  const getRandomNumber = (isLarge = false): number => {
    if (isLarge) {
      // 生成较大的数 (10,000,000 到 MAX_VALUE 之间)
      return Math.floor(Math.random() * (MAX_VALUE - 10000000)) + 10000000;
    } else {
      // 生成较小的数 (0 到 10,000,000 之间)
      return Math.floor(Math.random() * 10000000);
    }
  };
  
  // 为了有趣的初始示例，随机决定是否生成大数
  const initialIsLarge = Math.random() > 0.7; // 30%的几率生成大数
  
  // 初始值使用随机生成的数字
  const [num1, setNum1] = useState<number>(getRandomNumber(initialIsLarge));
  const [num2, setNum2] = useState<number>(getRandomNumber(initialIsLarge));
  const [distance, setDistance] = useState<number>(0);
  
  // 计算汉明距离
  const calculateHammingDistance = (x: number, y: number): number => {
    const xor = x ^ y;
    let count = 0;
    let n = xor;
    
    while (n > 0) {
      count += n & 1;
      n >>= 1;
    }
    
    return count;
  };

  // 更新计算结果
  const updateCalculation = () => {
    const x = num1 || 0;
    const y = num2 || 0;
    
    // 计算汉明距离
    const hammingDist = calculateHammingDistance(x, y);
    setDistance(hammingDist);
  };

  // 验证数值是否在有效范围内
  const validateNumber = (value: number): number => {
    if (isNaN(value) || value < MIN_VALUE) return MIN_VALUE;
    if (value > MAX_VALUE) return MAX_VALUE;
    return value;
  };

  // 处理输入变化
  const handleNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNum1(isNaN(value) ? MIN_VALUE : validateNumber(value));
  };

  const handleNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNum2(isNaN(value) ? MIN_VALUE : validateNumber(value));
  };

  // 生成范围内的随机数
  const generateRandomNumbers = () => {
    // 随机选择生成小数值还是大数值，增加随机性
    const generateLargeNumber = Math.random() > 0.5;
    
    setNum1(getRandomNumber(generateLargeNumber));
    setNum2(getRandomNumber(generateLargeNumber));
  };

  // 当输入变化时重新计算
  useEffect(() => {
    updateCalculation();
  }, [num1, num2]);
  
  // 初始化时计算汉明距离
  useEffect(() => {
    updateCalculation();
  }, []);

  return (
    <div className="hamming-distance-container">
      <div className="input-row">
        <div className="input-field">
          <label htmlFor="num1">整数 1:</label>
          <input
            type="number"
            id="num1"
            value={num1}
            onChange={handleNum1Change}
            min={MIN_VALUE}
            max={MAX_VALUE}
            placeholder="输入第一个整数"
          />
          <small>请输入 0 至 4,294,967,295 之间的整数</small>
        </div>
        
        <div className="input-field">
          <label htmlFor="num2">整数 2:</label>
          <input
            type="number"
            id="num2"
            value={num2}
            onChange={handleNum2Change}
            min={MIN_VALUE}
            max={MAX_VALUE}
            placeholder="输入第二个整数"
          />
          <small>请输入 0 至 4,294,967,295 之间的整数</small>
        </div>
        
        <div className="button-field">
          <button className="random-button" onClick={generateRandomNumbers}>
            🎲 随机示例
          </button>
        </div>
      </div>

      <div className="result-section">
        <h2>
          汉明距离: <span className="distance-value">{distance}</span>
        </h2>
      </div>

      <div className="visualization-section">
        <BitTable 
          num1={num1} 
          num2={num2} 
          hammingDistance={distance} 
        />
      </div>
    </div>
  );
};

export default HammingDistance; 