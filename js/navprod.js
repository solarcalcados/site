
            var teste = document.querySelectorAll("#pc-header"); 
            setCookie("first_filter", );
            setCookie("search", "");
            
            function setCookie(name, value, duration) {
                var cookie = name + "=" + escape(value);
                document.cookie = cookie;
            }   

            function handleClickn (event) {
                setCookie("first_filter", this.id);
            }

            function handleClick (event) {


                console.log("click");
                var teste = document.querySelectorAll(".nav-op")
                teste.forEach(function(item){
                    item.addEventListener('click', handleClickn, {once: false});
                });

                let btnSearch = document.getElementById("btn-search")
                btnSearch.addEventListener('click', () => {
                    let inputSearch = document.getElementById("input-search").value
                    setCookie("search", inputSearch);
                });


            }

            teste.forEach(function(item){
                item.addEventListener('mouseup', handleClick, {once: false});
            });

            
            