// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// damage.js
// ========================================

import { getTypeEffectiveness } from "./types.js";

/**
 * Pokémon Champions ダメージ計算
 */
export function calculateDamage(data){

    const attack =
        data.category === "physical"
        ? data.attacker.atk
        : data.attacker.spa;

    const defense =
        data.category === "physical"
        ? data.defender.def
        : data.defender.spd;

    // 基本ダメージ
    let damage = Math.floor(
        (
            (
                22 *
                data.power *
                attack
            ) /
            defense
        ) / 50
    ) + 2;

    // ---------------------
    // STAB
    // ---------------------

    if(data.stab){

        damage = Math.floor(damage * 1.5);

    }

    // ---------------------
    // タイプ相性
    // ---------------------

    const typeRate =
        getTypeEffectiveness(
            data.moveType,
            data.defender.type1,
            data.defender.type2
        );

    damage = Math.floor(
        damage * typeRate
    );

    // ---------------------
    // 急所
    // ---------------------

    if(data.critical){

        damage = Math.floor(
            damage * 1.5
        );

    }

    // ---------------------
    // やけど
    // ---------------------

    if(
        data.burn &&
        data.category==="physical"
    ){

        damage = Math.floor(
            damage * 0.5
        );

    }

    // ---------------------
    // 天候
    // ---------------------

    if(data.weather==="sun"){

        if(data.moveType==="ほのお")
            damage=Math.floor(damage*1.5);

        if(data.moveType==="みず")
            damage=Math.floor(damage*0.5);

    }

    if(data.weather==="rain"){

        if(data.moveType==="みず")
            damage=Math.floor(damage*1.5);

        if(data.moveType==="ほのお")
            damage=Math.floor(damage*0.5);

    }

    // ---------------------
    // 16段階乱数
    // ---------------------

    const rolls=[];

    for(let i=85;i<=100;i++){

        rolls.push(

            Math.floor(
                damage*i/100
            )

        );

    }

    const minDamage=rolls[0];
    const maxDamage=rolls[15];

    // ---------------------
    // ダメージ割合
    // ---------------------

    const minPercent=
        (
            minDamage/
            data.defender.hp*
            100
        ).toFixed(1);

    const maxPercent=
        (
            maxDamage/
            data.defender.hp*
            100
        ).toFixed(1);

    // ---------------------
    // 確定何発
    // ---------------------

    let koText="";

    if(maxDamage>=data.defender.hp){

        koText="確定1発";

    }

    else if(maxDamage*2>=data.defender.hp){

        koText="確定2発以内";

    }

    else if(maxDamage*3>=data.defender.hp){

        koText="確定3発以内";

    }

    else{

        koText="4発以上";

    }

    return{

        minDamage,
        maxDamage,

        minPercent,
        maxPercent,

        rolls,

        typeRate,

        koText

    };

}
