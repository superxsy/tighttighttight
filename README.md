# Mouse Odor Challenge

一个可直接上传到 itch.io 的浏览器小游戏。玩家控制小鼠在连续气味流中嗅闻、舔水奖励、闭眼躲避气吹惩罚。

## 项目结构

- `index.html`: 游戏页面、Canvas 绘制、输入、音频和主循环逻辑。
- `game-config.js`: 玩法参数，例如气味速度、判定窗口、HP、音量、淡出时间和移动端性能参数。
- `asset-layout.js`: 图片摆放、判定点和 UI 图标尺寸。
- `assets/`: PNG 素材和音频资源。
- `assets/audio/bgm.m4a`: 背景音乐。
- `assets/audio/*.wav`: 短音效。
- `assets/audio/LICENSE_KENNEY_UI_AUDIO.txt`: Kenney UI Audio 的 CC0 许可证文本。
- `mouse-odor-challenge-itch.zip`: itch.io 上传包。

## 本地运行

这个项目没有构建步骤，可以直接打开 `index.html`。

也可以用本地静态服务器测试：

```bash
python -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/index.html`。

## 操作

- 桌面端：`Space` 开始/嗅闻，`L` 舔水，`C` 闭眼，`D` 调试布局。
- 手机端：使用底部三个触控按钮。
- Game Over 时：按 `Space` 或点击画布可重置；手机端直接点屏幕也可重置。
- `Sound On/Off` 会整体静音/恢复。
- `BGM` 和 `SFX` 滑杆可分别调节背景音乐和音效音量。
- `Lag` 滑杆用于把玩法节拍相对 BGM 起点前后微调，单位为 ms。

背景音乐在首次用户操作后开始循环，并在重置和 Game Over 后继续播放；页面切到后台时暂停，切回前台后恢复。

## 节奏模式

游戏按 `rhythmBeatMs` 控制理想按键节奏，当前默认 `k = 900ms`：

```text
Space -> 900ms -> L/C -> 900ms -> Space -> 900ms -> L/C ...
```

按 `Start` 或第一次按 `Space` 后，游戏不会立即进入第一下嗅闻，而是把第一下理想 Space 嗅闻点锁到：

```text
BGM 起点 t0 + n * rhythmBeatMs + rhythmLagMs
```

其中 `n` 为整数，`rhythmLagMs` 可在界面上用 `Lag` 滑杆调节。`rhythmBeatMs` 在 `game-config.js` 中配置。

节奏模式现在是自动派生模式：只需要改 `rhythmBeatMs`。程序会在运行时自动计算：

- `outcomeDelayMs`
- `interOdorIntervalMs`

当前 900ms 节奏派生结果：

- `odorFeedbackMs + outcomeDelayMs - lickLatencyMs = 500 + 400 - 0 = 900`
- `odorFeedbackMs + outcomeDelayMs - eyeCloseLatencyMs = 500 + 400 - 0 = 900`
- `lickLatencyMs + waterDurationMs + interOdorIntervalMs + odorTravelTimeMs = 0 + 100 + 300 + 500 = 900`
- `eyeCloseLatencyMs + airPuffDurationMs + interOdorIntervalMs + odorTravelTimeMs = 0 + 100 + 300 + 500 = 900`

所以完美节奏是：在气味到鼻子时按 Space，900ms 后按 L 或 C，900ms 后按下一次 Space。

节拍时间线在游戏开始时锁定。后续每个 odor 的嗅闻点都按固定 BGM 网格推进，不会因为上一下 Space 按得早/晚、嗅闻 miss、嗅闻 hit 或奖励/惩罚结果而改变。

`rhythmBeatMs` 有最小值。当前最小值是 600ms：

```text
max(
  odorFeedbackMs - actionLatencyMs,
  actionLatencyMs + outcomeDurationMs + odorTravelTimeMs
)
= max(500 - 0, 0 + 100 + 500)
= 600ms
```

如果 `rhythmBeatMs` 设置得低于这个最小值，程序会自动使用最小值，避免出现负数等待时间。

## 统计口径

顶部只保留三项统计：

- `Odor`: 已出现的气味总数。
- `Rewards`: 成功舔到水的次数 / 出现水奖励的总次数。
- `Puffs`: 成功避开气吹的次数 / 出现气吹的总次数。

## itch.io 上传

上传 `mouse-odor-challenge-itch.zip`。压缩包内需要包含：

- `index.html`
- `game-config.js`
- `asset-layout.js`
- `assets/`

修改代码或素材后，重新生成这个 zip 再上传。

## 调参入口

优先修改 `game-config.js`：

- `odorTravelTimeMs`: 气味移动到鼻子的时间。
- `sniffWindowMs`: 嗅闻成功窗口。
- `waterDurationMs`: 水奖励窗口。
- `airPuffDurationMs`: 气吹惩罚窗口。
- `rhythmBeatMs`: 节奏间隔 k，默认 900ms；只需要调这个值来改变整体节奏。
- `rhythmLagMs`: BGM 网格偏移，默认 0ms，界面上也可以调。
- `outcomeDelayMs`: 节奏模式下自动派生，保持 `null`。
- `interOdorIntervalMs`: 节奏模式下自动派生，保持 `null`。
- `effectFadeMs`: 给水或气吹结束后的视觉淡出时间。
- `bgmVolume`: 背景音乐默认音量。
- `sfxVolume`: 音效默认音量。
- `mobileRenderScale`: 手机内部渲染比例。
- `mobileFrameRate`: 手机帧率上限。
- `idleFrameRate`: 未运行时帧率。

调整素材位置时修改 `asset-layout.js`。

## 音频来源

- BGM 使用本项目的 `assets/audio/bgm.m4a`。
- 短音效替换为 Kenney UI Audio 的 WAV 文件，许可证为 CC0，可用于个人和商业项目，署名非强制。
- 来源页：[Kenney UI Audio](https://kenney.nl/assets/ui-audio)
- WAV 转换镜像：[Calinou/kenney-ui-audio](https://github.com/Calinou/kenney-ui-audio)

如果后续想换成更拟真的水声、气吹声，可以优先找 CC0 或明确允许商用/再分发的素材。可选站点：

- [Kenney Assets](https://kenney.nl/assets)
- [OpenGameArt CC0 audio](https://opengameart.org/)
- [Pixabay Sound Effects](https://pixabay.com/sound-effects/)

替换时保持文件名不变即可，例如替换 `assets/audio/air_puff.wav`。

## 性能优化说明

手机长时间游玩发热和变卡的主要原因推断：

- 频繁创建短生命周期音频对象会增加移动端解码和回收压力。
- 游戏未开始、结束或页面隐藏时仍按高频率持续绘制和同步 UI。
- 主循环每帧无条件写入 DOM 文本和样式。
- 移动端使用完整 1280 x 720 内部画布持续绘制，像素和图像缩放开销偏高。

已修复：

- 音效复用已加载的 `Audio` 对象。
- 触摸设备默认使用 `mobileRenderScale: 0.75`，内部画布约为 960 x 540。
- 触摸设备默认限制到 30fps，桌面保留 60fps，空闲/结束状态降到 5fps。
- 背景层缓存到离屏画布，减少每帧重复绘制。
- UI 文本和样式只在值变化时更新。
- 页面隐藏时停止调度动画帧并暂停背景音乐，恢复后平移游戏计时。

## 验证

建议每次改动后验证：

- Node 语法检查：内联脚本能被解析。
- 本地静态服务器打开页面，无控制台 error/warning。
- 桌面端键盘操作正常。
- 手机端触控按钮、Game Over 点击重置、BGM/SFX 音量滑杆正常。
- 更新 `mouse-odor-challenge-itch.zip` 后再上传 itch.io。
