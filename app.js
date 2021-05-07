window.addEventListener("load", () => {
  var linewidth = 7;
  var color="black"
  var backgroundcolor ="white"
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 65.6;
 
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(-1, -58);
  var painting = false;
  function startPosition(e) {
    painting = true;
    draw(e);
  }
  function stopPosition() {
    painting = false;
    ctx.beginPath();
  }
  function draw(e) {
     ctx.strokeStyle = color;
    if (!painting) return;
    ctx.lineWidth = linewidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", stopPosition);
  canvas.addEventListener("mousemove", draw);

  window.addEventListener("resize", () => {
    ctx.fillStyle = backgroundcolor;
    ctx.strokeStyle =color;
    reset();
  });
  var prevcolor=color;
  canvas.style.cursor = "url(/img/pencil.svg)0 25,auto";
  var penchoosen =true;
  document.querySelector('#pen').addEventListener('click',()=>{
    if(penchoosen) return;  
    canvas.style.cursor = "url(/img/pencil.svg)0 20,auto";
    color=prevcolor;
    ctx.strokeStyle = color;
      linewidth -= 10;
      penchoosen=true;
  });
  document.querySelector("#eraser").addEventListener("click", () => {
    if(!penchoosen) return;
    canvas.style.cursor = "url(./img/eraser.svg)0 15,auto";
    linewidth+=10;
    prevcolor=color;
    color = backgroundcolor;
    penchoosen=false;
  });

  var colormenu=document.querySelector('#color-menu');
  var setcolor = document.querySelector("#setcolor");
  var toopen=0;
  setcolor.addEventListener("click", () => {
    colormenu.style.right = "0vh";
    toopen=1
  });
  colormenu.addEventListener("click",(e)=>{
    var target = e.target;
    if(toopen==1){
      switch (target.id) {
        case "black":
          color = "black";
          break;
        case "white":
          color = "white";
          break;
        case "red":
          color = "red";
          break;
        case "green":
          color = "greenyellow";
          break;
        case "blue":
          color = "blue";
          break;
        default:
          break;
      }
      setcolor.style.backgroundColor=color;
    }
    else if(toopen==2){
      switch (target.id) {
        case "black":
          backgroundcolor = "black";
          break;
        case "white":
          backgroundcolor = "white";
          break;
        case "red":
          backgroundcolor = "red";
          break;
        case "green":
          backgroundcolor = "greenyellow";
          break;
        case "blue":
          backgroundcolor = "blue";
          break;
        default:
          break;
      }
      ctx.fillStyle =backgroundcolor;
      reset();
      if(!penchoosen) color=backgroundcolor;
      setbackgroundcolor.style.backgroundColor = backgroundcolor;
    }
    colormenu.style.right="-30vh";
  })
  document.querySelector("#setbackgroundcolor").addEventListener("click", () => {
    colormenu.style.right = "0vh";
    toopen=2;
    
  });

  document.querySelector("#delete").addEventListener("click", () => {
    reset();
  });
  function reset() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.fillRect(0, 0, canvas.width, canvas.height + 66);
  }

  document.querySelector("#save").addEventListener("click", () => {
    const dataURI = canvas.toDataURL();
    const a = document.querySelector("#download");
    a.href = dataURI;
    a.download = "canvas-image.png";
  });

  document.querySelector("#size").addEventListener("change", () => {
    linewidth = parseInt(document.querySelector("#size").value);
    console.log(ctx.lineWidth);
  });
});
