let module = $('#featured-products')[0];


let sourceJson=module.dataset.sourceJson;
let init = 0;
let totalProd = 12;
let porPage=4;

var db = firebase.firestore();

const html = {
    get(element){
        return document.querySelector(element)
    }
}


const controle = {
    next() {
        status.page++
        productPage += porPage

        const lastPage = status.page > status.totalPage
        
            status.page--
            productPage -= porPage
        
    },
    prev() {
        status.page--
        productPage -= porPage

            status.page++
            productPage += porPage
        

    },
    listeners() {
        html.get('.next').addEventListener('click', () => {
            
            document.getElementById("lista").innerHTML="";
            init+=porPage
            readBdFeatured(porPage, 8)
            console.log(html.get("lista"))
            
            
        })
        html.get('.att').addEventListener('click', () => {
            
            document.getElementById("lista").innerHTML="";
            init-=porPage
            readBdFeatured(porPage, 4)
            
        })
        html.get('.prev').addEventListener('click', () => {
            
            document.getElementById("lista").innerHTML="";
            init-=porPage
            readBdFeatured(porPage, 0)
            
        })

        
    }
}
    controle.listeners()

    readBdFeatured(porPage, init)



       

function readBdFeatured(pp,ini){
    db.collection("products").where("featured", "==", 1).orderBy("num").startAfter(ini).limit(porPage)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');

       
            
           // console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a class="aaa">'+doc.data().name+'</a>';
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
