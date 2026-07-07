// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// moves.js
// ========================================

let moveData = [];


/**
 * moves.json読込
 */
export async function loadMoveData(){

    const response =
        await fetch("./data/moves.json");

    moveData = await response.json();

    return moveData;

}


/**
 * 全技データ取得
 */
export function getMoveData(){

    return moveData;

}


/**
 * 技名検索
 */
export function findMove(name){

    return moveData.find(
        move => move.name === name
    );

}


/**
 * datalist生成
 */
export function createMoveList(listId = "moveList"){

    const list =
        document.getElementById(listId);

    if(!list) return;


    list.innerHTML = "";


    [...moveData]
    .sort(
        (a,b)=>
        a.name.localeCompare(b.name,"ja")
    )
    .forEach(move=>{

        const option =
            document.createElement("option");


        option.value =
            move.name;


        list.appendChild(option);

    });

}


/**
 * 技情報をフォームへ入力
 */
export function fillMove(move){

    if(!move) return;


    const type =
        document.getElementById("moveType");

    const category =
        document.getElementById("moveCategory");

    const power =
        document.getElementById("movePower");


    if(type)
        type.value = move.type;


    if(category)
        category.value = move.category;


    if(power)
        power.value = move.power;

}


/**
 * 技入力イベント登録
 */
export function registerMoveInput(
    inputId = "moveName"
){

    const input =
        document.getElementById(inputId);


    if(!input) return;


    input.addEventListener(
        "change",
        ()=>{

            const move =
                findMove(input.value);


            if(!move) return;


            fillMove(move);

        }
    );

}
