let sectors = [
    {color:"#A63889", label:"240 КК"},
    {color:"#490F59", label:"50 КК"},
    {color:"#A63889", label:"60 КК"},
    {color:"#490F59", label:"80 КК"},
    {color:"#A63889", label:"10 КК"},
    {color:"#490F59", label:"120 КК"},
    {color:"#A63889", label:"140 КК"},
    {color:"#490F59", label:"160 КК"},
    {color:"#A63889", label:"70 КК"},
    {color:"#490F59", label:"90 КК"},
    {color:"#A63889", label:"50 КК"},
    {color:"#490F59", label:"60 КК"},
    {color:"#A63889", label:"180 КК"},
    {color:"#490F59", label:"200 КК"},
    {color:"#A63889", label:"250 КК"},
    {color:"#490F59", label:"170 КК"},
    {color:"#A63889", label:"60 КК"},
    {color:"#490F59", label:"70 КК"},
    {color:"#A63889", label:"1500 КК"},
    {color:"#490F59", label:"90 КК"},
    {color:"#A63889", label:"100 КК"},
    {color:"#490F59", label:"120 КК"},
    {color:"#A63889", label:"150 КК"},
    {color:"#490F59", label:"300 КК"},
    {color:"#A64442", label:"110 КК"}
  ];
  
  const rand = (m, M) => Math.random() * (M - m) + m;
  let tot = sectors.length;
  const EL_spin = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext('2d');
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  let arc = TAU / sectors.length;
  
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  
  const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
    ctx.restore();
  };
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    EL_spin.textContent = sector.label;
    EL_spin.style.background = sector.color;
  }
  
  function frame() {
    if (!angVel) return;
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine)
  }
  
  // INIT
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  EL_spin.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.35);
  });
  buttonAddEl.addEventListener("click", () => {
    const newEl = inputAddEl.value;
    const newColor = inputAddColor.value;
    sectors.push({
      color: newColor, label: newEl
    })
    tot = sectors.length;
    arc = TAU / sectors.length;
    
    sectors.forEach(drawSector);
    setTimeout(() => {
       inputAddEl.value = "";
        inputAddColor.value = "#";
        console.log(sectors);
    }, 500)
  })
  