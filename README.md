# 我的宇宙 - 第一视角3D场景

这是一个使用 React Three Fiber 构建的3D第一视角场景演示。

## 功能特性

- ✨ 完整的第一视角控制器
- 🎮 WASD/方向键移动
- 🖱️ 鼠标旋转视角
- 🎯 指针锁定支持
- 🎪 随机生成的3D场景

## 控制说明

### 鼠标控制
- **点击画面**：锁定鼠标指针
- **移动鼠标**：环顾四周（360度视角）
- **ESC键**：解锁鼠标指针

### 键盘控制
- **W / ↑**：向前移动
- **S / ↓**：向后移动
- **A / ←**：向左移动
- **D / →**：向右移动
- **空格键**：向上移动（飞行）
- **Shift键**：向下移动（下降）

## 技术栈

- **React** - UI框架
- **Three.js** - 3D图形库
- **React Three Fiber** - Three.js的React渲染器
- **TypeScript** - 类型安全
- **Vite** - 构建工具

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

## 项目结构

```
src/
├── core/
│   └── FirstPersonControls.tsx  # 第一视角控制器
├── main.tsx                     # 主应用入口
└── index.css                    # 样式文件
```

## 使用第一视角控制器

您可以在任何React Three Fiber项目中使用这个控制器：

```tsx
import { FirstPersonControls } from './core/FirstPersonControls';

function App() {
  return (
    <Canvas>
      <FirstPersonControls />
      {/* 您的3D场景内容 */}
    </Canvas>
  );
}
```

## 自定义配置

您可以在 `FirstPersonControls.tsx` 中调整以下参数：

- `moveSpeed`: 移动速度（默认：8）
- `mouseSensitivity`: 鼠标灵敏度（默认：0.002）

## 演示场景

当前演示包含：
- 🎲 20个随机分布的旋转立方体
- 🌫️ 大气雾效
- 💡 方向光和环境光
- 🏠 大型地面平面

享受您的3D第一视角体验！

## 📚 开发文档

- [发布指南](./RELEASE.md) - 详细的版本发布流程
- [GitHub Actions 工作流](./.github/workflows/README.md) - CI/CD 配置说明

## 🚀 快速发布

```bash
# 发布前检查
npm run pre-release

# 发布补丁版本（bug修复）
npm run release:patch

# 发布次版本（新功能）
npm run release:minor

# 发布主版本（破坏性更改）
npm run release:major
```
