// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// app.js
// ========================================


import {
    loadPokemonData,
    createPokemonList,
    registerPokemonInput,
    findPokemon
} from "./pokemon.js";


import {
    loadMoveData,
    createMoveList,
    registerMoveInput,
    findMove
} from "./moves.js";


import {
    TYPES
} from "./types.js";


import {
    getNatureNames
} from "./natures.js";


import {
    calculatePokemonStats,
    statsToText
} from "./stats.js";


import {
    calculateDamage
} from "./damage.js";



// ==============================
// 初期化
// ==============================

async function initialize(){


    // データ読み込み

    await loadPokemonData();

    await loadMoveData();



    // リスト作成

    createPokemonList();

    createMoveList();



    // タイプ選択肢

    createTypeSelect(
        "attackerType1"
    );

    createTypeSelect(
        "attackerType2"
    );

    createTypeSelect(
        "defenderType1"
    );

    createTypeSelect(
        "defenderType2"
    );

    createTypeSelect(
        "moveType"
    );



    // 性格

    createNatureSelect(
        "attackerNature"
    );

    createNatureSelect(
        "defenderNature"
    );



    // 入力イベント

    registerPokemonInput(
        "attackerPokemon",
        "attacker"
    );


    registerPokemonInput(
        "defenderPokemon",
        "defender"
    );


    registerMoveInput();



    // 計算ボタン

    document
    .getElementById("calculateButton")
    .addEventListener(
        "click",
        calculate
    );


}



// ==============================
// タイプ生成
// ==============================

function createTypeSelect(id){

    const select =
        document.getElementById(id);


    if(!select) return;


    select.innerHTML="";


    const empty =
        document.createElement("option");


    empty.value="";
    empty.textContent="なし";

    select.appendChild(empty);



    TYPES.forEach(type=>{

        const option =
            document.createElement("option");


        option.value=type;
        option.textContent=type;


        select.appendChild(option);

    });

}



// ==============================
// 性格生成
// ==============================

function createNatureSelect(id){

    const select =
        document.getElementById(id);


    if(!select) return;


    select.innerHTML="";


    getNatureNames()
    .forEach(nature=>{

        const option =
            document.createElement("option");


        option.value=nature;
        option.textContent=nature;


        select.appendChild(option);

    });

}



// ==============================
// 実数値更新
// ==============================

function updateStats(prefix){


    const pokemon =
        findPokemon(
            document.getElementById(
                `${prefix}Pokemon`
            ).value
        );


    if(!pokemon) return;



    const points={

        hp:
        Number(
            document.getElementById(
                `${prefix}HPPoint`
            ).value
        ),

        atk:
        Number(
            document.getElementById(
                `${prefix}AtkPoint`
            ).value
        ),

        def:
        Number(
            document.getElementById(
                `${prefix}DefPoint`
            ).value
        ),

        spa:
        Number(
            document.getElementById(
                `${prefix}SpaPoint`
            ).value
        ),

        spd:
        Number(
            document.getElementById(
                `${prefix}SpdPoint`
            ).value
        ),

        spe:
        Number(
            document.getElementById(
                `${prefix}SpePoint`
            ).value
        )

    };



    const stats =
        calculatePokemonStats(
            pokemon,
            points,
            document.getElementById(
                `${prefix}Nature`
            ).value
        );



    document.getElementById(
        `${prefix}Stats`
    ).textContent =
        statsToText(stats);


    return stats;

}



// ==============================
// 計算
// ==============================

function calculate(){


    const attacker =
        updateStats("attacker");


    const defender =
        updateStats("defender");


    const move =
        findMove(
            document.getElementById(
                "moveName"
            ).value
        );


    if(
        !attacker ||
        !defender ||
        !move
    ){

        alert("入力が不足しています");

        return;

    }



    const result =
        calculateDamage({

            attacker,

            defender,

            power:move.power,

            category:move.category,

            moveType:move.type,

            stab:
            document.getElementById(
                "stab"
            ).checked,

            critical:
            document.getElementById(
                "critical"
            ).checked,

            burn:
            document.getElementById(
                "burn"
            ).checked,

            weather:
            document.getElementById(
                "weather"
            ).value

        });



    document.getElementById(
        "damageResult"
    ).textContent =
        `${result.minDamage} ～ ${result.maxDamage} ダメージ`;


    document.getElementById(
        "damagePercent"
    ).textContent =
        `${result.minPercent}% ～ ${result.maxPercent}%`;


    document.getElementById(
        "koChance"
    ).textContent =
        result.koText;


}



// 起動

initialize();
