window.addEventListener("load", function(evt) {

  let file_input = document.getElementById("file_input");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var camara = new CG.Vector3(2,2,-5);
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

  file_input.addEventListener("change", function(evt) {
    let files = evt.target.files;
    let reader = new FileReader();
    reader.onload = function(reader_evt) {
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
            faces[i][j] = faces[i][j].split("//");
        }
      }
      for(i = 0; i < faces.length; i++){
        for(j = 0; j < faces.length; j++){
            if(faces[i][j] != undefined){
                p.push(parseInt(faces[i][j][1]) - 1);
                t.push(parseInt(faces[i][j][0]) - 1);
            }
        }
        l.push(t);
        q.push(p);
        t = [];
        p = [];
      }
      faces = [];
      for(i = 0; i < l.length; i++){
        faces.push(l[i]);
        faces.push(q[i]);
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
            vectors_objects.push(new CG.Vector3((vectors[i][0] / 2), (vectors[i][1] / 2), vectors[i][2]));
          }else{
            vectors_objects.push(new CG.Vector4(vectors[i][0], vectors[i][1], vectors[i][2], vectors[i][3]));
          }
        }catch(e){
          continue;
        }
      }
      function draw_o(obj){
        obj.f.forEach((face) => {
          context.beginPath();
          face.forEach((vert, index) => {
            var vertex = transform(canvas.width, canvas.height, obj.vector[vert]);
            if(index === 0){
              context.moveTo(vertex.x, vertex.y);
            }else{
              context.lineTo(vertex.x, vertex.y);
            }
          });

          context.closePath();
          context.stroke();
        });
      }
      var oj = {f: faces, vector: vectors_objects, new_vertices: [], matrix: new CG.Matrix4()};
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw_o(oj);
      }

      function update_obj(obj) {
        obj.transform = obj.matrix;
        obj.transform = CG.Matrix4.multiply(viewProjectionMatrix, obj.transform);

        obj.vector.forEach((vertex, index) => {
          obj.new_vertices[index] = obj.transform.multiplyVector3(vertex);
        });
      }

      function update() {
        angle += angle_incr;

        update_obj(oj);
      }

      function transform(w, h, v) {
        return {
          x: v.x*w/2 + w/2,
          y: v.y*h/2 + h/2,
          z: v.z
        };
      }

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