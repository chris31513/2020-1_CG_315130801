$(document).ready(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    /*Función que dibuja los ejes x y y para que se haga más fácil ubicar la posición*/
    function dibujaEjes(){
        context.lineWidth = 1;
        context.setLineDash([8, 5]);
        context.strokeStyle = "gray";
        context.beginPath();

        /*Eje x*/
        context.moveTo(400, 0);
        context.lineTo(400, 600);

        /*Eje y*/
        context.moveTo(0, 300);
        context.lineTo(800, 300);

        context.stroke();
        context.closePath();

        context.moveTo(400, 300);
    }

    dibujaEjes();

    /*Función encargada de dibujar la curva epicicloide dada una k como entrada, usé la definición que se encuentra en wikipedia para
    facilitar la programación.*/
    function epicicloide(k) {
        /*Centro del canvas*/
        var centroX = 400;
        var centroY = 300;

        /*Radio del circulo grande*/
        var R=100;

        /*Radio del circulo pequeño*/
        var r=R/k;

        /*El ciclo simula el recorrido del circulo pequeño al rededor del grande, por lo que dibuja la curva correspondiente al 
        movimiento, además, la i se incrementa en 0.1 para que los puntos se vean más marcados*/
        for (var i = 1; i <= 360; i+=0.1) {

            x = centroX+(R+r)*Math.cos(i * (Math.PI / 180))-r*Math.cos(Math.PI/5 * 20+(R+r)/r*i * (Math.PI / 180));    
            y = centroY+(R+r)*Math.sin(i * (Math.PI / 180))-r*Math.sin(Math.PI/5 * 20+(R+r)/r*i * (Math.PI / 180));

            context.fillRect(x, y, 1, 1);
        }
    }

    /*Lee el evento de cambio en el input de rango, limpia el canvas y vuelve a dibujar todo lo demás*/
    document.getElementById("inputR").onchange = function(e){
        context.clearRect(0, 0, canvas.width, canvas.height);
        dibujaEjes();
        document.getElementById("inputV").value = document.getElementById("inputR").value
        epicicloide(document.getElementById("inputR").value);
    }
});
