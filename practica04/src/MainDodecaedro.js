window.addEventListener("load", function(evt) {
  var canvas = document.getElementById('canvas_webgl');
  var gl = canvas.getContext('experimental-webgl');
  const colors = [1,1,1];
  var dodecaedro = new CG.Dodecaedro(gl, colors, canvas.width, canvas.height, 4, new CG.Matrix4());
  dodecaedro.draw(gl);
});