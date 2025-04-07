# 汉明距离可视化 (LeetCode 461)

![汉明距离](https://img.shields.io/badge/算法-汉明距离-blue)
![React](https://img.shields.io/badge/framework-React-61dafb)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)
![Vite](https://img.shields.io/badge/build-Vite-646cff)

## 👀 在线体验

**在线演示**: [https://fuck-algorithm.github.io/leetcode-461-hamming-distance/](https://fuck-algorithm.github.io/leetcode-461-hamming-distance/)

## ✨ 项目介绍

这是 [LeetCode 461 题 - 汉明距离](https://leetcode.cn/problems/hamming-distance/) 的可视化实现。

> 汉明距离是两个整数对应二进制位不同的位置的数目。

该项目提供了一个直观的界面，让用户可以：

- 输入两个整数（范围：0-4,294,967,295）
- 生成随机示例
- 查看计算结果
- 通过位表格可视化观察两个整数的二进制表示和它们之间的不同位

## 🧩 技术栈

- React
- TypeScript 
- Vite
- CSS3

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
const calculateHammingDistance = (x: number, y: number): number => {
  const xor = x ^ y;  // 对两个数进行异或操作
  let count = 0;
  let n = xor;
  
  while (n > 0) {
    count += n & 1;  // 计算1的个数
    n >>= 1;         // 右移一位
  }
  
  return count;
};
```

## 📝 License

MIT 