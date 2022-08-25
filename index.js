const modal = document.querySelector('.modalContainer');
const tbody = document.querySelector('tbody');
const inputDescricao = document.querySelector('#descricao');
const inputQtdEstoque = document.querySelector('#qtdEstoque');
const inputPrecoUni = document.querySelector('#precoUni');
const inputCorredor = document.querySelector('#corredor');
const inputTipoProduto = document.querySelector('#tipoProduto');
const inputUnidadeMedida = document.querySelector('#unidadeMedida');
const inputImagem = document.querySelector('#imagem');
const inputCodigoProduto = document.querySelector("#codigoProduto")
const salvar = document.querySelector('#salvar');
 
let listaProdutos;
let id;
 
function cadastroMercado() {
    const nomeMercInput = document.querySelector("#nomeMercado");
    const logoMercInput = document.querySelector("#logoMercado");
 
    localStorage.setItem("nomeMercadoKey", nomeMercInput.value);
    localStorage.setItem("logoMercadoKey", logoMercInput.value);
 
    nomeMercInput.value = "";
    logoMercInput.value = "";
}
 
const getProdutos = () => JSON.parse(localStorage.getItem('produtos')) ?? [];
const setProdutos = () => localStorage.setItem('produtos', JSON.stringify(listaProdutos));
 
 
function abreModal(edit = false, index = 0) {
    modal.classList.add('active');
 
    modal.onclick = e => {
        if (e.target.className.indexOf('modalContainer') !== -1) {
            modal.classList.remove('active');
        }
    }
 
    if (edit) {
        inputDescricao.value = listaProdutos[index].descricao
        inputQtdEstoque.value = listaProdutos[index].qtdEstoque
        inputPrecoUni.value = listaProdutos[index].precoUni
        inputCorredor.value = listaProdutos[index].corredor
        inputCodigoProduto.value = listaProdutos[index].codigo
        inputTipoProduto.value = listaProdutos[index].tipoProduto
        inputUnidadeMedida.value = listaProdutos[index].unidadeMedida
        inputImagem.value = listaProdutos[index].imagem
        id = index
    } else {
        inputDescricao.value = ''
        inputQtdEstoque.value = ''
        inputPrecoUni.value = ''
        inputCorredor.value = ''
        inputCodigoProduto.value = ''
        inputTipoProduto.value = ''
        inputUnidadeMedida.value = ''
        inputImagem.value = ''
    }
 
}
 
function editaProduto(index) {
    abreModal(true, index)
}
 
function deletaProduto(index) {
    listaProdutos.splice(index, 1)
    setProdutos()
    carregaProdutos()
}
 
function cadastraProduto(item, index) {
    let tr = document.createElement('tr')
 
    tr.innerHTML = `
      <td style="text-align: center; font-weight: 600;">${item.descricao}</td>
      <td style="text-align: center; font-weight: 600;">${item.qtdEstoque}</td>
      <td style="text-align: center; font-weight: 600;">R$ ${item.precoUni}</td>
      <td style="text-align: center; font-weight: 600;"> <img src= ${item.corredor} width="70px" height="70px"></td>
      <td style="text-align: center; font-weight: 600;"> ${item.codigo} </td>
      <td style="text-align: center; font-weight: 600;"> ${item.tipoProduto}</td>
      <td style="text-align: center; font-weight: 600;"> ${item.unidadeMedida}</td>
      <td style="text-align: center; font-weight: 600;"> <img src= ${item.imagem} width="70px" height="70px"></td>
      <td class="acao">
      <button onclick="editaProduto(${index})"><i class='bx bx-edit'></i></button>
      </td>
      <td class="acao">
      <button onclick="deletaProduto(${index})"><i class='bx bx-trash'></i></button>
      </td>
      <td style="text-align: center; font-weight: 600;">R$ ${item.precoUni * item.qtdEstoque} </td>
    `
    tbody.appendChild(tr)
}
 
function carregaProdutos() {
    listaProdutos = getProdutos()
    tbody.innerHTML = ''
    listaProdutos.forEach((item, index) => {
        cadastraProduto(item, index)
    })
 
}
 
function sair() {
    const confirma = confirm("Tem certeza que deseja sair?")
    if (confirma == 1){
        window.close('paginaInicial.html');
        localStorage.clear();
        window.open('cadastroMercado.html');
    } else {
        carregaProdutos();
    }
}
 
salvar.onclick = e => {
 
    if (inputDescricao.value == '' || inputQtdEstoque.value == '' || inputPrecoUni.value == '' || inputCorredor.value == '' || inputCodigoProduto.value == '' || inputTipoProduto.value == '' || inputUnidadeMedida.value == '' || inputImagem.value == '') {
        return
    }
 
    e.preventDefault();
 
    if (id !== undefined) {
        listaProdutos[id].descricao = inputDescricao.value
        listaProdutos[id].qtdEstoque = inputQtdEstoque.value
        listaProdutos[id].precoUni = inputPrecoUni.value
        listaProdutos[id].corredor = inputCorredor.value
        listaProdutos[id].corredor = inputCodigoProduto.value
        listaProdutos[id].tipoProduto = inputTipoProduto.value
        listaProdutos[id].unidadeMedida = inputUnidadeMedida.value
        listaProdutos[id].imagem = inputImagem.value
    } else {
        listaProdutos.push({ 'descricao': inputDescricao.value, 'qtdEstoque': inputQtdEstoque.value, 'precoUni': inputPrecoUni.value, 'corredor': inputCorredor.value, 'codigo': inputCodigoProduto.value, 'tipoProduto': inputTipoProduto.value, 'unidadeMedida': inputUnidadeMedida.value, 'imagem': inputImagem.value })
    }
 
    setProdutos()
 
    modal.classList.remove('active');
    carregaProdutos();
    id = undefined;
}
 
const nomeMercInput2 = localStorage.getItem("nomeMercadoKey");
const logoMercInput2 = localStorage.getItem("logoMercadoKey");
 
const mostraNomeMerc = document.querySelector("#nomeDoMercado");
mostraNomeMerc.textContent = nomeMercInput2;
 
const mostraImagem = document.querySelector("#mostraImagem");
const imagemElement = document.createElement('img');
imagemElement.src = logoMercInput2;
imagemElement.width = 110;
imagemElement.height = 100;
mostraImagem.append(imagemElement);
document.title = "Mercado " + nomeMercInput2;
 
carregaProdutos();
 
