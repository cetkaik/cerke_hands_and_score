import {
  ObtainablePieces,
  Hand,
  calculate_hands_and_score_from_pieces
} from "./calculate_hand";

const tests: [
  ObtainablePieces[],
  (
    | { error: false; score: number; hands: Hand[] }
    | { error: true; too_many: ObtainablePieces[] }
  )
][] = [
  [["赤王", "赤王", "赤王", "赤王"], { error: true, too_many: ["赤王"] }],
  [["赤王", "赤王"], { error: true, too_many: ["赤王"] }],
  [["黒車", "黒車", "黒車", "赤巫", "赤巫", "赤巫", "赤船"], { error: true, too_many: ["黒車", "赤巫"] }],
  [["赤弓"], { error: false, score: 0, hands: [] }],
  [["赤兵"], { error: false, score: 0, hands: [] }],
  [["赤車"], { error: false, score: 0, hands: [] }],
  [["赤筆"], { error: false, score: 0, hands: [] }],
  [["黒車"], { error: false, score: 0, hands: [] }],
  [["赤馬"], { error: false, score: 0, hands: [] }],
  [["黒巫"], { error: false, score: 0, hands: [] }],
  [["黒巫"], { error: false, score: 0, hands: [] }],
  [["赤車"], { error: false, score: 0, hands: [] }],
  [["赤虎"], { error: false, score: 0, hands: [] }],
  [["赤兵"], { error: false, score: 0, hands: [] }],
  [["赤巫"], { error: false, score: 0, hands: [] }],
  [["黒車"], { error: false, score: 0, hands: [] }],
  [["黒筆"], { error: false, score: 0, hands: [] }],
  [["黒将"], { error: false, score: 0, hands: [] }],
  [["赤虎"], { error: false, score: 0, hands: [] }],
  [["黒王"], { error: false, score: 5, hands: ["王"] }],
  [["黒車", "黒将"], { error: false, score: 0, hands: [] }],
  [["黒弓", "赤兵"], { error: false, score: 0, hands: [] }],
  [["赤車", "赤巫"], { error: false, score: 0, hands: [] }],
  [["赤兵", "黒兵"], { error: false, score: 0, hands: [] }],
  [["黒虎", "赤馬"], { error: false, score: 3, hands: ["獣"] }],
  [["赤兵", "黒兵"], { error: false, score: 0, hands: [] }],
  [["赤船", "赤筆"], { error: false, score: 0, hands: [] }],
  [["赤兵", "赤馬"], { error: false, score: 0, hands: [] }],
  [["赤筆", "黒将"], { error: false, score: 0, hands: [] }],
  [["赤弓", "赤兵"], { error: false, score: 0, hands: [] }],
  [["黒兵", "赤弓"], { error: false, score: 0, hands: [] }],
  [["黒虎", "黒王"], { error: false, score: 10, hands: ["王", "同色獣"] }],
  [["赤船", "赤王"], { error: false, score: 5, hands: ["王"] }],
  [["赤虎", "赤将", "黒兵"], { error: false, score: 0, hands: [] }],
  [["赤船", "赤兵", "赤王"], { error: false, score: 5, hands: ["王"] }],
  [["黒筆", "黒虎", "黒馬"], { error: false, score: 5, hands: ["同色獣"] }],
  [
    ["赤兵", "赤兵", "黒王"],
    { error: false, score: 11, hands: ["王", "助友", "戦集"] }
  ],
  [["黒兵", "黒兵", "赤将"], { error: false, score: 3, hands: ["戦集"] }],
  [["赤将", "黒兵", "黒筆"], { error: false, score: 0, hands: [] }],
  [["黒弓", "赤兵", "黒兵"], { error: false, score: 0, hands: [] }],
  [["赤馬", "赤虎", "赤車"], { error: false, score: 5, hands: ["同色獣"] }],
  [["黒車", "黒兵", "赤兵"], { error: false, score: 3, hands: ["助友"] }],
  [["黒将", "黒兵", "赤兵"], { error: false, score: 3, hands: ["戦集"] }],
  [
    ["黒筆", "赤王", "黒巫"],
    { error: false, score: 12, hands: ["王", "地心"] }
  ],
  [
    ["赤船", "黒車", "赤王"],
    { error: false, score: 10, hands: ["王", "行行"] }
  ],
  [["黒車", "赤兵", "赤兵"], { error: false, score: 3, hands: ["助友"] }],
  [
    ["黒虎", "黒兵", "黒馬", "赤兵"],
    { error: false, score: 5, hands: ["同色獣"] }
  ],
  [
    ["赤車", "赤兵", "黒巫", "赤兵"],
    { error: false, score: 5, hands: ["同色助友"] }
  ],
  [["赤将", "黒馬", "赤車", "黒兵"], { error: false, score: 0, hands: [] }],
  [
    ["黒兵", "赤車", "黒筆", "黒兵"],
    { error: false, score: 3, hands: ["助友"] }
  ],
  [["赤筆", "黒虎", "赤虎", "赤巫"], { error: false, score: 0, hands: [] }],
  [
    ["赤車", "赤兵", "赤弓", "黒兵"],
    { error: false, score: 3, hands: ["助友"] }
  ],
  [["赤兵", "赤車", "黒将", "黒巫"], { error: false, score: 0, hands: [] }],
  [["黒車", "黒馬", "黒馬", "赤車"], { error: false, score: 0, hands: [] }],
  [
    ["黒兵", "黒王", "黒弓", "赤兵"],
    { error: false, score: 18, hands: ["王", "助友", "同色馬弓兵", "戦集"] }
  ],
  [
    ["黒兵", "黒兵", "赤弓", "黒馬"],
    { error: false, score: 5, hands: ["馬弓兵"] }
  ],
  [
    ["赤兵", "黒弓", "黒船", "赤王"],
    { error: false, score: 10, hands: ["王", "馬弓兵"] }
  ],
  [
    ["黒虎", "赤弓", "黒兵", "赤王"],
    { error: false, score: 13, hands: ["王", "獣", "馬弓兵"] }
  ],
  [
    ["黒馬", "黒筆", "赤将", "赤馬", "赤兵"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["赤馬", "赤巫", "黒船", "黒兵", "黒兵"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["黒将", "黒馬", "黒兵", "黒車", "赤馬"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["赤将", "赤車", "黒馬", "赤兵", "黒兵"],
    { error: false, score: 6, hands: ["助友", "戦集"] }
  ],
  [
    ["赤虎", "赤将", "黒兵", "赤兵", "黒馬"],
    { error: false, score: 6, hands: ["戦集", "獣"] }
  ],
  [
    ["赤兵", "赤虎", "赤将", "黒筆", "赤兵"],
    { error: false, score: 5, hands: ["同色戦集"] }
  ],
  [
    ["赤車", "黒兵", "黒巫", "黒兵", "赤馬"],
    { error: false, score: 3, hands: ["助友"] }
  ],
  [
    ["黒兵", "黒弓", "赤筆", "赤巫", "黒王"],
    { error: false, score: 29, hands: ["王", "同色馬弓兵", "地心", "筆兵無傾"] }
  ],
  [
    ["赤兵", "赤筆", "赤車", "赤兵", "黒車", "赤虎"],
    { error: false, score: 5, hands: ["同色助友"] }
  ],
  [
    ["黒車", "赤兵", "黒弓", "赤兵", "赤虎", "黒兵"],
    { error: false, score: 3, hands: ["助友"] }
  ],
  [
    ["赤将", "黒兵", "黒兵", "赤車", "赤車", "赤弓"],
    { error: false, score: 6, hands: ["助友", "戦集"] }
  ],
  [
    ["赤船", "赤馬", "赤虎", "赤兵", "黒筆", "赤将"],
    { error: false, score: 5, hands: ["同色獣"] }
  ],
  [
    ["黒筆", "黒弓", "黒王", "黒兵", "赤弓", "赤車"],
    { error: false, score: 15, hands: ["王", "助友", "同色馬弓兵"] }
  ],
  [
    ["黒馬", "赤兵", "赤兵", "黒筆", "赤将", "黒車"],
    { error: false, score: 8, hands: ["助友", "同色戦集"] }
  ],
  [
    ["黒将", "赤筆", "赤兵", "黒弓", "黒王", "赤王"],
    {
      error: false,
      score: 36,
      hands: ["王", "戦集", "助友", "馬弓兵", "地心", "筆兵無傾", "獣"]
    }
  ],
  [
    ["赤兵", "黒車", "黒兵", "赤将"],
    { error: false, score: 6, hands: ["助友", "戦集"] }
  ],
  [
    ["黒将", "赤弓", "黒兵", "黒兵"],
    { error: false, score: 5, hands: ["同色戦集"] }
  ],
  [
    ["赤弓", "赤車", "赤筆", "赤将", "赤虎", "黒弓"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["赤車", "黒王", "黒兵", "黒船", "黒兵", "黒馬"],
    {
      error: false,
      score: 34,
      hands: ["王", "同色馬弓兵", "同色助友", "同色行行", "同色獣", "同色戦集"]
    }
  ],
  [
    ["赤兵", "赤巫", "赤馬", "赤虎", "赤将", "赤兵"],
    { error: false, score: 10, hands: ["同色戦集", "同色獣"] }
  ],
  [
    ["黒弓", "黒馬", "赤筆", "赤将", "黒兵", "黒兵"],
    { error: false, score: 10, hands: ["戦集", "同色馬弓兵"] }
  ],
  [
    ["赤兵", "黒筆", "赤虎", "黒兵", "赤筆", "黒巫"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["黒虎", "黒兵", "赤兵", "赤巫", "黒巫", "黒馬", "赤兵"],
    { error: false, score: 5, hands: ["同色獣"] }
  ],
  [
    ["黒車", "赤将", "黒筆", "黒兵", "黒馬", "赤筆", "赤兵"],
    { error: false, score: 6, hands: ["助友", "戦集"] }
  ],
  [
    ["赤虎", "赤将", "黒虎", "赤弓", "赤兵", "赤将", "赤兵"],
    { error: false, score: 5, hands: ["同色戦集"] }
  ],
  [
    ["赤王", "赤馬", "黒兵", "赤兵", "黒馬", "赤虎", "黒筆"],
    {
      error: false,
      score: 23,
      hands: ["王", "同色獣", "同色馬弓兵", "助友", "戦集"]
    }
  ],
  [
    ["赤将", "黒船", "黒巫", "黒弓", "黒車", "黒兵", "黒将"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["黒兵", "赤兵", "黒弓", "黒車", "黒巫", "赤巫", "赤馬"],
    { error: false, score: 8, hands: ["助友", "馬弓兵"] }
  ],
  [
    ["黒馬", "黒兵", "赤馬", "赤筆", "赤弓", "黒馬", "黒兵"],
    { error: false, score: 5, hands: ["馬弓兵"] }
  ],
  [
    ["黒巫", "赤筆", "赤兵", "黒兵", "赤車", "黒将", "赤兵", "赤虎"],
    { error: false, score: 15, hands: ["同色助友", "戦集", "地心"] }
  ],
  [
    ["黒車", "黒馬", "黒船", "赤船", "黒兵", "赤馬", "黒車", "赤巫"],
    { error: false, score: 7, hands: ["同色行行"] }
  ],
  [
    ["赤兵", "黒馬", "黒兵", "赤兵", "赤巫", "黒筆", "黒兵", "黒虎"],
    { error: false, score: 5, hands: ["同色獣"] }
  ],
  [
    ["黒車", "黒将", "黒巫", "赤兵", "黒兵", "赤巫", "黒弓", "赤兵"],
    { error: false, score: 6, hands: ["助友", "戦集"] }
  ],
  [
    ["黒兵", "黒筆", "赤馬", "赤巫", "赤筆", "赤車", "黒巫", "黒将"],
    { error: false, score: 9, hands: ["同色地心"] }
  ],
  [
    ["黒船", "黒馬", "黒筆", "黒虎", "黒将", "赤巫", "赤虎", "赤兵"],
    { error: false, score: 12, hands: ["同色獣", "地心"] }
  ],
  [
    ["赤車", "黒兵", "赤王", "赤兵", "赤兵", "赤巫", "黒虎", "赤筆"],
    {
      error: false,
      score: 27,
      hands: ["王", "同色助友", "獣", "同色戦集", "同色地心"]
    }
  ],
  [
    ["赤馬", "黒弓", "黒将", "赤王", "赤船", "赤将", "赤将", "黒馬"],
    { error: false, score: 22, hands: ["王", "馬弓兵", "同色行行", "同色獣"] }
  ],
  [
    ["黒兵", "赤馬", "赤巫", "黒筆", "黒馬", "黒巫", "黒将", "赤虎", "赤馬"],
    { error: false, score: 14, hands: ["同色獣", "同色地心"] }
  ],
  [
    ["黒将", "黒兵", "赤兵", "黒虎", "黒兵", "黒巫", "赤巫", "赤筆", "赤車"],
    { error: false, score: 15, hands: ["助友", "同色戦集", "地心"] }
  ],
  [
    ["赤弓", "赤兵", "黒兵", "黒兵", "黒兵", "黒虎", "赤兵", "赤車", "黒巫"],
    { error: false, score: 8, hands: ["闇戦之集", "同色助友"] }
  ],
  [
    ["赤車", "黒将", "黒兵", "黒虎", "赤兵", "黒車", "黒虎", "黒巫", "赤兵"],
    { error: false, score: 8, hands: ["同色助友", "戦集"] }
  ],
  [
    ["赤将", "黒王", "黒将", "黒馬", "黒馬", "黒兵", "黒巫", "黒兵", "黒兵"],
    {
      error: false,
      score: 36,
      hands: ["王", "同色戦集", "同色馬弓兵", "同色助友", "同色獣", "同色地心"]
    }
  ],
  [
    ["黒巫", "赤筆", "黒兵", "黒巫", "黒兵", "赤兵", "赤兵", "赤馬", "赤馬"],
    { error: false, score: 0, hands: [] }
  ],
  [
    ["黒虎", "赤虎", "黒馬", "赤弓", "赤王", "黒筆", "黒船", "黒車", "赤兵"],
    {
      error: false,
      score: 27,
      hands: ["王", "助友", "同色獣", "同色行行", "同色馬弓兵"]
    }
  ],
  [
    ["赤弓", "黒筆", "黒巫", "黒兵", "黒船", "赤兵", "赤将", "赤王", "赤馬"],
    {
      error: false,
      score: 47,
      hands: [
        "王",
        "同色戦集",
        "同色馬弓兵",
        "地心",
        "筆兵無傾",
        "助友",
        "行行",
        "同色獣"
      ]
    }
  ],
  [
    ["赤筆", "黒将", "黒筆", "赤兵", "黒兵", "赤兵", "赤兵", "黒兵", "黒弓"],
    { error: false, score: 8, hands: ["闇戦之集", "同色戦集"] }
  ],
  [
    ["黒兵", "赤兵", "赤兵", "赤虎", "赤王", "黒兵", "赤車", "赤虎", "赤兵"],
    {
      error: false,
      score: 23,
      hands: ["王", "闇戦之集", "同色助友", "同色獣", "同色戦集"]
    }
  ],
  [
    ["赤兵", "赤弓", "赤虎", "赤兵", "赤兵", "黒巫", "赤兵", "赤兵", "黒兵"],
    { error: false, score: 5, hands: ["同色闇戦之集"] }
  ],
  [
    [
      "赤馬",
      "黒将",
      "赤虎",
      "黒兵",
      "赤将",
      "赤王",
      "赤弓",
      "赤虎",
      "赤兵",
      "黒巫",
      "黒巫",
      "黒兵",
      "黒馬",
      "黒車",
      "黒兵",
      "黒筆",
      "黒弓"
    ],
    {
      error: false,
      score: 56,
      hands: [
        "王",
        "闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "同色地心",
        "同色筆兵無傾",
        "行行"
      ]
    }
  ],
  [
    [
      "赤兵",
      "黒巫",
      "赤筆",
      "黒弓",
      "黒筆",
      "黒将",
      "黒車",
      "赤巫",
      "黒兵",
      "赤弓",
      "赤虎",
      "赤兵",
      "赤兵",
      "黒兵",
      "赤王",
      "赤車",
      "黒馬"
    ],
    {
      error: false,
      score: 56,
      hands: [
        "王",
        "闇戦之集",
        "同色助友",
        "同色戦集",
        "同色馬弓兵",
        "同色地心",
        "同色筆兵無傾",
        "同色獣",
        "行行"
      ]
    }
  ],
  [
    [
      "赤弓",
      "黒将",
      "赤兵",
      "赤虎",
      "赤兵",
      "黒兵",
      "赤兵",
      "赤車",
      "黒将",
      "黒兵",
      "黒虎",
      "赤兵",
      "黒兵",
      "赤船",
      "黒弓",
      "黒兵",
      "黒車"
    ],
    { error: false, score: 13, hands: ["闇戦之集", "同色助友", "同色戦集"] }
  ],
  [
    [
      "黒兵",
      "黒兵",
      "黒弓",
      "黒虎",
      "赤兵",
      "赤車",
      "赤兵",
      "赤虎",
      "赤馬",
      "赤馬",
      "黒筆",
      "黒将",
      "黒車",
      "黒船",
      "黒巫",
      "赤筆",
      "黒将"
    ],
    {
      error: false,
      score: 46,
      hands: [
        "同色助友",
        "同色戦集",
        "同色獣",
        "行行",
        "馬弓兵",
        "同色地心",
        "同色筆兵無傾"
      ]
    }
  ],
  [
    [
      "赤車",
      "黒筆",
      "黒兵",
      "黒巫",
      "赤弓",
      "赤筆",
      "赤兵",
      "黒兵",
      "赤兵",
      "赤虎",
      "黒将",
      "黒船",
      "赤車",
      "黒弓",
      "赤船",
      "黒兵",
      "赤兵"
    ],
    {
      error: false,
      score: 34,
      hands: ["闇戦之集", "同色助友", "同色戦集", "同色地心", "同色筆兵無傾"]
    }
  ],
  [
    [
      "赤虎",
      "赤虎",
      "黒巫",
      "黒兵",
      "黒将",
      "赤筆",
      "黒兵",
      "黒車",
      "黒兵",
      "黒兵",
      "赤車",
      "赤巫",
      "黒兵",
      "赤兵",
      "赤弓",
      "黒筆",
      "赤馬"
    ],
    {
      error: false,
      score: 46,
      hands: [
        "同色闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "同色地心",
        "筆兵無傾"
      ]
    }
  ],
  [
    [
      "赤兵",
      "赤兵",
      "赤王",
      "黒馬",
      "黒車",
      "黒巫",
      "赤馬",
      "黒弓",
      "黒将",
      "黒兵",
      "黒兵",
      "赤車",
      "黒車",
      "赤兵",
      "赤兵",
      "赤虎",
      "赤将"
    ],
    {
      error: false,
      score: 56,
      hands: [
        "王",
        "同色闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "地心",
        "筆兵無傾",
        "同色行行"
      ]
    }
  ],
  [
    [
      "黒車",
      "赤筆",
      "赤弓",
      "黒筆",
      "黒巫",
      "赤兵",
      "黒兵",
      "黒弓",
      "赤巫",
      "黒馬",
      "黒弓",
      "黒筆",
      "黒兵",
      "赤王",
      "赤車",
      "赤車",
      "赤馬"
    ],
    {
      error: false,
      score: 53,
      hands: [
        "王",
        "同色助友",
        "同色馬弓兵",
        "同色獣",
        "戦集",
        "同色地心",
        "同色筆兵無傾",
        "同色行行"
      ]
    }
  ],
  [
    [
      "黒兵",
      "黒筆",
      "黒兵",
      "黒弓",
      "赤兵",
      "黒将",
      "黒弓",
      "黒虎",
      "赤兵",
      "黒巫",
      "黒筆",
      "赤兵",
      "黒兵",
      "黒車",
      "黒兵",
      "赤車",
      "黒車"
    ],
    {
      error: false,
      score: 34,
      hands: ["闇戦之集", "同色助友", "同色戦集", "同色地心", "同色筆兵無傾"]
    }
  ],
  [
    [
      "赤将",
      "赤馬",
      "赤兵",
      "黒虎",
      "黒兵",
      "赤馬",
      "黒兵",
      "黒将",
      "赤弓",
      "赤車",
      "黒巫",
      "黒兵",
      "黒弓",
      "黒兵",
      "黒筆",
      "黒船",
      "黒車"
    ],
    {
      error: false,
      score: 49,
      hands: [
        "闇戦之集",
        "同色助友",
        "同色戦集",
        "獣",
        "行行",
        "同色馬弓兵",
        "同色地心",
        "同色筆兵無傾"
      ]
    }
  ],
  [
    [
      "黒虎",
      "黒馬",
      "赤船",
      "赤車",
      "赤巫",
      "赤筆",
      "黒兵",
      "黒兵",
      "赤弓",
      "黒虎",
      "黒巫",
      "赤兵",
      "黒弓",
      "黒車",
      "黒筆",
      "赤兵",
      "赤王"
    ],
    {
      error: false,
      score: 58,
      hands: [
        "王",
        "闇戦之集",
        "同色助友",
        "同色獣",
        "同色馬弓兵",
        "同色行行",
        "同色戦集",
        "同色地心",
        "同色筆兵無傾"
      ]
    }
  ],
  [
    [
      "赤将",
      "黒馬",
      "黒将",
      "黒巫",
      "黒兵",
      "赤兵",
      "赤巫",
      "黒兵",
      "赤虎",
      "赤筆",
      "赤弓",
      "黒王",
      "黒筆",
      "赤兵",
      "黒車",
      "黒馬",
      "赤車"
    ],
    {
      error: false,
      score: 58,
      hands: [
        "王",
        "闇戦之集",
        "同色助友",
        "同色戦集",
        "同色地心",
        "同色筆兵無傾",
        "同色馬弓兵",
        "同色獣",
        "同色行行"
      ]
    }
  ],
  [
    [
      "赤王",
      "赤馬",
      "黒馬",
      "赤兵",
      "黒兵",
      "黒筆",
      "赤将",
      "赤筆",
      "黒虎",
      "赤将",
      "黒巫",
      "赤兵",
      "赤兵",
      "黒兵",
      "赤兵",
      "黒兵",
      "黒船"
    ],
    {
      error: false,
      score: 56,
      hands: [
        "王",
        "同色闇戦之集",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "筆兵無傾",
        "同色助友",
        "行行",
        "同色地心"
      ]
    }
  ],
  [
    [
      "赤王",
      "赤兵",
      "黒兵",
      "黒兵",
      "赤兵",
      "黒弓",
      "赤弓",
      "赤兵",
      "赤弓",
      "赤虎",
      "黒将",
      "黒兵",
      "赤船",
      "黒車",
      "赤兵",
      "黒虎",
      "赤兵"
    ],
    {
      error: false,
      score: 37,
      hands: [
        "王",
        "同色闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "行行",
        "同色馬弓兵"
      ]
    }
  ],
  [
    [
      "赤虎",
      "黒筆",
      "黒虎",
      "黒弓",
      "赤筆",
      "赤将",
      "赤兵",
      "黒虎",
      "赤虎",
      "赤兵",
      "黒兵",
      "赤巫",
      "黒車",
      "黒車",
      "赤車",
      "赤王",
      "黒馬"
    ],
    {
      error: false,
      score: 53,
      hands: [
        "王",
        "同色助友",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "同色地心",
        "同色筆兵無傾",
        "行行"
      ]
    }
  ],
  [
    [
      "黒弓",
      "赤船",
      "黒巫",
      "黒兵",
      "赤兵",
      "赤兵",
      "赤兵",
      "黒虎",
      "赤兵",
      "赤虎",
      "黒将",
      "黒筆",
      "黒王",
      "赤弓",
      "赤馬",
      "赤王",
      "黒巫"
    ],
    {
      error: false,
      score: 110,
      hands: [
        "王",
        "同色闇戦之集",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "同色地心",
        "同色筆兵無傾",
        "無抗行処",
        "同色助友",
        "同色行行"
      ]
    }
  ],
  [
    [
      "赤兵",
      "黒将",
      "黒弓",
      "黒車",
      "赤兵",
      "赤筆",
      "黒兵",
      "赤船",
      "黒兵",
      "赤虎",
      "赤兵",
      "赤馬",
      "赤兵",
      "赤兵",
      "黒筆",
      "赤弓",
      "黒兵"
    ],
    {
      error: false,
      score: 32,
      hands: [
        "同色闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "行行",
        "同色馬弓兵"
      ]
    }
  ],
  [
    [
      "黒弓",
      "黒虎",
      "黒巫",
      "赤兵",
      "赤馬",
      "黒馬",
      "赤巫",
      "赤車",
      "黒兵",
      "赤兵",
      "赤兵",
      "黒兵",
      "赤兵",
      "赤筆",
      "黒兵",
      "赤船",
      "黒筆"
    ],
    {
      error: false,
      score: 27,
      hands: ["闇戦之集", "同色助友", "同色獣", "同色行行", "同色馬弓兵"]
    }
  ],
  [
    [
      "赤兵",
      "黒馬",
      "赤兵",
      "黒王",
      "赤弓",
      "赤兵",
      "黒巫",
      "赤虎",
      "黒兵",
      "黒弓",
      "赤兵",
      "赤馬",
      "黒将",
      "黒兵",
      "赤王",
      "赤将",
      "黒兵"
    ],
    {
      error: false,
      score: 58,
      hands: [
        "王",
        "同色闇戦之集",
        "同色戦集",
        "同色獣",
        "同色馬弓兵",
        "同色助友",
        "同色地心",
        "同色筆兵無傾",
        "行行"
      ]
    }
  ],
  [
    [
      "赤車",
      "赤将",
      "黒馬",
      "黒船",
      "黒将",
      "赤兵",
      "赤筆",
      "黒虎",
      "黒兵",
      "赤兵",
      "黒車",
      "赤車",
      "赤馬",
      "黒兵",
      "赤兵",
      "赤王",
      "黒兵"
    ],
    {
      error: false,
      score: 46,
      hands: [
        "王",
        "闇戦之集",
        "同色助友",
        "同色戦集",
        "同色獣",
        "同色行行",
        "同色馬弓兵",
        "同色地心"
      ]
    }
  ]
];

describe("calculate_hands_and_score_from_pieces", () => {
  it.each(tests)(
    "calculate_hands_and_score_from_pieces(%j)",
    (paramValue, expectValue) => {
      expect(calculate_hands_and_score_from_pieces(paramValue)).toEqual(
        expectValue
      );
    }
  );
});
