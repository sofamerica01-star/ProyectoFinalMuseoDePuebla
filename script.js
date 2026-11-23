"use strict";
const W=800,H=500,PASO=5,TILE=4;
const cv=document.getElementById("lienzo"),ctx=cv.getContext("2d");
cv.width=W;cv.height=H;
const $=id=>document.getElementById(id);

/* ---------- 1. Mural generado por código (sin imágenes externas) ---------- */
function dibujarCholula(g){
  let s=g.createLinearGradient(0,0,0,340);
  [[0,"#243b7a"],[.45,"#c2557a"],[.8,"#f08a4b"],[1,"#f7c873"]].forEach(a=>s.addColorStop(a[0],a[1]));
  g.fillStyle=s;g.fillRect(0,0,W,H);
  g.fillStyle="#ffe9a8";g.beginPath();g.arc(640,250,40,0,7);g.fill();
  // Popocatépetl
  g.fillStyle="#4a3b6b";g.beginPath();g.moveTo(40,345);g.lineTo(230,150);g.lineTo(255,135);g.lineTo(285,142);g.lineTo(310,160);g.lineTo(480,345);g.fill();
  g.fillStyle="#f1ecf5";g.beginPath();g.moveTo(230,150);g.lineTo(255,135);g.lineTo(285,142);g.lineTo(310,160);g.lineTo(290,166);g.lineTo(272,154);g.lineTo(255,172);g.lineTo(238,160);g.fill();
  for(let i=0;i<7;i++){g.fillStyle="rgba(225,215,228,"+(.6-i*.07)+")";g.beginPath();g.arc(270+i*10,120-i*14,10+i*3,0,7);g.fill();}
  g.fillStyle="#2f3b4f";g.beginPath();g.moveTo(0,345);g.bezierCurveTo(150,300,300,330,420,320);g.bezierCurveTo(560,305,680,335,800,310);g.lineTo(800,360);g.lineTo(0,360);g.fill();
  let p=g.createLinearGradient(0,330,0,H);p.addColorStop(0,"#3c7a48");p.addColorStop(1,"#244a30");
  g.fillStyle=p;g.fillRect(0,335,W,165);
  // Gran Pirámide de Cholula
  const cx=420,base=425,anchos=[470,390,310,230];
  anchos.forEach((w,i)=>{const y=base-(i+1)*38;
    g.fillStyle="#8a5a3a";g.fillRect(cx-w/2,y,w,38);
    g.fillStyle="#6aa05a";g.fillRect(cx-w/2,y,w,9);
    g.fillStyle="rgba(0,0,0,.18)";g.fillRect(cx-w/2,y+30,w,8);});
  g.fillStyle="#d8b27a";g.beginPath();g.moveTo(cx-22,base);g.lineTo(cx+22,base);g.lineTo(cx+12,base-152);g.lineTo(cx-12,base-152);g.fill();
  // Santuario de los Remedios
  const t=base-152;
  g.fillStyle="#f1dfae";g.fillRect(cx-36,t-32,72,32);
  g.fillRect(cx-38,t-58,13,26);g.fillRect(cx+25,t-58,13,26);
  g.fillStyle="#b8323a";[cx-38,cx+25].forEach(x=>{g.beginPath();g.moveTo(x-1,t-58);g.lineTo(x+6.5,t-72);g.lineTo(x+14,t-58);g.fill();});
  g.fillStyle="#e2b24a";g.beginPath();g.arc(cx,t-32,22,Math.PI,0);g.fill();g.fillRect(cx-4,t-62,8,12);
  g.fillStyle="#6b3b22";g.beginPath();g.moveTo(cx-7,t);g.lineTo(cx-7,t-14);g.arc(cx,t-14,7,Math.PI,0);g.lineTo(cx+7,t);g.fill();
  // agaves y franja de azulejos
  g.fillStyle="#1d5a3e";[60,130,730,680].forEach(x=>{for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(x,440);g.lineTo(x+k*14,395+Math.abs(k)*9);g.lineTo(x+k*14+7,440);g.fill();}});
  g.fillStyle="#3a2a1d";g.fillRect(0,440,W,60);
  for(let x=0;x<W;x+=20)for(let y=440;y<H;y+=20){
    g.fillStyle="#f4f1ea";g.fillRect(x,y,20,20);
    g.fillStyle="#2a5fa8";g.beginPath();g.arc(x+10,y+10,7,0,7);g.fill();
    g.fillStyle="#f4f1ea";g.beginPath();g.arc(x+10,y+10,3,0,7);g.fill();
    g.strokeStyle="#2a5fa8";g.strokeRect(x+.5,y+.5,19,19);}
}

/* ---------- 1b. Escenarios patrimoniales: cada uno con su dibujo, su sentido y sus sucesos ---------- */
const rc=(g,c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
const ci=(g,c,x,y,r)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill();};
const po=(g,c,p)=>{g.fillStyle=c;g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.fill();};
function cielo(g,cs,h){const s=g.createLinearGradient(0,0,0,h||H);cs.forEach((c,i)=>s.addColorStop(i/(cs.length-1),c));g.fillStyle=s;g.fillRect(0,0,W,H);}

function dibujarCentroHistorico(g){cielo(g,["#2b3f7c","#d0627a","#f7b36a"],380);
  const cs=["#e2b24a","#c8503f","#3f7fb0","#e9d9b0","#b8663a","#6aa58a"];let x=-10,k=0;
  while(x<W){const w=110+k*37%40,h=150+k*53%90,y=400-h;
    rc(g,cs[k%6],x,y,w,h);rc(g,"rgba(0,0,0,.2)",x,y,w,8);rc(g,"#f4f1ea",x-3,y-6,w+6,7);
    for(let r=0;r<((h-60)/55|0);r++)for(let q=0;q<2;q++){const wx=x+18+q*(w-62),wy=y+22+r*52;
      rc(g,"#2a2f4a",wx,wy,26,34);rc(g,"#f4d18c",wx+4,wy+4,18,26);rc(g,"#3a2a1d",wx-4,wy+34,34,4);}
    rc(g,"#5a3a22",x+w/2-14,354,28,46);x+=w;k++;}
  rc(g,"#6a6670",0,400,W,100);
  for(let i=0;i<9;i++)rc(g,"rgba(255,255,255,.12)",i*100+i%2*30,420+i%3*22,60,6);
  [140,400,660].forEach(x=>{rc(g,"#2a2f3a",x-2,330,4,90);ci(g,"#ffd98a",x,326,9);});}

function dibujarCatedral(g){cielo(g,["#27407f","#b85a86","#f3a768"],360);
  rc(g,"#d9d0bd",230,200,340,200);
  g.fillStyle="#3f7fb0";g.beginPath();g.arc(400,205,82,Math.PI,0);g.fill();
  g.strokeStyle="#e2b24a";g.lineWidth=3;
  for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(400,205);g.lineTo(400+i*26,205-Math.sqrt(6724-i*i*676));g.stroke();}
  rc(g,"#e2b24a",396,105,8,24);
  for(const tx of [190,530]){rc(g,"#cfc6b2",tx,80,80,320);rc(g,"#b9b09c",tx,80,8,320);
    for(let i=0;i<4;i++)rc(g,"#2a2f4a",tx+28,118+i*62,24,36);
    rc(g,"#e2b24a",tx-6,74,92,8);po(g,"#3f7fb0",[[tx-4,74],[tx+40,-5],[tx+84,74]]);}
  g.fillStyle="#6b4a2a";g.beginPath();g.arc(400,300,40,Math.PI,0);g.fill();rc(g,"#6b4a2a",360,300,80,100);
  ci(g,"#f4d18c",400,232,18);ci(g,"#2a2f4a",400,232,9);
  rc(g,"#8d8478",0,400,W,100);rc(g,"#b9b09c",320,392,160,8);rc(g,"#a79e8a",300,400,200,8);
  for(let i=0;i<10;i++)rc(g,"rgba(255,255,255,.1)",i*80,430+i%3*20,50,5);}

function dibujarPalafoxiana(g){const lc=["#7a2a2a","#2a4a7a","#c8963a","#3a6a4a","#e9d9b0","#5a3a22"];
  const gr=g.createRadialGradient(400,40,10,400,40,460);gr.addColorStop(0,"#f7d99a");gr.addColorStop(1,"#3a2415");g.fillStyle=gr;g.fillRect(0,0,W,H);
  g.strokeStyle="#c9a15a";g.lineWidth=5;for(let i=0;i<4;i++){g.beginPath();g.ellipse(400,0,90+i*100,60+i*22,0,0,Math.PI);g.stroke();}
  for(const [a,b] of [[0,250],[550,800]])for(const [y0,y1] of [[140,285],[300,430]]){rc(g,"#4a2e18",a,y0,b-a,y1-y0);
    for(let s=0;s<3;s++){const sy=y0+8+s*45;let x=a+6,k=s*7+y0;
      while(x<b-14){const w=7+k*5%9,h=26+k*11%15;rc(g,lc[k%6],x,sy+40-h,w,h);x+=w+1;k++;}
      rc(g,"#8a5a2a",a,sy+40,b-a,5);}}
  rc(g,"#c9a15a",0,288,250,8);rc(g,"#c9a15a",550,288,250,8);
  rc(g,"#7a4a2a",0,430,W,70);for(let i=0;i<14;i++)rc(g,"rgba(0,0,0,.18)",i*60,430,3,70);
  rc(g,"#8a5a2a",290,385,220,12);rc(g,"#5a3a1f",305,397,10,33);rc(g,"#5a3a1f",485,397,10,33);
  po(g,"#f4f1ea",[[340,385],[400,372],[400,385]]);po(g,"#e9d9b0",[[400,372],[460,385],[400,385]]);
  for(const x of [300,500]){rc(g,"#2a2f3a",x-1,60,2,50);ci(g,"#ffd98a",x,118,12);}}

function dibujarBarrios(g){cielo(g,["#2a4a8a","#e0708a","#f7b565"],330);
  rc(g,"#e9d9b0",380,110,60,240);rc(g,"#3a2a1d",396,130,28,44);ci(g,"#3a2a1d",410,130,14);po(g,"#c8503f",[[372,110],[410,60],[448,110]]);
  const cs=["#d96a3a","#3f9fb0","#e2b24a","#c8503f","#7a5ab0"];
  [0,160,330,500,650].forEach((x,i)=>{const w=i==2?170:150,h=110+i*29%50;
    rc(g,cs[i],x,400-h,w,h);rc(g,"#f4f1ea",x,400-h-8,w,8);rc(g,"#3a2a1d",x+w/2-16,340,32,60);
    rc(g,"#f4d18c",x+12,400-h+20,28,34);rc(g,"#f4d18c",x+w-40,400-h+20,28,34);});
  rc(g,"#8a6a4a",0,400,W,100);for(let i=0;i<40;i++)ci(g,"rgba(0,0,0,.15)",i*21%W+10,410+i*13%80,6);
  const fl=["#e0505a","#e2b24a","#3cc2bd","#d96ab0","#7a5ab0"];
  for(const y0 of [170,215]){g.strokeStyle="#f4f1ea";g.lineWidth=2;g.beginPath();g.moveTo(0,y0);g.lineTo(W,y0);g.stroke();
    for(let x=4,i=0;x<W;x+=34,i++)po(g,fl[(i+y0)%5],[[x,y0],[x+28,y0],[x+14,y0+30]]);}
  for(let i=0;i<30;i++)ci(g,i%2?"#f08a1c":"#e2b24a",20+i*26%W,440+i*17%50,5);}

function dibujarTalavera(g){rc(g,"#1c3a78",0,0,W,H);
  for(let x=0;x<W;x+=50)for(let y=0;y<H;y+=50){ci(g,"#3a6bb8",x+25,y+25,16);ci(g,"#1c3a78",x+25,y+25,7);g.strokeStyle="#2a5fa8";g.lineWidth=1;g.strokeRect(x+.5,y+.5,49,49);}
  ci(g,"#e2b24a",400,250,222);ci(g,"#f4f1ea",400,250,214);ci(g,"#2a5fa8",400,250,200);ci(g,"#f4f1ea",400,250,192);
  g.save();g.translate(400,250);
  for(let i=0;i<36;i++){g.rotate(Math.PI/18);ci(g,"#2a5fa8",0,-176,5);}
  for(let i=0;i<12;i++){g.rotate(Math.PI/6);g.fillStyle=i%2?"#2a5fa8":"#e2b24a";g.beginPath();g.ellipse(0,-120,16,50,0,0,7);g.fill();}
  for(let i=0;i<12;i++){g.rotate(Math.PI/6);ci(g,"#3a8a7a",0,-62,10);}
  ci(g,"#2a5fa8",0,0,48);ci(g,"#e2b24a",0,0,34);ci(g,"#f4f1ea",0,0,18);ci(g,"#c8503f",0,0,8);g.restore();
  for(const x of [85,715]){g.fillStyle="#f4f1ea";g.strokeStyle="#2a5fa8";g.lineWidth=4;
    g.beginPath();g.ellipse(x,340,52,80,0,0,7);g.fill();g.stroke();g.beginPath();g.rect(x-22,238,44,40);g.fill();g.stroke();
    rc(g,"#2a5fa8",x-32,230,64,10);for(let i=0;i<5;i++)ci(g,i%2?"#e2b24a":"#2a5fa8",x-32+i*16,330,7);rc(g,"#2a5fa8",x-50,360,100,6);}}

function dibujarPaisaje(g){cielo(g,["#3b6fb0","#9ec9e8","#f6e2b0"],300);
  po(g,"#5a6a9a",[[40,310],[190,150],[340,310]]);po(g,"#f1ecf5",[[190,150],[160,190],[190,178],[220,192]]);
  po(g,"#6a6a9a",[[380,310],[540,185],[700,310]]);po(g,"#f1ecf5",[[540,185],[510,215],[540,205],[570,218]]);
  const col=(c,y1,y2)=>{g.fillStyle=c;g.beginPath();g.moveTo(0,y1);g.bezierCurveTo(250,y1-60,500,y2+60,W,y2);g.lineTo(W,H);g.lineTo(0,H);g.fill();};
  col("#4d8a4a",320,300);
  po(g,"#8a5a3a",[[470,312],[505,272],[615,272],[650,312]]);rc(g,"#6aa05a",505,268,110,8);
  col("#3a7a44",380,350);
  for(let y=405;y<H;y+=16)rc(g,(y/16|0)%2?"#2f6a3a":"#3a7a44",0,y,W,16);
  g.strokeStyle="#7cc4e0";g.lineWidth=14;g.beginPath();g.moveTo(300,H);g.bezierCurveTo(330,440,430,420,470,380);g.stroke();
  for(const [x,y,s] of [[110,410,1.2],[700,400,1.1],[430,350,.6],[600,335,.5]]){
    rc(g,"#5a3a22",x-6*s,y-60*s,12*s,60*s);for(const [a,b,r] of [[0,-70,34],[-26,-56,26],[26,-56,26]])ci(g,"#1d5a3e",x+a*s,y+b*s,r*s);}
  for(let i=0;i<40;i++)ci(g,["#e0505a","#e2b24a","#f4f1ea"][i%3],i*53%W,430+i*29%70,3);}

/* Datos: id → nombre, dibujo, sentido y sucesos [tipo, título, descripción, inversión, presión, efecto, mensaje]. Para ampliar basta añadir objetos aquí. */
const ESC={
 cholula:{n:"Gran Pirámide de Cholula",d:dibujarCholula,
  s:"Sitio arqueológico y paisaje cultural: conservar una estructura monumental implica cuidar también su entorno y los significados que las comunidades le dan.",
  ev:[["Conservación","Mantenimiento arqueológico","Especialistas revisan muros y taludes y consolidan las zonas más frágiles.",85,5,"repara","La investigación especializada y el mantenimiento constante evitan pérdidas que después son irreversibles."],
      ["Turismo","Visitas sin cuidado","Subir por zonas no autorizadas y dejar residuos aumenta el desgaste del sitio y de su entorno.",40,22,"polvo","Seguir senderos y señalética y no dejar basura reduce el desgaste del patrimonio."],
      ["Recursos (hipotético)","Presupuesto reducido","Situación hipotética: se recorta el presupuesto de mantenimiento y las revisiones se espacian.",10,12,"grieta","Sin recursos estables, el mantenimiento preventivo se pospone y los daños pequeños crecen."]]},
 centro:{n:"Centro Histórico de Puebla",d:dibujarCentroHistorico,
  s:"Calles, plazas y fachadas históricas forman un patrimonio urbano que vive del uso cotidiano; su cuidado es una tarea compartida.",
  ev:[["Deterioro","Fachadas descuidadas","La humedad, el cableado y los anuncios sin control opacan fachadas y espacios públicos.",30,19,"grieta","El mantenimiento preventivo cuesta menos que restaurar cuando el daño ya avanzó."],
      ["Participación comunitaria","Vecinos y comercios cuidan su calle","Habitantes y negocios acuerdan limpiar, pintar y cuidar fachadas y plazas.",70,6,"fiesta","Un centro histórico se conserva cuando quienes lo habitan y lo visitan participan en su cuidado."],
      ["Recuperación artística","Una fachada vuelve a mostrarse","Una intervención artística, acompañada de restauración técnica, devuelve color y legibilidad a una fachada.",75,8,"repara","El arte puede acompañar la conservación, pero no sustituye el trabajo técnico."]]},
 catedral:{n:"Catedral de Puebla",d:dibujarCatedral,
  s:"Arquitectura y arte religioso: torres, muros y obras requieren revisiones técnicas y un acceso público que no ponga en riesgo lo que se quiere preservar.",
  ev:[["Clima","Lluvias y humedad","La humedad y los contaminantes afectan la cantera y los elementos decorativos si no se revisan.",35,18,"lluvia","Las revisiones especializadas detectan filtraciones y daños antes de que se agraven."],
      ["Conservación","Revisión de bóvedas y obras","Un equipo técnico documenta y limpia elementos arquitectónicos y obras artísticas.",90,4,"brillo","Documentar y revisar con regularidad protege la estructura y las obras que resguarda."]]},
 palafoxiana:{n:"Biblioteca Palafoxiana",d:dibujarPalafoxiana,
  s:"Patrimonio documental: libros y archivos son memoria colectiva y dependen de condiciones ambientales estables y de una difusión responsable.",
  ev:[["Conservación","Control de humedad y luz","Se vigilan temperatura, humedad e iluminación para proteger papel y encuadernaciones.",80,5,"brillo","Las condiciones ambientales adecuadas son una de las formas más eficaces de conservar un libro."],
      ["Deterioro","Humedad y manipulación","El exceso de humedad y la manipulación sin cuidado pueden dañar libros antiguos.",30,20,"polvo","Proteger una colección también es limitar la manipulación y vigilar su entorno."],
      ["Transmisión cultural","Digitalización responsable","Se digitalizan documentos para difundirlos sin exponer los originales.",75,6,"fiesta","Difundir el conocimiento y proteger los originales pueden ir de la mano."]]},
 barrios:{n:"Barrios tradicionales de Puebla",d:dibujarBarrios,
  s:"Patrimonio vivo: oficios, fiestas y relatos existen mientras las personas los practican y los transmiten entre generaciones.",
  ev:[["Transmisión cultural","Se cuenta la fiesta del barrio","Personas mayores comparten relatos, cocina y fiestas con las nuevas generaciones.",75,4,"fiesta","El patrimonio vivo se conserva cuando se practica y se transmite todos los días."],
      ["Cambio urbano","Cambios en el barrio","Nuevos usos del suelo y de las calles pueden alejar oficios y rutinas comunitarias.",30,21,"polvo","Escuchar a los habitantes al planear la ciudad ayuda a proteger su identidad cultural."]]},
 talavera:{n:"Talavera poblana",d:dibujarTalavera,
  s:"Patrimonio artesanal: técnicas y diseños que se transmiten en los talleres; reconocer la procedencia y a quienes la elaboran fortalece su continuidad.",
  ev:[["Transmisión cultural","Taller de personas artesanas","Maestras y maestros enseñan técnicas, dibujos y procesos a nuevas generaciones.",85,4,"brillo","Valorar el trabajo artesanal mantiene vivo el conocimiento tradicional."],
      ["Autenticidad","Piezas sin procedencia clara","Piezas de origen dudoso compiten con el trabajo artesanal y ocultan su proceso.",35,20,"grieta","Preguntar por el origen y el proceso ayuda a apoyar a quienes crean."]]},
 paisaje:{n:"Paisaje cultural de Cholula",d:dibujarPaisaje,
  s:"Naturaleza, territorio y comunidades: cuidar áreas verdes, reducir residuos y ordenar el crecimiento protege también el patrimonio histórico que las rodea.",
  ev:[["Medio ambiente","Jornada de limpieza y reforestación","Comunidades cuidan áreas verdes, reducen residuos y protegen el entorno.",80,5,"repara","Cuidar el paisaje protege la memoria y la convivencia entre personas, flora y fauna."],
      ["Urbanización","Expansión sin planeación","El crecimiento urbano desordenado y los residuos presionan las áreas verdes.",35,23,"grieta","Ordenar el crecimiento es parte de proteger el patrimonio natural y cultural."]]}
};
function pintarMural(id){const c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d");ESC[id].d(g);return g.getImageData(0,0,W,H).data;}

/* ---------- 2. Partículas (estructura de arreglos para rendimiento) ---------- */
const cols=[],px=[],py=[];
for(let y=PASO/2|0;y<H-TILE;y+=PASO)for(let x=PASO/2|0;x<W-TILE;x+=PASO){px.push(x);py.push(y);cols.push((y*W+x)*4);}
const N=px.length;
const X=Float32Array.from(px),Y=Float32Array.from(py),HX=Float32Array.from(px),HY=Float32Array.from(py);
const VX=new Float32Array(N),VY=new Float32Array(N),casa=new Uint8Array(N).fill(1);
const colN=new Uint32Array(N),colG=new Uint32Array(N);
const empaca=(r,g,b)=>((255<<24)|(b<<16)|(g<<8)|r)>>>0;
function colorear(datos){for(let i=0;i<N;i++){const k=cols[i],r=datos[k],g=datos[k+1],b=datos[k+2],m=(r+g+b)/3*.6+25;
  colN[i]=empaca(r,g,b);colG[i]=empaca(r*.25+m*.75|0,g*.25+m*.75|0,b*.25+m*.75|0);}}
const FONDO=empaca(11,18,36),img=ctx.createImageData(W,H),buf=new Uint32Array(img.data.buffer);

/* ---------- 3. Agentes: clase Vehicle (Reynolds / Nature of Code cap. 5) ---------- */
/* Íconos vectoriales: cada trazo es una ruta SVG [relleno, ruta, color de línea] */
const ICONOS_D={
 persona:[[null,"M-6 1L-10.5-4M6 1L10.5-4","#3cc2bd"],["#3cc2bd","M-6 10V2Q-6-3 0-3Q6-3 6 2V10Z"],["#f4f1ea","M-1.4-3H1.4V10H-1.4Z"],
   ["#f1c9a0","M-3.6-6.5A3.6 3.6 0 1 1 3.6-6.5A3.6 3.6 0 1 1-3.6-6.5Z"],["#d9a04a","M-5-7.6Q-5-12.5 0-12.5Q5-12.5 5-7.6Z M-6.4-7.6H6.4V-6.4H-6.4Z"]],
 institucion:[["#f4f1ea","M-11-4L0-12L11-4Z"],["#2a5fa8","M-1.6-6.4A1.6 1.6 0 1 1 1.6-6.4A1.6 1.6 0 1 1-1.6-6.4Z"],
   ["#f4f1ea","M-8-2H-5V6H-8Z M-1.5-2H1.5V6H-1.5Z M5-2H8V6H5Z"],["#d9a04a","M-11 6.5H11V9.5H-11Z"]],
 humo:[["#6b6f7a","M-10 7Q-14 7-13 2.5Q-13-1-9-1.5Q-9-6-4-6Q-1-10 3-7Q8-9 9-4Q13-3 13 2Q13 7 9 7Z"],["#9bbd3c","M2 2A3.2 3.2 0 1 1 8.4 2A3.2 3.2 0 1 1 2 2Z"],[null,"M-8 0Q-7-3-4-3.5","#a8acb8"]],
 petroleo:[["#15151c","M0-12Q8-2 8 3A8 8 0 0 1-8 3Q-8-2 0-12Z"],[null,"M-4.5 3Q-4.5 6-2 7.5","#8a8aa0"],[null,"M2.5 3Q2.5 6.5-0.5 8.5","#b05ad0"]],
 basura:[[null,"M-3-8L-5.5-11.5M3-8L5.5-11.5","#3f6b4a"],["#3f6b4a","M-8 9Q-9 1-6-4Q-3-6-3-8H3Q3-6 6-4Q9 1 8 9Q0 11.5-8 9Z"],[null,"M-5 2Q-5.5-1-4-3","#8fc29a"],["#7cc4e0","M4-12H7V-9L8-6V1H3V-6L4-9Z"]]
};
const ICONOS={};for(const k in ICONOS_D)ICONOS[k]=ICONOS_D[k].map(([f,d,t])=>[f,new Path2D(d),t]);
document.querySelectorAll("[data-icos]").forEach(el=>{el.innerHTML=el.dataset.icos.split(",").map(s=>'<svg viewBox="-14 -14 28 28" aria-hidden="true">'+ICONOS_D[s].map(([f,d,t])=>f?`<path d="${d}" fill="${f}" stroke="rgba(10,16,32,.55)" stroke-width=".7" stroke-linejoin="round"/>`:`<path d="${d}" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round"/>`).join("")+"</svg>").join("");});

/* Partículas decorativas: chispas de los guardianes y humo de los contaminantes */
const chispas=[];
function emitir(x,y,c,vx,vy,vida,r,crece){if(chispas.length<500)chispas.push({x,y,vx,vy,vida,max:vida,c,r,crece});}
function dibujarChispas(){for(let i=chispas.length-1;i>=0;i--){const p=chispas[i];p.x+=p.vx;p.y+=p.vy;p.vida--;
  if(p.vida<=0){chispas.splice(i,1);continue;}
  ctx.globalAlpha=p.vida/p.max*.65;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r+p.crece*(p.max-p.vida),0,7);ctx.fill();}
  ctx.globalAlpha=1;}

class Vehicle{
  constructor(x,y,tipo){this.x=x;this.y=y;this.vx=Math.random()*2-1;this.vy=Math.random()*2-1;this.ax=0;this.ay=0;
    this.tipo=tipo;this.maxforce=.12;this.wt=0;this.objetivo=-1;this.vista=170;this.fase=Math.random()*6;
    const ps={persona:[3.3,32],institucion:[2.2,46],humo:[1.9,36],petroleo:[2.7,26],basura:[2.3,30]}; // [velocidad máx., radio de acción]
    this.sub=tipo==="g"?(Math.random()<.5?"persona":"institucion"):["humo","petroleo","basura"][Math.random()*3|0];
    [this.maxspeed,this.radio]=ps[this.sub];}
  fuerza(fx,fy){const m=Math.hypot(fx,fy);if(m>this.maxforce){fx*=this.maxforce/m;fy*=this.maxforce/m;}this.ax+=fx;this.ay+=fy;}
  seek(tx,ty,llegada){const dx=tx-this.x,dy=ty-this.y,d=Math.hypot(dx,dy)||1;
    let v=this.maxspeed;if(llegada&&d<llegada)v*=d/llegada;
    this.fuerza(dx/d*v-this.vx,dy/d*v-this.vy);}            // fuerza = velocidad deseada − velocidad actual
  flee(tx,ty,radio){const dx=this.x-tx,dy=this.y-ty,d=Math.hypot(dx,dy);
    if(d<radio&&d>0)this.fuerza(dx/d*this.maxspeed*1.5-this.vx,dy/d*this.maxspeed*1.5-this.vy);}
  wander(){this.wt+=Math.random()*.6-.3;const h=Math.atan2(this.vy,this.vx);
    this.seek(this.x+Math.cos(h)*60+Math.cos(h+this.wt)*28,this.y+Math.sin(h)*60+Math.sin(h+this.wt)*28);}
  separate(lista){let sx=0,sy=0,n=0;for(const o of lista){if(o===this)continue;const dx=this.x-o.x,dy=this.y-o.y,d=Math.hypot(dx,dy);
    if(d>0&&d<40){sx+=dx/d/d;sy+=dy/d/d;n++;}}
    if(n){const m=Math.hypot(sx,sy)||1;this.fuerza((sx/m*this.maxspeed-this.vx)*1.4,(sy/m*this.maxspeed-this.vy)*1.4);}}
  bordes(){const o=30;let dx=0,dy=0;if(this.x<o)dx=1;else if(this.x>W-o)dx=-1;if(this.y<o)dy=1;else if(this.y>H-o)dy=-1;
    if(dx||dy){const m=Math.hypot(dx,dy);this.fuerza(dx/m*this.maxspeed-this.vx,dy/m*this.maxspeed-this.vy);}}
  percibir(){ // percepción limitada: mira solo una muestra de partículas dentro de su radio
    const quiere=this.tipo==="g"?0:1;let mejor=-1,md=this.vista*this.vista;
    for(let k=0;k<50;k++){const i=Math.random()*N|0;if(casa[i]!==quiere)continue;
      const dx=X[i]-this.x,dy=Y[i]-this.y,d=dx*dx+dy*dy;if(d<md){md=d;mejor=i;}}
    this.objetivo=mejor;}
  update(){this.vx+=this.ax;this.vy+=this.ay;const m=Math.hypot(this.vx,this.vy);
    if(m>this.maxspeed){this.vx*=this.maxspeed/m;this.vy*=this.maxspeed/m;}
    this.x+=this.vx;this.y+=this.vy;this.ax=this.ay=0;}
  dibujar(){const g=this.tipo==="g",t=cuadro*.08+this.fase,rap=Math.hypot(this.vx,this.vy);
    ctx.save();ctx.translate(this.x,this.y);
    ctx.fillStyle=g?"rgba(60,194,189,.12)":"rgba(224,80,90,.14)";ctx.beginPath();ctx.arc(0,0,this.radio,0,7);ctx.fill();   // zona de acción
    ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(0,16,10,3,0,0,7);ctx.fill();                                   // sombra
    let dy=0,ang=this.vx*.07;
    if(this.sub==="persona")dy=-Math.abs(Math.sin(t*3))*3*rap/this.maxspeed;   // paso al caminar
    else if(this.sub==="humo")dy=Math.sin(t)*2.5;                              // flota
    else if(this.sub==="institucion")dy=Math.sin(t*.7)*.8;
    else if(this.sub==="basura")ang+=Math.sin(t*2)*.14;                        // se bambolea
    else dy=Math.abs(Math.sin(t*2))*-1.5;                                      // gota que rebota
    const esc=this.sub==="persona"||this.sub==="basura"?1.7:1.9;
    ctx.translate(0,dy);ctx.rotate(ang);ctx.scale(esc,esc);ctx.lineJoin=ctx.lineCap="round";
    for(const [f,p,s] of ICONOS[this.sub]){
      if(f){ctx.lineWidth=.7;ctx.fillStyle=f;ctx.fill(p);ctx.strokeStyle="rgba(10,16,32,.55)";ctx.stroke(p);}
      else{ctx.lineWidth=2;ctx.strokeStyle=s;ctx.stroke(p);}}
    ctx.restore();}
}

/* ---------- 4. Estado y simulación ---------- */
let borradores=[],guardianes=[],cuadro=0,pausa=false,cursor=null,historial=[];
const rnd=t=>new Vehicle(Math.random()*W,Math.random()*H,t);
function ajustar(lista,n,t){while(lista.length<n)lista.push(rnd(t));lista.length=n;}
function sincronizar(){const inv=+$("inv").value,pr=+$("pres").value;
  ajustar(guardianes,CFG.g.on?Math.round(inv/100*30):0,"g");ajustar(borradores,CFG.b.on?pr:0,"b");ajustarE();
  $("invv").textContent=inv;$("presv").textContent=pr;$("ng").textContent=guardianes.length;$("nb").textContent=borradores.length;}

function rastro(a,n){const r=Math.random;
  if(a.tipo==="g"){if(n>0&&cuadro%2===0)emitir(a.x+(r()-.5)*14,a.y+(r()-.5)*14,r()<.5?"#3cc2bd":"#d9a04a",(r()-.5)*.6,-.5-r()*.7,34,2,0);}
  else if(cuadro%5===0||(n>0&&cuadro%2===0))emitir(a.x+(r()-.5)*10,a.y+6,a.sub==="humo"?"#7a7f8c":a.sub==="petroleo"?"#1b1b22":"#4c7a4f",(r()-.5)*.4,-.25-r()*.25,n>0?48:36,3,.08);}
function actuar(a,lista){
  if(cuadro%8===0||a.objetivo<0||casa[a.objetivo]===(a.tipo==="g"?1:0))a.percibir();
  if(a.objetivo>=0&&CFG[a.tipo].busca)a.seek(X[a.objetivo],Y[a.objetivo],a.tipo==="g"?40:0);else a.wander();
  if(CFG[a.tipo].sep)a.separate(lista);a.bordes();
  if(cursor&&(a.tipo!=="b"||CFG.b.huye))a.flee(cursor.x,cursor.y,a.tipo==="b"?130:0);
  a.update();
  // efecto sobre las partículas cercanas
  const R=a.radio,R2=R*R,cupo=a.tipo==="g"?6+(+$("inv").value)/12+(a.sub==="institucion"?3:0):9;let n=0;
  for(let i=0;i<N&&n<cupo;i++){const dx=X[i]-a.x;if(dx>R||dx<-R)continue;const dy=Y[i]-a.y;if(dx*dx+dy*dy>R2)continue;
    if(a.tipo==="g"&&!casa[i]){casa[i]=1;n++;}
    else if(a.tipo==="b"&&casa[i]&&Math.random()<.5){casa[i]=0;const d=Math.hypot(dx,dy)||1,f=2+Math.random()*3;VX[i]=dx/d*f;VY[i]=dy/d*f-1;n++;}}
  rastro(a,n);
}

function actualizarParticulas(t){let ok=0;
  for(let i=0;i<N;i++){
    if(casa[i]){ok++;const dx=HX[i]-X[i],dy=HY[i]-Y[i],d=Math.hypot(dx,dy);
      if(d<.4&&Math.abs(VX[i])+Math.abs(VY[i])<.4){X[i]=HX[i];Y[i]=HY[i];VX[i]=VY[i]=0;continue;}
      const v=d<60?6*d/60:6;let sx=dx/(d||1)*v-VX[i],sy=dy/(d||1)*v-VY[i];
      const m=Math.hypot(sx,sy);if(m>.55){sx*=.55/m;sy*=.55/m;}VX[i]+=sx;VY[i]+=sy;           // arrive
    }else{const ang=Math.sin(X[i]*.012+t*.4)*3+Math.cos(Y[i]*.015-t*.3)*3;                      // campo de flujo
      VX[i]=(VX[i]+Math.cos(ang)*.05)*.985;VY[i]=(VY[i]+Math.sin(ang)*.05+.012)*.985;}
    X[i]+=VX[i];Y[i]+=VY[i];
    if(X[i]<0){X[i]=0;VX[i]*=-.6}else if(X[i]>W-TILE){X[i]=W-TILE;VX[i]*=-.6}
    if(Y[i]<0){Y[i]=0;VY[i]*=-.6}else if(Y[i]>H-TILE){Y[i]=H-TILE;VY[i]*=-.6}
  }return ok;}

function dibujarParticulas(){buf.fill(FONDO);
  for(let i=0;i<N;i++){const x=X[i]|0,y=Y[i]|0,c=casa[i]?colN[i]:colG[i];
    for(let dy=0;dy<TILE;dy++){const o=(y+dy)*W+x;for(let dx=0;dx<TILE;dx++)buf[o+dx]=c;}}
  ctx.putImageData(img,0,0);}

function mensaje(p){
  const m=p>85?"El patrimonio resiste. La inversión sostenida y el cuidado de la comunidad dan resultado."
   :p>55?"Se pierden fragmentos. Todavía es posible recuperar lo dañado si se actúa pronto."
   :p>25?"La pérdida es grave. Sin más guardianes, el mural deja de reconocerse."
   :"Casi no queda nada. Lo que desaparece del todo no siempre puede reconstruirse.";
  if($("mensaje").textContent!==m)$("mensaje").textContent=m;}

function sparkline(){const s=$("spark"),g=s.getContext("2d");g.clearRect(0,0,300,56);
  g.strokeStyle="#3cc2bd";g.lineWidth=2;g.beginPath();
  historial.forEach((v,i)=>{const x=i/(historial.length-1||1)*300,y=54-v/100*52;i?g.lineTo(x,y):g.moveTo(x,y);});g.stroke();}

function bucle(ts){
  if(tab==="agentes")demoPaso();
  if(!pausa&&tab==="mural"){cuadro++;const t=ts/1000;
    for(const a of borradores)actuar(a,borradores);
    for(const a of guardianes)actuar(a,guardianes);
    for(const a of memorias)actuarM(a);for(const a of comunitarios)actuarC(a);
    if(cursor){let n=0;for(let i=0;i<N&&n<60;i++){const dx=X[i]-cursor.x,dy=Y[i]-cursor.y;
      if(dx*dx+dy*dy<3600&&!casa[i]){casa[i]=1;n++;}}}                                  // el cursor restaura
    if(amb)ambiente();const ok=actualizarParticulas(t),p=ok/N*100;
    dibujarParticulas();
    if(capa)dibujarCapa();dibujarChispas();dibujarHilos();for(const a of borradores)a.dibujar();for(const a of guardianes)a.dibujar();for(const a of memorias)a.dibujar();for(const a of comunitarios)a.dibujar();dibujarInsc();
    if(overlay)dibujarOverlay();
    if(cursor){ctx.strokeStyle="#d9a04a";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cursor.x,cursor.y,60,0,7);ctx.stroke();}
    const e=$("pct");e.textContent=Math.round(p)+"%";e.className=p<30?"bajo":p<65?"medio":"";
    mensaje(p);if(cuadro%15===0)actualizarReto(p);
    if(cuadro%20===0){historial.push(p);if(historial.length>300)historial.shift();sparkline();}
  }
  requestAnimationFrame(bucle);}

/* ---------- 5. Controles ---------- */
function posicion(e){const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
cv.addEventListener("pointermove",e=>cursor=posicion(e));
cv.addEventListener("pointerdown",e=>{cursor=posicion(e);cv.setPointerCapture(e.pointerId);});
cv.addEventListener("pointerleave",()=>cursor=null);
$("inv").addEventListener("input",sincronizar);$("pres").addEventListener("input",sincronizar);
$("pausa").addEventListener("click",e=>{pausa=!pausa;e.target.textContent=pausa?"Continuar":"Pausar";});
$("reinicio").addEventListener("click",()=>{casa.fill(1);historial=[];amb=null;capa=null;hilos.length=0;chispas.length=0;});

/* ---------- 6. Sucesos aleatorios y contenido educativo ---------- */
const ideas = [
  "Infórmate sobre la historia del lugar antes de visitarlo y comparte información verificada.",
  "Respeta barreras, señalética y zonas restringidas; no retires fragmentos ni alteres superficies.",
  "Apoya a personas artesanas y portadoras de tradiciones, reconociendo su autoría y conocimiento.",
  "Registra la memoria local con consentimiento y acredita a quienes comparten sus relatos.",
  "Participa en actividades comunitarias de cuidado y reporta daños a las autoridades correspondientes.",
  "Reduce residuos durante tus visitas y utiliza los espacios patrimoniales de forma respetuosa."
];
function elegirAleatorio(lista){return lista[Math.floor(Math.random()*lista.length)];}
function mostrarDato(texto){$("datoAleatorio").textContent=texto;}
/* Efectos visuales: c color de partículas, vx/vy dirección, dano/cura = fragmentos por cuadro, zona = pulso local (−1 daña, +1 restaura) */
const FX={
 lluvia:{c:"#7cc4e0",vx:.3,vy:3,dano:8,txt:"cae lluvia y las gotas aflojan fragmentos del mural."},
 polvo:{c:"#b8956a",vx:2,vy:.2,dano:8,txt:"el polvo y el desgaste arrastran fragmentos del mural."},
 grieta:{c:"#b8956a",vx:1.2,vy:.5,dano:6,zona:-1,txt:"una zona del mural se deshace de golpe y el polvo la dispersa."},
 fiesta:{c:["#e0505a","#e2b24a","#3cc2bd","#d96ab0"],vx:0,vy:-1.2,cura:10,txt:"surge confeti comunitario y se recuperan fragmentos."},
 brillo:{c:"#f4d18c",vx:0,vy:-.9,cura:8,txt:"destellos de restauración recuperan fragmentos poco a poco."},
 repara:{c:"#f4d18c",vx:0,vy:-.9,cura:8,zona:1,txt:"una zona del mural se restaura de golpe y la recuperación continúa."}
};
let escActual="cholula",amb=null;
function cargarEscena(id,dispersar){escActual=id;colorear(pintarMural(id));
  casa.fill(1);historial=[];amb=null;capa=null;hilos.length=0;chispas.length=0;
  if(dispersar)for(let i=0;i<N;i++){X[i]=Math.min(W-TILE,Math.max(0,HX[i]+(Math.random()-.5)*420));Y[i]=Math.min(H-TILE,Math.max(0,HY[i]+(Math.random()-.5)*420));VX[i]=VY[i]=0;}
  $("lugar").value=id;$("decLugar").value=id;if(pausa)dibujarParticulas();abrirFicha(id);}
function iniciarFx(k){const f=FX[k],col=Array.isArray(f.c)?f.c[0]:f.c;amb={k,n:300};
  if(f.zona){const cx=Math.random()*W,cy=60+Math.random()*(H-120);
    for(let i=0;i<N;i++){const dx=HX[i]-cx,dy=HY[i]-cy,d=Math.hypot(dx,dy);
      if(d<140){if(f.zona<0){casa[i]=0;X[i]=HX[i];Y[i]=HY[i];VX[i]=dx/(d||1)*3;VY[i]=dy/(d||1)*3-1;}else casa[i]=1;}}
    for(let i=0;i<30;i++)emitir(cx+(Math.random()-.5)*220,cy+(Math.random()-.5)*220,col,(Math.random()-.5)*2,(Math.random()-.5)*2,40,2.5,.03);}}
function ambiente(){const f=FX[amb.k];amb.n--;
  for(let j=0;j<3;j++){const c=Array.isArray(f.c)?f.c[Math.random()*f.c.length|0]:f.c;
    emitir(Math.random()*W,f.vy>1?Math.random()*H*.5:Math.random()*H,c,f.vx+Math.random()-.5,f.vy+(Math.random()-.5)*.4,50,2,0);}
  for(let j=0;j<(f.dano||0);j++){const i=Math.random()*N|0;if(casa[i]){casa[i]=0;VX[i]=f.vx*2+Math.random()-.5;VY[i]=f.vy*2;}}
  for(let j=0;j<(f.cura||0);j++)casa[Math.random()*N|0]=1;
  if(amb.n<=0)amb=null;}
function mostrarPanel(id,v){const s=ESC[id],t=(i,x)=>$(i).textContent=x;
  t("lugarNombre",s.n);t("evSentido",s.s);
  if(v){t("evTipo",v.tipo);t("evTitulo",v.titulo+".");t("evTexto",v.texto);
    t("evVars","Inversión "+v.i0+"% → "+v.inv+"%  ·  Presión "+v.p0+" → "+v.pres);t("evFx","Efecto visual: "+FX[v.fx].txt);t("evMsg",v.msg);
    t("evQ","Para pensar: "+v.q);t("evRec","Acción de conservación: "+v.rec);}
  else{t("evTipo","Exploración");t("evTitulo","Escenario seleccionado.");t("evTexto","Observa cómo los agentes degradan y restauran este lugar. Pulsa «Suceso aleatorio» para descubrir una situación de conservación.");t("evVars","");t("evFx","");t("evMsg","");t("evQ","");t("evRec","");}
  const f=FICHAS[id].fuentes[0];$("evLink").href=f[1];$("evLink").textContent="Fuente: "+f[0];$("evFicha").dataset.id=id;}
function aplicarEscenario(){
  const id=elegirAleatorio(Object.keys(ESC).filter(k=>k!==escActual)),j=Math.random()*ESC[id].ev.length|0,
    [tipo,titulo,texto,inv,pres,fx,msg]=ESC[id].ev[j],[q,rec]=EVX[id][j],i0=+$("inv").value,p0=+$("pres").value;
  cargarEscena(id,true);
  $("inv").value=inv;$("pres").value=pres;sincronizar();iniciarFx(fx);
  mostrarPanel(id,{tipo,titulo,texto,msg,fx,i0,p0,inv,pres,q,rec});
  mostrarDato(ESC[id].n+" · "+titulo+": "+texto+" Ajusta los controles para comparar otros resultados.");
}
$("eventoRandom").addEventListener("click",aplicarEscenario);
$("escenarioRandom").addEventListener("click",aplicarEscenario);
$("ideaRandom").addEventListener("click",()=>mostrarDato("Idea de cuidado: "+elegirAleatorio(ideas)));

/* ---------- 7. Archivo vivo, agentes y acciones (información conectada con la simulación) ---------- */
const U={u416:["UNESCO · Centro Histórico de Puebla","https://whc.unesco.org/en/list/416/"],i6129:["INAH · Lugares: Centro Histórico de Puebla","https://lugares.inah.gob.mx/en/node/6129"]};
const FICHAS={
 cholula:{cat:"Patrimonio arqueológico (zona de monumentos arqueológicos)",ubi:"San Andrés Cholula, Puebla",
  que:"Conocida como Tlachihualtépetl («cerro hecho a mano»), es una gran estructura prehispánica levantada por etapas superpuestas. Hoy parece un cerro con el Santuario de Nuestra Señora de los Remedios en la cima.",
  imp:"Se considera la pirámide de mayor volumen del mundo y es parte de una de las ciudades con ocupación más larga de Mesoamérica. Su valor es arqueológico, histórico y simbólico.",
  prot:["La estructura y sus etapas constructivas","Túneles, patios y murales","El santuario y su relación con el paisaje","Los significados que las comunidades le dan"],
  doc:["Especialistas han señalado que la urbanización cerca del polígono de protección afecta la zona (nota recopilada por la UNAM)","Riesgo general en sitios arqueológicos: humedad, vegetación y desgaste por el tránsito de visitantes"],
  hip:["Visitas sin cuidado con recursos limitados","Falta de recursos para el mantenimiento preventivo"],
  contrib:["Visita con guía oficial y respeta senderos y señalética","No toques ni retires piezas; no dejes residuos","Comparte información verificada del INAH","Apoya iniciativas comunitarias de cuidado del entorno"],
  fuentes:[["INAH · Zona Arqueológica de Cholula (video)","https://lugares.inah.gob.mx/en/inicio/publicaciones-media/8814-zona-arqueol%C3%B3gica-de-cholula.html"],["UNAM · Nación Multicultural: nota sobre la zona arqueológica (PDF)","https://www.nacionmulticultural.unam.mx/mezinal/docs/7111.pdf"]],
  reto:{t:"Aumentan las visitas al sitio y los recursos son limitados. Parte de presión 20 e inversión 30 y busca sostener el mural.",i:30,p:20,meta:64,max:60},
  preg:["¿Cómo equilibrar turismo y conservación en un sitio arqueológico?","¿Quiénes deberían decidir el futuro de un sitio como este?","¿Qué relación hay entre la pirámide y el paisaje que la rodea?"]},
 centro:{cat:"Patrimonio mundial cultural (zona de monumentos históricos)",ubi:"Ciudad de Puebla, Puebla",
  que:"Núcleo urbano fundado en 1531, con trazado reticular de inspiración renacentista, templos, palacios y casas con azulejos.",
  imp:"La UNESCO lo inscribió en 1987 por su trazado urbano y por una arquitectura que fusiona estilos europeos y americanos.",
  prot:["El trazado de calles y plazas","Fachadas, azulejos y edificios religiosos y civiles","Los espacios públicos y su uso cotidiano","El «espíritu del lugar»: la vida de quienes lo habitan"],
  doc:["La ficha oficial del INAH menciona un plan de regeneración urbana y preocupaciones de conservación del centro","Riesgo general en centros históricos: humedad, tránsito y uso comercial intenso"],
  hip:["Fachadas descuidadas y presión comercial","Participación vecinal que renueva calles y plazas"],
  contrib:["Camina y compra local cuidando fachadas y espacios","Reporta daños a las autoridades correspondientes","Participa en jornadas vecinales","Evita grafiti y publicidad no autorizada"],
  fuentes:[U.u416,U.i6129],
  reto:{t:"Imagina que aumenta la presión turística en el Centro Histórico mientras el mantenimiento tiene recursos limitados. Parte de presión 22 e inversión 25 y busca sostener el mural.",i:25,p:22,meta:58,max:55},
  preg:["¿Cómo equilibrar turismo y comercio con la vida cotidiana del centro?","¿Quiénes deberían decidir qué se cambia en una calle histórica?","¿Cómo puede la tecnología ayudar a documentar fachadas y espacios?"]},
 catedral:{cat:"Patrimonio arquitectónico y artístico religioso",ubi:"Centro Histórico de Puebla",
  que:"Gran templo de los siglos XVI y XVII dentro del Centro Histórico, junto a otros edificios religiosos del conjunto.",
  imp:"Es una de las construcciones religiosas principales del Centro Histórico y forma parte del bien inscrito por la UNESCO.",
  prot:["Cantera, bóvedas, torres y cúpulas","Retablos, pinturas y elementos decorativos","El uso religioso y comunitario del templo","Su relación con la plaza y el centro"],
  doc:["Riesgo general en edificios de cantera: humedad, contaminantes y filtraciones","Reto general de los templos históricos: equilibrar acceso público y conservación"],
  hip:["Lluvias y humedad sin revisión","Revisión técnica de bóvedas y obras"],
  contrib:["Visita en silencio y respeta zonas restringidas","No toques muros, pinturas ni retablos","Difunde su historia con fuentes confiables","Reporta daños al personal del templo o a las autoridades"],
  fuentes:[U.u416,U.i6129],
  reto:{t:"Llueve con frecuencia y las revisiones técnicas son limitadas. Parte de presión 18 e inversión 35 y busca sostener el mural.",i:35,p:18,meta:75,max:65},
  preg:["¿Cómo equilibrar el acceso público y la conservación de un templo?","¿Qué se pierde si solo se restaura lo visible?","¿Quiénes deben participar en decidir cómo se cuida un edificio religioso histórico?"]},
 palafoxiana:{cat:"Patrimonio documental (Memoria del Mundo, UNESCO 2005)",ubi:"Centro Histórico de Puebla",
  que:"Biblioteca fundada en 1646 con la donación de libros del obispo Juan de Palafox y Mendoza; conserva su recinto barroco, sus estanterías y su acervo.",
  imp:"Se le considera la primera biblioteca pública de América y la UNESCO la inscribió en 2005 en el registro Memoria del Mundo.",
  prot:["Libros, manuscritos e incunables","Estanterías y recinto barroco","Condiciones ambientales estables","La memoria que transmite a nuevas generaciones"],
  doc:["Riesgo general de colecciones en papel: humedad, luz, plagas y manipulación","El INAH ha difundido servicios educativos y talleres para dar a conocer y cuidar el acervo"],
  hip:["Humedad y manipulación sin cuidado","Digitalización responsable para difundir sin exponer originales"],
  contrib:["Respeta las reglas de visita y de consulta","Manipula libros históricos solo con autorización","Difunde el acervo citando sus fuentes","Participa en talleres y actividades educativas"],
  fuentes:[["INAH · La Voz del INAH: servicios educativos de la Biblioteca Palafoxiana (PDF)","https://revistas.inah.gob.mx/index.php/lavozinah/article/download/18232/19630/39369"],U.u416],
  reto:{t:"La humedad aumenta y los recursos de control ambiental son limitados. Parte de presión 12 e inversión 40 y busca sostener el mural.",i:40,p:12,meta:80,max:55},
  preg:["¿Cómo puede la tecnología preservar la memoria sin sustituir los originales?","¿Quién debería tener acceso a una colección frágil?","¿Qué libros o archivos de tu comunidad merecen ser cuidados?"]},
 barrios:{cat:"Patrimonio cultural inmaterial (ficha general)",ubi:"Barrios de la ciudad de Puebla",
  que:"Los barrios son espacios donde viven fiestas, oficios, cocina, relatos y formas de organización comunitaria.",
  imp:"Su valor es social e identitario: este patrimonio se conserva mientras las personas lo practican y lo transmiten.",
  prot:["Fiestas y celebraciones locales","Oficios y saberes tradicionales","Relatos y memoria oral","Espacios de encuentro"],
  doc:["Marco general de la UNESCO: el patrimonio vivo depende de las comunidades que lo practican y lo transmiten"],
  hip:["Cambios urbanos que alejan oficios y rutinas","Transmisión de saberes entre generaciones"],
  contrib:["Participa en fiestas respetando a la comunidad","Compra a artesanas, artesanos y comercios del barrio","Pregunta y escucha antes de documentar","Pide consentimiento para fotografiar o grabar"],
  fuentes:[["UNESCO · Patrimonio cultural inmaterial","https://ich.unesco.org/"]],
  nota:"Ficha general: no corresponde a una declaratoria específica y no tengo una fuente verificada por barrio. Consulta a las instituciones culturales locales.",
  reto:{t:"Los cambios urbanos presionan la vida del barrio y hay pocos apoyos. Parte de presión 20 e inversión 30 y busca sostener el mural.",i:30,p:20,meta:56,max:50},
  preg:["¿Qué sucede cuando una comunidad deja de transmitir sus conocimientos tradicionales?","¿Cómo puede una tradición transformarse sin perder lo que le da sentido?","¿Quiénes deben decidir cómo se documenta o se muestra una fiesta de barrio?"]},
 talavera:{cat:"Patrimonio cultural inmaterial (UNESCO, 2019) y artesanal",ubi:"Puebla y Tlaxcala, México",
  que:"Cerámica artesanal: se prepara el barro, se tornea o moldea, se decora a mano, se esmalta y se hornea.",
  imp:"Su proceso conserva un patrón histórico del siglo XVI. En 2019 se inscribió junto con la cerámica de Talavera de la Reina y El Puente del Arzobispo (España).",
  prot:["Los conocimientos de maestras y maestros artesanos","Técnicas de barro, pigmentos, esmalte y horneado","La identidad de cada taller","La transmisión oral y familiar"],
  doc:["La UNESCO señala que el conocimiento se transmite sobre todo en talleres y en la familia, por lo que depende de que siga transmitiéndose","El expediente de nominación menciona un Consejo Regulador de la Talavera"],
  hip:["Piezas sin procedencia clara","Talleres que enseñan a nuevas generaciones"],
  contrib:["Pregunta por el taller, el proceso y la procedencia","Reconoce el trabajo y la autoría de quien decora","Paga un precio justo","Difunde su historia sin copiar diseños"],
  fuentes:[["UNESCO · Talavera artesanal de Puebla y Tlaxcala","https://ich.unesco.org/en/RL/artisanal-talavera-of-puebla-and-tlaxcala-mexico-and-ceramics-of-talavera-de-la-reina-and-el-puente-del-arzobispo-spain-making-process-01462"],["UNESCO · Decisión 14.COM 10.b.23","https://ich.unesco.org/en/Decisions/14.COM/10.b.23"]],
  reto:{t:"Hay menos relevo de aprendices y más competencia de piezas sin origen claro. Parte de presión 15 e inversión 30 y busca sostener el mural.",i:30,p:15,meta:72,max:60},
  preg:["¿Cómo equilibrar innovación y tradición en la artesanía?","¿Cómo valorar el trabajo artesanal más allá del precio?","¿Qué responsabilidad tenemos al comprar una pieza artesanal?"]},
 paisaje:{cat:"Paisaje cultural (categoría conceptual del proyecto)",ubi:"Región de Cholula, Puebla",
  que:"La zona arqueológica, los pueblos y las áreas verdes forman un paisaje con los volcanes Popocatépetl e Iztaccíhuatl al fondo.",
  imp:"Su valor es ambiental, histórico y social: el patrimonio arqueológico no se entiende separado del territorio y las comunidades.",
  prot:["Áreas verdes y suelo","Vistas y relación con los volcanes","Agua y vegetación local","La convivencia entre actividades humanas, flora y fauna"],
  doc:["En 1987 el Comité del Patrimonio Mundial señaló que la urbanización había debilitado la complementariedad entre Puebla y el sitio prehispánico de Cholula"],
  hip:["Expansión sin planeación y residuos","Jornadas de limpieza y reforestación"],
  contrib:["Separa y reduce tus residuos","Usa transporte compartido o camina al visitar","Participa en reforestación comunitaria","Respeta áreas verdes y fauna"],
  fuentes:[["UNESCO · Decisión 11 COM VII.A (Puebla y Cholula)","https://whc.unesco.org/en/decisions/3741"],["INAH · Zona Arqueológica de Cholula (video)","https://lugares.inah.gob.mx/en/inicio/publicaciones-media/8814-zona-arqueol%C3%B3gica-de-cholula.html"]],
  nota:"«Paisaje cultural de Cholula» es una categoría conceptual de este proyecto, no una declaratoria específica.",
  reto:{t:"La urbanización avanza y los residuos aumentan. Parte de presión 23 e inversión 35 y busca sostener el mural.",i:35,p:23,meta:58,max:60},
  preg:["¿Cómo convivir con áreas verdes y fauna en una región que crece?","¿Qué relación hay entre cuidar el paisaje y cuidar el patrimonio histórico?","¿Quiénes deben participar en decidir el crecimiento de la ciudad?"]}
};
/* Pregunta y acción de cada suceso (mismo orden que ESC[id].ev) */
const EVX={
 cholula:[["¿Qué decisiones cotidianas evitan que un sitio acumule daños?","Programar revisiones periódicas con especialistas y difundir sus resultados."],["¿Cómo disfrutar un sitio sin desgastarlo?","Seguir senderos, respetar zonas restringidas y llevarte tu basura."],["¿Qué se pierde cuando el mantenimiento se pospone?","Proteger el presupuesto de mantenimiento preventivo y hacerlo visible."]],
 centro:[["¿Qué cuesta más: mantener o reparar?","Dar mantenimiento preventivo a fachadas y cableado con criterios de conservación."],["¿Qué haría tu calle para cuidarse entre vecinos?","Acordar jornadas de limpieza y reglas de uso de la vía pública."],["¿Qué puede aportar el arte a la conservación sin sustituirla?","Combinar intervenciones artísticas con restauración técnica y permisos."]],
 catedral:[["¿Qué señales de humedad podrías detectar a simple vista?","Hacer revisiones técnicas periódicas de cubiertas y desagües."],["¿Por qué documentar antes de intervenir?","Registrar con fotografías y fichas cada intervención."]],
 palafoxiana:[["¿Qué condiciones necesita un libro antiguo para durar?","Vigilar temperatura, humedad y luz."],["¿Qué se gana y qué se arriesga al consultar un original?","Limitar la manipulación y priorizar copias para consulta."],["¿Quién debería poder consultar un archivo digital?","Digitalizar con criterios técnicos y difundir con crédito."]],
 barrios:[["¿Qué fiesta o receta de tu familia podría perderse si nadie la enseña?","Crear espacios de encuentro entre generaciones para enseñar y registrar tradiciones."],["¿Quién decide cómo cambia un barrio?","Consultar a vecinas y vecinos antes de modificar espacios comunitarios."]],
 talavera:[["¿Qué se aprende de una pieza hecha a mano?","Apoyar talleres que enseñan a aprendices y reconocer la autoría."],["¿Cómo saber de dónde viene lo que compras?","Preguntar por el taller, el proceso y la procedencia antes de comprar."]],
 paisaje:[["¿Qué ganan las personas cuando se cuida el paisaje?","Organizar limpieza y reforestación con especies locales y seguimiento."],["¿Cómo crecer sin perder áreas verdes?","Incluir a la comunidad y a especialistas en la planeación del territorio."]]
};
const AG=[
 {k:"obj",t:"Búsqueda de objetivos",e:"Cada agente percibe una partícula objetivo (los guardianes buscan fragmentos perdidos; los contaminantes, fragmentos sanos) y se dirige a ella con la fuerza seek, frenando al llegar.",o:"Las líneas muestran hacia qué fragmento va cada agente.",a:"Una analogía de las prioridades: qué se decide atender o descuidar primero.",q:"¿Cómo se decide qué parte del patrimonio atender primero?"},
 {k:"sep",t:"Separación",e:"La fuerza separate aleja a los agentes cuando están a menos de 40 px, para que no se amontonen.",o:"Los círculos dorados rara vez se tocan entre agentes del mismo tipo.",a:"Una analogía del reparto: distribuir esfuerzos y visitas evita concentrar el desgaste.",q:"¿Qué pasa cuando todo el cuidado o toda la presión se concentra en un solo punto?"},
 {k:"exp",t:"Exploración autónoma",e:"Sin objetivo a la vista, el agente usa wander: sigue su rumbo con pequeñas variaciones aleatorias, sin ruta fija.",o:"Los anillos con flecha marcan a quienes exploran; su dirección cambia poco a poco.",a:"Una analogía de la investigación: explorar permite descubrir lo que nadie buscaba.",q:"¿Qué se descubre al explorar sin una ruta fija?"},
 {k:"per",t:"Percepción del entorno",e:"Cada pocos cuadros, percibir() revisa una muestra de partículas dentro de su rango de visión (170 px); no ve todo el mural.",o:"Los círculos tenues son el rango de visión de cada agente.",a:"Una analogía de la información limitada: nadie ve todo, por eso compartir registros ayuda.",q:"¿Quién ve lo que tú no ves cuando cuidas algo en común?"},
 {k:"est",t:"Respuesta a estímulos",e:"Los contaminantes huyen del cursor (flee); y al mover inversión o presión cambia el número de agentes y la capacidad de restauración.",o:"Mueve el cursor cerca de un contaminante: el círculo rojo marca su zona de huida.",a:"Una analogía de cómo cambian las acciones cuando cambian las condiciones.",q:"¿Qué condiciones cambian la forma de cuidar un lugar?"}];
const ACC=[
 {t:"Investiga la historia de un lugar de tu comunidad",i:"Elige un lugar cercano y consulta una fuente confiable (archivo, museo o institución cultural). Anota tres datos con su fuente.",o:"Conocer el origen y el valor de un lugar cercano.",r:"Una ficha breve con tres datos y sus fuentes.",q:"¿Qué descubriste y quién podría contarte más?"},
 {t:"Ilustra lo que quieres proteger",i:"Dibuja en papel o en digital algo que quieras proteger. Luego pasa el cursor por una zona dañada del mural para restaurarla y compara.",o:"Expresar visualmente el valor de un patrimonio.",r:"Una ilustración y una frase que explique tu elección.",q:"¿Qué decidiste mostrar y qué dejaste fuera?",b:"canvas",bt:"Ir al lienzo y restaurar con el cursor ↑"},
 {t:"Propón una acción de conservación",i:"Escribe una acción concreta, realista y de bajo costo que una persona o un grupo pueda hacer.",o:"Pasar de la idea a la acción.",r:"Una propuesta con quién, qué y cuándo.",q:"¿Quién más debería participar para que funcione?",b:"reflex",bt:"Escribirla en «Reflexiona» ↓"},
 {t:"Identifica una práctica que se transmite entre generaciones",i:"Conversa con una persona mayor o artesana sobre un oficio, receta o fiesta y pregunta cómo lo aprendió.",o:"Reconocer el patrimonio vivo.",r:"Una nota con la práctica, quién la transmite y cómo.",q:"¿Qué pasaría si dejara de transmitirse?"},
 {t:"Reflexiona sobre el turismo responsable",i:"Planea una visita a un sitio patrimonial: reglas, horarios, rutas y cómo apoyar a la comunidad local.",o:"Equilibrar disfrute y cuidado.",r:"Cinco reglas propias para visitar con cuidado.",q:"¿Qué cambiaría si cada visitante cuidara una regla?",b:"turismo",bt:"Probar alta presión en el mural ↑"},
 {t:"Documenta una historia local con consentimiento",i:"Pide permiso, explica para qué usarás la historia, registra con respeto y devuelve una copia. Si participan menores, pide permiso a sus tutores.",o:"Documentar con ética.",r:"Un relato con autoría, fecha y consentimiento.",q:"¿A quién pertenece una historia compartida?"}];
let fichaId="cholula",modo="comprende",qSel=0,overlay=null,pctActual=100;const reflexiones=[];
const li=a=>"<ul>"+a.map(x=>"<li>"+x+"</li>").join("")+"</ul>";
const aLink=a=>'<li><a class="enlace" href="'+a[1]+'" target="_blank" rel="noopener noreferrer">'+a[0]+'</a></li>';
function irA(id){mostrarTab(id==="lienzo"?"mural":id);return;const el=$(id);if(el)el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:id==="lienzo"?"center":"start"});}
function abrirFicha(id){if(id!==fichaId)qSel=0;fichaId=id;
  $("fichaChips").querySelectorAll("button").forEach(b=>{const on=b.dataset.id===id;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);});renderFicha();}
function renderFicha(){const f=FICHAS[fichaId],e=ESC[fichaId],prev=$("refTxt")?$("refTxt").value:"";let h="";
  $("fichaModos").querySelectorAll("button").forEach(b=>{const on=b.dataset.m===modo;b.classList.toggle("on",on);b.setAttribute("aria-selected",on);});
  if(modo==="comprende")h='<div class="fi"><figure><canvas id="fichaImg" width="800" height="500" role="img" aria-label="Ilustración de '+e.n+'"></canvas><figcaption>Imagen: ilustración generada por código para este proyecto; no es una fotografía.</figcaption></figure><div><dl class="ident"><dt>Nombre</dt><dd>'+e.n+'</dd><dt>Categoría</dt><dd>'+f.cat+'</dd><dt>Ubicación</dt><dd>'+f.ubi+'</dd></dl><h4>¿Qué es?</h4><p>'+f.que+'</p><h4>Contexto histórico</h4><p>'+f.hist+'</p><h4>¿Por qué es importante?</h4><p>'+f.imp+'</p><h4>¿Qué debemos proteger?</h4>'+li(f.prot)+'</div></div>'
    +'<details><summary>¿Qué factores pueden afectarlo?</summary><h4>Señalado por fuentes o riesgo general (no es un diagnóstico del sitio)</h4>'+li(f.doc)+'<h4>Situaciones hipotéticas de la simulación</h4>'+li(f.hip)+'</details>'
    +'<details><summary>¿Cómo podemos contribuir?</summary>'+li(f.contrib)+'</details>'
    +'<details><summary>Iniciativas reales de conservación</summary>'+(f.ini.length?'<ul>'+f.ini.map(aLink).join('')+'</ul>'+(f.iniNota?'<p class="pie">'+f.iniNota+'</p>':''):'<p class="pie">No incluyo una iniciativa específica con fuente verificada para esta ficha.</p>')+'</details>'
    +'<details><summary>Fuentes para investigar</summary><ul>'+f.fuentes.map(aLink).join("")+'</ul>'+(f.nota?'<p class="pie">'+f.nota+'</p>':'')+'</details>'
    +'<p><button type="button" data-act="ver">Ver este lugar en el mural ↑</button></p>';
  else if(modo==="experimenta"){const r=f.reto;h='<h4>Reto</h4><p>'+r.t+'</p><p class="pie">Meta: mantener al menos '+r.meta+' % del mural usando como máximo '+r.max+' % de inversión.</p><p><button type="button" data-act="reto">Preparar el reto en el mural ↑</button></p><div class="medidor" id="retoMed"></div><p class="pie">Es una interpretación artística y un modelo simplificado, no una predicción científica del deterioro real de un lugar.</p>';}
  else h='<p>Elige una pregunta y responde, o propón una acción de conservación.</p><div class="chips" id="qBtns">'+f.preg.map((q,i)=>'<button type="button" data-act="q" data-i="'+i+'" class="'+(i===qSel?"on":"")+'">'+q+'</button>').join("")+'</div><label for="refTipo">Tipo de aporte</label><select id="refTipo"><option>Respuesta</option><option>Propuesta de acción de conservación</option></select><label for="refTxt" id="refEt"></label><textarea id="refTxt" rows="4" maxlength="600"></textarea><p><button type="button" data-act="guardar">Guardar en esta sesión</button></p><p class="pie" id="refAviso">Tus aportes se guardan solo en este navegador (localStorage); no se envían ni se comparten con nadie.</p><h4>Mis reflexiones de esta sesión</h4><ul id="refLista"></ul>';
  $("fichaCuerpo").innerHTML=h;
  if(modo==="comprende")e.d($("fichaImg").getContext("2d"));
  else if(modo==="experimenta")actualizarReto(null);
  else{$("refEt").textContent=f.preg[qSel];$("refTxt").value=prev;pintarReflexiones();}}
function actualizarReto(p){if(p!=null)pctActual=p;const el=$("retoMed");if(modo!=="experimenta"||!el)return;
  const r=FICHAS[fichaId].reto,inv=+$("inv").value,pr=+$("pres").value,pc=Math.round(pctActual),
   txt=inv>r.max?"Superaste el límite de inversión del reto: prueba otra combinación.":pc>=r.meta?"¡Meta alcanzada! Con estas condiciones el mural se sostiene.":"Todavía por debajo de la meta: ajusta los controles y observa al mural.";
  el.innerHTML="<b>Ahora:</b> conservado "+pc+" % · inversión "+inv+" % · presión "+pr+'<div class="barra"><i style="width:'+pc+'%"></i></div><p>'+txt+"</p>";}
function marcarAg(){}
function dibujarOverlay(){const k=overlay.k;if(--overlay.n<=0){overlay=null;marcarAg();return;}
  ctx.save();ctx.lineWidth=1.5;
  if(k.slice(0,2)==="t_"){const L={b:borradores,g:guardianes,m:memorias,c:comunitarios}[k[2]];ctx.strokeStyle="#f4d18c";ctx.lineWidth=3;for(const a of L){ctx.beginPath();ctx.arc(a.x,a.y,26+Math.sin(cuadro*.15)*3,0,7);ctx.stroke();}ctx.restore();return;}
  for(const a of borradores.concat(guardianes)){const g=a.tipo==="g";
    if(k==="obj"&&a.objetivo>=0){ctx.strokeStyle=g?"#3cc2bd":"#e0505a";ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(X[a.objetivo],Y[a.objetivo]);ctx.stroke();}
    else if(k==="per"){ctx.strokeStyle="rgba(244,241,234,.35)";ctx.beginPath();ctx.arc(a.x,a.y,a.vista,0,7);ctx.stroke();}
    else if(k==="sep"){ctx.strokeStyle="#d9a04a";ctx.beginPath();ctx.arc(a.x,a.y,20,0,7);ctx.stroke();}
    else if(k==="exp"&&a.objetivo<0){ctx.strokeStyle="#f4f1ea";ctx.beginPath();ctx.arc(a.x,a.y,16,0,7);ctx.moveTo(a.x,a.y);ctx.lineTo(a.x+a.vx*14,a.y+a.vy*14);ctx.stroke();}}
  if(k==="est"&&cursor){ctx.setLineDash([6,5]);ctx.strokeStyle="#e0505a";ctx.beginPath();ctx.arc(cursor.x,cursor.y,130,0,7);ctx.stroke();}
  ctx.restore();}
/* Montaje de la sección informativa */
$("fichaChips").innerHTML=Object.keys(ESC).map(k=>'<button type="button" data-id="'+k+'" aria-pressed="false">'+ESC[k].n+'</button>').join("");
$("fichaChips").addEventListener("click",e=>{const b=e.target.closest("button");if(b){cargarEscena(b.dataset.id,true);mostrarPanel(b.dataset.id,null);}});
$("fichaModos").addEventListener("click",e=>{const b=e.target.closest("button");if(b){modo=b.dataset.m;renderFicha();}});
$("fichaCuerpo").addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b)return;const a=b.dataset.act,f=FICHAS[fichaId];
  if(a==="ver"){cargarEscena(fichaId,true);mostrarPanel(fichaId,null);irA("lienzo");}
  else if(a==="reto"){cargarEscena(fichaId,true);mostrarPanel(fichaId,null);$("inv").value=f.reto.i;$("pres").value=f.reto.p;sincronizar();actualizarReto(null);irA("lienzo");}
  else if(a==="q"){qSel=+b.dataset.i;$("qBtns").querySelectorAll("button").forEach((x,i)=>x.classList.toggle("on",i===qSel));$("refEt").textContent=f.preg[qSel];}
  else if(a==="guardar"){const t=$("refTxt").value.trim();
    if(!t){$("refAviso").textContent="Escribe algo antes de guardar.";return;}
    reflexiones.push({l:ESC[fichaId].n,q:f.preg[qSel],tipo:$("refTipo").value,t});guardarMem();$("refTxt").value="";
    $("refAviso").textContent="Guardado en este navegador; no se envía a nadie.";pintarReflexiones();}});
$("evFicha").addEventListener("click",e=>{abrirFicha(e.currentTarget.dataset.id);irA("archivo");});
/* ---------- 9. Agentes de memoria y comunitarios, capas visuales, datos del usuario ---------- */
const U_={
 c25:["INAH · Convenio con el Ayuntamiento de Puebla para el Centro Histórico (Boletín 273, 4 jun 2025)","https://www.inah.gob.mx/images/boletines/2025/273/Boletin%20273.pdf"],
 plan:["INAH (Hereditas) · Plan de Manejo del Centro Histórico de Puebla, publicado el 30 de junio de 2023","https://revistas.inah.gob.mx/index.php/hereditas/article/download/21716/23126/45336"],
 color:["Gerencia del Centro Histórico · Catálogo de color GCHPC-INAH 2022","https://centrohistorico.pueblacapital.gob.mx/images/PDF/Catalogo_De_Color_GCHPC-INAH_2022.pdf"],
 chol:["INAH · Convenio con San Pedro Cholula para salvamento arqueológico en obras de infraestructura (Boletín 333, 2023)","https://www.inah.gob.mx/images/boletines/2023/333/Boletin%20333.pdf"],
 anp:["INAH · Convenio marco con el Gobierno de Puebla para ecosistemas y sitios arqueológicos en Áreas Naturales Protegidas (Boletín 571, 31 oct 2025)","https://inah.gob.mx/images/boletines/2025/571/Boletin%20571.pdf"],
 palaf:["La Voz del INAH · «Biblioteca Palafoxiana del Tercer Milenio» (programa de rescate tras el sismo de 1999)","https://revistas.inah.gob.mx/index.php/lavozinah/article/download/18232/19630/39369"],
 talav:["UNESCO · Inscripción de la Talavera artesanal (2019)","https://ich.unesco.org/en/lists?RL=01462"],
 ley:["Gerencia del Centro Histórico · Catálogo de color (cita la Ley sobre Protección y Conservación de Poblaciones Típicas y Bellezas Naturales del Estado de Puebla, 1986)","https://centrohistorico.pueblacapital.gob.mx/images/PDF/Catalogo_De_Color_GCHPC-INAH_2022.pdf"]};
Object.assign(FICHAS.cholula,{hist:"La gran estructura fue creciendo por etapas superpuestas y hoy el Santuario de Nuestra Señora de los Remedios se levanta en la cima. Para cronologías precisas consulta las fuentes del INAH.",ini:[U_.chol]});
Object.assign(FICHAS.centro,{hist:"Fue fundado en 1531. La UNESCO lo inscribió en la Lista del Patrimonio Mundial en 1987 (criterios ii y iv).",ini:[U_.c25,U_.plan,U_.color]});
Object.assign(FICHAS.catedral,{hist:"Es un templo de los siglos XVI y XVII ubicado en el Centro Histórico, inscrito por la UNESCO en 1987 como parte del conjunto.",ini:[U_.c25,U_.plan],iniNota:"Estas iniciativas se refieren al Centro Histórico, que incluye la Catedral."});
Object.assign(FICHAS.palafoxiana,{hist:"Fue fundada en 1646 por el obispo Juan de Palafox y Mendoza y reabierta en 1773 por el obispo Francisco Fabián y Fuero, en el lugar que ocupa hasta hoy. El proyecto «Biblioteca Palafoxiana del Tercer Milenio» surgió tras el sismo de 1999.",ini:[U_.palaf]});
Object.assign(FICHAS.barrios,{hist:"Cada barrio tiene su propia historia local; esta ficha es general. Para conocer la tuya, consulta archivos, museos y personas mayores de tu comunidad.",ini:[]});
Object.assign(FICHAS.talavera,{hist:"Su proceso conserva un patrón histórico del siglo XVI y en 2019 se inscribió en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad.",ini:[U_.talav]});
Object.assign(FICHAS.paisaje,{hist:"En 1987 el Comité del Patrimonio Mundial señaló que la urbanización había debilitado la complementariedad entre Puebla y el sitio prehispánico de Cholula.",ini:[U_.anp,U_.chol]});
for(const k in FICHAS){const f=FICHAS[k];for(const x of f.ini)if(!f.fuentes.some(y=>y[1]===x[1]))f.fuentes.push(x);}
/* Memoria del usuario (localStorage): reflexiones, decisiones y progreso */
const KEY="muralPuebla.v1";let memOK=true,capa=null;
const mem={ref:reflexiones,dec:[],fin:[],acc:{notas:[],hechas:[]}};
function guardarMem(){try{localStorage.setItem(KEY,JSON.stringify(mem));}catch(e){memOK=false;}}
function cargarMem(){try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(!s)return;
  reflexiones.push(...(s.ref||[]));mem.dec=s.dec||[];mem.fin=s.fin||[];mem.acc.notas.push(...((s.acc||{}).notas||[]));mem.acc.hechas.push(...((s.acc||{}).hechas||[]));}catch(e){memOK=false;}}
cargarMem();
/* Capas visuales de las decisiones, dibujadas sobre el mural */
const CAPAS={velo:"un velo oscuro y grietas cubren poco a poco el mural",reticula:"una retícula de registro recorre el mural",bloques:"bloques de construcción avanzan desde los bordes",corredor:"un marco dorado delimita una zona de protección",mesa:"un círculo de personas conectado por hilos representa el diálogo",red:"se tejen redes entre puntos del mural",paginas:"páginas flotantes evocan los registros de la memoria",mosaico:"un mosaico ornamental se completa poco a poco"};
const NOD=Array.from({length:16},(_,i)=>({x:60+i*137%680,y:50+i*91%400}));
function dibujarCapa(){const k=capa.k;capa.t=Math.min(1,capa.t+.004);const t=capa.t;ctx.save();ctx.lineWidth=1.5;
  if(k==="velo"){ctx.fillStyle="rgba(8,10,20,"+.4*t+")";ctx.fillRect(0,0,W,H);ctx.strokeStyle="rgba(230,225,210,"+.4*t+")";
    for(let i=0;i<10;i++){let x=(i*83+40)%W,y=i*61%H;ctx.beginPath();ctx.moveTo(x,y);for(let s=0;s<Math.ceil(6*t);s++){x+=(s*37+i*13)%40-12;y+=18+(s*29+i*7)%22;ctx.lineTo(x,y);}ctx.stroke();}}
  else if(k==="reticula"){ctx.strokeStyle="rgba(60,194,189,"+.3*t+")";ctx.lineWidth=1;ctx.beginPath();for(let x=0;x<W;x+=40){ctx.moveTo(x,0);ctx.lineTo(x,H);}for(let y=0;y<H;y+=40){ctx.moveTo(0,y);ctx.lineTo(W,y);}ctx.stroke();
    ctx.strokeStyle="rgba(244,209,140,"+.8*t+")";ctx.lineWidth=2;const sy=cuadro*3%H;ctx.beginPath();ctx.moveTo(0,sy);ctx.lineTo(W,sy);ctx.stroke();}
  else if(k==="bloques"){for(let i=0;i<10;i++){const h=(40+i*53%90)*t,x=i*89%(W-60),up=i%2;ctx.fillStyle="rgba(120,125,140,.85)";ctx.fillRect(x,up?0:H-h,60,h);ctx.fillStyle="rgba(244,241,234,.25)";ctx.fillRect(x+8,up?0:H-h+8,10,10);}}
  else if(k==="corredor"){ctx.setLineDash([14,8]);ctx.strokeStyle="rgba(244,209,140,"+t+")";ctx.lineWidth=4;ctx.strokeRect(14,14,W-28,H-28);ctx.setLineDash([]);ctx.strokeStyle="rgba(244,209,140,"+.25*t+")";ctx.lineWidth=14;ctx.strokeRect(26,26,W-52,H-52);}
  else if(k==="mesa"){const n=Math.ceil(8*t);for(let i=0;i<n;i++){const a=i/8*6.28+cuadro*.004,x=400+Math.cos(a)*170,y=250+Math.sin(a)*120;ctx.strokeStyle="rgba(217,106,176,.6)";ctx.beginPath();ctx.moveTo(400,250);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle="#d96ab0";ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fill();}
    ctx.fillStyle="#f4d18c";ctx.beginPath();ctx.arc(400,250,10,0,7);ctx.fill();}
  else if(k==="red"){for(let i=0;i<NOD.length;i++)for(let j=i+1;j<NOD.length;j++){const d=Math.hypot(NOD[i].x-NOD[j].x,NOD[i].y-NOD[j].y);if(d<230){ctx.strokeStyle="rgba(60,194,189,"+.55*t*(1-d/230)+")";ctx.beginPath();ctx.moveTo(NOD[i].x,NOD[i].y);ctx.lineTo(NOD[j].x,NOD[j].y);ctx.stroke();}}
    ctx.fillStyle="rgba(244,209,140,"+t+")";for(const p of NOD){ctx.beginPath();ctx.arc(p.x,p.y,4,0,7);ctx.fill();}}
  else if(k==="paginas"){for(let i=0;i<14;i++){const x=(i*57+20)%W,y=H-(cuadro*.6+i*47)%H;ctx.globalAlpha=.85*t;ctx.fillStyle="#f4f1ea";ctx.fillRect(x,y,14,18);ctx.fillStyle="#7a5ab0";ctx.fillRect(x+2,y+4,10,1.5);ctx.fillRect(x+2,y+8,10,1.5);ctx.fillRect(x+2,y+12,7,1.5);}}
  else if(k==="mosaico"){const n=Math.floor(60*t);ctx.globalAlpha=.85;for(let i=0;i<n;i++){const x=30+i%12*64,y=30+(i/12|0)*80+i%2*20;ctx.fillStyle=i%2?"#2a5fa8":"#e2b24a";ctx.beginPath();ctx.moveTo(x,y-10);ctx.lineTo(x+10,y);ctx.lineTo(x,y+10);ctx.lineTo(x-10,y);ctx.fill();}}
  ctx.restore();}
/* Reflexiones convertidas en una capa de partículas doradas sobre el mural */
const insc=[];
function recalcInsc(){insc.length=0;if(!mem.fin.length)return;const c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d");g.fillStyle="#000";g.font="bold 32px 'Palatino Linotype',Palatino,serif";g.textBaseline="top";
  let ln="",y=50,n=0,ok=true;for(const w of mem.fin[mem.fin.length-1].t.slice(0,110).split(/\s+/)){if(ln&&(ln+" "+w).length>26){g.fillText(ln,50,y);y+=40;ln=w;if(++n>=4){ok=false;break;}}else ln=ln?ln+" "+w:w;}
  if(ok&&ln)g.fillText(ln,50,y);
  const d=g.getImageData(0,0,W,H).data;for(let y=0;y<H;y+=3)for(let x=0;x<W;x+=3)if(d[(y*W+x)*4+3]>128&&insc.length<2600)insc.push({x,y,ph:Math.random()*6});}
function dibujarInsc(){if(!insc.length)return;ctx.fillStyle="rgba(244,209,140,.85)";for(const p of insc)ctx.fillRect(p.x+Math.sin(cuadro*.04+p.ph)*.8,p.y+Math.cos(cuadro*.03+p.ph)*.8,3,3);}
/* Agentes de memoria y comunitarios */
const CFG={b:{on:true,busca:true,sep:true,huye:true},g:{on:true,busca:true,sep:true},m:{on:true,hilos:true},c:{on:true,atrae:true,lineas:true}};
const ZONAS=[{x:140,y:120},{x:660,y:130},{x:400,y:250},{x:150,y:390},{x:650,y:380}];
let memorias=[],comunitarios=[];const hilos=[];
class AgenteEsp extends Vehicle{
  constructor(x,y,tipo){super(x,y,"g");this.tipo=tipo;this.sub=tipo==="m"?"memoria":"comunidad";this.maxspeed=tipo==="m"?2.4:2;this.radio=tipo==="m"?40:60;this.meta=null;this.espera=0;this.zona=Math.random()*ZONAS.length|0;}
  dibujar(){const m=this.tipo==="m",t=cuadro*.05+this.fase;ctx.save();ctx.translate(this.x,this.y);
    ctx.fillStyle=m?"rgba(244,209,140,.12)":"rgba(217,106,176,.12)";ctx.beginPath();ctx.arc(0,0,this.radio,0,7);ctx.fill();
    ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(0,16,10,3,0,0,7);ctx.fill();ctx.translate(0,Math.sin(t)*2);ctx.lineWidth=2;
    if(m){ctx.fillStyle="#f4d18c";ctx.strokeStyle="#6b4a2a";ctx.beginPath();ctx.rect(-10,-11,20,22);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,-11);ctx.lineTo(0,11);ctx.stroke();ctx.fillStyle="#7a5ab0";ctx.fillRect(-7,-6,5,2);ctx.fillRect(3,-6,5,2);ctx.fillRect(-7,-1,5,2);ctx.fillRect(3,-1,5,2);}
    else for(let i=0;i<3;i++){const a=i*2.09+t*.5;ctx.fillStyle=["#d96ab0","#e2b24a","#3cc2bd"][i];ctx.beginPath();ctx.arc(Math.cos(a)*8,Math.sin(a)*8,5.5,0,7);ctx.fill();ctx.strokeStyle="rgba(10,16,32,.6)";ctx.lineWidth=1;ctx.stroke();}
    ctx.restore();}}
function ajustarE(){const nm=CFG.m.on?3:0,nc=CFG.c.on?3:0;
  while(memorias.length<nm)memorias.push(new AgenteEsp(Math.random()*W,Math.random()*H,"m"));memorias.length=nm;
  while(comunitarios.length<nc)comunitarios.push(new AgenteEsp(Math.random()*W,Math.random()*H,"c"));comunitarios.length=nc;}
function restauraCerca(a,cupo){let n=0;const R2=a.radio*a.radio;for(let i=0;i<N&&n<cupo;i++){if(casa[i])continue;const dx=X[i]-a.x,dy=Y[i]-a.y;if(dx*dx+dy*dy<R2){casa[i]=1;n++;}}return n;}
function actuarM(a){ // memoria: visita nodos íntegros del mural, teje hilos entre ellos y mantiene las relaciones cercanas
  if(!a.meta||Math.hypot(a.meta.x-a.x,a.meta.y-a.y)<14){let j=-1;for(let k=0;k<30;k++){const i=Math.random()*N|0;if(casa[i]){j=i;break;}}
    const nv=j>=0?{x:HX[j],y:HY[j]}:{x:Math.random()*W,y:Math.random()*H};
    if(a.meta&&CFG.m.hilos&&hilos.length<40)hilos.push({x1:a.meta.x,y1:a.meta.y,x2:nv.x,y2:nv.y,v:900});a.meta=nv;}
  a.seek(a.meta.x,a.meta.y,40);a.separate(memorias);a.bordes();a.update();restauraCerca(a,3);
  if(cuadro%3===0)emitir(a.x,a.y,"#f4d18c",(Math.random()-.5)*.4,(Math.random()-.5)*.4,30,2,0);}
function actuarC(a){ // comunitario: recorre zonas, se reúne, restaura en grupo y atrae a los guardianes cercanos
  const z=ZONAS[a.zona];a.seek(z.x,z.y,60);
  if(a.espera>0){a.espera--;if(a.espera===0)a.zona=(a.zona+1+Math.random()*(ZONAS.length-1)|0)%ZONAS.length;}
  else if(Math.hypot(z.x-a.x,z.y-a.y)<30)a.espera=140;
  a.separate(comunitarios);a.bordes();a.update();restauraCerca(a,a.espera>0?8:2);
  if(CFG.c.atrae)for(const g of guardianes){const dx=a.x-g.x,dy=a.y-g.y,d=Math.hypot(dx,dy);if(d<160&&d>20)g.fuerza(dx/d*.05,dy/d*.05);}
  if(a.espera>0&&cuadro%2===0)emitir(a.x+(Math.random()-.5)*30,a.y+(Math.random()-.5)*30,Math.random()<.5?"#d96ab0":"#e2b24a",0,-.6,34,2,0);}
function dibujarHilos(){ctx.save();ctx.lineWidth=2;
  for(let i=hilos.length-1;i>=0;i--){const h=hilos[i];if(--h.v<=0||!CFG.m.on){hilos.splice(i,1);continue;}
    ctx.strokeStyle="rgba(244,209,140,"+.7*h.v/900+")";ctx.beginPath();ctx.moveTo(h.x1,h.y1);ctx.lineTo(h.x2,h.y2);ctx.stroke();}
  if(CFG.c.lineas){ctx.lineWidth=1.5;const todos=guardianes.concat(memorias,comunitarios);
    for(const c of comunitarios)for(const o of todos){if(o===c)continue;const d=Math.hypot(o.x-c.x,o.y-c.y);if(d<110){ctx.strokeStyle="rgba(217,106,176,"+.6*(1-d/110)+")";ctx.beginPath();ctx.moveTo(c.x,c.y);ctx.lineTo(o.x,o.y);ctx.stroke();}}}
  ctx.restore();}
/* Conceptos nuevos del panel de demostración */
AG.push({k:"atr",t:"Atracción",e:"Una fuerza que acerca al agente a un punto de interés (como seek), solo si está dentro de cierto rango.",o:"Los guardianes se acercan a las zonas dañadas y los agentes comunitarios atraen a los guardianes cercanos.",a:"Analogía: lo que nos importa atrae nuestra atención y nuestro cuidado.",q:"¿Qué atrae el cuidado de las personas hacia un lugar?"},
 {k:"rep",t:"Repulsión",e:"Una fuerza que aleja al agente de una fuente (flee y separate), más intensa mientras más cerca está.",o:"Los contaminantes huyen del cursor y los agentes se separan entre sí.",a:"Analogía: los límites y las reglas mantienen a distancia lo que daña.",q:"¿Qué límites protegen un lugar sin cerrarlo a las personas?"},
 {k:"int",t:"Interacción entre agentes",e:"Los agentes cambian su comportamiento según los demás: se agrupan, se separan o se conectan, y las partículas del mural resumen el resultado.",o:"Guardianes y comunitarios se agrupan; contaminantes y guardianes actúan sobre las mismas partículas.",a:"Analogía: el cuidado y el desgaste ocurren a la vez y se influyen.",q:"¿Qué cambia cuando varias formas de cuidado coinciden en el mismo lugar?"});
/* Panel de exploración de los cuatro agentes */
const AGT={
 b:{t:"Agente de degradación",rep:"Las fuerzas que contribuyen al deterioro o pérdida del patrimonio: humo, petróleo y basura.",obj:"Encontrar fragmentos íntegros y dispersarlos.",
  reg:["percibir(): mira una muestra de partículas íntegras dentro de su rango de visión","seek(): se dirige al fragmento elegido","separate(): evita amontonarse con otros contaminantes","flee(): huye del cursor, es decir, de tu intervención","Al llegar, afloja las partículas cercanas con un impulso aleatorio"],
  con:"Búsqueda de objetivos y repulsión ↔ el desgaste es constante, pero responde a la intervención.",beh:[["on","Agente activo"],["busca","Búsqueda de objetivos"],["sep","Separación"],["huye","Huir del cursor"]]},
 g:{t:"Agente de conservación",rep:"Las acciones de protección y restauración de personas e instituciones.",obj:"Buscar zonas deterioradas, acercarse y devolver partículas a su lugar.",
  reg:["percibir(): mira una muestra de partículas dañadas en su rango","seek() con llegada: se acerca y frena","separate(): reparte el esfuerzo en el espacio","Restaura un cupo de partículas que crece con la inversión"],
  con:"Atracción y búsqueda ↔ el cuidado se dirige a donde hay daño y depende de los recursos.",beh:[["on","Agente activo"],["busca","Búsqueda de objetivos"],["sep","Separación"]]},
 m:{t:"Agente de memoria",rep:"La transmisión de conocimientos y la permanencia de la memoria cultural.",obj:"Conectar partes íntegras del mural y mantener relaciones entre ellas.",
  reg:["Elige como nodo una partícula íntegra al azar","seek() con llegada: viaja hasta ese nodo","Al llegar, teje un hilo dorado entre el nodo anterior y el nuevo (red)","Devuelve a su sitio las partículas dañadas que encuentra cerca"],
  con:"Interacción y conexión ↔ la memoria se mantiene cuando se enlazan lugares, personas y saberes.",beh:[["on","Agente activo"],["hilos","Tejer hilos de memoria"]]},
 c:{t:"Agente comunitario",rep:"La participación colectiva en el cuidado del patrimonio.",obj:"Reunirse en distintas zonas, sumar a otros agentes y restaurar en grupo.",
  reg:["Recorre zonas del mural con seek() y se detiene a reunirse","separate(): evita amontonarse con otros comunitarios","Al reunirse restaura más partículas (cupo mayor)","Atracción: acerca suavemente a los guardianes cercanos","Dibuja conexiones con los agentes que están cerca"],
  con:"Atracción e interacción ↔ cuidar juntos multiplica el efecto de cada acción.",beh:[["on","Agente activo"],["atrae","Atraer guardianes"],["lineas","Mostrar conexiones"]]}};
let tipoSel="b";
function renderTipo(){const a=AGT[tipoSel],n={b:borradores,g:guardianes,m:memorias,c:comunitarios}[tipoSel].length;
  $("tipoChips").querySelectorAll("button").forEach(b=>{const on=b.dataset.k===tipoSel;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);});
  $("tipoTexto").innerHTML='<h3>'+a.t+'</h3><p><b>Qué representa:</b> '+a.rep+'</p><p><b>Su objetivo:</b> '+a.obj+'</p><p><b>En el mural ahora:</b> '+n+' agente'+(n===1?"":"s")+' de este tipo.</p><p><b>Reglas de programación:</b></p>'+li(a.reg)+'<p><b>Concepto ↔ significado artístico:</b> '+a.con+'</p>';
  $("tipoCtrl").innerHTML='<p><b>Activa o desactiva comportamientos</b> y observa el cambio en el mural:</p>'+a.beh.map(([k,t])=>'<label class="chk"><input type="checkbox" data-k="'+k+'"'+(CFG[tipoSel][k]?" checked":"")+'> '+t+'</label>').join("")+'<p class="pie">Es una analogía artística: los agentes no representan literalmente a personas ni procesos reales.</p><p><button type="button" id="verTipo">Ver este agente en el mural →</button></p>';}
$("tipoChips").innerHTML=Object.keys(AGT).map(k=>'<button type="button" data-k="'+k+'" aria-pressed="false">'+AGT[k].t+'</button>').join("");
$("tipoChips").addEventListener("click",e=>{const b=e.target.closest("button");if(b){tipoSel=b.dataset.k;renderTipo();}});
$("tipoCtrl").addEventListener("change",e=>{const k=e.target.dataset.k;if(!k)return;CFG[tipoSel][k]=e.target.checked;if(k==="on"){sincronizar();renderTipo();}});
$("tipoCtrl").addEventListener("click",e=>{if(e.target.id==="verTipo"){overlay={k:"t_"+tipoSel,n:900};mostrarTab("mural");}});

/* ---------- 8. Navegación por pestañas y vistas ---------- */
const TABS=["inicio","mural","archivo","agentes","experimenta","acciones","memoria","fuentes"];let tab="inicio";
function mostrarTab(n,noHash){if(!TABS.includes(n))n="inicio";tab=n;
  TABS.forEach(t=>{$("v-"+t).hidden=t!==n;});
  $("menu").querySelectorAll("button").forEach(b=>{const on=b.dataset.t===n;b.classList.toggle("on",on);b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;});
  $("vistas").scrollTop=0;
  if(n==="acciones")pintarReflexiones();else if(n==="experimenta")actualizarReto(null);else if(n==="memoria")renderMemoria();else if(n==="agentes")renderTipo();
  if(!noHash){try{history.replaceState(null,"","#"+n);}catch(e){}}}
$("menu").addEventListener("click",e=>{const b=e.target.closest("button");if(b)mostrarTab(b.dataset.t);});
$("menu").addEventListener("keydown",e=>{const d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!d)return;
  const n=TABS[(TABS.indexOf(tab)+d+TABS.length)%TABS.length];mostrarTab(n);$("menu").querySelector('[data-t="'+n+'"]').focus();});
$("marca").addEventListener("click",()=>mostrarTab("inicio"));
$("comenzar").addEventListener("click",()=>mostrarTab("mural"));
addEventListener("hashchange",()=>mostrarTab(location.hash.slice(1),true));
/* Inicio: mosaico con los siete escenarios, dibujados con las mismas funciones del mural */
$("mosaico").innerHTML=Object.keys(ESC).map(k=>'<button type="button" class="tile" data-id="'+k+'" aria-label="Ver '+ESC[k].n+' en el mural"><canvas width="800" height="500" aria-hidden="true"></canvas><span>'+ESC[k].n+'</span></button>').join("");
$("mosaico").querySelectorAll(".tile").forEach(b=>{ESC[b.dataset.id].d(b.firstChild.getContext("2d"));});
$("mosaico").addEventListener("click",e=>{const b=e.target.closest(".tile");if(!b)return;cargarEscena(b.dataset.id,true);mostrarPanel(b.dataset.id,null);mostrarTab("mural");});
/* Entiende a los agentes: un concepto a la vez, con demostración propia y resaltado en el mural real */
const DEMO={atr:"Mueve el cursor: los agentes dentro del círculo son atraídos hacia él.",rep:"Los agentes se alejan de la fuente roja cuando se acercan demasiado.",int:"Hay dos grupos: los iguales se acercan, los distintos se apartan y se conectan al cruzarse.",obj:"Toca el lienzo para mover el objetivo: los agentes frenan al llegar.",sep:"Activa y desactiva la separación y compara cómo se agrupan.",exp:"Cada agente cambia su rumbo poco a poco; nadie sigue una ruta fija.",per:"Cada agente solo «ve» los puntos dentro de su círculo.",est:"Mueve el cursor sobre los agentes: los que están cerca huyen."};
const dm={k:"obj",ag:[],fo:[],obj:{x:240,y:150},pt:null,sep:true};
function demoInit(){dm.ag=[];dm.fo=[];for(let i=0;i<14;i++)dm.ag.push({g:dm.ag.length%2,x:Math.random()*480,y:Math.random()*300,vx:Math.random()*2-1,vy:Math.random()*2-1,a:Math.random()*6.28});
  for(let i=0;i<10;i++)dm.fo.push({x:30+Math.random()*420,y:30+Math.random()*240});}
function renderAg(){const a=AG.find(x=>x.k===dm.k);
  $("agChips").querySelectorAll("button").forEach(b=>{const on=b.dataset.k===dm.k;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);});
  $("agTexto").innerHTML='<h3>'+a.t+'</h3><p><b>En el código:</b> '+a.e+'</p><p><b>En el mural:</b> '+a.o+'</p><p><b>En la demostración:</b> '+DEMO[a.k]+'</p><p><b>Analogía artística:</b> '+a.a+'</p><p><i>'+a.q+'</i></p>';
  $("demoSep").hidden=a.k!=="sep";$("agVer").dataset.ov=a.k;demoInit();}
function demoPaso(){const c=$("demoAg"),g=c.getContext("2d"),k=dm.k;g.fillStyle="#0b1224";g.fillRect(0,0,480,300);
  if(k==="obj"){g.strokeStyle="#e0505a";g.lineWidth=2;g.beginPath();g.arc(dm.obj.x,dm.obj.y,9,0,7);g.stroke();}
  if(k==="per"){g.fillStyle="#d9a04a";for(const f of dm.fo){g.beginPath();g.arc(f.x,f.y,4,0,7);g.fill();}}
  if((k==="est"||k==="atr")&&dm.pt){g.setLineDash([6,5]);g.strokeStyle=k==="est"?"#e0505a":"#3cc2bd";g.beginPath();g.arc(dm.pt.x,dm.pt.y,k==="est"?110:170,0,7);g.stroke();g.setLineDash([]);}
  if(k==="rep"){g.strokeStyle="#e0505a";g.lineWidth=2;g.beginPath();g.arc(240,150,12,0,7);g.stroke();g.setLineDash([6,5]);g.beginPath();g.arc(240,150,120,0,7);g.stroke();g.setLineDash([]);}
  for(const a of dm.ag){let tx=0,ty=0,v=0;
    if(k==="obj"){const dx=dm.obj.x-a.x,dy=dm.obj.y-a.y,d=Math.hypot(dx,dy)||1;v=Math.min(2.6,2.6*d/70);tx=dx/d*v;ty=dy/d*v;}
    else if(k==="sep"){const dx=240-a.x,dy=150-a.y,d=Math.hypot(dx,dy)||1;tx=dx/d*.9;ty=dy/d*.9;
      if(dm.sep)for(const o of dm.ag){if(o===a)continue;const ex=a.x-o.x,ey=a.y-o.y,e=Math.hypot(ex,ey);if(e>0&&e<40){tx+=ex/e*(40-e)*.08;ty+=ey/e*(40-e)*.08;}}}
    else{a.a+=(Math.random()-.5)*.5;tx=Math.cos(a.a)*1.4;ty=Math.sin(a.a)*1.4;
      if(k==="per"){let best=null,bd=90;for(const f of dm.fo){const d=Math.hypot(f.x-a.x,f.y-a.y);if(d<bd){bd=d;best=f;}}
        g.strokeStyle="rgba(244,241,234,.3)";g.lineWidth=1;g.beginPath();g.arc(a.x,a.y,90,0,7);g.stroke();
        if(best){const dx=best.x-a.x,dy=best.y-a.y,d=Math.hypot(dx,dy)||1;tx=dx/d*2;ty=dy/d*2;g.strokeStyle="#3cc2bd";g.beginPath();g.moveTo(a.x,a.y);g.lineTo(best.x,best.y);g.stroke();if(d<8){best.x=30+Math.random()*420;best.y=30+Math.random()*240;}}}
      if(k==="est"&&dm.pt){const dx=a.x-dm.pt.x,dy=a.y-dm.pt.y,d=Math.hypot(dx,dy)||1;if(d<110){tx=dx/d*3;ty=dy/d*3;}}
      if(k==="atr"&&dm.pt){const dx=dm.pt.x-a.x,dy=dm.pt.y-a.y,d=Math.hypot(dx,dy)||1;if(d<170&&d>14){tx=dx/d*2.4;ty=dy/d*2.4;}}
      if(k==="rep"){const dx=a.x-240,dy=a.y-150,d=Math.hypot(dx,dy)||1;if(d<120){tx=dx/d*3;ty=dy/d*3;}}
      if(k==="int")for(const o of dm.ag){if(o===a)continue;const dx=o.x-a.x,dy=o.y-a.y,d=Math.hypot(dx,dy);
        if(d>0&&d<90){const s=o.g===a.g?.5:-1;tx+=dx/d*s;ty+=dy/d*s;if(o.g!==a.g&&d<60){g.strokeStyle="rgba(217,106,176,"+(1-d/60)+")";g.lineWidth=1.5;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(o.x,o.y);g.stroke();}}}}
    a.vx+=(tx-a.vx)*.1;a.vy+=(ty-a.vy)*.1;a.x=(a.x+a.vx+480)%480;a.y=(a.y+a.vy+300)%300;
    if(k==="sep"){g.strokeStyle="#d9a04a";g.lineWidth=1.2;g.beginPath();g.arc(a.x,a.y,20,0,7);g.stroke();}
    g.fillStyle=k==="int"&&a.g?"#e0505a":"#3cc2bd";g.beginPath();g.arc(a.x,a.y,5,0,7);g.fill();
    if(k==="exp"){g.strokeStyle="#f4f1ea";g.lineWidth=1.5;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(a.x+a.vx*10,a.y+a.vy*10);g.stroke();}}}
function posDemo(e){const r=$("demoAg").getBoundingClientRect();return{x:(e.clientX-r.left)*480/r.width,y:(e.clientY-r.top)*300/r.height};}
$("agChips").innerHTML=AG.map(a=>'<button type="button" data-k="'+a.k+'" aria-pressed="false">'+a.t+'</button>').join("");
$("agChips").addEventListener("click",e=>{const b=e.target.closest("button");if(b){dm.k=b.dataset.k;renderAg();}});
$("demoAg").addEventListener("pointermove",e=>dm.pt=posDemo(e));$("demoAg").addEventListener("pointerleave",()=>dm.pt=null);
$("demoAg").addEventListener("pointerdown",e=>{dm.pt=posDemo(e);dm.obj=posDemo(e);});
$("demoSep").addEventListener("click",e=>{dm.sep=!dm.sep;e.currentTarget.textContent="Separación: "+(dm.sep?"activada":"desactivada");});
$("agVer").addEventListener("click",e=>{overlay={k:({atr:"obj",rep:"est",int:"per"})[e.currentTarget.dataset.ov]||e.currentTarget.dataset.ov,n:900};mostrarTab("mural");});
renderAg();
/* Experimenta: retos que preparan el mural con el sistema existente (escenario, controles y efecto) */
const RETOS=[
 {h:"Presión turística",s:"centro",i:25,p:22,fx:"polvo",tipo:"Turismo",t:"Presión turística con pocos recursos",d:"Aumentan las visitas al Centro Histórico y el mantenimiento tiene recursos limitados.",m:"Cuando el uso crece más rápido que el cuidado, el desgaste se acumula.",q:"¿Cómo repartir las visitas para no concentrar el desgaste?",rec:"Subir la inversión poco a poco y observar cuánto tarda el mural en recuperarse."},
 {h:"Mantenimiento y restauración",s:"catedral",i:85,p:6,fx:"brillo",tipo:"Conservación",t:"Mantenimiento preventivo sostenido",d:"Un equipo revisa, documenta y restaura la Catedral con recursos estables.",m:"El cuidado constante evita que los daños pequeños crezcan.",q:"¿Qué señales permiten intervenir antes de que el daño avance?",rec:"Programar revisiones periódicas y registrar cada intervención."},
 {h:"Participación comunitaria",s:"barrios",i:60,p:6,fx:"fiesta",tipo:"Participación comunitaria",t:"El barrio se organiza",d:"Vecinas y vecinos organizan una jornada para cuidar y celebrar sus espacios.",m:"Las acciones compartidas generan nuevas formas de cuidado.",q:"¿Quién más debería participar en las decisiones del barrio?",rec:"Convocar a la comunidad y acordar tareas concretas."},
 {h:"Conocimientos artesanales",s:"talavera",i:30,p:15,fx:"polvo",tipo:"Transmisión cultural",t:"Menos relevo de aprendices",d:"Hay pocas personas aprendiendo una técnica y más competencia de piezas sin origen claro.",m:"Un saber que no se transmite se debilita aunque las piezas sigan existiendo.",q:"¿Qué apoyos ayudarían a que los talleres enseñen a nuevas generaciones?",rec:"Reconocer la autoría y apoyar talleres que formen aprendices."},
 {h:"Entorno natural",s:"paisaje",i:35,p:23,fx:"grieta",tipo:"Urbanización",t:"Expansión sin planeación",d:"El crecimiento urbano y los residuos presionan las áreas verdes que rodean el patrimonio.",m:"El paisaje y el patrimonio histórico se cuidan juntos.",q:"¿Cómo crecer sin perder áreas verdes?",rec:"Incluir a la comunidad y a especialistas en la planeación del territorio."},
 {h:"Memoria cultural",s:"palafoxiana",i:70,p:8,fx:"brillo",tipo:"Transmisión cultural",t:"Digitalizar y cuidar colecciones",d:"Se cuidan los originales y se difunden copias digitales de documentos históricos.",m:"La tecnología puede ayudar a compartir la memoria sin sustituir los originales.",q:"¿Quién debería poder consultar un archivo digital?",rec:"Digitalizar con criterios técnicos y difundir con crédito."}];
$("retoGrid").innerHTML=RETOS.map((r,i)=>'<article class="tarjeta"><h3>'+r.h+'</h3><p>'+r.d+'</p><p class="pie">Se aplicará: '+ESC[r.s].n+' · inversión '+r.i+' % · presión '+r.p+' · efecto: '+FX[r.fx].txt+'</p><p><button type="button" data-r="'+i+'">Preparar en el mural →</button></p></article>').join("");
$("retoGrid").addEventListener("click",e=>{const b=e.target.closest("[data-r]");if(!b)return;const r=RETOS[b.dataset.r],i0=+$("inv").value,p0=+$("pres").value;
  cargarEscena(r.s,true);$("inv").value=r.i;$("pres").value=r.p;sincronizar();iniciarFx(r.fx);
  mostrarPanel(r.s,{tipo:r.tipo,titulo:r.t,texto:r.d,msg:r.m,fx:r.fx,i0,p0,inv:r.i,pres:r.p,q:r.q,rec:r.rec});
  $("retoAplicado").textContent="Último reto aplicado: "+r.h+" (inversión "+i0+" % → "+r.i+" %, presión "+p0+" → "+r.p+").";mostrarTab("mural");});
$("irMural").addEventListener("click",()=>mostrarTab("mural"));
/* Reflexiones: se muestran tanto en la ficha como en la pestaña Acciones */
function pintarReflexiones(){for(const id of ["refLista","refListaAcc"]){const ul=$(id);if(!ul)continue;ul.textContent="";
  if(!reflexiones.length){const l=document.createElement("li");l.textContent="Aún no has guardado reflexiones.";ul.appendChild(l);continue;}
  for(const r of reflexiones){const l=document.createElement("li"),b=document.createElement("b");b.textContent=r.l+" · "+r.tipo+": ";l.append(b,document.createTextNode(r.q+" — "+r.t));ul.appendChild(l);}}}
/* Acciones para conservar: cada actividad tiene su propio espacio de trabajo */
let accSel=0;const notas=mem.acc.notas,hechas=mem.acc.hechas;
function renderAcc(){const a=ACC[accSel];
  $("accChips").innerHTML=ACC.map((x,i)=>'<button type="button" data-i="'+i+'" class="'+(i===accSel?"on":"")+'">'+(hechas[i]?"✓ ":"")+x.t+'</button>').join("");
  $("accEspacio").innerHTML='<h3>'+a.t+'</h3><p><b>Instrucciones:</b> '+a.i+'</p><p><b>Objetivo:</b> '+a.o+'</p><p><b>Resultado esperado:</b> '+a.r+'</p><p><i>'+a.q+'</i></p><label for="accTxt">Tu espacio de trabajo</label><textarea id="accTxt" rows="5" maxlength="1200" placeholder="Escribe aquí tus notas, ideas o respuesta"></textarea><p class="pie">Se guarda solo en este navegador; no se envía a nadie.</p>'+(a.b?'<p><button type="button" data-b="'+a.b+'">'+a.bt+'</button></p>':'')+'<label class="chk"><input type="checkbox" id="accHecha"'+(hechas[accSel]?" checked":"")+'> Marcar como realizada</label>';
  $("accTxt").value=notas[accSel]||"";$("accProg").textContent=hechas.filter(Boolean).length+" de "+ACC.length+" acciones realizadas (guardadas en este navegador).";}
$("accChips").addEventListener("click",e=>{const b=e.target.closest("button");if(b){accSel=+b.dataset.i;renderAcc();}});
$("accEspacio").addEventListener("input",e=>{if(e.target.id==="accTxt"){notas[accSel]=e.target.value;guardarMem();}});
$("accEspacio").addEventListener("change",e=>{if(e.target.id==="accHecha"){hechas[accSel]=e.target.checked;guardarMem();renderAcc();}});
$("accEspacio").addEventListener("click",e=>{const b=e.target.closest("[data-b]");if(!b)return;const k=b.dataset.b;
  if(k==="canvas")mostrarTab("mural");else if(k==="reflex"){modo="reflexiona";renderFicha();$("refTipo").selectedIndex=1;mostrarTab("archivo");}
  else{$("inv").value=35;$("pres").value=22;sincronizar();mostrarTab("mural");}});
$("irReflexion").addEventListener("click",()=>{modo="reflexiona";renderFicha();mostrarTab("archivo");});
renderAcc();
/* Fuentes por ficha (las mismas de cada ficha del Archivo vivo) */
$("fuentesFichas").innerHTML=Object.keys(FICHAS).map(k=>'<article class="tarjeta"><h3>'+ESC[k].n+'</h3><ul>'+FICHAS[k].fuentes.map(aLink).join("")+'</ul></article>').join("");
/* ---------- 10. Decisiones, escalas de acción y «Lo que decidimos conservar» ---------- */
const DEC={
 A:{n:"A · Abandono",d:"Un patrimonio recibe poca atención y pocos recursos de conservación; la humedad, el polvo y las grietas avanzan sin que nadie los registre.",
  o:[{t:"Esperar a que haya presupuesto",e:"No se interviene por ahora y el desgaste continúa.",r:"Los daños pequeños que no se atienden pueden crecer. Aun así, a veces no hay recursos inmediatos: ¿quién podría ayudar mientras tanto?",inv:10,pres:14,fx:"polvo",capa:"velo"},
     {t:"Documentar y diagnosticar el estado",e:"Se registra el lugar con fotografías y fichas para decidir con información.",r:"Documentar no repara por sí mismo, pero permite priorizar. ¿Qué se necesita después del diagnóstico?",inv:30,pres:10,fx:"brillo",capa:"reticula"},
     {t:"Mantenimiento básico y vigilancia vecinal",e:"Se organizan limpiezas y se avisa a las autoridades si aparecen daños.",r:"El cuidado cotidiano ayuda, pero no sustituye la restauración especializada. ¿Cómo pueden complementarse?",inv:55,pres:7,fx:"repara",capa:null}]},
 B:{n:"B · Presión urbana",d:"La ciudad crece alrededor de un espacio histórico: nuevas obras, más tránsito y usos del suelo en disputa.",
  o:[{t:"Permitir obras sin un plan de conjunto",e:"Cada obra se aprueba por separado, sin mirar el conjunto.",r:"Las obras sin planeación pueden alterar el entorno y los valores del sitio. ¿Quién debería evaluarlas antes de aprobarlas?",inv:20,pres:22,fx:"grieta",capa:"bloques"},
     {t:"Definir una zona de protección y reglas de uso",e:"Se delimita un entorno protegido con reglas claras para construir y usar el espacio.",r:"Las reglas protegen, pero deben dialogar con la vida cotidiana. ¿Cómo se acuerdan?",inv:50,pres:10,fx:"brillo",capa:"corredor"},
     {t:"Abrir una mesa de diálogo con habitantes, especialistas y autoridades",e:"Las decisiones sobre el espacio se discuten entre varias voces.",r:"La participación toma tiempo y exige escuchar. ¿Qué decisiones se enriquecen con más voces?",inv:45,pres:11,fx:"fiesta",capa:"mesa"}]},
 C:{n:"C · Conservación comunitaria",d:"Vecinas, vecinos y personas artesanas deciden cuidar juntos aquello que les da identidad.",
  o:[{t:"Promover actividades culturales y participar en las comunitarias",e:"Se organizan fiestas, talleres y recorridos abiertos a todas las personas.",r:"Las actividades acercan a la gente al patrimonio. ¿Cómo evitar que se vuelvan solo espectáculo?",inv:55,pres:6,fx:"fiesta",capa:"red"},
     {t:"Documentar las tradiciones con consentimiento",e:"Se registran relatos, recetas y oficios con permiso y crédito de quienes los comparten.",r:"Documentar conserva la memoria, pero ¿a quién pertenece lo que se registra y cómo se devuelve a la comunidad?",inv:50,pres:6,fx:"brillo",capa:"paginas"},
     {t:"Apoyar a las personas artesanas",e:"Se compra con procedencia clara, se reconoce la autoría y se facilita que enseñen a nuevas generaciones.",r:"El apoyo sostiene los saberes. ¿Cómo equilibrar tradición e innovación sin perder lo que da sentido a la técnica?",inv:60,pres:5,fx:"repara",capa:"mosaico"}]}};
let decE="A";
const fechaCorta=()=>new Date().toLocaleDateString("es-MX");
function renderDec(){const d=DEC[decE];
  $("decEsc").innerHTML=Object.keys(DEC).map(k=>'<button type="button" data-e="'+k+'" class="'+(k===decE?"on":"")+'">'+DEC[k].n+(mem.dec.some(x=>x.e===k)?" ✓":"")+'</button>').join("");
  $("decCuerpo").innerHTML='<p>'+d.d+'</p><div class="opciones">'+d.o.map((o,i)=>'<button type="button" class="opcion" data-o="'+i+'"><b>'+o.t+'</b><span>'+o.e+'</span></button>').join("")+'</div><div id="decRes"></div>';}
function decidir(i){const o=DEC[decE].o[i],i0=+$("inv").value,p0=+$("pres").value;
  $("inv").value=o.inv;$("pres").value=o.pres;sincronizar();iniciarFx(o.fx);amb.n=600;capa=o.capa?{k:o.capa,t:0}:null;
  mostrarPanel(escActual,{tipo:"Decisión · "+DEC[decE].n,titulo:o.t,texto:o.e,msg:o.r,fx:o.fx,i0,p0,inv:o.inv,pres:o.pres,q:"¿Qué otras decisiones podrían acompañar a esta?",rec:"Prueba las otras decisiones del escenario y compara cómo cambia el mural."});
  mem.dec.push({e:decE,o:i,l:escActual,f:fechaCorta()});guardarMem();
  const todas=["A","B","C"].every(k=>mem.dec.some(x=>x.e===k));
  $("decRes").innerHTML='<div class="medidor"><p><b>Tu decisión:</b> '+o.t+'</p><p>'+o.e+'</p><p><b>Qué cambió en el mural ('+ESC[escActual].n+'):</b> inversión '+i0+' % → '+o.inv+' %, presión '+p0+' → '+o.pres+'. Efecto visual: '+FX[o.fx].txt+(o.capa?" Capa visual: "+CAPAS[o.capa]+".":"")+'</p><p><b>Consecuencias posibles:</b> '+o.r+'</p></div><p class="pie">Es una simulación artística; no predice ni evalúa el estado real de ningún monumento. No hay una única decisión correcta.</p><p><button type="button" data-ir="mural">Ver el efecto en el mural →</button> '+(todas?'<button type="button" data-ir="memoria">Ir a «Lo que decidimos conservar» →</button>':'')+'</p>';
  $("decEsc").querySelectorAll("button").forEach(b=>{if(b.dataset.e===decE&&!b.textContent.includes("✓"))b.textContent+=" ✓";});}
$("decLugar").innerHTML=Object.keys(ESC).map(k=>'<option value="'+k+'">'+ESC[k].n+'</option>').join("");
$("decLugar").addEventListener("change",e=>cargarEscena(e.target.value,true));
$("decEsc").addEventListener("click",e=>{const b=e.target.closest("button");if(b){decE=b.dataset.e;renderDec();}});
$("decCuerpo").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o!=null)decidir(+b.dataset.o);else if(b.dataset.ir)mostrarTab(b.dataset.ir);});
renderDec();
/* Tres escalas de acción: individuales, comunitarias e institucionales */
const CAT={
 ind:{t:"Acciones individuales",it:[["Conocer el patrimonio cultural local","Saber qué es, quién lo cuida y por qué importa permite cuidarlo y explicarlo a otras personas."],["Respetar los espacios históricos","Seguir la señalización, no tocar ni retirar piezas y no dejar residuos reduce el desgaste cotidiano."],["Difundir las tradiciones","Compartir información verificada y reconocer a quienes practican una tradición mantiene viva su memoria."],["Valorar las técnicas artesanales","Preguntar por la procedencia y el proceso, y reconocer la autoría, apoya a quienes sostienen un saber."]]},
 com:{t:"Acciones comunitarias",it:[["Participar en actividades culturales","Las fiestas, talleres y recorridos acercan el patrimonio a la vida diaria."],["Apoyar a las personas artesanas","Comprar con procedencia clara y reconocer su trabajo ayuda a que los talleres continúen."],["Transmitir conocimientos tradicionales","Los saberes se conservan cuando alguien los enseña y alguien los aprende."],["Documentar prácticas culturales","Registrar relatos y oficios, con consentimiento y crédito, evita que la memoria se pierda."],["Organizar actividades de difusión","Charlas, exposiciones y recorridos permiten que más personas conozcan y cuiden su patrimonio."]],
  ej:[["Llamado institucional: en el boletín sobre el convenio de 2025 para el Centro Histórico, el INAH invitó a unir esfuerzos con la sociedad para cuidar el patrimonio. No encontré aquí una iniciativa comunitaria específica con fuente verificable.",U_.c25[1]]]},
 ins:{t:"Acciones institucionales",it:[["Investigación histórica","Estudiar y registrar los sitios permite tomar decisiones con información.",U_.chol],["Restauración especializada","Equipos técnicos intervienen edificios, obras y colecciones con criterios de conservación.",U_.palaf],["Protección legal","Las normas definen zonas protegidas y reglas para intervenir.",U_.ley],["Financiamiento de proyectos culturales","Los recursos sostenidos hacen posible el mantenimiento. No tengo un ejemplo verificado para Puebla en esta app."],["Programas de conservación","Planes de manejo y convenios coordinan a las instituciones.",U_.plan]],
  ej:[U_.c25,U_.anp,U_.color]}};
let catSel="ind";
function renderCat(){const c=CAT[catSel];
  $("catChips").innerHTML=Object.keys(CAT).map(k=>'<button type="button" data-k="'+k+'" class="'+(k===catSel?"on":"")+'">'+CAT[k].t+'</button>').join("");
  $("catCuerpo").innerHTML=c.it.map(x=>'<details><summary>'+x[0]+'</summary><p>'+x[1]+'</p>'+(x[2]?'<p class="pie">Ejemplo real: <a class="enlace" href="'+x[2][1]+'" target="_blank" rel="noopener noreferrer">'+x[2][0]+'</a></p>':'')+'</details>').join("")
   +(c.ej?'<h4>Ejemplos reales documentados</h4><ul>'+c.ej.map(aLink).join("")+'</ul>':'<p class="pie">En esta escala no incluyo ejemplos reales porque no tengo una fuente verificable para Puebla; las acciones son recomendaciones generales.</p>');}
$("catChips").addEventListener("click",e=>{const b=e.target.closest("button");if(b){catSel=b.dataset.k;renderCat();}});
renderCat();
/* Lo que decidimos conservar */
const FINQ=["¿Qué significa conservar el patrimonio cultural?","¿Qué elementos de nuestra cultura consideras importantes preservar?","¿Qué responsabilidades tenemos como sociedad?","¿Qué sucede cuando dejamos de transmitir nuestra memoria cultural?"];
let finSel=0;
function renderFinal(){const c=$("muralFinal"),g=c.getContext("2d"),ult=mem.dec.length?mem.dec[mem.dec.length-1].l:escActual;
  ESC[ult].d(g);g.fillStyle="rgba(11,18,36,.6)";g.fillRect(0,0,W,H);
  const P=mem.dec.slice(-12).map((x,i)=>({x:90+i*131%620,y:90+i*97%320,e:x.e}));
  g.strokeStyle="rgba(244,209,140,.65)";g.lineWidth=2;g.beginPath();P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke();
  g.textAlign="center";g.font="bold 16px sans-serif";P.forEach(p=>{g.fillStyle="#d96ab0";g.beginPath();g.arc(p.x,p.y,16,0,7);g.fill();g.fillStyle="#fff";g.fillText(p.e,p.x,p.y+6);});
  g.fillStyle="#f4d18c";for(const p of insc)g.fillRect(p.x,p.y,3,3);
  if(!P.length&&!insc.length){g.fillStyle="#f4f1ea";g.font="22px 'Palatino Linotype',serif";g.fillText("Tu memoria aparecerá aquí",400,250);}}
function renderMemoria(){const ex=["A","B","C"].filter(k=>mem.dec.some(x=>x.e===k));
  $("resumen").innerHTML='<p><b>Escenarios explorados:</b> '+ex.length+' de 3 ('+(ex.map(k=>DEC[k].n).join(" · ")||"aún ninguno")+')</p>'
   +(mem.dec.length?'<ul>'+mem.dec.map(x=>{const o=DEC[x.e].o[x.o];return '<li><b>'+DEC[x.e].n+'</b> · '+ESC[x.l].n+' ('+x.f+'): '+o.t+'. Transformación: '+(o.capa?CAPAS[o.capa]:FX[o.fx].txt)+'.</li>';}).join("")+'</ul>':'<p class="pie">Aún no has tomado decisiones. Ve a «Experimenta» para empezar.</p>')
   +'<p class="pie">Actividades realizadas: '+hechas.filter(Boolean).length+' de '+ACC.length+' · Reflexiones guardadas: '+(reflexiones.length+mem.fin.length)+'</p>';
  $("finQ").innerHTML=FINQ.map((q,i)=>'<button type="button" data-i="'+i+'" class="'+(i===finSel?"on":"")+'">'+q+'</button>').join("");
  $("finEt").textContent=FINQ[finSel];
  $("finLista").textContent="";if(!mem.fin.length){const l=document.createElement("li");l.textContent="Aún no has escrito una reflexión final.";$("finLista").appendChild(l);}
  for(const r of mem.fin){const l=document.createElement("li"),b=document.createElement("b");b.textContent=r.q+" ";l.append(b,document.createTextNode(r.t));$("finLista").appendChild(l);}
  $("memAviso").textContent=memOK?"Tus datos se guardan solo en este navegador y en este dispositivo (localStorage). No se envían a ningún servidor.":"Tu navegador no permite guardar datos: lo que escribas solo se conservará mientras esta página siga abierta.";
  renderFinal();}
$("finQ").addEventListener("click",e=>{const b=e.target.closest("button");if(b){finSel=+b.dataset.i;$("finQ").querySelectorAll("button").forEach((x,i)=>x.classList.toggle("on",i===finSel));$("finEt").textContent=FINQ[finSel];}});
$("finGuardar").addEventListener("click",()=>{const t=$("finTxt").value.trim();if(!t){$("finMsg").textContent="Escribe una reflexión antes de guardar.";return;}
  mem.fin.push({q:FINQ[finSel],t,f:fechaCorta()});guardarMem();recalcInsc();$("finTxt").value="";
  $("finMsg").textContent="Tu reflexión ya forma parte del mural: ábrelo en la pestaña Mural para verla como una capa de partículas doradas.";renderMemoria();});
$("verDatos").addEventListener("click",()=>{const p=$("datosVista");p.hidden=!p.hidden;p.textContent=JSON.stringify(mem,null,2);$("verDatos").textContent=p.hidden?"Consultar mis datos":"Ocultar mis datos";});
let confBorrar=null;
$("borrarDatos").addEventListener("click",()=>{const bb=$("borrarDatos");
  if(!confBorrar){bb.textContent="Confirmar: eliminar todo";$("finMsg").textContent="Pulsa de nuevo en los próximos 5 segundos para confirmar que quieres eliminar tus reflexiones, decisiones y progreso.";
    confBorrar=setTimeout(()=>{confBorrar=null;bb.textContent="Eliminar mis datos";},5000);return;}
  clearTimeout(confBorrar);confBorrar=null;bb.textContent="Eliminar mis datos";
  try{localStorage.removeItem(KEY);}catch(e){}
  reflexiones.length=0;mem.dec.length=0;mem.fin.length=0;mem.acc.notas.length=0;mem.acc.hechas.length=0;capa=null;recalcInsc();
  renderDec();renderAcc();pintarReflexiones();renderMemoria();$("datosVista").hidden=true;$("verDatos").textContent="Consultar mis datos";$("finMsg").textContent="Tus datos guardados fueron eliminados.";});
recalcInsc();
mostrarTab(location.hash.slice(1)||"inicio",true);
$("lugar").innerHTML=Object.keys(ESC).map(k=>'<option value="'+k+'">'+ESC[k].n+'</option>').join("");
$("lugar").addEventListener("change",e=>{cargarEscena(e.target.value,true);mostrarPanel(e.target.value,null);});
cargarEscena("cholula",false);mostrarPanel("cholula",null);
sincronizar();requestAnimationFrame(bucle);
