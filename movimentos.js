
//♟ movimentosPeao
function movimentosPeao(tabuleiro,linha,coluna){

let movimentos = [];
let peca = tabuleiro[linha][coluna];

let direcao = peca === "♙" ? -1 : 1;
let inimigo = peca === "♙" ? "preto" : "branco";

// andar 1 casa
if(tabuleiro[linha+direcao] && tabuleiro[linha+direcao][coluna] === ""){
movimentos.push({linha:linha+direcao,coluna:coluna});
}

// andar 2 casas no primeiro movimento
if(
(peca === "♙" && linha === 6) ||
(peca === "♟" && linha === 1)
){

if(
tabuleiro[linha+direcao][coluna] === "" &&
tabuleiro[linha+(direcao*2)][coluna] === ""
){
movimentos.push({linha:linha+(direcao*2),coluna:coluna});
}

}

// captura diagonal direita
if(
tabuleiro[linha+direcao] &&
tabuleiro[linha+direcao][coluna+1] &&
corDaPeca(tabuleiro[linha+direcao][coluna+1])===inimigo
){
movimentos.push({linha:linha+direcao,coluna:coluna+1});
}

// captura diagonal esquerda
if(
tabuleiro[linha+direcao] &&
tabuleiro[linha+direcao][coluna-1] &&
corDaPeca(tabuleiro[linha+direcao][coluna-1])===inimigo
){
movimentos.push({linha:linha+direcao,coluna:coluna-1});
}

return movimentos;

}

//♞movimentosCavalo
function movimentosCavalo(jogo, linha, coluna){

let movimentos = [];
let cor = corDaPeca(jogo[linha][coluna]);

let direcoes = [
[-2,-1],[-2,1],
[-1,-2],[-1,2],
[1,-2],[1,2],
[2,-1],[2,1]
];

direcoes.forEach(d => {

let l = linha + d[0];
let c = coluna + d[1];

if(l>=0 && l<8 && c>=0 && c<8){

let destino = jogo[l][c];

if(destino === "" || corDaPeca(destino) !== cor){
movimentos.push({linha:l,coluna:c});
}

}

});

return movimentos;

}

//♜movimentosTorre
function movimentosTorre(jogo, linha, coluna){

let movimentos = [];
let cor = corDaPeca(jogo[linha][coluna]);

let direcoes = [
[1,0],[-1,0],[0,1],[0,-1]
];

for(let d of direcoes){

let l = linha + d[0];
let c = coluna + d[1];

while(l>=0 && l<8 && c>=0 && c<8){

let destino = jogo[l][c];

if(destino === ""){
movimentos.push({linha:l,coluna:c});
}else{

if(corDaPeca(destino) !== cor){
movimentos.push({linha:l,coluna:c});
}

break;
}

l += d[0];
c += d[1];

}

}

return movimentos;

}

//♝movimentosBispo
function movimentosBispo(jogo, linha, coluna){

let movimentos = [];
let cor = corDaPeca(jogo[linha][coluna]);

let direcoes = [
[1,1],[1,-1],[-1,1],[-1,-1]
];

for(let d of direcoes){

let l = linha + d[0];
let c = coluna + d[1];

while(l>=0 && l<8 && c>=0 && c<8){

let destino = jogo[l][c];

if(destino === ""){
movimentos.push({linha:l,coluna:c});
}else{

if(corDaPeca(destino) !== cor){
movimentos.push({linha:l,coluna:c});
}

break;
}

l += d[0];
c += d[1];

}

}

return movimentos;

}

//♛movimentosRainha    
function movimentosRainha(jogo, linha, coluna){

return [
...movimentosTorre(jogo,linha,coluna),
...movimentosBispo(jogo,linha,coluna)
];

}
//♚movimentosRei
function movimentosRei(jogo, linha, coluna){

let movimentos = [];
let cor = corDaPeca(jogo[linha][coluna]);

for(let l=-1;l<=1;l++){
for(let c=-1;c<=1;c++){

if(l===0 && c===0) continue;

let nl = linha+l;
let nc = coluna+c;

if(nl>=0 && nl<8 && nc>=0 && nc<8){

let destino = jogo[nl][nc];

if(destino === "" || corDaPeca(destino) !== cor){
movimentos.push({linha:nl,coluna:nc});
}

}

}
}

return movimentos;

}