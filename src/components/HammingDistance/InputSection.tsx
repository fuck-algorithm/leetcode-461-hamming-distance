import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 输入部分组件接口定义
 * 
 * @interface InputSectionProps
 * @property {string} num1Input - 第一个整数的输入字符串
 * @property {string} num2Input - 第二个整数的输入字符串 
 * @property {string} num1Error - 第一个整数的错误信息
 * @property {string} num2Error - 第二个整数的错误信息
 * @property {Function} handleInputChange - 处理输入变化的函数
 * @property {Function} handleInputBlur - 处理输入框失去焦点的函数
 * @property {Function} handleKeyDown - 处理键盘按键的函数
 * @property {Function} generateRandomExample - 生成随机示例的函数
 * @property {RefObject<HTMLButtonElement>} buttonRef - 随机示例按钮的引用
 */
interface InputSectionProps {
  num1Input: string;
  num2Input: string;
  num1Error: string;
  num2Error: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, isNum1: boolean) => void;
  handleInputBlur: (isNum1: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, isNum1: boolean) => void;
  generateRandomExample: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

/**
 * 输入部分组件
 * 包含两个整数输入框和随机示例按钮，用于汉明距离计算
 * 
 * @param {InputSectionProps} props - 组件属性
 * @param {string} props.num1Input - 第一个整数的输入字符串
 * @param {string} props.num2Input - 第二个整数的输入字符串
 * @param {string} props.num1Error - 第一个整数的错误信息
 * @param {string} props.num2Error - 第二个整数的错误信息
 * @param {Function} props.handleInputChange - 处理输入变化的函数
 * @param {Function} props.handleInputBlur - 处理输入框失去焦点的函数
 * @param {Function} props.handleKeyDown - 处理键盘按键的函数
 * @param {Function} props.generateRandomExample - 生成随机示例的函数
 * @param {RefObject<HTMLButtonElement>} props.buttonRef - 随机示例按钮的引用
 * 
 * @example
 * // 使用示例
 * <InputSection 
 *   num1Input="10"
 *   num2Input="3"
 *   num1Error=""
 *   num2Error=""
 *   handleInputChange={...}
 *   handleInputBlur={...}
 *   handleKeyDown={...}
 *   generateRandomExample={...}
 *   buttonRef={buttonRef}
 * />
 * 
 * @returns {JSX.Element} 输入部分的JSX元素
 */
const InputSection: React.FC<InputSectionProps> = ({
  num1Input,
  num2Input,
  num1Error,
  num2Error,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  generateRandomExample,
  buttonRef
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="input-section">
      <div className="inputs-row">
        {/* 第一个整数输入单元格 */}
        <div className="input-cell">
          {/* 输入标签 */}
          <div className="input-label">{t('input.int1')}</div>
          {/* 输入框 - 支持键盘上下键调整值 */}
          <input
            type="text"
            id="num1"
            value={num1Input}
            onChange={(e) => handleInputChange(e, true)}
            onBlur={() => handleInputBlur(true)}
            onKeyDown={(e) => handleKeyDown(e, true)}
            className={num1Error ? 'error' : ''}
          />
          {/* 输入限制提示 */}
          <div className="input-limit">{t('input.intLimit')}</div>
          {/* 错误信息显示 */}
          <div className="error-message">{num1Error}</div>
        </div>
        
        {/* 第二个整数输入单元格 */}
        <div className="input-cell">
          {/* 输入标签 */}
          <div className="input-label">{t('input.int2')}</div>
          {/* 输入框 - 支持键盘上下键调整值 */}
          <input
            type="text"
            id="num2"
            value={num2Input}
            onChange={(e) => handleInputChange(e, false)}
            onBlur={() => handleInputBlur(false)}
            onKeyDown={(e) => handleKeyDown(e, false)}
            className={num2Error ? 'error' : ''}
          />
          {/* 输入限制提示 */}
          <div className="input-limit">{t('input.intLimit')}</div>
          {/* 错误信息显示 */}
          <div className="error-message">{num2Error}</div>
        </div>

        {/* 随机示例按钮单元格 */}
        <div className="button-cell">
          <div className="input-label">&nbsp;</div>
          {/* 随机示例按钮 - 点击生成随机整数对 */}
          <button 
            className="random-button" 
            onClick={generateRandomExample}
            ref={buttonRef}
          >
            {t('input.randomExample')}
          </button>
          <div className="input-limit">&nbsp;</div>
          <div className="error-message">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default InputSection; 