import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n/i18n';

// 语言配置
const languages = [
  { code: 'zh', name: '简体中文' },
  { code: 'en', name: 'English' }
];

// 样式
const switcherStyle: React.CSSProperties = {
  position: 'fixed',
  top: '10px',
  right: '100px', // GitHub 角标右边
  zIndex: 1000,
  display: 'flex',
  gap: '5px'
};

const buttonStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 10px',
  backgroundColor: isActive ? '#4CAF50' : '#f8f9fa',
  color: isActive ? 'white' : '#333',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  minWidth: '40px'
});

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 处理语言切换
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
  };
  
  return (
    <div style={switcherStyle}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          style={buttonStyle(currentLang.startsWith(lang.code))}
          onClick={() => handleLanguageChange(lang.code)}
          title={lang.name}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 