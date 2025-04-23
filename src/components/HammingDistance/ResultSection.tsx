import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import BitTable from '../BitTable';

/**
 * 结果部分组件接口定义
 * 
 * @interface ResultSectionProps
 * @property {number|null} distance - 计算出的汉明距离结果
 * @property {number} num1 - 第一个整数
 * @property {number} num2 - 第二个整数
 * @property {RefObject<HTMLSpanElement>} distanceValueRef - 距离值DOM元素的引用
 */
interface ResultSectionProps {
  distance: number | null;
  num1: number;
  num2: number;
  distanceValueRef: RefObject<HTMLSpanElement>;
}

/**
 * 结果部分组件
 * 显示两个整数之间的汉明距离及其二进制表示
 * 
 * @param {ResultSectionProps} props - 组件属性
 * @param {number|null} props.distance - 计算出的汉明距离结果
 * @param {number} props.num1 - 第一个整数
 * @param {number} props.num2 - 第二个整数
 * @param {RefObject<HTMLSpanElement>} props.distanceValueRef - 距离值DOM元素的引用
 * 
 * @example
 * // 使用示例
 * <ResultSection
 *   distance={2}
 *   num1={10}
 *   num2={3}
 *   distanceValueRef={distanceValueRef}
 * />
 * 
 * @returns {JSX.Element} 结果部分的JSX元素
 */
const ResultSection: React.FC<ResultSectionProps> = ({
  distance,
  num1,
  num2,
  distanceValueRef
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="result-section">
      {/* 显示汉明距离的标题 */}
      <h2 className="result-title">
        {t('result.hammingDistance')} <span className="distance-value" ref={distanceValueRef}>{distance}</span>
      </h2>
      
      {/* 位可视化区域 - 显示两个整数的二进制表示及差异位 */}
      <div className="bit-visualization">
        <BitTable num1={num1} num2={num2} />
      </div>
    </div>
  );
};

export default ResultSection; 