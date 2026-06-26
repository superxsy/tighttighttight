# Mouse Odor Challenge

一个可直接上传到 itch.io 的浏览器小游戏。玩家控制小鼠在连续气味流中嗅闻、舔水奖励、闭眼躲避气吹惩罚。

## 项目结构

- `index.html`: 游戏页面、Canvas 绘制、输入、音频和主循环逻辑。
- `game-config.js`: 玩法参数，例如气味速度、判定窗口、HP、音量。
- `asset-layout.js`: 图片摆放、判定点和 UI 图标尺寸。
- `assets/`: PNG 素材和 WAV 音频。
- `mouse-odor-challenge-itch.zip`: itch.io 上传包。

## 本地运行

这个项目没有构建步骤，直接打开 `index.html` 就能玩。

也可以用本地静态服务器测试：

```bash
python -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/index.html`。

## itch.io 上传

上传 `mouse-odor-challenge-itch.zip`。压缩包内需要包含：

- `index.html`
- `game-config.js`
- `asset-layout.js`
- `assets/`

修改代码或素材后，重新生成这个 zip 再上传。

## 性能优化说明

手机长时间游玩发热和变卡的主要原因推断：

- 每次播放音效都会 `cloneNode()` 新建一个 `Audio` 对象，移动端长时间游玩会频繁创建、解码和等待回收音频对象。
- 游戏未开始、结束或页面隐藏时仍按高频率持续绘制和同步 UI。
- 主循环每帧都无条件写入多个 DOM 文本和样式，即使数值没有变化。
- 移动端使用完整 1280 x 720 内部画布持续绘制，像素和图像缩放开销偏高。

已修复：

- 音效改为复用已加载的 `Audio` 对象，不再每次播放都克隆。
- 触摸设备默认使用 `mobileRenderScale: 0.75`，内部画布约为 960 x 540。
- 触摸设备默认限制到 30fps，桌面保留 60fps，空闲/结束状态降到 5fps。
- 背景层缓存到离屏画布，减少每帧重复绘制。
- UI 文本和样式只在值变化时更新。
- 页面隐藏时停止调度动画帧并暂停背景音乐，恢复后平移游戏计时，避免后台继续消耗。

## 调参入口

优先修改 `game-config.js`：

- `odorTravelTimeMs`: 气味移动到鼻子的时间。
- `sniffWindowMs`: 嗅闻成功窗口。
- `waterDurationMs`: 水奖励窗口。
- `airPuffDurationMs`: 气吹惩罚窗口。
- `mobileRenderScale`: 手机内部渲染比例。
- `mobileFrameRate`: 手机帧率上限。
- `idleFrameRate`: 未运行时帧率。

调整素材位置时修改 `asset-layout.js`。

## 验证

已完成的本地验证：

- Node 语法检查：内联脚本解析通过。
- 浏览器运行检查：本地静态服务器打开页面，点击开始并运行数秒，游戏状态正常变化。
- 控制台检查：无 error/warning 日志。
- 截图检查：页面渲染输出非空。
