window.addEventListener("load", function(evt) {
  var canvas = document.getElementById('canvas_webgl');
  var gl = canvas.getContext('experimental-webgl');
  const colors = [1,1,1];
  var octaedro = new CG.Octaedro(gl, colors, canvas.width, canvas.height, 4, new CG.Matrix4());
  octaedro.draw(gl);
});