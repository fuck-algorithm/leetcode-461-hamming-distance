import React, { useState, useEffect, useRef } from 'react';
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
  
  // 按钮引用
  const buttonRef = useRef<HTMLButtonElement>(null);
  // 值容器引用
  const valueRef = useRef<HTMLSpanElement>(null);
  
  // 创建波纹效果
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // 获取点击位置相对于按钮的坐标
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    
    // 移除旧的波纹
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    
    // 添加新的波纹
    button.appendChild(circle);
    
    // 为距离值添加动画
    if (valueRef.current) {
      valueRef.current.classList.add('distance-value-animated');
      setTimeout(() => {
        if (valueRef.current) {
          valueRef.current.classList.remove('distance-value-animated');
        }
      }, 500);
    }
    
    // 为二进制表格中的不同位添加动画
    const diffBits = document.querySelectorAll('.bit-diff');
    diffBits.forEach((bit, index) => {
      // 移除旧的动画类
      bit.classList.remove('bit-diff-animated');
      // 重新触发动画流程
      void (bit as HTMLElement).offsetWidth; // 强制重绘
      // 添加动画类，并设置延迟
      setTimeout(() => {
        bit.classList.add('bit-diff-animated');
      }, index * 50); // 每个位置的动画延迟50ms
    });
    
    // 为表格添加动画效果
    const tableContainer = document.querySelector('.bit-table-container');
    if (tableContainer) {
      tableContainer.classList.add('bit-table-container-animated');
      setTimeout(() => {
        tableContainer.classList.remove('bit-table-container-animated');
      }, 800);
    }
  };
  
  // 计算汉明距离
  const calculateHammingDistance = (x: number, y: number): number => {
    // 重要：确保 x 和 y 是数字
    const num1 = typeof x === 'number' ? x : parseInt(String(x)) || 0;
    const num2 = typeof y === 'number' ? y : parseInt(String(y)) || 0;
    
    // 使用与 BitTable 完全相同的方法计算二进制表示
    const num1Binary = num1.toString(2).padStart(32, '0');
    const num2Binary = num2.toString(2).padStart(32, '0');
    
    console.log("HammingDistance 组件中的值:");
    console.log(`num1: ${num1} (${num1Binary})`);
    console.log(`num2: ${num2} (${num2Binary})`);
    
    // 计算不同位的数量 - 与 BitTable 相同的实现
    let diffCount = 0;
    for (let i = 0; i < 32; i++) {
      if (num1Binary[i] !== num2Binary[i]) {
        diffCount++;
      }
    }
    
    console.log(`计算出的汉明距离: ${diffCount}`);
    return diffCount;
  };

  // 更新计算结果
  const updateCalculation = () => {
    const x = num1 || 0;
    const y = num2 || 0;
    
    // 计算汉明距离
    const hammingDist = calculateHammingDistance(x, y);
    console.log(`设置汉明距离: ${hammingDist}`);
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
  const generateRandomNumbers = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 创建波纹效果
    createRipple(e);
    
    // 随机选择生成小数值还是大数值，增加随机性
    const generateLargeNumber = Math.random() > 0.5;
    
    setNum1(getRandomNumber(generateLargeNumber));
    setNum2(getRandomNumber(generateLargeNumber));
  };

  // 初始化时计算汉明距离
  useEffect(() => {
    console.log("初始化计算");
    updateCalculation();
  }, []);

  // 当输入变化时重新计算
  useEffect(() => {
    console.log(`输入变化: num1=${num1}, num2=${num2}`);
    updateCalculation();
  }, [num1, num2]);

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
          <button 
            className="random-button" 
            onClick={generateRandomNumbers}
            ref={buttonRef}
          >
            🎲 随机示例
          </button>
        </div>
      </div>

      <div className="result-section">
        <h2>
          汉明距离: <span className="distance-value" ref={valueRef}>{distance}</span>
        </h2>
      </div>

      <div className="visualization-section">
        <BitTable 
          num1={num1} 
          num2={num2} 
        />
      </div>
    </div>
  );
};

export default HammingDistance; 