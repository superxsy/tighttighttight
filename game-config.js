/*
  游戏玩法参数配置。

  修改这里的数值，保存文件，然后刷新 index.html 就能生效。
  时间单位都是毫秒：1000 毫秒 = 1 秒。
  一般来说，时间数值越大，动作越慢，或者判定窗口越宽松。
*/
window.ABA_GAME_CONFIG = {
  // 画布逻辑尺寸。通常保持 1280 x 720；如果改这里，asset-layout.js 里的坐标也要一起按比例调整。
  canvasWidth: 1280,
  canvasHeight: 720,

  // 气味从管子左侧移动到老鼠鼻子的时间。越大，气味移动越慢；越小，移动越快。
  odorTravelTimeMs: 500,

  // 上一个气味结束后，到下一个气味开始前的间隔。越大，节奏越慢。
  interOdorIntervalMs: 500,

  // 嗅闻成功窗口的一半宽度。当前逻辑是鼻子到达时间前后各 sniffWindowMs 都算成功。
  // 例如 300 表示：到达前 300ms 到到达后 300ms 内按 Space 都成功。
  sniffWindowMs: 50,

  // 嗅闻成功或失败后，A/B/? 提示和效果停留多久，然后再进入奖励/惩罚判断。
  odorFeedbackMs: 500,

  // 按 Start 后，第一股气味出现前的等待时间。
  streamStartDelayMs: 500,

  // 嗅闻反馈结束后，到水奖励或气吹惩罚真正开始前的等待时间。
  outcomeDelayMs: 500,

  // 可能出现的气味种类。现在是 A/B；如果以后想加 C，可以写成 ["A", "B", "C"]。
  odorSet: ["A", "B"],

  // 顶部历史记录显示几个最近结果，同时也影响 debug 里保留的 true odor history 长度。
  visibleHistoryLength: 6,

  // 水奖励可用的持续时间。L 舔舌动作和这个窗口重叠越多，奖励越完整。
  waterDurationMs: 100,

  // 按下 L 后，舌头真正伸出的延迟。越大，玩家需要更早按 L。
  lickLatencyMs: 20,

  // 舌头伸出并保持可判定的时间。越大，越容易和水奖励窗口重叠。
  lickDwellMs: 200,

  // 一次完整吃到水奖励时增加的 HP。实际增加量会按重叠比例缩放。
  fullRewardHpGain: 10,

  // 气吹惩罚持续时间。默认 100ms；用 300ms 闭眼窗口去预判覆盖它。
  airPuffDurationMs: 100,

  // 按下 C 后，眼睛真正闭上的延迟。越大，玩家需要更早按 C。
  eyeCloseLatencyMs: 20,

  // 每次按 C 后，真正闭眼持续多久。现在固定为 300ms，松开 C 不会提前结束。
  eyeCloseDurationMs: 300,

  // 完全没有闭眼避开气吹时扣除的 HP。实际伤害会按未避开比例缩放。
  fullPuffDamage: 15,

  // 初始 HP。
  startingHp: 50,

  // HP 上限。
  maxHp: 100,

  // 是否启用游戏音频。浏览器需要玩家先点击或按键后才会真正播放。
  audioEnabled: true,

  // 背景音乐音量，范围建议 0 到 1。
  bgmVolume: 0.16,

  // 操作、奖励、惩罚等音效音量，范围建议 0 到 1。
  sfxVolume: 0.55,

  // Mobile performance tuning. Lower values reduce heat and battery use.
  mobileRenderScale: 0.75,
  mobileFrameRate: 30,
  desktopFrameRate: 60,
  idleFrameRate: 5
};

/*
  预留关卡参数覆盖结构。

  当前游戏只启用 default，不显示关卡选择 UI。
  以后做关卡模式时，在这里新增关卡，并且只写和 ABA_GAME_CONFIG 不同的参数。

  运行时合并顺序：
    index.html 内置默认值 -> ABA_GAME_CONFIG -> 当前关卡 config

  示例：
    easy: {
      label: "Easy",
      config: {
        odorTravelTimeMs: 900,
        sniffWindowMs: 120
      }
    }
*/
window.ABA_GAME_LEVELS = {
  default: {
    label: "Default tuning",
    config: {}
  }
};
