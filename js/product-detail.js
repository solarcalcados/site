let detailsProd = $('#details')[0];

let sourceJsonp=detailsProd.dataset.sourceJson;
console.log("inicio")

if(sourceJsonp){

    let productList;
    let prod="";
    let city="";
    let size="";
    let color="";
    let http=new XMLHttpRequest();
    http.onload=()=>{
        productList=JSON.parse(http.responseText).products

        const html = {
            get(element){
                return document.querySelector(element)
            }
        }

        const form = {
            listener(){
                var city = document.querySelectorAll('.dropdown-item');  
                function handleClick (event) {
                    city = this.id;
                    html.get('.city').innerHTML='Enviar para: <br>'+city
                    if(city == "Viana"){
                        console.log("vianaaaa");
                        html.get('.frete').innerHTML = "+10"
                    }else if(city == "Penalva"){
                        console.log("vianaaaa");
                        html.get('.frete').innerHTML = "+30"

                    }   
                }
                city.forEach(function(item){
                    item.addEventListener('click', handleClick, {once: false});
                });


                var size = document.querySelectorAll('.size');  
                function handleClicks (event) {
                    size = this.id;
                    console.log(this.id)
                    html.get('.selected-size').innerHTML=this.id
                }
                size.forEach(function(item){
                    item.addEventListener('click', handleClicks, {once: false});

                });

                var color = document.querySelectorAll('.color');  
                function handleClickc (event) {
                    color = this.id;
                    console.log(this.id)
                    html.get('.selected-color').innerHTML=this.id
                }
                color.forEach(function(item){
                    item.addEventListener('click', handleClickc, {once: false});

                });

                html.get('.btn-sel').addEventListener('click', () => {

                    if(city == "[object NodeList]"){
                        bootbox.alert("Não deixe de informar a <b>pontuação</b> e a <b>cor</b> desejadas e a <b>cidade</b> onde devemos estregar", function(){ 
                            console.log('This was logged in the callback!'); 
                        });
                    }else{
                        bootbox.alert("Você será direcionado ao Whatsapp da Solar Calçados para finalizar a compra", function(){
                            var texto ="Site Solar Calçados. Gostaria de comprar o produto: "+html.get('.product-name').innerHTML+" - Tamanho "+size+" e cor "+color+" para entrega em "+city+"."
                             console.log(texto)
                             window.location.href = "https://api.whatsapp.com/send?phone=559881229919&text=Site%20Solar%20Cal%C3%A7ados.%20Gostaria%20de%20comprar%20o%20produto%3A%20"+html.get('.product-name').innerHTML+"%20-%20Tamanho%20"+size+"%20e%20cor%20"+color+"%20para%20entrega%20em%20"+city+"."
                        });
                }
                    
                })

                console.log(html.get('.product-name').innerHTML+' '+city+' '+size+' '+color)
                
            },
            up(){
                    console.log(city)
                }
             
        }
            

        
        var nome_cookie = getCookie("nome_produto");
        fillProductList(productList,nome_cookie)
        form.listener()
        console.log(nome_cookie)
        console.log("nome_cookie")
    }
    http.open('get',sourceJsonp,true);
    http.send();
}
function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);

    if (begin == -1) {

        begin = cookies.indexOf(prefix);

        if (begin != 0) {
            return null;
        }

    } else {
        begin += 2;
    }

    var end = cookies.indexOf(";", begin);

    if (end == -1) {
        end = cookies.length;                        
    }

    return unescape(cookies.substring(begin + prefix.length, end));
}

function fillProductList(list,productsel){
    for(let i in list){
        let htmlText='';
        let product = list;
        if(product==undefined)
            break;
        if(list[i].name == productsel){
            console.log(list[i].name)
            var parcela = parseFloat(list[i].price)/12
            var nomeProduto = list[i].name;
            var img = list[i].thumbnail;
            var precoProduto = list[i].price;
            var cores = list[i].color.length;
            var tamanhos = list[i].size.length;
            var logoMarca = list[i].logomarca;
            var marca = list[i].marca;
            var descricao = list[i].descricao;
            var desconto = parseInt(list[i].desconto);
            var classPrice = "";
            if(desconto > 0){
                classPrice = "class-price"
            }
            var precofinal = (parseInt(precoProduto)*(100-desconto))/100

            document.querySelector('.bd-now').innerHTML=list[i].name

   
            console.log(desconto)





            htmlText+='<div class="card p-3 m-md-5 shadow blackborder">';
            htmlText+='<div class="row align-items-start">';
            htmlText+='<div class="col-lg-8 p-3">';
            htmlText+='<img class="w-100 shadow-sm rounded" src="img/products/'+img+'-thumb.png">';
            htmlText+='</div>';
            htmlText+='<div class="col-lg-4 p-3 row ">';
            htmlText+='<div class="row ">';
            htmlText+='<div class="col-12 p-4 d-block d-lg-none">';
            htmlText+='<h2 class="product-name">'+nomeProduto+'</h2>';
            htmlText+='</div>';
            htmlText+='<div class="mx-2 col-12">';
            htmlText+='<h4 class="d-lg-block d-none text-white">Pagamento</h4>';
            htmlText+='<h4 class="d-block d-lg-none">Pagamento</h4>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="row">';
            htmlText+='<div class="mx-2 mt-4 col-12 col-sm-6 col-md-6 col-lg-12 row">';
            htmlText+='<h3 style="margin-left: 10px;">';
            htmlText+='<span class="font-weight-normal" style="font-size:0.6em">R$ </span>';
            htmlText+='<span class="'+classPrice+'">'+precoProduto+'</span>';
            htmlText+='<span class="font-weight-normal" style="font-size:0.6em">12x R$ '+parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })+'</span>';
            if(desconto > 0){
                htmlText+='<br><span class="font-weight-normal" style="font-size:0.6em">R$ </span>';
                htmlText+='<span>'+precofinal+'</span>';
            }    
            htmlText+='<h5 class="frete"></h5>';
            htmlText+='</h3>';
            htmlText+='</div>';
            htmlText+='<div class="row mx-2 mt-4 col-12 col-sm-5 col-md-5 col-lg-12">';
            htmlText+='<div class="col">';
            htmlText+='<div class="product-price-range">';
            htmlText+='<div class="dropdown">';
            htmlText+='<div class="dropdown-toggle" data-toggle="dropdown" ><h5>';
            htmlText+='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-truck"viewBox="0 0 16 16">';
            htmlText+='<path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />';
            htmlText+='</svg>';
            htmlText+='<span class="city">Envio para:</span>';
            htmlText+='</h5>';
            htmlText+='</div>';
            htmlText+='<div class="dropdown-menu dropdown-menu-right">';
            htmlText+='<a id="Viana" class="dropdown-item">Viana</a>';
            htmlText+='<a id="Penalva" class="dropdown-item">Penalva</a>';
            htmlText+='<a id="Vit do Mearin" class="dropdown-item">Vitória do Mearin</a>';
            htmlText+='<a id="Arari" class="dropdown-item">Arari</a>';
            htmlText+='<a id="Matinha" class="dropdown-item">Matinha</a>';
            htmlText+='<a id="Olinda Nova" class="dropdown-item">Olinda nova</a>';
            htmlText+='<a id="Cajari" class="dropdown-item">Cajari</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="row mx-2 mt-4 col-12 ">';
            htmlText+='<div class="col-12 col-sm-8 col-lg-12 offset-0 offset-sm-2 offset-lg-0">';
            htmlText+='<button type="button" class="btn-sel btn btn-danger w-100 my-1 shadow-small">Comprar agora</button>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="col-12 row p-4">';
            htmlText+='<div class="col-12 p-2 d-none d-lg-block">';
            htmlText+='<h2>'+nomeProduto+'</h2>';
            htmlText+='</div>';
            htmlText+='<div class="col-md-6 col-lg-4 p-2">';
            htmlText+='<h5>Tamanhos:</h5>';
            htmlText+='<div style="font-size:1.5em">';

            for(var t = 0; t < tamanhos; t++){ 
                htmlText+='<span id='+list[t].size[t]+' tabindex="0" class="badge badge-danger shadow-sm size">'+list[t].size[t]+'</span>';
            }
            htmlText+='<br><span class="selected-size"></span>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="col-md-6 col-lg-4 p-2">';
            htmlText+='<h5>Cores:</h5>';
            htmlText+='<div style="font-size:1.5em">';
            for(var t = 0; t < cores; t++){ 
                htmlText+='<span id='+list[t].color[t]+' tabindex="0" class="badge badge-danger shadow-sm color">'+list[t].color[t]+'</span>';
            }
            htmlText+='<br><span class="selected-color"></span>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="col-lg-4 p-2 row">';
            htmlText+='<h5 class="col-lg-6">Marca:</h5>';
            htmlText+='<div class="col-12">';
            htmlText+='<img class="col-4 col-lg-7 w-100 shadow-sm rounded" src="img/'+logoMarca+'">';
            htmlText+='<h6 class="col-4 col-lg-7 text-center">'+marca+'</h6>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='<div class="col-12 p-2">';
            htmlText+='<h5>Descrição</h5>';
            htmlText+='<p id="loremipsumhere" class="text-justify">';7
            htmlText+=descricao
            htmlText+='</p>';
            htmlText+='</div>';
            htmlText+='</div>';
        }
        
        document.getElementById("lista").innerHTML+=htmlText;

    }

}

