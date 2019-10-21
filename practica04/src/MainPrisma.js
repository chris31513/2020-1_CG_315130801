window.addEventListener("load", function(evt) {
  var canvas = document.getElementById('canvas_webgl');
  var gl = canvas.getContext('experimental-webgl');
  const colors = [1,1,1];
  var prisma = new CG.PrismaRectangular(gl, colors, canvas.width, canvas.height, 4, new CG.Matrix4());
  prisma.draw(gl);
});