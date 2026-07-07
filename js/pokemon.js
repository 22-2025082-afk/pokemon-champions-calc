// ========================================
// Pokémon Champions ダメージ計算機 Ver.1.0
// pokemon.js
// ========================================

let pokemonData = [];

/**
 * pokemon.json読込
 */
export async function loadPokemonData() {

    const response = await fetch("./data/pokemon.json");

    pokemonData = await response.json();

    return pokemonData;

}

/**
 * 全データ取得
 */
export function getPokemonData() {
    return pokemonData;
}

/**
 * 名前検索
 */
export function findPokemon(name) {

    return pokemonData.find(
        p => p.name === name
    );

}

/**
 * datalist生成
 */
export function createPokemonList(listId = "pokemonList") {

    const list = document.getElementById(listId);

    if (!list) return;

    list.innerHTML = "";

    pokemonData
        .sort((a, b) => a.name.localeCompare(b.name, "ja"))
        .forEach(pokemon => {

            const option = document.createElement("option");

            option.value = pokemon.name;

            list.appendChild(option);

        });

}

/**
 * フォームへ自動入力
 */
export function fillPokemon(prefix, pokemon) {

    if (!pokemon) return;

    document.getElementById(`${prefix}Type1`).value = pokemon.type1;
    document.getElementById(`${prefix}Type2`).value = pokemon.type2 ?? "";

    document.getElementById(`${prefix}BaseHP`).value = pokemon.hp;
    document.getElementById(`${prefix}BaseAtk`).value = pokemon.atk;
    document.getElementById(`${prefix}BaseDef`).value = pokemon.def;
    document.getElementById(`${prefix}BaseSpa`).value = pokemon.spa;
    document.getElementById(`${prefix}BaseSpd`).value = pokemon.spd;
    document.getElementById(`${prefix}BaseSpe`).value = pokemon.spe;

}

/**
 * 入力イベント設定
 */
export function registerPokemonInput(inputId, prefix) {

    const input = document.getElementById(inputId);

    input.addEventListener("change", () => {

        const pokemon = findPokemon(input.value);

        if (!pokemon) return;

        fillPokemon(prefix, pokemon);

    });

}
