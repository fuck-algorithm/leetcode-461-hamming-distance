import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import BitTable from '../BitTable';

interface ResultSectionProps {
  distance: number | null;
  num1: number;
  num2: number;
  distanceValueRef: RefObject<HTMLSpanElement>;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  distance,
  num1,
  num2,
  distanceValueRef
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="result-section">
      <h2 className="result-title">
        {t('result.hammingDistance')} <span className="distance-value" ref={distanceValueRef}>{distance}</span>
      </h2>
      
      <div className="bit-visualization">
        <BitTable num1={num1} num2={num2} />
      </div>
    </div>
  );
};

export default ResultSection; 