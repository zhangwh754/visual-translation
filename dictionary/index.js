const SKILLS = [
  {
    label: "Flurry",
    value: "风暴斩杀",
  },
  {
    label: "All In",
    value: "全力一击",
  },
  {
    label: "Staff of Magus",
    value: "占星者之杖",
  },
  {
    label: "Sucker Punch",
    value: "赤手空拳",
  },
  {
    label: "Throw Dust",
    value: "扬尘",
  },
];

const PHRASE = [
  {
    label: "You may choose from:",
    value: "你可以从中选择：",
  },
  {
    label: "Click on this node again to allocate it， granting:",
    value: "再次点击该节点进行分配，授予：",
  },
  {
    label: "Unlock basic activation of",
    value: "解锁基础触发器",
  },
  {
    label: "select node for details",
    value: "选择节点查看详情",
  },
  {
    label: "Learn the",
    value: "习得",
  },
  {
    label: "invested ",
    value: "投入的",
  },
  {
    label: "Memory",
    value: "记忆",
  },
  {
    label: "Power",
    value: "能力",
  },
  {
    label: "Finesse",
    value: "敏捷",
  },
  {
    label: "Vitality",
    value: "生命值",
  },
  {
    label: "summon",
    value: "召唤物",
  },
  {
    label: "Maximum",
    value: "最大",
  },
  {
    label: "Resistances",
    value: "抗性",
  },
  {
    label: "Source",
    value: "秘源",
  },
  {
    label: "Wits",
    value: "智慧",
  },
  {
    label: "Movement Speed",
    value: "移速",
  },
];

const ASCEND = [
  {
    regex: /\bForm\b/i,
    value: "型",
  },
  {
    regex: /Force/i,
    value: "力",
  },
  {
    regex: /Life/i,
    value: "命",
  },
  {
    regex: /Inertia/i,
    value: "惯",
  },
  {
    regex: /Entropy/i,
    value: "熵",
  },
  {
    regex: /Battered/i,
    value: "重创",
  },
  {
    regex: /Harried/i,
    value: "蹂躏",
  },
  {
    label: "Geomancer",
    value: "地卜",
  },
  {
    label: "Pyrokinetic",
    value: "烈火",
  },
  {
    label: "Necromancer",
    value: "死灵",
  },
  {
    label: "Scoundrel",
    value: "刺杀",
  },
  {
    label: "Voracity",
    value: "贪婪",
  },
  {
    label: "Predator",
    value: "掠夺者",
  },
  {
    label: "Withered",
    value: "枯萎",
  },
  {
    label: "Defiance",
    value: "蔑视",
  },
  {
    label: "Purity",
    value: "纯洁",
  },
  {
    label: "Elementalist",
    value: "元素主义者",
  },
  {
    label: "Violent Strike",
    value: "爆裂攻击",
  },
  {
    label: "Prosperity",
    value: "繁荣",
  },
  {
    label: "Adaptation",
    value: "适应",
  },
  {
    label: "Abeyance",
    value: "搁置",
  },
  {
    label: "Vitality Void",
    value: "生命虚空",
  },
  {
    label: "Occultist",
    value: "玄虚术士",
  },
  {
    regex: /stacks?/i,
    value: "堆叠",
  },
];

const OTHER = [
  {
    label: ",",
    value: "，",
  },
  {
    label: "(",
    value: "（",
  },
  {
    label: ")",
    value: "）",
  },
  {
    regex: /(?<!\d)\./,
    value: "。",
  },
  {
    regex: /and/i,
    value: "和",
  },
  {
    regex: /\bor\b/i,
    value: "或",
  },
  {
    regex: /skill/i,
    value: "技能",
  },
  {
    regex: /\bper\b/i,
    value: "每点",
  },
  {
    regex: /up to/i,
    value: "最高",
  },
];

const DICTIONARY = [...SKILLS, ...ASCEND, ...PHRASE, ...OTHER];
