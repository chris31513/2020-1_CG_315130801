window.addEventListener("load", function(evt) {
  var canvas = document.getElementById('canvas_webgl');
  var gl = canvas.getContext('experimental-webgl');
  const colors = [
    [0,0,0,1],
    [0,0,1,1],
    [0,1,0,1],
    [0,1,1,1],
    [1,0,0,1],
    [1,0,1,1]
  ];
  var prisma = new CG.PrismaRectangular(gl, colors, canvas.width, canvas.height, 4, new CG.Matrix4());
  prisma.draw(gl);
});