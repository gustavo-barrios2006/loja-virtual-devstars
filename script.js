function carregaProdutos()
{
    fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks")
    .then(async response=>await response.json())
    .then(data=>{
        if(localStorage.hasOwnProperty("carrinho"))
        {
JSON.parse(localStorage.getItem("carrinho")).map(element=>{return {id: element.id, available_quantity: element.available_quantity}}).forEach(element=>{
let i=data.results.findIndex(element2=>element.id==element2.id);
if(data.results[i].available_quantity==element.available_quantity)
{
    data.results.splice(i, 1);
}
else
{
    data.results[i].available_quantity-=element.available_quantity;
}
        });
        }
        let divContainer=document.querySelector(".container");
        data.results.forEach(element=>{
            divContainer.appendChild(montaProduto(element));
        })
//alert(window.getComputedStyle(divProduto.querySelector(".card-img-top")).visibility);
    });
}
function addToCart(id, title, thumbnail, price, old_price, botao)
{
    const elementoQuantidade=botao.closest(".card").querySelector(".lista_produtos__produto__quantidade");
let quantidadeInicial=parseInt(elementoQuantidade.textContent);
        if(quantidadeInicial!==1)
            {
        var quantidadeAdicionar=pedeQuantidade(quantidadeInicial);
    }
    else
    {
        var quantidadeAdicionar=1;
    }
if(!localStorage.hasOwnProperty("carrinho"))
{
    localStorage.setItem("carrinho", JSON.stringify([{id:id, title:title, thumbnail: thumbnail, available_quantity: quantidadeAdicionar, price: price, ...(old_price!=undefined?{old_price}:{})}]));
}
else
{
    let i=JSON.parse(localStorage.getItem("carrinho")).findIndex(element=>element.id==id);
if(i!=-1)
{
    let carrinho=JSON.parse(localStorage.getItem("carrinho"));
carrinho[i].available_quantity+=quantidadeAdicionar;
localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
else
{
    let carrinho=JSON.parse(localStorage.getItem("carrinho"));
    carrinho.push({id:id, title:title, thumbnail:thumbnail, available_quantity: quantidadeAdicionar, price: price, ...(old_price!=undefined?{old_price}:{})});
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
}
if(quantidadeInicial-quantidadeAdicionar==0)
{
{
    let produtoRemover=botao.closest(".card");
    produtoRemover.parentNode.removeChild(produtoRemover);
}
}
else
{
elementoQuantidade.textContent=quantidadeInicial-quantidadeAdicionar;
}
}
function montaProduto(produto, carrinho=false)
{
            const divProduto=document.createElement("div");
            divProduto.classList.add("card")
            const imagemProduto=document.createElement("img");
            imagemProduto.setAttribute("src", produto.thumbnail);
            imagemProduto.setAttribute("alt", "Imagem do produto");
            imagemProduto.classList.add("card-img-top");
            imagemProduto.classList.add("img-fluid");
            divProduto.appendChild(imagemProduto);
            {
            const divCorpo=document.createElement("div");
            {
            const cabecalhoNome=document.createElement("h5");
            cabecalhoNome.classList.add("card-title");
            cabecalhoNome.textContent=produto.title;
            divCorpo.appendChild(cabecalhoNome);
            }
            {
const divTextos=document.createElement("div");
divTextos.classList.add("d-flex");
divTextos.classList.add("justify-content-between");
            {
                const spanPreco=document.createElement("span");
                spanPreco.classList.add("font-weight-bold");
                spanPreco.textContent=produto.hasOwnProperty("original_price")&&produto.original_price!=null?`Preço atual: R$${produto.price.toFixed(2).replace('.', ',')}. Preço original: R$${produto.original_price.toFixed(2).replace('.', ',')}. ${(100-((produto.price/produto.original_price)*100)).toFixed(2).replace('.', ',')}% off.`:`Preço: R$${produto.price.toFixed(2).replace('.', ',')}.`;
                divTextos.appendChild(spanPreco);
            }
            {
                const divQuantidade=document.createElement("div");
                {
                    const spanQuantidade=document.createElement("span");
                spanQuantidade.textContent=produto.available_quantity;
                spanQuantidade.classList.add("lista_produtos__produto__quantidade");
                divQuantidade.appendChild(spanQuantidade);
                }
                {
                    const spanQuantidade2=document.createElement("span");
                spanQuantidade2.textContent=`${produto.available_quantity>1?" unidades disponíveis":" unidade disponível"}.`;
                divQuantidade.appendChild(spanQuantidade2);
                }
                divTextos.appendChild(divQuantidade);
            }    
            divCorpo.appendChild(divTextos);
        }
            divCorpo.classList.add("card-body");
            divProduto.appendChild(divCorpo);
        }
        {
            const divRodape=document.createElement("div");
            divRodape.classList.add("card-footer");
            {
                const botaoAcao=document.createElement("button");
                botaoAcao.classList.add("btn");
                botaoAcao.classList.add("btn-primary");
                botaoAcao.setAttribute("type", "button");
                if(!carrinho)
                    {
                    botaoAcao.textContent="Adicionar ao carrinho";
                botaoAcao.addEventListener("click", ()=>{
                    addToCart(produto.id, produto.title, produto.thumbnail, produto.price, produto.old_price, botaoAcao);
                });
            }
            else
            {
                botaoAcao.textContent="Remover do carrinho";
                botaoAcao.addEventListener("click", ()=>{
                    removeFromCart(produto.id);
                })
            }
                divRodape.appendChild(botaoAcao);
            }
            divProduto.appendChild(divRodape);
        }
        const spanId=document.createElement("span");
        spanId.style.display="none";
        spanId.textContent=produto.id;
        divProduto.appendChild(spanId);
return divProduto;
}
function carregaItensCarrinho()
{
    const containerItens=document.getElementById("lista_produtos");
    if(!localStorage.hasOwnProperty("carrinho"))
    {
        const cabecalhoCarrinhoVazio=document.createElement("h3");
        cabecalhoCarrinhoVazio.textContent="Carrinho vazio!";
        containerItens.appendChild(cabecalhoCarrinhoVazio);
        return;
    }
    JSON.parse(localStorage.getItem("carrinho")).forEach(element=>{
containerItens.appendChild(montaProduto(element, true));
    });
}
function removeFromCart(id)
{
    let carrinho=JSON.parse(localStorage.getItem("carrinho"));
    let i=carrinho.findIndex(element=>element.id==id);
    const produto=carrinho[i];
    if(produto.available_quantity>1)
    {
        let quantidadeRemover=pedeQuantidade(produto.available_quantity);
        if(quantidadeRemover<produto.available_quantity)
            {
        //carrinho[0].available_quantity=quantidadeRemover;
        carrinho[i].available_quantity-=quantidadeRemover;
    }
    else
    {
        carrinho.splice(i, 1);
    }
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        return;
    }
}
function pedeQuantidade(quantidadeMaxima)
{
    let quantidadeRemover;
    do
        {
        quantidadeRemover=parseInt(prompt(`Digite a quantidade que deseja remover, entre 1 e ${quantidadeMaxima}: `));
        if(quantidadeRemover<1||quantidadeRemover>quantidadeMaxima)
        {
            alert(`Digite uma quantidade válida, entre 1 e ${quantidadeMaxima}.`);
        }
    }
        while(quantidadeRemover<1||quantidadeRemover>quantidadeMaxima);
        return quantidadeRemover;
    }