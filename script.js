function carregaProdutos()
{
    fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks")
    .then(async response=>await response.json())
    .then(data=>{
        data.results.forEach((element, index, array)=>{
            const divProduto=document.createElement("div");
            divProduto.classList.add("card")
            const imagemProduto=document.createElement("img");
            imagemProduto.setAttribute("src", element.thumbnail);
            imagemProduto.setAttribute("alt", "Imagem do produto");
            imagemProduto.classList.add("card-img-top");
            imagemProduto.classList.add("img-fluid");
            divProduto.appendChild(imagemProduto);
            {
            const divCorpo=document.createElement("div");
            {
            const cabecalhoNome=document.createElement("h5");
            cabecalhoNome.classList.add("card-title");
            cabecalhoNome.textContent=element.title;
            divCorpo.appendChild(cabecalhoNome);
            }
            {
const divTextos=document.createElement("div");
divTextos.classList.add("d-flex");
divTextos.classList.add("justify-content-between");
            {
                const spanPreco=document.createElement("span");
                spanPreco.classList.add("font-weight-bold");
                spanPreco.textContent=element.hasOwnProperty("original_price")&&element.original_price!=null?`Preço atual: R$${element.price.toFixed(2).replace('.', ',')}. Preço original: R$${element.original_price.toFixed(2).replace('.', ',')}. ${(100-((element.price/element.original_price)*100)).toFixed(2).replace('.', ',')}% off.`:`Preço: R$${element.price.toFixed(2).replace('.', ',')}.`;
                divTextos.appendChild(spanPreco);
            }
            {
                const divQuantidade=document.createElement("div");
                {
                    const spanQuantidade=document.createElement("span");
                spanQuantidade.textContent=element.available_quantity;
                spanQuantidade.classList.add("lista_produtos__produto__quantidade");
                divQuantidade.appendChild(spanQuantidade);
                }
                {
                    const spanQuantidade2=document.createElement("span");
                spanQuantidade2.textContent=`${element.available_quantity>1?" unidades disponíveis":" unidade disponível"}.`;
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
                const botaoComprar=document.createElement("button");
                botaoComprar.classList.add("btn");
                botaoComprar.classList.add("btn-primary");
                botaoComprar.setAttribute("type", "button");
                botaoComprar.textContent="Adicionar ao carrinho";
                botaoComprar.addEventListener("click", ()=>{
                    addToCart(element.id, element.title, botaoComprar);
                });
                divRodape.appendChild(botaoComprar);
            }
            divProduto.appendChild(divRodape);
        }
        const spanId=document.createElement("span");
        spanId.style.display="none";
        spanId.textContent=element.id;
        divProduto.appendChild(spanId);
document.getElementById("lista_produtos").appendChild(divProduto);
//alert(window.getComputedStyle(divProduto.querySelector(".card-img-top")).visibility);
        });
    });
}
function addToCart(id, title, botao)
{
    const elementoQuantidade=botao.closest(".card").querySelector(".lista_produtos__produto__quantidade");
if(!localStorage.hasOwnProperty("carrinho"))
{
    localStorage.setItem("carrinho", JSON.stringify([{id:id, title:title, quantity: parseInt(elementoQuantidade.textContent)}]));
}
else
{
    let i=JSON.parse(localStorage.getItem("carrinho")).findIndex(element=>element.id==id);
if(i!=-1)
{
localStorage.carrinho[i].quantity+=parseInt(elementoQuantidade.textContent);
}
else
{
    localStorage.carrinho.push({id:id, title:title, quantity: parseInt(elementoQuantidade.textContent)});
}
}
elementoQuantidade.textContent=parseInt(elementoQuantidade.textContent)-1;
}