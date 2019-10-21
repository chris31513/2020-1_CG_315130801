window.addEventListener("load", function(evt) {
  var canvas = document.getElementById('canvas_webgl');
  var gl = canvas.getContext('experimental-webgl');
  const colors = [1,1,1];
  var tetraedro = new CG.Tetraedro(gl, colors, canvas.width, canvas.height, 4, new CG.Matrix4());
  tetraedro.draw(gl);
});