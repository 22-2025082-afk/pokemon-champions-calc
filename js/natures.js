// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// natures.js
// ========================================

export const NATURES = {
    "がんばりや": { atk:1.0, def:1.0, spa:1.0, spd:1.0, spe:1.0 },
    "さみしがり": { atk:1.1, def:0.9, spa:1.0, spd:1.0, spe:1.0 },
    "いじっぱり": { atk:1.1, def:1.0, spa:0.9, spd:1.0, spe:1.0 },
    "やんちゃ": { atk:1.1, def:1.0, spa:1.0, spd:0.9, spe:1.0 },
    "ゆうかん": { atk:1.1, def:1.0, spa:1.0, spd:1.0, spe:0.9 },

    "ずぶとい": { atk:0.9, def:1.1, spa:1.0, spd:1.0, spe:1.0 },
    "すなお": { atk:1.0, def:1.0, spa:1.0, spd:1.0, spe:1.0 },
    "わんぱく": { atk:1.0, def:1.1, spa:0.9, spd:1.0, spe:1.0 },
    "のうてんき": { atk:1.0, def:1.1, spa:1.0, spd:0.9, spe:1.0 },
    "のんき": { atk:1.0, def:1.1, spa:1.0, spd:1.0, spe:0.9 },

    "ひかえめ": { atk:0.9, def:1.0, spa:1.1, spd:1.0, spe:1.0 },
    "おっとり": { atk:1.0, def:0.9, spa:1.1, spd:1.0, spe:1.0 },
    "てれや": { atk:1.0, def:1.0, spa:1.0, spd:1.0, spe:1.0 },
    "うっかりや": { atk:1.0, def:1.0, spa:1.1, spd:0.9, spe:1.0 },
    "れいせい": { atk:1.0, def:1.0, spa:1.1, spd:1.0, spe:0.9 },

    "おだやか": { atk:0.9, def:1.0, spa:1.0, spd:1.1, spe:1.0 },
    "おとなしい": { atk:1.0, def:0.9, spa:1.0, spd:1.1, spe:1.0 },
    "しんちょう": { atk:1.0, def:1.0, spa:0.9, spd:1.1, spe:1.0 },
    "きまぐれ": { atk:1.0, def:1.0, spa:1.0, spd:1.0, spe:1.0 },
    "なまいき": { atk:1.0, def:1.0, spa:1.0, spd:1.1, spe:0.9 },

    "おくびょう": { atk:0.9, def:1.0, spa:1.0, spd:1.0, spe:1.1 },
    "せっかち": { atk:1.0, def:0.9, spa:1.0, spd:1.0, spe:1.1 },
    "ようき": { atk:1.0, def:1.0, spa:0.9, spd:1.0, spe:1.1 },
    "むじゃき": { atk:1.0, def:1.0, spa:1.0, spd:0.9, spe:1.1 },
    "まじめ": { atk:1.0, def:1.0, spa:1.0, spd:1.0, spe:1.0 }
};

export function getNatureMultiplier(nature) {
    return NATURES[nature] || NATURES["まじめ"];
}

export function getNatureNames() {
    return Object.keys(NATURES);
}
