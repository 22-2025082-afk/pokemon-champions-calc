// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// stats.js
// ========================================

import { getNatureMultiplier } from "./natures.js";

/**
 * HP実数値
 * Pokémon Champions
 * HP = 種族値 + 75 + 能力ポイント
 */
export function calculateHP(baseHP, hpPoint) {
    return Number(baseHP) + 75 + Number(hpPoint);
}

/**
 * HP以外
 * floor((種族値 + 20 + 能力ポイント) × 性格補正)
 */
export function calculateStat(baseStat, point, natureMultiplier = 1.0) {
    return Math.floor(
        (Number(baseStat) + 20 + Number(point)) *
        Number(natureMultiplier)
    );
}

/**
 * 6能力まとめて計算
 */
export function calculatePokemonStats(baseStats, points, natureName) {

    const nature = getNatureMultiplier(natureName);

    return {

        hp: calculateHP(
            baseStats.hp,
            points.hp
        ),

        atk: calculateStat(
            baseStats.atk,
            points.atk,
            nature.atk
        ),

        def: calculateStat(
            baseStats.def,
            points.def,
            nature.def
        ),

        spa: calculateStat(
            baseStats.spa,
            points.spa,
            nature.spa
        ),

        spd: calculateStat(
            baseStats.spd,
            points.spd,
            nature.spd
        ),

        spe: calculateStat(
            baseStats.spe,
            points.spe,
            nature.spe
        )

    };

}

/**
 * 実数値表示用
 */
export function statsToText(stats){

    return `
HP : ${stats.hp}

攻撃 : ${stats.atk}

防御 : ${stats.def}

特攻 : ${stats.spa}

特防 : ${stats.spd}

素早さ : ${stats.spe}
`;

}
