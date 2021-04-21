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
                title: 'Oops... Têm algum dado faltando',
                text: 'Lembre-se de informar a sua cidade e escolher a cor e o tamanho do calçado   ',
                icon: 'error',
                confirmButtonText: 'Ok, vou fazer isso!'
            })
          }else{
            Swal.fire({
                title: "Só mais uma coisa",
                text: "Quanto ao seu produto, você quer...",
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
                    if(answers == '"in"'){
                        Swal.fire({
                            title: "Agora é serio! Ultima coisa",
                            text: "Selecione a cidade onde devemos te levar seu produto.",
                            input: 'select',
                            icon: 'info',
                            inputOptions: {
                                'via': 'Viana: Frete Grátis',
                                'pen': 'Penalva: Frete Grátis',
                                'vit': 'Vitória do Mearin: +R$15',
                                'ara': 'Arari: +R$15',
                                'mat': 'Matinha: +R$15',
                                'oli': 'Olinda nova: +R$15',
                                'caj': 'Cajari: +R$15'
                            },confirmButtonText: 'Pronto!'
                          })
                    }else{
                        Swal.fire({
                            title: answers,
                            html: `
                              Your answers:
                              <pre><code>${answers}</code></pre>
                            `,
                            confirmButtonText: 'Lovely!'
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
            document.getElementById("brand-div").innerHTML = '<img class="col-4 col-lg-7 w-100 shadow-sm rounded" src="img/'+doc.data().marca.replace(" ","").toLowerCase()+'.png"> <h6 class="col-4 col-lg-7 text-center">'+doc.data().marca+'</h6>'
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