# Hamming Distance Visualization (LeetCode 461)

<div align="center">

![Hamming Distance](https://img.shields.io/badge/Algorithm-Hamming_Distance-blue)
![React](https://img.shields.io/badge/framework-React-61dafb)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)
![Vite](https://img.shields.io/badge/build-Vite-646cff)
![i18n](https://img.shields.io/badge/i18n-multilingual-green)

English | [简体中文](./README.md)

</div>

## 👀 Live Demo

🔗 **Online Demo**: [https://fuck-algorithm.github.io/leetcode-461-hamming-distance/](https://fuck-algorithm.github.io/leetcode-461-hamming-distance/)

<div align="center">
  <a href="https://fuck-algorithm.github.io/leetcode-461-hamming-distance/">
    <img src="./images/demo-animation.gif" alt="Hamming Distance Visualization - English Interface" width="90%" />
  </a>
</div>

## ✨ Project Introduction

This is an interactive visualization of [LeetCode Problem 461 - Hamming Distance](https://leetcode.com/problems/hamming-distance/).

> The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

The project provides an intuitive interface that allows users to:

- Input two integers (range: 0-4,294,967,295)
- Generate random examples
- View the calculation result
- Observe the binary representation of both integers and their different bits through a visual bit table
- Switch between Chinese and English languages (automatically detects browser language or manual toggle)

## 🖥️ Key Features

- 💡 **Intuitive Visualization**: Clearly display binary bit comparison through colors and animations
- 🔢 **Effective Bits Highlighting**: Highlight effective bits in binary representation, gray out unused bits
- 🌐 **Multilingual Support**: Support for English and Chinese, automatically selected based on browser language
- 🎯 **Balanced Random Examples**: Random examples include numbers from various ranges (small, medium, large)
- 📱 **Responsive Design**: Adapts to various screen sizes

## 🧩 Tech Stack

- **React 18**: For building the user interface
- **TypeScript**: Type-safe JavaScript
- **Vite**: Modern build tool
- **i18next**: Internationalization solution
- **CSS3**: Styling and animations

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/fuck-algorithm/leetcode-461-hamming-distance.git

# Enter the project directory
cd leetcode-461-hamming-distance

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📚 Algorithm Implementation

The core implementation of Hamming distance is quite simple:

```typescript
// Function to calculate Hamming distance
export const calculateHammingDistance = (a: number, b: number): number => {
  const xor = a ^ b;
  let count = 0;
  
  // Count the set bits
  for (let i = 0; i < 32; i++) {
    if ((xor & (1 << i)) !== 0) {
      count++;
    }
  }
  
  return count;
};
```

## 🤝 Contribution

Pull requests and issues are welcome!

## 📝 License

MIT 