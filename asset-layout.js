/*
  游戏图片位置和大小配置。

  修改这里的数值，保存文件，然后刷新 index.html 就能生效。
  按 D 可以打开调试模式，画面上会显示每张图片的边框和关键锚点。

  坐标基于游戏画布：默认 1280 x 720。
  x 越大越靠右，y 越大越靠下。

  对大多数图片：
    x, y  = 图片左上角位置
    width = 图片显示宽度
    height 可以不写；不写时会按 PNG 原始比例自动算高度

  odorPacket 会沿管子移动，所以这里只需要调 width。
  labelBubble 同时控制 A_bubble.png、B_bubble.png、question_bubble.png 的位置大小。
*/
window.ABA_ASSET_LAYOUT = {
  // 顶部 UI 小图标大小，不影响 canvas 里的游戏图片。
  uiIcons: {
    // reward/puff 等统计栏小图标。
    stat: { width: 22, height: 22 },

    // HP 旁边的心形图标。
    hp: { width: 26, height: 26 }
  },

  // 游戏判定和动态绘制用的关键锚点。
  // 如果只是移动 PNG 图片，通常先改 artLayout；如果判定点也要跟着移动，再改这里。
  rig: {
    // 气味管线的起点 x。气味包从这里开始运动。
    tubeStartX: 130,

    // 气味管线的终点 x。调试模式里会画出管线。
    tubeEndX: 1080,

    // 气味管线中心线的 y 坐标。
    tubeY: 323,

    // 没有 transparentTube 图片时，备用管道的高度。
    tubeHeight: 50,

    // 没有 mouse_body 图片时，备用手绘老鼠的中心点 x/y。
    mouseX: 640,
    mouseY: 405,

    // 老鼠鼻子的判定点。气味移动到这里时，正好是最佳嗅闻时间。
    noseX: 604,
    noseY: 326,

    // 老鼠嘴巴位置。备用舌头动画会从这里出发。
    mouthX: 665,
    mouthY: 500,

    // 水管/水滴的功能锚点。备用水管和舌头目标会参考这里。
    waterTubeX: 554,
    waterTubeY: 390
  },

  // 每张 canvas 图片的显示位置和大小。
  artLayout: {
    // 实验室背景图。
    backgroundLab: { x: 155, y: 54, width: 970 },

    // 老鼠脚下的平台。
    platform: { x: 310, y: 415, width: 620 },

    // 横向透明气味管。
    transparentTube: { x: 70, y: 290, width: 1200 },

    // 老鼠身体主体。
    mouseBody: { x: 440, y: 138, width: 350 },

    // 睁眼图层，叠在 mouseBody 上。
    mouseEyesOpen: { x: 540, y: 226, width: 145 },

    // 闭眼图层，按 C 且延迟结束后会替换睁眼图层。
    mouseEyesClosed: { x: 545, y: 230, width: 140 },

    // 静止舌头/嘴部图层。
    tongueIdle: { x: 573, y: 342, width: 84 },

    // 舔水时显示的伸出舌头图层。
    tongueExtended: { x: 559, y: 342, width: 100 },

    // 气味包大小。位置由 tubeStartX/tubeEndX/tubeY 和运动时间决定。
    odorPacket: { width: 80 },

    // 水滴/水嘴图。奖励激活时会变亮，未激活时半透明。
    waterDrop: { x: 510, y: 315, width: 96 },

    // 气吹粒子图。游戏里会镜像，并在气吹时向老鼠方向推进。
    airPuffParticles: { x: 555, y: 252, width: 90 },

    // 嗅闻后显示 A/B/? 气泡的位置和大小。
    labelBubble: { x: 400, y: 112, width: 140 }
  }
};
