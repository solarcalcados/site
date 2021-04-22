    var url = window.location.search
    var urlParameters = new URLSearchParams(url)
    var product = urlParameters.get('produto')
    var productId = urlParameters.get('id')

    var db = firebase.firestore();

    var siz = []
    var col = []
    populatPage(siz,col)

    let price = 0
    
    let nameProd =  ""
    let city = ""
    let size = ""
    let color = ""
    let desconto = 0;


    var descendentesCi = document.querySelectorAll(".dropdown-item");
        for (var i = 0; i < descendentesCi.length; i++) {
            descendentesCi[i].addEventListener("click", function (e) {
                city = this.innerHTML;
                if(city == "Penalva" ||city == "Viana"){
                    frete = 0
                    document.getElementById("city-selected").innerHTML = city
                }else{
                    document.getElementById("city-selected").innerHTML = city+': R$15,00';
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
        if(color == "" || size == ""){
            Swal.fire({
                title: 'Oops... Têm algum dado faltando.',
                text: 'Lembre-se de informar a sua cidade e escolher a cor e o tamanho do calçado.',
                icon: 'error',
                confirmButtonText: 'Ok, vou fazer isso!'
            })
          }else{
            Swal.fire({
                title: "Só mais uma coisa...",
                text: "Quanto ao produto, você quer...",
                input: 'radio',
                icon: 'info',
                inputOptions: {
                    'in': 'Retirar na loja</br></br>',
                    'out': 'Receber na minha cidade',
                },
                inputValidator: (value) => {
                    if (!value) {
                    return 'Selecione uma opção!'
                    }
                } 
            }).then((result) => {
                if (result.value) {
                    const answers = JSON.stringify(result.value)
                    if(answers == '"out"'){
                        Swal.fire({
                            title: "Só mais uma coisa...",
                            text: "Selecione a cidade onde devemos levar seu produto.",
                            input: 'select',
                            icon: 'info',
                            inputOptions: {
                                'Viana': 'Viana: Frete Grátis',
                                'Penalva': 'Penalva: Frete Grátis',
                                'Vitória do Mearin': 'Vitória do Mearin: +R$15',
                                'Arari': 'Arari: +R$15',
                                'Matinha': 'Matinha: +R$15',
                                'Olinda Nova': 'Olinda Nova: +R$15',
                                'Cajari': 'Cajari: +R$15'
                            },confirmButtonText: 'Pronto!',
                            showCancelButton: true
                          }).then((resulte) => {
                            if (result.isConfirmed) {
                            let city = JSON.stringify(resulte.value)
                            Swal.fire({
                                title: "Prontinho!",
                                text: "Agora você será direcionada para o WhatsApp da Solar Calçados para finalizar sua compra. Basta enviar a mensagem que será digitada.",
                                icon: 'success',
                                confirmButtonText: 'Pronto!'
                              }).then((result) => {
                                window.location.href = "https://api.whatsapp.com/send?phone=5598987527469&text=Ol%C3%A1.%20Gostaria%20de%20comprar%20o%20produto%3A%20"+nameProd+"%3B%20Tamanho%3A%20"+size+"%20e%20cor%3A%20"+color+"%20do%20site%20para%20entrega%20em%20"+city.replace('"','').replace('"','')+"."
                                
                              })
                            }
                            
                          })
                    }else{
                        Swal.fire({
                            title: "Prontinho!",
                            text: "Agora você será direcionada para o WhatsApp da Solar Calçados para finalizar sua compra.Basta enviar a mensagem que será digitada.",
                            icon: 'success',
                            confirmButtonText: 'Vamos lá!',
                            showCancelButton: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "https://api.whatsapp.com/send?phone=5598987527469&text=Ol%C3%A1.%20Gostaria%20de%20comprar%20o%20produto%3A%20"+nameProd+"%3B%20Tamanho%3A%20"+size+"%20e%20cor%3A%20"+color+"%20do%20site%20para%20retirar%20na%20loja."
                            }
                          })
                    }
                    
                  }
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
            console.log(price)

            desconto = doc.data().desconto
            var sub = desconto/100*(parseFloat(price))
            price = parseFloat(price.replace(",","."))-sub
            if(desconto > 0){
                document.getElementById("desc-prod").innerHTML = '</br><span style="font-size:1.3rem">R$</span>'+price.toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                document.getElementById("product-value").classList.add("havier")
            }

            

            document.getElementById("img-div").innerHTML = '<img class="w-100 shadow-sm rounded" src="img/products/'+doc.data().thumbnail+'-thumb.png">'
            document.getElementById("brand-div").innerHTML = '<img class="col-5 col-lg-7 w-100 shadow-sm rounded" src="img/'+doc.data().marca.replace(" ","").toLowerCase()+'.png"> <h6 class="col-5 col-lg-7 text-center">'+doc.data().marca+'</h6>'
            document.getElementById("loremipsumhere").innerHTML = doc.data().description

            
            if(parseFloat(price) >= 60){
                var valMult = Math.trunc(parseFloat(price/30))
                
                if(valMult > 6){
                    valMult = 6;
                }
                var finValue = price/valMult
                console.log(typeof price)
                console.log(valMult)
                console.log(finValue)
                if(desconto>0){
                    document.getElementById("dividiDesc").innerHTML =  "R$"+ajuste(finValue,2).toString().replace(".",",")
                    document.getElementById("vezesDesc").innerHTML = "até  "+ valMult+"x ";
                }else{
                    document.getElementById("dividi").innerHTML =  "R$"+ajuste(finValue,2).toString().replace(".",",")
                    document.getElementById("vezes").innerHTML = "até  "+ valMult+"x ";
                }
                
            }

            for(let i = 0; i < doc.data().size.length; i++){
                document.getElementById("size-div").innerHTML += '<span id=list[t].size[t] tabindex="0" class="badge badge-danger shadow-sm size">'+doc.data().size[i]+'</span> <span class="selected-size"></span>'
            }
            for(let i = 0; i < doc.data().color.length; i++){
                document.getElementById("color-div").innerHTML += '<span id=list[t].size[t] tabindex="0" class="badge badge-danger shadow-sm color">'+doc.data().color[i]+'</span> <span class="selected-size"></span>'
            }
            


        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
}
function ajuste(nr, casas) {
    const og = Math.pow(10, casas)
    return Math.floor(nr * og) / og;
  }