#!/usr/bin/env node

/**
 * 版本同步脚本
 * 将 package.json 中的版本号同步到 src-tauri/tauri.conf.json
 */

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const currentModuleUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentModuleUrl);
const __dirname = path.dirname(currentFilePath);


// 文件路径
const packageJsonPath = path.join(__dirname, '../package.json');
const tauriConfigPath = path.join(__dirname, '../src-tauri/tauri.conf.json');

try {
  // 读取 package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  console.log(`📦 当前版本: ${version}`);

  // 读取 tauri.conf.json
  const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf8'));
  const oldVersion = tauriConfig.version;

  // 更新版本号
  tauriConfig.version = version;

  // 写回文件
  fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2) + '\n');

  console.log(`✅ 版本同步完成: ${oldVersion} → ${version}`);
  console.log(`📁 已更新: src-tauri/tauri.conf.json`);

} catch (error) {
  console.error('❌ 版本同步失败:', error.message);
  process.exit(1);
} 