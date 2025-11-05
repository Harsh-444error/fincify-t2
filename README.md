
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with **Hot Module Replacement (HMR)** and some **ESLint** rules.

---

## 🚀 Quick Start — Run the React Vite Project

Follow these steps to run the project locally:

1. **Install dependencies**
   ```bash
   npm install

## 🔧 Official Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)  
  Uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)  
  Uses [SWC](https://swc.rs/) for Fast Refresh.

---

## ⚛️ React Compiler

The **React Compiler** is enabled in this template.  
For more information, see the [React Compiler documentation](https://react.dev/learn/react-compiler).

> ⚠️ Note: Enabling the React Compiler may impact Vite’s development and build performance.

---

## 🧹 Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the ESLint configuration to enable **type-aware lint rules**:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,

      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
