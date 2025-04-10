# 汉明距离计算动画演示 (LeetCode 461)

<div align="center">

![汉明距离](https://img.shields.io/badge/算法-汉明距离-blue)
![React](https://img.shields.io/badge/framework-React-61dafb)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)
![Vite](https://img.shields.io/badge/build-Vite-646cff)
![i18n](https://img.shields.io/badge/i18n-多语言支持-green)

[English](./README.en.md) | 简体中文

</div>

## 👀 在线体验

🔗 **在线演示**: [https://fuck-algorithm.github.io/leetcode-461-hamming-distance/](https://fuck-algorithm.github.io/leetcode-461-hamming-distance/)

<div align="center">
  <a href="https://fuck-algorithm.github.io/leetcode-461-hamming-distance/">
    <img src="./example-zh.png" alt="汉明距离计算动画演示 - 中文界面" width="90%" />
  </a>
</div>

## ✨ 项目介绍

这是 [LeetCode 461 题 - 汉明距离](https://leetcode.cn/problems/hamming-distance/) 的交互式可视化实现。

> 汉明距离是两个整数对应二进制位不同的位置的数目。

该项目提供了一个直观的界面，让用户可以：

- 输入两个整数（范围：0-4,294,967,295）
- 生成随机示例
- 查看计算结果
- 通过位表格可视化观察两个整数的二进制表示和它们之间的不同位
- 支持中文和英文两种语言（自动检测浏览器语言或手动切换）

## 🖥️ 功能亮点

- 💡 **直观可视化**：通过颜色和动画清晰展示二进制位对比
- 🔢 **有效位高亮**：突出显示二进制表示中的有效位，灰显未使用位
- 🌐 **多语言支持**：支持中文和英文，根据浏览器语言自动选择
- 🎯 **平衡的随机示例**：随机示例包含各种范围的数字（小、中、大）
- 📱 **响应式设计**：适配各种屏幕尺寸

## 🧩 技术栈

- **React 18**：用于构建用户界面
- **TypeScript**：类型安全的JavaScript
- **Vite**：现代化的构建工具
- **i18next**：国际化解决方案
- **CSS3**：样式和动画

## 🚀 本地运行

```bash
# 克隆仓库
git clone https://github.com/fuck-algorithm/leetcode-461-hamming-distance.git

# 进入项目目录
cd leetcode-461-hamming-distance

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📚 算法实现

汉明距离的核心实现非常简单：

```typescript
// 计算汉明距离的函数
export const calculateHammingDistance = (a: number, b: number): number => {
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
```

## 🤝 贡献

欢迎提交 Pull Request 或提出 Issue！

## 📝 许可证

MIT 