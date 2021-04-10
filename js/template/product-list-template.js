let module = $('#product-list')[0];

let sourceJson=module.dataset.sourceJson;
let productPage=0;
let porPage=12;

if(sourceJson){
    let productList;
    let http=new XMLHttpRequest();
    let init="";
    var initFilter = getCookie("first_filter");
    var search = getCookie("search")
    if(initFilter != ""){
        init = initFilter
    }
    http.onload=()=>{
        productList=JSON.parse(http.responseText).products

        const html = {
            get(element){
                return document.querySelector(element)
            }
        }

        const status = {
            page: 1,
            porPage,
            totalPage: Math.ceil(productList.length / porPage)
        }

        const controle = {
            next() {
                status.page++
                productPage += porPage

                const lastPage = status.page > status.totalPage
                if(lastPage){
                    status.page--
                    productPage -= porPage
                }else{
                    window.scrollTo( 0, 100 );
                }
            },
            prev() {
                status.page--
                productPage -= porPage

                if(status.page < 1){
                    status.page++
                    productPage += porPage
                }else{
                    window.scrollTo( 0, 100 );
                }

            },
            listeners() {
                html.get('.next').addEventListener('click', () => {
                    controle.next()
                    list.update()
                    
                })
                html.get(".prev").addEventListener('click', () => {
                    controle.prev()
                    list.update()
                })
            }
        }
        const list = {
            ins(item){
                const div = document.createElement('div')
                div.classList.add('item')
                div.innerHTML = item

                html.get('.list').appendChild(div)
            },
            update(){
                html.get('.list').innerHTML = ""
                html.get('.att').innerHTML = status.page
                if(init == "undefined" && search == ""){
                    fillProductList(productList,porPage,productPage)
                }else if(search == ""){
                    fillProductListFilter(productList,porPage,productPage,init)
                    html.get('.bd-now').innerHTML = init;
                }else{
                    fillProductListSearch(productList,porPage,productPage,search)
                }
                
                
            }
        }
        
         
        controle.listeners();
        list.update();  

    }

    http.open('get',sourceJson,true);
    http.send();
}
function fillProductList(list, pp, prp){
    for(let i in list){
        if(i>pp-1)
            break;
        let htmlText='';
        let product = list[parseInt(i)+prp];
        if(product==undefined)
            break;
        htmlText+='<div class="mt-4 col-4 col-sm-6 col-md-4 col-lg-3">';
        htmlText+='<div class="product-item card shadow rounded">';
        htmlText+='<div class="product-image">';
        htmlText+='<i class="bi bi-suit-heart"></i>';
        htmlText+='<a>';
        htmlText+='<img src="img/products/'+product.thumbnail+'.png" alt="Product Image"></a>';
        htmlText+='</div>';
        htmlText+='<div class="product-title">';
        htmlText+='<a href="#">'+product.name+'</a>';
        htmlText+='<h3>R$'+product.price+'</h3>';
        htmlText+='</div>';
        htmlText+='<div class="product-price">';
        htmlText+='<a id="'+i+'" class="btn shadow btnsell" href="product-details.html">Comprar</a>';
        htmlText+='</div>';
        htmlText+='</div>';
        htmlText+='</div>';
        document.getElementById("lista").innerHTML+=htmlText;

        var prod = document.querySelectorAll('.btnsell');  

        function setCookie(name, value, duration) {
            var cookie = name + "=" + escape(value);
            document.cookie = cookie;
        }

        function handleClick (event) {
            setCookie("nome_produto", list[this.id].name);
        }

        prod.forEach(function(item){
            item.addEventListener('click', handleClick, {once: false});
        });
    }

}
function fillProductListFilter(list, pp, prp,initialFilter){
    for(let i in list){
        if(i>pp-1)
            break;
        let htmlText='';
        let product = list[parseInt(i)+prp];
        if(!product.category.includes(initialFilter) && !(initialFilter == undefined)){
            console.log("não entra") 
            continue 
        }
        if(product==undefined)
            break;
        htmlText+='<div class="mt-4 col-4 col-sm-6 col-md-4 col-lg-3">';
        htmlText+='<div class="product-item card shadow rounded">';
        htmlText+='<div class="product-image">';
        htmlText+='<i class="bi bi-suit-heart"></i>';
        htmlText+='<a>';
        htmlText+='<img src="img/products/'+product.thumbnail+'.png" alt="Product Image"></a>';
        htmlText+='</div>';
        htmlText+='<div class="product-title">';
        htmlText+='<a href="#">'+product.name+'</a>';
        htmlText+='<h3>R$'+product.price+'</h3>';
        htmlText+='</div>';
        htmlText+='<div class="product-price">';
        htmlText+='<a id="'+i+'" class="btn shadow btnsell" href="product-details.html">Comprar</a>';
        htmlText+='</div>';
        htmlText+='</div>';
        htmlText+='</div>';
        document.getElementById("lista").innerHTML+=htmlText;

        var prod = document.querySelectorAll('.btnsell');  

        function setCookie(name, value, duration) {
            var cookie = name + "=" + escape(value);
            document.cookie = cookie;
        }

        function handleClick (event) {
            setCookie("nome_produto", list[this.id].name);
        }

        prod.forEach(function(item){
            item.addEventListener('click', handleClick, {once: false});
        });
    }

}
function fillProductListSearch(list, pp, prp,sea){
    for(let i in list){
        if(i>pp-1)
            break;
        console.log(list[i].name)
        console.log(sea)
        let htmlText='';
        let product = list[parseInt(i)+prp];
        if(!(product.name == sea) && !(product.size.includes(sea)) && !(product.category.includes(sea)) && !(product.color.includes(sea)) && !(product.marca == sea)     ){
            continue
        }
        if(product==undefined)
            break;
        htmlText+='<div class="mt-4 col-4 col-sm-6 col-md-4 col-lg-3">';
        htmlText+='<div class="product-item card shadow rounded">';
        htmlText+='<div class="product-image">';
        htmlText+='<i class="bi bi-suit-heart"></i>';
        htmlText+='<a>';
        htmlText+='<img src="img/products/'+product.thumbnail+'.png" alt="Product Image"></a>';
        htmlText+='</div>';
        htmlText+='<div class="product-title">';
        htmlText+='<a href="#">'+product.name+'</a>';
        htmlText+='<h3>R$'+product.price+'</h3>';
        htmlText+='</div>';
        htmlText+='<div class="product-price">';
        htmlText+='<a id="'+i+'" class="btn shadow btnsell" href="product-details.html">Comprar</a>';
        htmlText+='</div>';
        htmlText+='</div>';
        htmlText+='</div>';
        document.getElementById("lista").innerHTML+=htmlText;

        var prod = document.querySelectorAll('.btnsell');  

        function setCookie(name, value, duration) {
            var cookie = name + "=" + escape(value);
            document.cookie = cookie;
        }

        function handleClick (event) {
            setCookie("nome_produto", list[this.id].name);
            console.log(list[this.id].name);
        }

        prod.forEach(function(item){
            item.addEventListener('click', handleClick, {once: false});
        });
    }

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



