

function init_map(){
	let x = -3.214164;
	let y = -45.0036786
	let city = "Viana"
	var myOptions = {
		zoom:16,
		center:new google.maps.LatLng(-3.2141649,-45.0036786),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
    const html1 = {
        get(element){
	        return document.querySelector(element)
        }
    }

    const control = {
    	listener(){
    		html1.get('.vianabtn').addEventListener('click', () => {
    			x = -3.2141649
    			y = -45.0036786
    			city = "Viana"
    			mape.att()
			})
    		html1.get('.penbtn').addEventListener('click', () => { 
    			x = -3.2941727
        		y = -45.1770698
        		city = "Penalva" 
        		mape.att()
            })	
    	}
    }
    const mape = {
    	att(){
    		map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
	        infowindow = new google.maps.
	        	InfoWindow({
	        		content:'<img src="img/faviconn.png" style="width:100% "/><h1 style="color:black; font-size:20px">'+city+'</h1>'
	        	});
	        marker = new google.maps.Marker({map: map,position:new google.maps.LatLng(x,y)});
	        google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);
    	}
    }

    control.listener()
    mape.att()
}
        	google.maps.event.addDomListener(window, 'load', init_map);

