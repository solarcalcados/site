    var url = window.location.search
    var urlParameters = new URLSearchParams(url)
    var product = urlParameters.get('produto')
    var productId = urlParameters.get('id')

    var db = firebase.firestore();

    var siz = []
    var col = []
    populatPage(siz,col)


    
function populatPage(sizes,colors){
    db.collection("products").where("id", "==", productId)

    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            document.getElementById("product-name").innerHTML = doc.data().name;
            document.getElementById("product-name2").innerHTML = doc.data().name;
            document.getElementById("product-value").innerHTML = '<span style="font-size:1.3rem">R$</span>'+doc.data().price;
            document.getElementById("img-div").innerHTML = '<img class="w-100 shadow-sm rounded" src="img/products/'+doc.data().thumbnail+'-thumb.png">'
            document.getElementById("brand-div").innerHTML = '<img class="col-4 col-lg-7 w-100 shadow-sm rounded" src="img/'+doc.data().marca.replace(" ","").toLowerCase()+'.png"> <h6 class="col-4 col-lg-7 text-center">'+doc.data().marca+'</h6>'
            document.getElementById("loremipsumhere").innerHTML = doc.data().description

            if(parseInt(doc.data().price) >= 60){
                var valMult = Math.trunc(parseFloat(doc.data().price)/30)
                if(valMult > 6){
                    valMult = 6;
                }
                var finValue = parseFloat(doc.data().price.replace(",","."))/valMult
                document.getElementById("vezes").innerHTML = "até  "+ valMult+"x ";
                document.getElementById("dividi").innerHTML =  "R$"+finValue.toFixed(2).toString().replace(".",",")
            }


            if(!sizes.includes(doc.data().size)){
                sizes.push(doc.data().size)
                document.getElementById("size-div").innerHTML += '<span id=list[t].size[t] tabindex="0" class="badge badge-danger shadow-sm size">'+doc.data().size+'</span> <span class="selected-size"></span>'
            }
            if(!colors.includes(doc.data().color)){
                colors.push(doc.data().color)
                document.getElementById("color-div").innerHTML+= '<span id=list[t].size[t] tabindex="0" class="badge badge-danger shadow-sm size">'+doc.data().color+'</span> <span class="selected-size"></span>'
            }


        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
}