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

    await loadPokemonData();

    await loadMoveData();


    createPokemonList();

    createMoveList();



    [
        "attackerType1",
        "attackerType2",
        "defenderType1",
        "defenderType2",
        "moveType"
    ]
    .forEach(createTypeSelect);



    [
        "attackerNature",
        "defenderNature"
    ]
    .forEach(createNatureSelect);



    registerPokemonInput(
        "attackerPokemon",
        "attacker"
    );


    registerPokemonInput(
        "defenderPokemon",
        "defender"
    );


    registerMoveInput();



    document
    .getElementById("calculateButton")
    .addEventListener(
        "click",
        calculate
    );

}



// ==============================
// タイプ選択
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
// 性格
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
// 実数値計算
// ==============================

function updateStats(prefix){


    const pokemon =
        findPokemon(
            document.getElementById(
                `${prefix}Pokemon`
            ).value
        );


    if(!pokemon) return null;



    const baseStats={

        hp:pokemon.hp,

        atk:pokemon.atk,

        def:pokemon.def,

        spa:pokemon.spa,

        spd:pokemon.spd,

        spe:pokemon.spe

    };



    const points={

        hp:Number(
            document.getElementById(
                `${prefix}HPPoint`
            ).value
        ),

        atk:Number(
            document.getElementById(
                `${prefix}AtkPoint`
            ).value
        ),

        def:Number(
            document.getElementById(
                `${prefix}DefPoint`
            ).value
        ),

        spa:Number(
            document.getElementById(
                `${prefix}SpaPoint`
            ).value
        ),

        spd:Number(
            document.getElementById(
                `${prefix}SpdPoint`
            ).value
        ),

        spe:Number(
            document.getElementById(
                `${prefix}SpePoint`
            ).value
        )

    };



    const stats =
        calculatePokemonStats(
            baseStats,
            points,
            document.getElementById(
                `${prefix}Nature`
            ).value
        );



    document.getElementById(
        `${prefix}Stats`
    ).textContent =
        statsToText(stats);



    return {

        ...stats,

        type1:
        document.getElementById(
            `${prefix}Type1`
        ).value,

        type2:
        document.getElementById(
            `${prefix}Type2`
        ).value

    };

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



    if(!attacker || !defender || !move){

        alert("入力が不足しています");

        return;

    }



    const result =
        calculateDamage({

            attacker,

            defender,

            power:
            move.power,

            category:
            move.category,

            moveType:
            move.type,


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
