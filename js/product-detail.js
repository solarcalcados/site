    var url = window.location.search
    var urlParameters = new URLSearchParams(url)
    var product = urlParameters.get('produto')
    var productId = urlParameters.get('id')

    var db = firebase.firestore();

    var siz = []
    var col = []
    populatPage(siz,col)

    let price = 0
    
    var frete = 15.00
    let nameProd =  ""
    let city = ""
    let size = ""
    let color = ""

    var descendentesCi = document.querySelectorAll(".dropdown-item");
        for (var i = 0; i < descendentesCi.length; i++) {
            descendentesCi[i].addEventListener("click", function (e) {
                city = this.innerHTML;
                if(city == "Penalva" ||city == "Viana"){
                    frete = 0
                    document.getElementById("city-selected").innerHTML = city
                }else{
                    document.getElementById("city-selected").innerHTML = city+': R$'+frete;
                }
                
            })
        }
        $('#color-div').click((e) => {
            color = e.target.innerHTML;
            document.getElementById("color-chosed").innerHTML = color
          });
        $('#size-div').click((e) => {
            size = e.target.innerHTML;
            document.getElementById("size-chosed").innerHTML = size
        });
    
    document.getElementById('comprar').onclick = function(){
        if(city == "" || color == "" || size == ""){
            Swal.fire({
                title: 'Oops... Têm algum dado faltando',
                text: 'Lembre-se de informar a sua cidade e escolher a cor e o tamanho do calçado   ',
                icon: 'error',
                confirmButtonText: 'Ok, vou fazer isso!'
            })
          }else{
            Swal.fire({
                title: 'Só mais um pouco...',
                text: 'Você será direcionado ao whatsapp da Solar Calçados para finalizar sua compra',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Ok, vamos lá!',
                cancelButtonText: 'Ainda não'
            }).then((result) => {
                window.location.href =  "https://api.whatsapp.com/send?phone=5598987527469&text=Site%20Solar%20Cal%C3%A7ados.%20Gostaria%20de%20comprar%20o%20produto%3A%20"+nameProd+"%20-%20Tamanho%3A%20"+size+"%3B%20Cor%3A%20"+color+"%3B%20Para%20entrega%20em%20"+city+"."
                console.log("compra do produto: "+nameProd+" cor:"+color+" tamanho: "+size+" cidade: "+city)
            })  
          }
            
        

    };
    
function populatPage(sizes,colors){
    db.collection("products").where("id", "==", productId)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            document.getElementById("product-name").innerHTML = doc.data().name;
            document.getElementById("product-name2").innerHTML = doc.data().name;
            nameProd = doc.data().name

            document.getElementById("product-value").innerHTML = '<span style="font-size:1.3rem">R$</span>'+doc.data().price;
            price = doc.data().price

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
                document.getElementById("color-div").innerHTML+= '<span id=list[t].size[t] tabindex="0" class="badge badge-danger shadow-sm color">'+doc.data().color+'</span> <span class="selected-size"></span>'
            }


        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
}