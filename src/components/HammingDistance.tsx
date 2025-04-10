import React, { useState, useEffect, useRef } from 'react';
import './HammingDistance.css';
import BitTable from './BitTable';

interface HammingDistanceProps {
  initialNum1?: number;
  initialNum2?: number;
}

// 生成32位范围内的随机整数
const generateRandomInt = (): number => {
  return Math.floor(Math.random() * 4294967295); // 2^32 - 1
};

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

  // 常量
  const MIN_VALUE = 0;
  const MAX_VALUE = 4294967295; // 2^32 - 1

  // 校验数字输入
  const validateNumber = (value: string): { valid: boolean; error: string; value: number } => {
    const trimmed = value.trim();
    
    // 如果是空字符串
    if (trimmed === '') {
      return { valid: false, error: '请输入一个数字', value: 0 };
    }
    
    // 检查是否是有效数字
    if (!/^\d+$/.test(trimmed)) {
      return { valid: false, error: '请输入有效的整数', value: 0 };
    }
    
    const numValue = Number(trimmed);
    
    // 检查范围
    if (numValue < MIN_VALUE) {
      return { valid: false, error: `最小值为 ${MIN_VALUE}`, value: MIN_VALUE };
    }
    
    if (numValue > MAX_VALUE) {
      return { valid: false, error: `最大值为 ${MAX_VALUE}`, value: MAX_VALUE };
    }
    
    return { valid: true, error: '', value: numValue };
  };

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
    setNum1Input(newNum1.toString());
    setNum2Input(newNum2.toString());
    setNum1Error('');
    setNum2Error('');
    
    // 直接计算汉明距离，不添加任何视觉效果
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
    const updateCalculation = () => {
      const result = calculateHammingDistance(num1, num2);
      setDistance(result);
    };
    
    updateCalculation();
  }, [num1, num2]);

  return (
    <div className="hamming-distance-container">
      <div className="input-section">
        <div className="inputs-row">
          <div className="input-cell">
            <div className="input-label">整数 1:</div>
            <input
              type="text"
              id="num1"
              value={num1Input}
              onChange={(e) => handleInputChange(e, true)}
              onBlur={() => handleInputBlur(true)}
              className={num1Error ? 'error' : ''}
            />
            <div className="input-limit">请输入 0 至 4,294,967,295 之间的整数</div>
            <div className="error-message">{num1Error}</div>
          </div>
          
          <div className="input-cell">
            <div className="input-label">整数 2:</div>
            <input
              type="text"
              id="num2"
              value={num2Input}
              onChange={(e) => handleInputChange(e, false)}
              onBlur={() => handleInputBlur(false)}
              className={num2Error ? 'error' : ''}
            />
            <div className="input-limit">请输入 0 至 4,294,967,295 之间的整数</div>
            <div className="error-message">{num2Error}</div>
          </div>

          <div className="button-cell">
            <div className="input-label">&nbsp;</div>
            <button 
              className="random-button" 
              onClick={generateRandomExample}
              ref={buttonRef}
            >
              🎲 随机示例
            </button>
            <div className="input-limit">&nbsp;</div>
            <div className="error-message">&nbsp;</div>
          </div>
        </div>
      </div>
      
      <div className="result-section">
        <h2 className="result-title">
          汉明距离: <span className="distance-value" ref={distanceValueRef}>{distance}</span>
        </h2>
        
        <div className="bit-visualization">
          <BitTable num1={num1} num2={num2} />
        </div>
      </div>
    </div>
  );
};

export default HammingDistance; 