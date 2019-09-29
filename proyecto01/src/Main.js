window.addEventListener("load", function(evt) {

  /**
  Se declaran todas las variables que se usarán.
  */
  let file_input = document.getElementById("file_input");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var camara = new CG.Vector3(0,0,5);
  var coi = new CG.Vector3();
  var up = new CG.Vector3(0, 1, 0);
  var viewMatrix = CG.Matrix4.lookAt(camara, coi, up);
  var width = canvas.width;
  var height = canvas.height;
  var aspect = width / canvas.clientHeight;
  var zNear = 1;
  var zFar = 2000;
  var projectionMatrix = CG.Matrix4.perspective(60*Math.PI/180, aspect, zNear, zFar);
  var viewProjectionMatrix = CG.Matrix4.multiply(projectionMatrix, viewMatrix);
  var angle = 0;
  var angle_incr = Math.PI/100;
  let lastTime = Date.now();
  let current = 0;
  let elapsed = 0;
  let max_elapsed_wait = 30/1000;
  let time_step = 0.1;
  let counter_time = 10000;

  /**
  Se genera un listener para el evento change del botón que obtiene el archivo a graficar.
  */
  file_input.addEventListener("change", function(evt) {
    /**
    Se inserta el valor en el campo de texto correspondiente a la cámara
    */
    document.getElementById("X").value = camara.x;
    document.getElementById("Y").value = camara.y;
    document.getElementById("Z").value = camara.z;

    /**
    Se generan las variables que ayudarán a leer el archivo.
    */
    let files = evt.target.files;
    let reader = new FileReader();

    /**
    Se añade una función a ejecutará cuando se carge un archivo.
    */
    reader.onload = function(reader_evt) {
      /**
      Declarando las variables que ayudan a convertir al archivo .obj en una representación de vectores.
      */
      text_content = reader_evt.target.result;
      file_input.value = "";
      var data = text_content.split("\n")
      var mtl_file = "";
      var vectors = [];
      var faces = [];
      var p = [];
      var t = [];
      var q = [];
      var l = [];
      var aux = [];
      var aux1 = [];

      /**
      Transformando el archivo en vectores
      */
      for(i = 0; i < data.length; i++){
        if(data[i].includes("v") && !data[i].includes("n")){
          vectors.push(data[i].replace("v ","").split(" "));
        }else if(data[i].includes("f") && !data[i].includes("off") && !data[i].includes("mtl")){
            if(data[i] != undefined){
                faces.push(data[i].replace("f ", "").split(" "));
            }
        }
      }
      for(i = 0; i < faces.length; i++){
        for(j = 0; j < faces[j].length; j++){
            try{
                if(faces[i][j].includes("/") && !faces[i][j].includes("//")){
                    faces[i][j] = faces[i][j].split("/");
                }else{
                    faces[i][j] = faces[i][j].split("//");   
                }
            }catch(e){
                continue;
            }
        }
      }
      for(i = 0; i < faces.length; i++){
        for(j = 0; j < faces.length; j++){
            if(faces[i][j] != undefined){
                if(aux1[i] == undefined){
                    p.push(parseInt(faces[i][j][1]) - 1);
                    t.push(parseInt(faces[i][j][0]) - 1);
                }else{
                    p.push(parseFloat(faces[i][j][1]) - 1);
                    t.push(parseFloat(faces[i][j][0]) - 1);
                    aux.push(parseFloat(faces[i][j][2]) - 1);
                }
            }
        }
        l.push(t);
        q.push(p);
        aux1.push(aux);
        aux = [];
        t = [];
        p = [];
      }
      faces = [];
      for(i = 0; i < l.length; i++){
        faces.push(l[i]);
        faces.push(q[i]);
        if(aux1[i].length != undefined){
            faces.push(aux1[i]);
        }
      }
      for(i = 0; i < data.length; i++){
        try{
          vectors[i] = vectors[i].map(parseFloat);
        }catch(e){
          continue;
        }
      }
      var vectors_objects = [];
      for(i = 0; i < data.length; i++){
        try{
          if(vectors[i].length == 3){
            vectors_objects.push(new CG.Vector3((vectors[i][0] / 2), (vectors[i][1] / 2), vectors[i][2] / 2));
          }else{
            vectors_objects.push(new CG.Vector4(vectors[i][0] / 2, vectors[i][1] / 2, vectors[i][2] / 2, vectors[i][3] / 2));
          }
        }catch(e){
          continue;
        }
      }

      /**
      Función que recibe un objeto que contiene las caras y los vértices del archivo .ob y pinta las lineas en el canvas.
      */
      function draw_o(obj){
        obj.f.forEach((face) => {
          context.beginPath();
          face.forEach((vert, index) => {
            if(obj.vector[vert] != undefined){
                var vertex = transform(canvas.width, canvas.height, obj.new_vertices[vert]);
                if(index === 0){
                    context.moveTo(vertex.x, vertex.y);
                }else{
                    context.lineTo(vertex.x, vertex.y);
                }
            }
          });

          context.closePath();
          context.stroke();
        });
      }

      /**
      Objeto que contiene la descripción del archivo .obj.
      */
      var oj = {f: faces, vector: vectors_objects, new_vertices: [], matrix: new CG.Matrix4()};

      /**
      Función que limpia el canvas para que se pueda usar con otro objeto.
      */
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw_o(oj);
      }

      /**
      Actualiza el canvas con respecto a la matriz de projeccion.
      */
      function update_obj(obj) {
        obj.transform = obj.matrix;
        obj.transform = CG.Matrix4.multiply(viewProjectionMatrix, obj.transform);

        obj.vector.forEach((vertex, index) => {
          obj.new_vertices[index] = obj.transform.multiplyVector3(vertex);
        });
      }

      /**
      Función que incrementa el ángulo de la projección.
      */
      function update() {
        angle += angle_incr;

        update_obj(oj);
      }

      /**
      Función que transforma la imagen usando la altura y el ancho del canvas.
      */
      function transform(w, h, v) {
        return {
          x: v.x*w/2 + w/2,
          y: v.y*h/2 + h/2,
          z: v.z
        };
      }

      /**
      Función que ejecutará recursivamente las funciones anteriores.
      */
      function animation() {
        // track time
        current = Date.now();
        elapsed = (current - lastTime) / 1000;
        if (elapsed > max_elapsed_wait) {
          elapsed = max_elapsed_wait;
        }


        if (counter_time > time_step) {
          update();
          draw();
          counter_time = 0;
        }
        counter_time += elapsed;

        lastTime = current;
        window.requestAnimationFrame(animation);
      }
      window.requestAnimationFrame(animation);
    };

    if (files.length > 0) {
      reader.readAsText(files[0]);
    }
  });
});