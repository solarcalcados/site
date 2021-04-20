let dd = $('#featured-products')[0];
let arch = [];


let sourceJsond=dd.dataset.sourceJson;


if(sourceJsond){
    let productList;
    let http=new XMLHttpRequest();
    http.onload=()=>{
        productList=JSON.parse(http.responseText).products
        const html = {
            get(element){
                return document.querySelector(element)
            }
        }

        
        var db = firebase.firestore();

        //populateBd(productList, db)
      }
      http.open('get',sourceJson,true);
      http.send();  
      
}


function populateBd(list, db){
    for(let i=0; i < list.length; i++){
      console.log(i)
      let product = list[parseInt(i)]
      db.collection("products").doc(product.name).set({
        name: product.name,
        price: product.price,
        size: product.size,
        category: product.category,
        color: product.color,
        marca: product.marca,
        description: product.descricao,
        id: product.code,
        featured: product.featured,
        thumbnail: product.thumbnail,
        logomarca: product.logomarca,
        num: product.num
      })
      .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }
}



