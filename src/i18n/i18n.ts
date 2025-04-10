import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译资源
import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';

// 资源包
const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
};

// 配置i18n
i18n
  // 使用浏览器语言检测器
  .use(LanguageDetector)
  // 传递i18n实例给react-i18next
  .use(initReactI18next)
  // 初始化i18n
  .init({
    resources,
    // 默认语言
    fallbackLng: 'en',
    // 支持的语言列表
    supportedLngs: ['en', 'zh'],
    // 调试模式
    debug: process.env.NODE_ENV === 'development',
    // 检测器选项
    detection: {
      // 检测顺序：先从localStorage读取，然后是浏览器navigator
      order: ['localStorage', 'navigator'],
      // 用于存储的key
      lookupLocalStorage: 'userLanguage',
      // 将语言选择缓存到localStorage
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false // React已经安全地转义了
    }
  });

export default i18n;
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  // 同时更新localStorage
  localStorage.setItem('userLanguage', lng);
};

// 检查用户是否已经切换了语言
const userLanguage = localStorage.getItem('userLanguage');
if (userLanguage) {
  i18n.changeLanguage(userLanguage);
} 