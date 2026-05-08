const screens = {
  start: document.getElementById("screen-start"),
  chat: document.getElementById("screen-chat"),
  quiz: document.getElementById("screen-quiz"),
  card: document.getElementById("screen-card"),
  result: document.getElementById("screen-result"),
  poster: document.getElementById("screen-poster"),
  end: document.getElementById("screen-end")
};

const chatQuestions = [
  { q: "嗨，不用紧张。我是你的人生观察者。你平时更爱独处，还是更爱热闹？", options: [{ text: "更爱独处（安静想自己的事）", value: "alone" }, { text: "更爱热闹（和人相处更放松）", value: "social" }] },
  { q: "遇到纠结的事，你会先想清楚，还是先动手试试？", options: [{ text: "先想清楚（怕出错，想透再做）", value: "think" }, { text: "先动手（边做边调整，不纠结）", value: "act" }] },
  { q: "你会相信自己的第一直觉吗？", options: [{ text: "偶尔信，但会被理性推翻", value: "maybe" }, { text: "很相信，直觉很少出错", value: "trust" }] }
];

const quizQuestions = [
  { q: "当别人说你「幼稚」「不合群」，你会？", options: { A: "有点自我怀疑，想试着迎合", B: "不在乎，懂我的人自然懂", C: "偶尔纠结，还是坚持自己", D: "反驳他们，证明自己不幼稚" } },
  { q: "社交结束后，你通常会？", options: { A: "很累，需要独处回血", B: "正常恢复，无明显影响", C: "越聊越开心，能量满满", D: "无所谓，不受影响" } },
  { q: "你更愿意把心事说给？", options: { A: "自己消化，很少说", B: "信任的1-2个人", C: "愿意倾听的人都可以", D: "写下来，不直接说" } },
  { q: "你对「圈子」的态度是？", options: { A: "不混圈子，舒服最重要", B: "随缘，不主动不拒绝", C: "会经营，维护有用人脉", D: "讨厌圈子，尽量远离" } },
  { q: "面对机会，你最常出现的状态是？", options: { A: "想太多，犹豫错过", B: "果断下手，错了也认", C: "靠直觉判断，对就冲", D: "观望别人，再做决定" } },
  { q: "计划被突然打乱，你会？", options: { A: "烦躁，难以接受", B: "淡定，随机应变", C: "焦虑，赶紧补救", D: "无所谓，重新来" } },
  { q: "你做选择更依赖？", options: { A: "理性分析利弊", B: "内心直觉与感觉", C: "身边人的建议", D: "过往经验习惯" } },
  { q: "事情卡住无法推进时，你会？", options: { A: "反复琢磨，硬想通", B: "先放一放，换思路", C: "找人商量求答案", D: "直接放弃，换目标" } },
  { q: "你内耗最多来自？", options: { A: "想太多、自我怀疑", B: "怕辜负别人期待", C: "目标压力太大", D: "很少内耗" } },
  { q: "不开心时，你会怎么处理？", options: { A: "闷着，自己消化", B: "转移注意力，慢慢自愈", C: "找信任的人倾诉", D: "立刻行动，打断情绪" } },
  { q: "你最容易被什么影响？", options: { A: "别人的评价", B: "环境氛围", C: "未来的不确定性", D: "几乎不被影响" } },
  { q: "压力大时，你更像？", options: { A: "越压越静，默默扛", B: "越压越乱，容易崩", C: "越压越强，逼自己冲", D: "无所谓，直接躺平" } },
  { q: "你更看重？", options: { A: "内心安宁", B: "成功与成就", C: "人际关系温暖", D: "自由不被束缚" } },
  { q: "你认为人生应该？", options: { A: "稳一点，慢慢来", B: "拼一点，不留遗憾", C: "顺一点，别太累", D: "真一点，不虚伪" } },
  { q: "你对名利的态度是？", options: { A: "不执着，够用就好", B: "很重要，证明自己", C: "顺其自然，有最好", D: "不追求，甚至反感" } },
  { q: "你最想活成的样子是？", options: { A: "清醒通透，不被定义", B: "温柔强大，有人依靠", C: "自由随性，无拘无束", D: "踏实靠谱，有所成就" } }
];

const cardData = [
  { name: "清欢", color: "#e2eeff", tip: "你向往安稳通透的生活，观察者观测：你的人生底色是从容。" },
  { name: "逐光", color: "#fff5d9", tip: "你内心有热爱，渴望顺势成长，观察者观测：你的人生趋势是向上。" },
  { name: "归心", color: "#e4f7e7", tip: "你重视本心，不随波逐流，观察者观测：你的人生内核是清醒。" }
];

// ======================= 已升级：12人格 超级丰富完整版 =======================
const templates = {
  qingxing: {
    name: "清醒内耗者",
    intro: "你拥有极高的悟性与洞察力，能轻易看透事物本质，却总因过度思考陷入自我拉扯。清醒是你的天赋，内耗是你的功课，你是最懂道理却最难放过自己的人。",
    modules: [
      ["核心气质｜清醒又敏感的观察者", "你习惯站在旁观者视角审视自己与世界，心思细腻、感知力极强，能捕捉到别人忽略的细节，却也因此更容易感到疲惫与孤独。"],
      ["性格优势｜直觉精准、深度思考", "你的直觉很少出错，分析问题一针见血，学习能力与领悟力远超常人，擅长复盘、总结、自我提升，是天生的思考者。"],
      ["行为模式｜想得多、做得慢", "你做决定前会反复权衡，害怕失误、害怕遗憾，看似犹豫，实则是对自己负责。你不喜欢仓促行动，更偏爱深思熟虑。"],
      ["人生趋势｜早年沉淀，中年爆发", "年轻时容易迷茫、内耗、反复试错，但每一次痛苦都会转化为成长。中年后心态逐渐平稳，能力全面爆发，越活越通透、越稳越顺。"],
      ["情感模式｜慢热、专一、精神至上", "你很难真正信任一个人，但一旦交付真心便无比专一。你追求灵魂共鸣，讨厌敷衍、虚伪与消耗性关系。"],
      ["最容易陷入的困境", "过度自我批判、在意他人评价、否定直觉、懂而不做，常常把简单的事情复杂化。"],
      ["观察者专属建议", "停止精神内耗，相信你的直觉，不必迎合所有人，允许自己不完美。你的人生不需要向别人证明，只需要对自己负责。"]
    ]
  },
  wusuowei: {
    name: "通透佛系人",
    intro: "你不是消极摆烂，而是历经世事后的从容与通透。不攀比、不焦虑、不强求，凡事顺其自然，内心稳定而有力量，活得松弛、自在、有底气。",
    modules: [
      ["核心气质｜淡然从容、情绪稳定", "你拥有极强的情绪自愈力，很少大喜大悲，面对得失都能保持平和。外在随和，内心清醒，知世故而不世故。"],
      ["性格优势｜心态极好、洞察力强", "你看得透人性，却不愿计较；懂世间复杂，却选择简单。你不钻牛角尖，不纠缠烂人烂事，活得通透又洒脱。"],
      ["行为模式｜随缘而行、舒适至上", "你不喜欢强迫自己，也不喜欢勉强别人，做事顺应本心，不焦虑、不内耗、不慌张，按自己的节奏慢慢走。"],
      ["人生趋势｜平稳顺遂、福气自来", "你的人生没有大起大落，整体安稳平顺。心态越松弛，运气越好，贵人与机会常在不经意间出现，越活越轻松。"],
      ["情感模式｜温和包容、细水长流", "你在感情里不粘人、不控制、不索取，重视舒服与尊重，喜欢细水长流的陪伴，讨厌激烈纠缠与情绪拉扯。"],
      ["最容易陷入的困境", "过于佛系、不懂争取、习惯退让，有时会错过本该属于自己的机会。"],
      ["观察者专属建议", "保持通透，但不必事事妥协。该争取时勇敢一点，该拒绝时果断一点，你的温柔要带点锋芒。"]
    ]
  },
  renjian: {
    name: "人间清醒派",
    intro: "你理性务实、目标清晰，不被情绪绑架，不被虚无所惑。做事有规划、有执行力，活得清醒、独立、有力量，是能把人生牢牢握在手里的人。",
    modules: [
      ["核心气质｜理性果断、目标导向", "你逻辑清晰、判断力强，做决定干脆利落，不拖泥带水。你清楚自己想要什么，并愿意为之付出实际行动。"],
      ["性格优势｜执行力强、靠谱稳重", "你说到做到，抗压能力强，遇到问题第一反应是解决而不是抱怨。你是身边人最信任、最愿意依靠的对象。"],
      ["行为模式｜规划先行、稳步推进", "你喜欢提前布局，不喜欢临时抱佛脚。做事有条理、有节奏，一步一个脚印，稳中求进，稳中有升。"],
      ["人生趋势｜稳步上升、中年大成", "你靠实力与积累取胜，年轻时踏实耕耘，中年后全面收获，事业、生活都会进入上升通道，越走越顺。"],
      ["情感模式｜踏实专一、责任至上", "你在感情里不擅长甜言蜜语，却能用行动给足安全感。你重视承诺与责任，一旦选择便长久稳定。"],
      ["最容易陷入的困境", "过于理性、忽略情绪、习惯硬扛、不懂放松，容易让自己压力过载。"],
      ["观察者专属建议", "适当放松，允许自己柔软，不必事事逞强。人生不是赛跑，偶尔停下来也是一种智慧。"]
    ]
  },
  wenrou: {
    name: "温柔共情者",
    intro: "你心思细腻、共情力极强，总能轻易感知别人的情绪，习惯性照顾他人、包容他人。你温柔、善良、治愈，是身边人的小太阳，也是最让人心疼的懂事者。",
    modules: [
      ["核心气质｜柔软善良、共情力拉满", "你天生擅长换位思考，能读懂别人的欲言又止，对情绪极其敏感，自带治愈与安抚气场。"],
      ["性格优势｜真诚温暖、人缘极佳", "你待人真心、没有心机，懂得尊重与体谅，让人相处起来非常舒服。你自带贵人体质，容易被人善待与帮助。"],
      ["行为模式｜习惯付出、害怕麻烦别人", "你总是优先考虑别人的感受，常常委屈自己成全他人。不喜欢冲突，不喜欢争吵，习惯默默包容。"],
      ["人生趋势｜贵人相助、安稳幸福", "你的善良会成为你的福报，一生贵人不断。早年敏感细腻，中年后越来越从容，晚年安稳温暖。"],
      ["情感模式｜专一深情、缺乏安全感", "你在感情里极度真诚，愿意全心付出，却容易缺乏安全感，渴望偏爱、理解与长久的陪伴。"],
      ["最容易陷入的困境", "过度付出、敏感内耗、不懂拒绝、容易被人消耗。"],
      ["观察者专属建议", "先爱自己，再爱别人；学会拒绝，建立边界。你的温柔很珍贵，要留给值得的人。"]
    ]
  },
  duli: {
    name: "独立观察者",
    intro: "你冷静疏离、清醒独立，习惯站在人群之外观察世界，不盲从、不迎合、不解释。你有自己的世界与规则，活得清醒、自由、不被定义。",
    modules: [
      ["核心气质｜冷静客观、边界感极强", "你不喜欢热闹，不擅长社交，不爱合群，更偏爱独处。你看透不说透，懂人情却不沉迷人情。"],
      ["性格优势｜判断力强、不被情绪左右", "你看问题客观理性，不容易被带节奏，能在混乱中保持清醒。你有主见、有思想，不随波逐流。"],
      ["行为模式｜独处蓄力、靠自己前行", "你凡事习惯自己解决，不依赖、不索取、不期待。你在安静中积蓄力量，默默成长，悄悄变强。"],
      ["人生趋势｜低调逆袭、越老越有智慧", "你不喜欢张扬，却能靠自己走出一条稳路。人生越往后，智慧越深、底气越足，活得从容又高级。"],
      ["情感模式｜慢热疏离、精神共鸣至上", "你很难对人敞开心扉，却极度渴望灵魂契合。你宁缺毋滥，只与同频、懂你的人同行。"],
      ["最容易陷入的困境", "过于冷淡、不愿示弱、习惯硬扛，让人觉得难以接近。"],
      ["观察者专属建议", "适度敞开内心，允许自己依赖别人。你不必事事都一个人扛，温柔与独立可以同时存在。"]
    ]
  },
  ziyou: {
    name: "自由随性家",
    intro: "你讨厌束缚、拒绝套路，热爱自由、忠于自我。你不按常理出牌，不被规则定义，人生主打一个真实、自在、随心而行。",
    modules: [
      ["核心气质｜洒脱率真、反套路、爱自由", "你最害怕被控制、被定义、被安排。你只忠于自己的感受，活得真实、鲜活、不虚伪。"],
      ["性格优势｜创造力强、感染力独特", "你思维活跃、想法新颖，不墨守成规，自带独特魅力。你敢做自己，容易成为人群中特别的存在。"],
      ["行为模式｜随心而行、讨厌计划", "你喜欢跟着感觉走，不喜欢被计划束缚。做事凭热爱、凭直觉，舒服自在比什么都重要。"],
      ["人生趋势｜起伏有趣、活成自己", "你的人生不会平淡无趣，充满惊喜与可能。虽然不按常规路线走，却能活成独一无二、令人羡慕的样子。"],
      ["情感模式｜需要空间、讨厌束缚", "你在感情里重视自由与尊重，不喜欢粘人、控制与占有。舒服、轻松、不压抑，才是你想要的关系。"],
      ["最容易陷入的困境", "冲动随性、缺乏耐心、三分钟热度、偶尔错过长期机会。"],
      ["观察者专属建议", "保留自由与热爱，适度规划长期目标。你可以随性，但不必盲目；可以自由，但也要有方向。"]
    ]
  },
  tashu: {
    name: "踏实行动派",
    intro: "你稳重靠谱、少说多做，用行动证明自己，用努力换取生活。你不浮躁、不投机、不抱怨，一步一个脚印，活得踏实、安心、有底气。",
    modules: [
      ["核心气质｜稳重务实、耐力极强", "你性格沉稳、做事踏实，不喜欢空话、大话、表面功夫。你相信努力的意义，愿意长期坚持一件事。"],
      ["性格优势｜靠谱可信、抗压持久", "你让人放心、让人依靠，承诺了就一定会做到。遇到困难不逃避，越压越稳，越走越坚定。"],
      ["行为模式｜脚踏实地、稳步积累", "你做事不急不躁，专注过程，耐心等待结果。你不追求一夜成名，只追求长期安稳与收获。"],
      ["人生趋势｜稳扎稳打、中年丰收", "你的人生越往后越厚实，早年积累，中年丰收，晚年安稳无忧。靠自己打下的江山，最踏实、最长久。"],
      ["情感模式｜长情专一、用陪伴告白", "你在感情里不善表达，却会用行动守护对方。你忠诚、稳定、有担当，是值得托付一生的人。"],
      ["最容易陷入的困境", "不懂变通、过于保守、不善表达需求，习惯默默承受。"],
      ["观察者专属建议", "适当灵活一点，大胆表达需求，学会放松自己。你值得被好好对待，不必一直硬撑。"]
    ]
  },
  minjie: {
    name: "敏感理想家",
    intro: "你内心纯粹、灵魂干净，追求真诚与美好，讨厌虚伪与套路。你敏感、柔软、有原则，即使受伤，也依然选择忠于自己、保持初心。",
    modules: [
      ["核心气质｜纯粹真诚、理想主义", "你对世界有美好的期待，追求灵魂干净、关系简单、生活真诚。你不喜欢复杂，不喜欢虚伪，不喜欢勉强。"],
      ["性格优势｜感知力强、审美高级、忠于本心", "你对美、艺术、情感有极强的感知力，有自己的原则与底线，绝不随波逐流。"],
      ["行为模式｜走心至上、拒绝敷衍", "你与人交往看真心，做事看热爱，讨厌利益交换、虚情假意与表面关系。"],
      ["人生趋势｜先苦后甜、终遇同频", "年轻时容易因真诚受伤，因理想碰壁，但坚持本心的你，最终会遇到真正懂你、珍惜你、欣赏你的人。"],
      ["情感模式｜精神契合、宁缺毋滥", "你在感情里追求灵魂共鸣，不爱则已，一爱便是真心。你不将就、不敷衍、不勉强。"],
      ["最容易陷入的困境", "玻璃心、期待过高、容易失望、过度真诚被消耗。"],
      ["观察者专属建议", "降低期待，保护好你的真诚，不必对所有人都敞开心扉。你的纯粹很珍贵，要留给懂你的人。"]
    ]
  },
  lenggan: {
    name: "冷感强者",
    intro: "你独立强硬、不爱示弱，情绪不外露、痛苦不倾诉，凡事靠自己， quietly powerful。你外表冷淡，内心强大，是能扛住一切的生活强者。",
    modules: [
      ["核心气质｜冷静克制、独立强硬", "你不喜欢暴露脆弱，不喜欢卖惨，不喜欢依赖别人。再难也自己扛，再累也不轻易说累。"],
      ["性格优势｜抗压极强、冷静决断、韧性十足", "你越是困境越冷静，越是压力越强大，绝境中也能翻盘，是天生的抗压型强者。"],
      ["行为模式｜硬扛一切、不靠他人", "你习惯自己解决问题，不麻烦别人，不期待救赎，不依赖运气，只相信自己。"],
      ["人生趋势｜靠实力登顶、越走越高", "你的人生不靠别人，全凭自己。能力越来越强，地位越来越稳，越老越强大，越走越顺。"],
      ["情感模式｜外冷内热、不善表达", "你嘴上不说，心里却很在乎；表面冷淡，行动却很真诚。你用守护代替甜言，用担当代替告白。"],
      ["最容易陷入的困境", "过于强硬、有距离感、习惯硬扛，容易让自己身心疲惫。"],
      ["观察者专属建议", "允许自己脆弱，允许别人靠近。你很强大，但也可以偶尔休息、偶尔被照顾。"]
    ]
  },
  taiyang: {
    name: "温暖小太阳",
    intro: "你积极阳光、正能量满格，走到哪里就把温暖带到哪里。你善良、开朗、治愈，自带光芒，是能照亮自己也温暖别人的小太阳。",
    modules: [
      ["核心气质｜开朗治愈、积极向上", "你天生乐观，很少抱怨，总能看到事情好的一面。你自带温暖气场，让人忍不住靠近。"],
      ["性格优势｜感染力强、人缘极好、贵人不断", "你真诚大方、不记仇、不算计，让人相处舒服。你走到哪里都受欢迎，贵人运非常旺。"],
      ["行为模式｜习惯照亮别人、传递温暖", "你喜欢帮助别人，看到别人开心自己也会开心。你习惯传递正能量，远离消极与抱怨。"],
      ["人生趋势｜温暖顺遂、小幸运不断", "你的积极会吸引美好，一生被善意包围，生活平稳幸福，惊喜不断，福气满满。"],
      ["情感模式｜真诚热烈、包容付出", "你在感情里坦率真诚，愿意付出，也懂得包容。你给足安全感，也值得被好好宠爱。"],
      ["最容易陷入的困境", "习惯性照顾别人，忽略自己，容易被负面情绪消耗。"],
      ["观察者专属建议", "先照亮自己，再温暖别人。你不必满足所有人，先照顾好自己的情绪最重要。"]
    ]
  },
  lixing: {
    name: "理性思考者",
    intro: "你逻辑至上、冷静深度，不情绪化、不盲目冲动。你靠脑子解决问题，靠分析做出选择，是清醒、理智、有深度的思想者。",
    modules: [
      ["核心气质｜冷静理性、逻辑清晰", "你做任何事都先思考、先分析，不被情绪带偏，不被感觉误导，看问题深刻、透彻、有远见。"],
      ["性格优势｜判断力强、擅长规划、解决力强", "你思路清晰，擅长抓重点、破难题，规划能力与学习能力都非常强，靠脑子就能走得很远。"],
      ["行为模式｜思考先行、逻辑驱动", "你不喜欢盲目行动，凡事讲逻辑、讲依据、讲可行性。你是用脑子生活的人，而非用情绪。"],
      ["人生趋势｜越老越值钱、稳步上升", "你的经验与智慧会逐年增值，越往后越不可替代。事业、生活都呈稳定上升趋势。"],
      ["情感模式｜精神共鸣、理性克制", "你在感情里重视沟通与逻辑，不喜欢无理取闹、情绪拉扯。你追求理性又舒服的长久关系。"],
      ["最容易陷入的困境", "过于理性、缺乏感性、显得冷漠、不懂浪漫表达。"],
      ["观察者专属建议", "适度感性一点，允许情绪存在。理性让你走得稳，感性让你活得暖。"]
    ]
  },
  suiyuan: {
    name: "随缘生活家",
    intro: "你知足常乐、松弛通透，不卷不比、不抢不争，简单幸福、烦恼极少。你拥有强大的幸福感，活得松弛、安心、自在。",
    modules: [
      ["核心气质｜知足淡然、松弛自在", "你不追求过多欲望，不被外界节奏裹挟，懂得享受当下，珍惜小美好，内心安定又满足。"],
      ["性格优势｜心态极好、内耗极低、容易幸福", "你很少焦虑，很少纠结，很少攀比。欲望简单，所以快乐；心态平和，所以顺遂。"],
      ["行为模式｜顺其自然、不强迫自己", "你不强求、不焦虑、不内耗，能接受失去，也能珍惜拥有。按自己喜欢的方式生活。"],
      ["人生趋势｜平安喜乐、安稳无忧", "你的一生平稳幸福，没有大波折，没有大压力。小确幸不断，小温暖常在，安稳度过一生。"],
      ["情感模式｜温和随缘、不折腾、不控制", "你在感情里不索取、不纠缠、不勉强，舒服自在最重要，平淡温暖最长久。"],
      ["最容易陷入的困境", "过于知足、缺乏动力、偶尔错过可以争取的机会。"],
      ["观察者专属建议", "保持松弛，但偶尔也要为喜欢的东西努力一下。幸福与争取，可以同时拥有。"]
    ]
  }
};

const state = { chatAnswers: [], quizAnswers: [], chatStep: 0, quizIndex: 0, selectedQuizOption: "", selectedCard: null, resultKey: "", nickname: "观测者旅人" };

function addRipple(btn) {
  btn.addEventListener("click", function(e) {
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left = (e.clientX - rect.left - size / 2) + "px";
    r.style.top  = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(r);
    r.addEventListener("animationend", () => r.remove());
  });
}

function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = 6 + Math.random() * 18;
    p.style.width = size + "px"; p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "vw"; p.style.bottom = -(size) + "px";
    p.style.animationDuration = (12 + Math.random() * 16) + "s";
    p.style.animationDelay = (Math.random() * 14) + "s";
    container.appendChild(p);
  }
}

function go(screenKey) {
  const current = Object.values(screens).find(s => s.classList.contains("active"));
  const next = screens[screenKey];
  if (current && current !== next) {
    current.classList.add("leaving");
    setTimeout(() => { current.classList.remove("active","leaving"); }, 260);
    setTimeout(() => { next.classList.add("active"); window.scrollTo(0,0); }, 220);
  } else { next.classList.add("active"); window.scrollTo(0,0); }
  trackEvent("screen_view", { screenKey });
}

async function apiPost(url,payload){
  const data=readStaticData();const id=Date.now();
  if(url==="/api/event"){data.events.push({id,eventName:payload.eventName||"",payload:payload.payload||{},createdAt:new Date().toISOString()});writeStaticData(data);return{ok:true,id};}
  if(url==="/api/lead"){data.leads.push({id,nickname:payload.nickname||"",contact:payload.contact||"",personality:payload.personality||"",cardName:payload.cardName||"",source:payload.source||"",createdAt:new Date().toISOString()});writeStaticData(data);return{ok:true,id};}
  return{ok:false,message:"unsupported static endpoint"};
}
function trackEvent(n,p){return apiPost("/api/event",{eventName:n,payload:p});}
function readStaticData(){const raw=localStorage.getItem("observer_h5_data");if(!raw)return{leads:[],events:[]};try{const j=JSON.parse(raw);if(Array.isArray(j.leads)&&Array.isArray(j.events))return j;}catch(_){}return{leads:[],events:[]};}
function writeStaticData(d){localStorage.setItem("observer_h5_data",JSON.stringify(d));}

function showTyping(b){const t=document.createElement("div");t.className="typing-indicator";t.innerHTML="<span></span><span></span><span></span>";b.appendChild(t);b.scrollTop=b.scrollHeight;return t;}
function renderChatStep(){
  const box=document.getElementById("chat-box");const opt=document.getElementById("chat-options");opt.innerHTML="";
  if(state.chatStep<chatQuestions.length){
    const q=chatQuestions[state.chatStep];const ty=showTyping(box);
    setTimeout(()=>{ty.remove();const b=document.createElement("div");b.className="bubble system";b.textContent=q.q;box.appendChild(b);box.scrollTop=box.scrollHeight;
    q.options.forEach((o,i)=>{const btn=document.createElement("button");btn.className="option";btn.style.animationDelay=i*0.08+"s";btn.textContent=o.text;btn.onclick=()=>{
      state.chatAnswers.push(o.value);const u=document.createElement("div");u.className="bubble user";u.textContent=o.text;box.appendChild(u);state.chatStep++;trackEvent("chat_answer",{step:state.chatStep+1,answer:o.value});
      if(state.chatStep>=chatQuestions.length){opt.innerHTML="";document.getElementById("btn-chat-done").classList.remove("hide");}else{setTimeout(renderChatStep,300);}box.scrollTop=box.scrollHeight;
    };opt.appendChild(btn);});},700);
  }
}

function renderQuiz(){
  const q=quizQuestions[state.quizIndex];
  document.getElementById("quiz-question").textContent=q.q;
  document.getElementById("quiz-index").textContent=(state.quizIndex+1)+" / "+quizQuestions.length;
  document.getElementById("quiz-progress").style.width=((state.quizIndex+1)/quizQuestions.length*100)+"%";
  const wrap=document.getElementById("quiz-options");wrap.innerHTML="";state.selectedQuizOption="";
  const next=document.getElementById("btn-quiz-next");next.disabled=true;
  Object.entries(q.options).forEach(([k,t],i)=>{
    const btn=document.createElement("button");btn.className="option";btn.style.animationDelay=i*0.07+"s";btn.textContent=k+". "+t;
    btn.onclick=()=>{[...wrap.children].forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");state.selectedQuizOption=k;next.disabled=false;};
    wrap.appendChild(btn);
  });
}

function scoreResult() {
  const cnt = { A:0, B:0, C:0, D:0 };
  state.quizAnswers.forEach(x => cnt[x]++);
  const [c1,c2,c3] = state.chatAnswers;

  const score = {
    qingxing:0, wusuowei:0, renjian:0, wenrou:0,
    duli:0, ziyou:0, tashu:0, minjie:0,
    lenggan:0, taiyang:0, lixing:0, suiyuan:0
  };

  if(c1 === "alone") { score.qingxing+=2; score.duli+=2; }
  if(c1 === "social"){ score.taiyang+=2; score.wenrou+=2; }
  if(c2 === "think"){ score.qingxing+=2; score.lixing+=2; score.minjie+=1; }
  if(c2 === "act")  { score.renjian+=2; score.tashu+=2; score.ziyou+=1; }
  if(c3 === "maybe"){ score.qingxing+=2; score.wenrou+=1; score.minjie+=2; }
  if(c3 === "trust"){ score.wusuowei+=2; score.ziyou+=2; score.renjian+=1; }

  score.qingxing += cnt.A*2.2 + cnt.C*1.1;
  score.wusuowei += cnt.C*1.5 + cnt.D*2.0;
  score.renjian += cnt.B*2.1 + cnt.C*1.2;
  score.wenrou += cnt.A*1.8 + cnt.B*1.1;
  score.duli += cnt.A*1.7 + cnt.D*1.8;
  score.ziyou += cnt.B*1.4 + cnt.D*1.9;
  score.tashu += cnt.A*1.6 + cnt.C*1.9;
  score.minjie += cnt.A*2.0 + cnt.C*1.3;
  score.lenggan += cnt.B*1.7 + cnt.D*1.8;
  score.taiyang += cnt.B*2.0 + cnt.C*1.4;
  score.lixing += cnt.A*1.5 + cnt.B*1.6;
  score.suiyuan += cnt.C*1.8 + cnt.D*1.7;

  return Object.entries(score).sort((a,b)=>b[1]-a[1])[0][0];
}

function renderResult(){
  state.resultKey=scoreResult();const d=templates[state.resultKey];
  document.getElementById("result-title").textContent="你的专属报告："+d.name;
  document.getElementById("result-intro").textContent=d.intro;
  const wrap=document.getElementById("result-wrap");wrap.innerHTML="";
  d.modules.forEach(([t,c],i)=>{const a=document.createElement("article");a.className="result-module";a.style.animationDelay=i*0.07+"s";a.innerHTML=`<h4>${t}</h4><p>${c}</p>`;wrap.appendChild(a);});
  trackEvent("result_ready",{key:state.resultKey,name:d.name});
}
function renderCards(){
  const g=document.getElementById("card-grid");const t=document.getElementById("card-tip");g.innerHTML="";t.textContent="";
  cardData.forEach((c,idx)=>{const b=document.createElement("button");b.className="sense-card";b.style.background=c.color;b.style.animationDelay=idx*0.1+"s";b.textContent=c.name;b.onclick=()=>{
    state.selectedCard=idx;[...g.children].forEach(x=>x.classList.remove("active"));b.classList.add("active");t.textContent=c.tip+" 3秒后进入报告...";trackEvent("card_pick",{name:c.name});
    setTimeout(()=>{renderResult();go("result");},3000);
  };g.appendChild(b);});
}
function drawPoster(){
  const c=document.getElementById("poster-canvas");const ctx=c.getContext("2d");const d=templates[state.resultKey];
  const sl=[`观察者｜我的薛定谔人生：${d.name}`,`观测3分钟，精准看透真实的我`,`我是${d.name}，不被定义，自有轮廓`];
  ctx.clearRect(0,0,c.width,c.height);const g=ctx.createLinearGradient(0,0,c.width,c.height);g.addColorStop(0,"#e8f0ff");g.addColorStop(1,"#fdfcff");ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle="#324f82";ctx.font="bold 52px Microsoft JhengHei";ctx.fillText("观察者",80,120);
  ctx.font="28px";ctx.fillStyle="#5f7088";ctx.fillText("薛定谔式人生观测报告",80,166);
  ctx.fillStyle="#fff";roundRect(ctx,70,230,760,980,32,true);
  ctx.fillStyle="#4767a3";ctx.font="bold 46px";ctx.fillText(`人格类型：${d.name}`,110,330);
  ctx.fillStyle="#2f3f58";ctx.font="32px";wrapText(ctx,sl[Math.floor(Math.random()*sl.length)],110,410,680,48);
  ctx.fillStyle="#5777b1";ctx.font="bold 30px";ctx.fillText("专属建议",110,560);
  ctx.fillStyle="#31435d";ctx.font="30px";wrapText(ctx,d.modules[6][1],110,620,680,48);
  ctx.fillStyle="#5e7dae";ctx.font="26px";ctx.fillText(`观测者：${state.nickname}`,110,1090);
  const u=window.location.origin+window.location.pathname;const qr=`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(u)}`;
  const img=new Image();img.crossOrigin="anonymous";img.onload=()=>ctx.drawImage(img,610,1000,190,190);img.onerror=()=>{ctx.fillStyle="#eef3ff";roundRect(ctx,610,1000,190,190,14,true);ctx.fillStyle="#7893c2";ctx.font="24px";ctx.fillText("QR加载失败",640,1100);};img.src=qr;
  trackEvent("poster_made",{name:d.name});
}
function roundRect(ctx,x,y,w,h,r,f){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();if(f)ctx.fill();}
function wrapText(ctx,t,x,y,m,l){const cs=t.split("");let ln="";for(let i=0;i<cs.length;i++){const test=ln+cs[i];if(ctx.measureText(test).width>m&&ln){ctx.fillText(ln,x,y);ln=cs[i];y+=l;}else{ln=test;}}if(ln)ctx.fillText(ln,x,y);}
function resetAll(){
  state.chatAnswers=[];state.quizAnswers=[];state.chatStep=0;state.quizIndex=0;state.selectedQuizOption="";state.selectedCard=null;state.resultKey="";
  document.getElementById("chat-box").innerHTML="";document.getElementById("chat-options").innerHTML="";document.getElementById("btn-chat-done").classList.add("hide");
  go("start");trackEvent("restart",{});
}
function setupMusic(){
  const au=document.getElementById("bgm");const btn=document.getElementById("music-toggle");let on=false;
  async function t(force=false){try{if(force||!on){await au.play();on=true;btn.classList.add("on");btn.textContent="♫ 背景音：开";}else{au.pause();on=false;btn.classList.remove("on");btn.textContent="♫ 背景音：关";}}catch(_){btn.textContent="♫ 请点击启用音乐";}}
  btn.onclick=()=>t();document.getElementById("btn-start").addEventListener("click",()=>t(true),{once:true});
}

document.getElementById("btn-start").onclick=()=>{go("chat");renderChatStep();};
document.getElementById("btn-chat-done").onclick=()=>{state.quizIndex=0;state.quizAnswers=[];renderQuiz();go("quiz");};
document.getElementById("btn-quiz-next").onclick=()=>{
  if(!state.selectedQuizOption)return;state.quizAnswers.push(state.selectedQuizOption);trackEvent("quiz_answer",{idx:state.quizIndex+1,ans:state.selectedQuizOption});
  if(state.quizIndex<quizQuestions.length-1){state.quizIndex++;renderQuiz();}else{renderCards();go("card");}
};
document.getElementById("btn-to-poster").onclick=()=>{const n=prompt("请输入昵称（可留空）",state.nickname);if(n&&n.trim())state.nickname=n.trim();drawPoster();go("poster");};
document.getElementById("btn-save-poster").onclick=()=>{const c=document.getElementById("poster-canvas");const a=document.createElement("a");a.download=`观测报告_${templates[state.resultKey].name}.png`;a.href=c.toDataURL("image/png");a.click();trackEvent("poster_save",{name:templates[state.resultKey].name});};
document.getElementById("btn-share").onclick=async()=>{const t=`我测出是「${templates[state.resultKey].name}」！来观测你的薛定谔式人生。`;if(navigator.share){try{await navigator.share({title:"观察者人生观测",text:t,url:window.location.href});}catch(_){}}else{alert(t);}trackEvent("poster_share",{name:templates[state.resultKey].name});};
document.getElementById("btn-home").onclick=()=>go("end");
document.getElementById("btn-retest-1").onclick=resetAll;
document.getElementById("btn-retest-2").onclick=resetAll;
const f=document.getElementById("lead-form");if(f){f.onsubmit=async e=>{e.preventDefault();const nn=document.getElementById("lead-nickname")?.value.trim()||"";const ct=document.getElementById("lead-contact")?.value.trim()||"";const s=document.getElementById("lead-status");if(!ct){if(s)s.textContent="请填写联系方式";return;}const r=await apiPost("/api/lead",{nickname:nn||state.nickname,contact,personality:templates[state.resultKey]?.name||"",cardName:cardData[state.selectedCard]?.name||"",source:"h5"});if(r.ok){if(s)s.textContent="提交成功！";document.getElementById("lead-contact").value="";document.getElementById("lead-nickname").value="";trackEvent("lead_ok",{id:r.id});}else{if(s)s.textContent="提交失败："+(r.message||"请重试");trackEvent("lead_fail",{msg:r.message});}};}

document.querySelectorAll(".btn").forEach(addRipple);
const overlay=document.getElementById("loading-overlay");if(overlay){overlay.classList.add("hidden");setTimeout(()=>overlay.style.display="none",350);}
initParticles();setupMusic();trackEvent("visit",{ua:navigator.userAgent});