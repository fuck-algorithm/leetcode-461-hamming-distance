import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

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
        <div className="input-cell">
          <div className="input-label">{t('input.int1')}</div>
          <input
            type="text"
            id="num1"
            value={num1Input}
            onChange={(e) => handleInputChange(e, true)}
            onBlur={() => handleInputBlur(true)}
            onKeyDown={(e) => handleKeyDown(e, true)}
            className={num1Error ? 'error' : ''}
          />
          <div className="input-limit">{t('input.intLimit')}</div>
          <div className="error-message">{num1Error}</div>
        </div>
        
        <div className="input-cell">
          <div className="input-label">{t('input.int2')}</div>
          <input
            type="text"
            id="num2"
            value={num2Input}
            onChange={(e) => handleInputChange(e, false)}
            onBlur={() => handleInputBlur(false)}
            onKeyDown={(e) => handleKeyDown(e, false)}
            className={num2Error ? 'error' : ''}
          />
          <div className="input-limit">{t('input.intLimit')}</div>
          <div className="error-message">{num2Error}</div>
        </div>

        <div className="button-cell">
          <div className="input-label">&nbsp;</div>
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