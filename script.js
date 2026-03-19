let jogo = [
["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]
];

const tabuleiro = document.getElementById("tabuleiro");

let selecionada = null;
let movimentosPossiveis = [];
let turno = "branco";

function corDaPeca(peca){

let brancas = ["♙","♖","♘","♗","♕","♔"];
let pretas = ["♟","♜","♞","♝","♛","♚"];

if(brancas.includes(peca)) return "branco";
if(pretas.includes(peca)) return "preto";

return null;

}

function desenharTabuleiro(){

tabuleiro.innerHTML = "";

for(let linha=0;linha<8;linha++){
for(let coluna=0;coluna<8;coluna++){

let casa = document.createElement("div");

casa.classList.add("casa");

if((linha+coluna)%2===0)
casa.classList.add("branca");
else
casa.classList.add("preta");

let peca = jogo[linha][coluna];

casa.innerHTML = peca;

if(peca !== ""){
let cor = corDaPeca(peca);

if(cor === "branco"){
casa.classList.add("peca-branca");
}else{
casa.classList.add("peca-preta");
}
}

casa.dataset.linha = linha;
casa.dataset.coluna = coluna;

casa.addEventListener("click", clicarCasa);

tabuleiro.appendChild(casa);

}
}

destacarMovimentos();
destacarSelecionada();
destacarXeque();

}

function clicarCasa(){

let linha = parseInt(this.dataset.linha);
let coluna = parseInt(this.dataset.coluna);

if(selecionada === null){

if(jogo[linha][coluna] !== ""){

let peca = jogo[linha][coluna];

if(corDaPeca(peca) !== turno) return;

selecionada = {linha,coluna};

movimentosPossiveis = calcularMovimentos(jogo,peca,linha,coluna);

desenharTabuleiro();

}

}else{

let movimentoValido = movimentosPossiveis.some(m =>
m.linha === linha && m.coluna === coluna
);

if(movimentoValido){

let copia = JSON.parse(JSON.stringify(jogo));

copia[linha][coluna] = copia[selecionada.linha][selecionada.coluna];
copia[selecionada.linha][selecionada.coluna] = "";

if(reiEmXeque(copia,turno)){
selecionada = null;
movimentosPossiveis = [];
desenharTabuleiro();
return;
}

jogo = copia;

turno = turno === "branco" ? "preto" : "branco";

if(xequeMate(jogo,turno)){
alert("XEQUE-MATE! " + (turno==="branco"?"Pretas":"Brancas") + " venceram!");
}

}

selecionada = null;
movimentosPossiveis = [];

desenharTabuleiro();

}

}

function calcularMovimentos(tabuleiroAtual,peca,linha,coluna){

switch(peca){

case "♙":
case "♟":
return movimentosPeao(tabuleiroAtual,linha,coluna);

case "♘":
case "♞":
return movimentosCavalo(tabuleiroAtual,linha,coluna);

case "♖":
case "♜":
return movimentosTorre(tabuleiroAtual,linha,coluna);

case "♗":
case "♝":
return movimentosBispo(tabuleiroAtual,linha,coluna);

case "♕":
case "♛":
return movimentosRainha(tabuleiroAtual,linha,coluna);

case "♔":
case "♚":
return movimentosRei(tabuleiroAtual,linha,coluna);

}

return [];

}

function destacarMovimentos(){

movimentosPossiveis.forEach(pos=>{

let index = pos.linha*8+pos.coluna;

tabuleiro.children[index].classList.add("movimento");

});

}

function destacarSelecionada(){

if(selecionada){

let index = selecionada.linha*8+selecionada.coluna;

tabuleiro.children[index].classList.add("selecionada");

}

}

function encontrarRei(tabuleiroAtual,cor){

let rei = cor==="branco"?"♔":"♚";

for(let l=0;l<8;l++){
for(let c=0;c<8;c++){

if(tabuleiroAtual[l][c]===rei){
return {linha:l,coluna:c};
}

}
}

}

function reiEmXeque(tabuleiroAtual,cor){

let posRei = encontrarRei(tabuleiroAtual,cor);

let inimigo = cor==="branco"?"preto":"branco";

for(let l=0;l<8;l++){
for(let c=0;c<8;c++){

let peca = tabuleiroAtual[l][c];

if(peca!=="" && corDaPeca(peca)===inimigo){

let movimentos = calcularMovimentos(tabuleiroAtual,peca,l,c);

let ataque = movimentos.some(m =>
m.linha===posRei.linha && m.coluna===posRei.coluna
);

if(ataque) return true;

}

}
}

return false;

}

function destacarXeque(){

["branco","preto"].forEach(cor=>{

if(reiEmXeque(jogo,cor)){

let pos = encontrarRei(jogo,cor);

if(pos){

let index = pos.linha*8 + pos.coluna;

if(tabuleiro.children[index]){
tabuleiro.children[index].classList.add("xeque");
}

}

}

});

}

function xequeMate(tabuleiroAtual,cor){

if(!reiEmXeque(tabuleiroAtual,cor)) return false;

for(let l=0;l<8;l++){
for(let c=0;c<8;c++){

let peca = tabuleiroAtual[l][c];

if(peca!=="" && corDaPeca(peca)===cor){

let movimentos = calcularMovimentos(tabuleiroAtual,peca,l,c);

for(let m of movimentos){

let copia = JSON.parse(JSON.stringify(tabuleiroAtual));

copia[m.linha][m.coluna] = copia[l][c];
copia[l][c] = "";

if(!reiEmXeque(copia,cor)){
return false;
}

}

}

}
}

return true;

}

desenharTabuleiro();