# CHANGELOG

## 0.1.0 `2022-05-09`

### Features

- 新增`file-icon`图标，优化部分图标路径

## 0.0.7 `2022-02-25`

### Bug Fixes

- 修复按需引入方式使用部分图标，由于`fillOpacity`, `fillRule`, `clipRule`属性加载异常导致的问题

## 0.0.6 `2022-01-18`

### Bug Fixes

- 修复 SSR 渲染问题
- 修复 `medium` size 渲染错误问题

## 0.0.5 `2022-01-10`

### Bug Fixes

- 修复 props 变化没有重新渲染 icon 的错误
- 移除重复添加的 class

## 0.0.4 `2021-12-21`

### Bug Fixes

- 支持 es-check es5

## 0.0.3 `2021-12-14`

### Bug Fixes

- Iconfont 默认 `size` 调整为 `undefined`，由 1em 控制当前图标大小，更满足大部分通用场景
