let module = $('#featured-products')[0];


let sourceJson=module.dataset.sourceJson;
let productPage=0;
let ini = 0;
let porPage=4;

var db = firebase.firestore();


readBdFeatured()


        const status = {
            page: 1,
            porPage,
            totalPage: Math.ceil(productList.length / porPage),
            filter(){
                for(var i=0;i<productList.length;i++){
                    if(productList[i].featured == 0){
                        productList.splice(i,1)
                    }
                }
            }
        }
        const controle = {
           next() {
                status.page = 3
                productPage = 8
                const lastPage = status.page > status.totalPage
                if(lastPage){
                    status.page--
                    productPage -= porPage
                }
            },
            att(){
            	   
            		status.page = 2
                	productPage = 4;  	
            },
            prev() {
                status.page = 1
                productPage = 0
                if(status.page < 1){
                    status.page++
                    productPage += porPage
                }
            },
            listeners() {
                html.get('.next').addEventListener('click', () => {
                    controle.next()
                    update()
                    list.update()                   
                })
                html.get(".att").addEventListener('click', () => {
                    controle.att()
                    update()
                    list.update()
                })
                html.get(".prev").addEventListener('click', () => {
                    controle.prev()
                    update()
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
                if(status.page == 1){
                	html.get('.aprev').classList.add("pag-active");
                    html.get('.aatt').classList.remove("pag-active");
                    html.get('.anext').classList.remove("pag-active");
                } else if(status.page == 2){
                    html.get('.aprev').classList.remove("pag-active");
                    html.get('.aatt').classList.add("pag-active");
                    html.get('.anext').classList.remove("pag-active");
                }else if(status.page == 3){
                    html.get('.aprev').classList.remove("pag-active");
                    html.get('.aatt').classList.remove("pag-active");
                    html.get('.anext').classList.add("pag-active");
                }
                
                fillProductList(productList,porPage,productPage,ini)          
            }
        }         
        controle.listeners();
        status.filter()
        function update(){
            console.log(status.page)
        }
        list.update();
   

    
    http.open('get',sourceJson,true);
    http.send();


function fillProductList(list, pp, prp,init){
    for(let i in list){
        if(i>pp-1)
            break;
        let htmlText='';
        let product = list[parseInt(i)+prp];
        if(product==undefined)
            break;
            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+product.thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a href="">'+product.name+'</a>';
            htmlText+='<h3>R$'+product.price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a id='+parseInt(parseInt(i)+prp, 10)+' class="btnsell btn shadow" href="product-details.html">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;

            var prod = document.querySelectorAll('.btnsell');  

            function handleClick (event) {
                setCookie("nome_produto", list[this.id].name);;
            }

            prod.forEach(function(item){
                item.addEventListener('click', handleClick, {once: false});
            });
        
        
    }
}

            function setCookie(name, value, duration) {
                var cookie = name + "=" + escape(value);
                document.cookie = cookie;
            }
function readBdFeatured(){
    db.collection("products").where("featured", "==", 1)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let i=0;
            console.log(i)
            i++
            console.log(i)
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');
            console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a   >'+doc.data().name+'</a>';
            htmlText+='<h3>R$'+doc.data().price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a  class="btnsell btn shadow" href="product-details.html?produto='+doc.data().name+'&id='+doc.data().id+'">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });;
}
