# GitHub Actions 工作流

本项目使用双工作流设计，将日常代码检查和版本发布分离管理。

## 📋 工作流概览

### 🔍 CI 工作流 (`ci.yml`)
**用途**: 日常代码质量检查  
**触发条件**: 
- 推送到 `main`/`master` 分支
- 创建 Pull Request

**执行内容**:
- ESLint 代码风格检查
- TypeScript 类型检查
- 前端项目构建验证
- Rust 代码格式和 Clippy 检查
- Tauri 应用构建测试（不打包）

### 🚀 Release 工作流 (`release.yml`)
**用途**: 版本发布和跨平台构建  
**触发条件**: 
- 推送版本标签 (格式: `v*.*.*`)

**执行内容**:
- 发布前的代码检查
- 跨平台 Tauri 应用构建 (Windows, macOS, Linux)
- 自动创建 GitHub Release
- 上传构建产物

## 🛠️ 使用方法

### 日常开发流程
```bash
# 正常开发和推送
git add .
git commit -m "feat: 添加新功能"
git push origin main

# CI 工作流会自动运行代码检查
```

### 版本发布流程
```bash
# 1. 确保代码已合并到主分支
git checkout main
git pull origin main

# 2. 创建版本标签
git tag v1.0.0

# 3. 推送标签触发发布
git push origin v1.0.0

# Release 工作流会自动运行构建和发布
```

## 🏷️ 版本标签规范

### ✅ 正确格式
- `v1.0.0` - 正式版本
- `v2.1.3` - 正式版本
- `v1.0.0-alpha.1` - 内测版本
- `v1.0.0-beta` - 测试版本
- `v1.0.0-rc.1` - 候选版本

### ❌ 错误格式
- `1.0.0` - 缺少 'v' 前缀
- `version-1.0` - 格式不正确
- `v1.0` - 缺少补丁版本号

## 📦 构建产物

发布成功后，可以在 GitHub Releases 页面下载：

| 平台 | 文件类型 | 说明 |
|------|----------|------|
| **Windows** | `.msi` | Windows 安装包（推荐） |
| **Windows** | `.exe` | 可执行文件 |
| **macOS** | `.dmg` | 磁盘镜像（通用版本） |
| **Linux** | `.AppImage` | 便携版，无需安装 |
| **Linux** | `.deb` | Debian/Ubuntu 安装包 |

## 🔧 工作流配置

### CI 工作流特性
- ⚡ 快速检查：只运行必要的代码质量检查
- 🔄 并行执行：多个检查步骤同时运行
- 📝 清晰反馈：提供详细的检查结果

### Release 工作流特性
- 🛡️ 多重验证：发布前进行完整检查
- 🌍 跨平台构建：支持主流操作系统
- 📋 智能检测：自动识别预发布版本
- 📄 详细说明：自动生成发布说明

## 🚨 故障排除

### CI 检查失败
1. **ESLint 错误**：检查代码风格问题
   ```bash
   npm run lint -- --fix  # 自动修复
   ```

2. **TypeScript 错误**：检查类型错误
   ```bash
   npm run build  # 本地构建测试
   ```

3. **Rust 格式错误**：检查 Rust 代码格式
   ```bash
   cd src-tauri && cargo fmt  # 自动格式化
   ```

4. **Clippy 警告**：检查 Rust 代码质量
   ```bash
   cd src-tauri && cargo clippy --fix  # 自动修复部分问题
   ```

5. **Tauri 构建错误**：检查前后端集成
   ```bash
   npm run tauri build -- --debug  # 本地测试构建
   ```

### Release 发布失败
1. **标签格式错误**：确保使用 `v*.*.*` 格式
2. **代码检查未通过**：确保代码通过 CI 检查
3. **权限问题**：确认 GITHUB_TOKEN 权限足够
4. **依赖问题**：检查 package.json 和 Cargo.toml

### 常见问题
- **构建超时**：可能是依赖下载缓慢，重新运行即可
- **平台特定错误**：查看对应平台的构建日志
- **发布被跳过**：检查标签是否正确推送

## 📈 监控和维护

### 查看工作流状态
1. 访问 GitHub 仓库的 "Actions" 页面
2. 选择对应的工作流查看详细日志
3. 关注失败的步骤和错误信息

### 定期维护
- 定期更新 Actions 版本
- 检查依赖版本兼容性
- 监控构建时间和成功率

---

💡 **提示**: 建议在发布前先在本地运行 `npm run lint` 和 `npm run build` 确保代码无误。 