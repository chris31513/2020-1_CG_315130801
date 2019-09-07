$(document).ready(function() {
    var canvas = document.getElementById('canvas');
    canvas.style.background = "#009FFD";
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(650, 100);
    context.bezierCurveTo(650 - 40, 100 + 10, 650 - 20, 100 + 180, 650 + 60, 100 + 70);
    context.bezierCurveTo(650 + 100, 100 + 100, 650 + 150, 100 + 100, 650 + 150, 100 + 70);
    context.bezierCurveTo(650 + 280, 100 + 70, 650 + 230, 100 + 40, 650 + 210, 100 + 20);
    context.bezierCurveTo(650 + 360, 100 - 40, 650 + 210, 100 - 50, 650 + 160, 100 - 30);
    context.bezierCurveTo(650 + 150, 100 - 75, 650 + 80, 100 - 60, 650 + 70, 100 - 30);
    context.bezierCurveTo(650 + 30, 100 - 75, 650 - 10, 100 - 60, 650, 100);

    context.moveTo(50, 100);
    context.bezierCurveTo(50 - 40, 100 + 10, 50 - 20, 100 + 180, 50 + 60, 100 + 70);
    context.bezierCurveTo(50 + 100, 100 + 100, 50 + 150, 100 + 100, 50 + 150, 100 + 70);
    context.bezierCurveTo(50 + 280, 100 + 70, 50 + 230, 100 + 40, 50 + 210, 100 + 20);
    context.bezierCurveTo(50 + 360, 100 - 40, 50 + 210, 100 - 50, 50 + 160, 100 - 30);
    context.bezierCurveTo(50 + 150, 100 - 75, 50 + 80, 100 - 60, 50 + 70, 100 - 30);
    context.bezierCurveTo(50 + 30, 100 - 75, 50 - 10, 100 - 60, 50, 100);

    context.moveTo(950, 100);
    context.bezierCurveTo(950 - 40, 100 + 10, 950 - 20, 100 + 180, 950 + 60, 100 + 70);
    context.bezierCurveTo(950 + 100, 100 + 100, 950 + 150, 100 + 100, 950 + 150, 100 + 70);
    context.bezierCurveTo(950 + 280, 100 + 70, 950 + 230, 100 + 40, 950 + 210, 100 + 20);
    context.bezierCurveTo(950 + 360, 100 - 40, 950 + 210, 100 - 50, 950 + 160, 100 - 30);
    context.bezierCurveTo(950 + 150, 100 - 75, 950 + 80, 100 - 60, 950 + 70, 100 - 30);
    context.bezierCurveTo(950 + 30, 100 - 75, 950 - 10, 100 - 60, 950, 100);

    context.moveTo(350, 100);
    context.bezierCurveTo(350 - 40, 100 + 10, 350 - 20, 100 + 180, 350 + 60, 100 + 70);
    context.bezierCurveTo(350 + 100, 100 + 100, 350 + 150, 100 + 100, 350 + 150, 100 + 70);
    context.bezierCurveTo(350 + 280, 100 + 70, 350 + 230, 100 + 40, 350 + 210, 100 + 20);
    context.bezierCurveTo(350 + 360, 100 - 40, 350 + 210, 100 - 50, 350 + 160, 100 - 30);
    context.bezierCurveTo(350 + 150, 100 - 75, 350 + 80, 100 - 60, 350 + 70, 100 - 30);
    context.bezierCurveTo(350 + 30, 100 - 75, 350 - 10, 100 - 60, 350, 100);

    context.moveTo(350, 100);
    context.bezierCurveTo(350 - 40, 100 + 10, 350 - 20, 100 + 180, 350 + 60, 100 + 70);
    context.bezierCurveTo(350 + 100, 100 + 100, 350 + 150, 100 + 100, 350 + 150, 100 + 70);
    context.bezierCurveTo(350 + 280, 100 + 70, 350 + 230, 100 + 40, 350 + 210, 100 + 20);
    context.bezierCurveTo(350 + 360, 100 - 40, 350 + 210, 100 - 50, 350 + 160, 100 - 30);
    context.bezierCurveTo(350 + 150, 100 - 75, 350 + 80, 100 - 60, 350 + 70, 100 - 30);
    context.bezierCurveTo(350 + 30, 100 - 75, 350 - 10, 100 - 60, 350, 100);
    context.closePath();
    context.fillStyle = "#ffff";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(3, 644);
    context.bezierCurveTo(20, 600, 1, 600, 30, 644);

    for (var i = 30; i < 1269; i+=30) {
        context.moveTo(i, 644);
        context.bezierCurveTo(20 + i, 600, i, 600, 30 + i, 644);
    }

    context.closePath();
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(50, 0, 60, 60, 0, 80);
    context.closePath();
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();


});
