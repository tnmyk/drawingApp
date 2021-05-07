window.addEventListener("load", () => {
  var linewidth = 7;
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 65.6;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
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
    reset();
    ctx.fillStyle = "white";
  });
  canvas.style.cursor = "url(/img/pencil.svg)0 25,auto";
  var penchoosen =true;
  document.querySelector('#pen').addEventListener('click',()=>{
    if(penchoosen) return;  
    canvas.style.cursor = "url(/img/pencil.svg)0 20,auto";
    ctx.strokeStyle = color.value;
      linewidth -= 10;
      penchoosen=true;
  });
  document.querySelector("#eraser").addEventListener("click", () => {
    if(!penchoosen) return;
    canvas.style.cursor = "url(./img/eraser.svg)0 15,auto";
    linewidth+=10;
    ctx.strokeStyle = document.querySelector("#bcolor").value;
    penchoosen=false;
  });


  var color = document.querySelector("#color");
  color.addEventListener("change", () => {
    ctx.strokeStyle = color.value;
  });

  document.querySelector("#bcolor").addEventListener("change", () => {
    ctx.fillStyle = document.querySelector("#bcolor").value;
    reset();
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
