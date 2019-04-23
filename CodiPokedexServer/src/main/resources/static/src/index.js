var CodiPokedex = CodiPokedex || {};
CodiPokedex.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

//States
CodiPokedex.game.state.add('Boot', CodiPokedex.Boot);
CodiPokedex.game.state.add('Preload', CodiPokedex.Preload);
CodiPokedex.game.state.add('Searcher', CodiPokedex.Searcher);
CodiPokedex.game.state.add('Stats', CodiPokedex.Stats);
CodiPokedex.game.state.add('Creator', CodiPokedex.Creator);
CodiPokedex.game.state.add('Deleter', CodiPokedex.Deleter);

CodiPokedex.game.state.start('Boot');

cargarXML();

function cargarXML(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){
            cargar(this);
        }
    };
    xhr.open("GET","configuracion.xml",true);
    xhr.send();
}

function cargar(xml){
    var docXML = xml.responseXML;
    var configuracion = docXML.getElementsByTagName("config");
    console.log("Resolución de la ventana: " + configuracion[0].getElementsByTagName("tamaño_ventana")[0].getElementsByTagName("ancho")[0].textContent + " x " + configuracion[0].getElementsByTagName("tamaño_ventana")[0].getElementsByTagName("alto")[0].textContent);
    console.log("Creadores de la aplicación: " + configuracion[0].getElementsByTagName("creadores")[0].textContent);
}
