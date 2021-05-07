window.addEventListener("load", () => {
  var linewidth = 7;
  var color = "black";
  var prevcolor = color;
  var backgroundcolor = "white";
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 65.6;
  ctx.strokeStyle = color;
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
    if (!painting) return;
    ctx.strokeStyle = color;
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
    ctx.strokeStyle = color;
    reset();
  });

  canvas.style.cursor = "url(/img/pencil.svg)0 25,auto";
  var penchoosen = true;
  document.querySelector("#pen").addEventListener("click", () => {
    if (penchoosen) return;
    document.querySelector("#eraser").style.border = "none";
    document.querySelector("#pen").style.border = "2px solid white";
    canvas.style.cursor = "url(/img/pencil.svg)0 20,auto";
    color = prevcolor;
    ctx.strokeStyle = color;
    linewidth -= 10;
    penchoosen = true;
  });
  document.querySelector("#eraser").addEventListener("click", () => {
    if (!penchoosen) return;
    document.querySelector("#eraser").style.border="2px solid white"
    document.querySelector("#pen").style.border = "none";

    canvas.style.cursor = "url(./img/eraser.svg)0 15,auto";
    linewidth += 10;
    prevcolor = color;
    console.log(backgroundcolor);
    color = backgroundcolor;
    penchoosen = false;
  });

  var colormenu = document.querySelector("#color-menu");
  var sizemenu = document.querySelector("#size-menu");
  var setcolor = document.querySelector("#setcolor");
  var setsize = document.querySelector("#setsize");
  var toopen = 0;
  setcolor.addEventListener("click", () => {
    colormenu.style.right = "0vh";
    toopen = 1;
  });
  colormenu.addEventListener("click", (e) => {
    var target = e.target;
    if (toopen == 1) {
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
      if (!penchoosen) {
        canvas.style.cursor = "url(/img/pencil.svg)0 20,auto";
        penchoosen=true;
      }
      setcolor.style.backgroundColor = color;
    } else if (toopen == 2) {
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
      ctx.fillStyle = backgroundcolor;
      reset();
      // if (!penchoosen) color = backgroundcolor;
      setbackgroundcolor.style.backgroundColor = backgroundcolor;
    }
    colormenu.style.right = "-30vh";
  });

  document
    .querySelector("#setbackgroundcolor")
    .addEventListener("click", () => {
      colormenu.style.right = "0vh";
      toopen = 2;
    });
  setsize.addEventListener('click',()=>{
      sizemenu.style.right = "0vh";
  })
  sizemenu.addEventListener('click',(e)=>{
    var target = e.target;
        
    var sizes = document.querySelectorAll(".sizes");
    for(var i=0;i<sizes.length;++i){
      sizes[i].style.border="none";
    }
    switch (target.id) {
      case "zero":
        linewidth = 7;
        document.querySelector("#zero").style.border="2px solid white"
        break;
      case "one":
        linewidth = 10.5;
        document.querySelector("#one").style.border = "2px solid white";
        break;
      case "two":
        linewidth = 14;
        document.querySelector("#two").style.border = "2px solid white";
        break;
      case "three":
        linewidth = 33;
        document.querySelector("#three").style.border = "2px solid white";
        break;
      case "four":
        linewidth = 44;
        document.querySelector("#four").style.border = "2px solid white";
        break;
      case "five":
        linewidth = 54;
        document.querySelector("#five").style.border = "2px solid white";
        break;
      case "six":
        linewidth = 68;
        document.querySelector("#six").style.border = "2px solid white";
        break;
      default:
        break;
    }
      sizemenu.style.right = "-30vh";

  })
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
