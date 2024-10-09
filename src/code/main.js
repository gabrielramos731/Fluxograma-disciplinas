const disciplinas = new Map();
disciplinas.set("icc", { preReq: [], posReq: ["alg-prog"] });
disciplinas.set("alg-prog", { preReq: ["icc"], posReq: ["aeds"] });
disciplinas.set("aeds", {
  preReq: ["alg-prog"],
  posReq: [
    "tbo",
    "bd",
    "ia",
    "poo",
    "osa",
    "po",
    "parad",
    "cg",
    "pdi",
    "compiladores",
  ],
});
disciplinas.set("tbo", { preReq: ["aeds"], posReq: ["paa"] });
disciplinas.set("osa", { preReq: ["aeds"], posReq: ["bd2"] });
disciplinas.set("bd", { preReq: ["aeds"], posReq: ["bd2"] });
disciplinas.set("bd2", { preReq: ["bd", "osa"], posReq: [] });
disciplinas.set("ia", { preReq: ["aeds"], posReq: [] });
disciplinas.set("etica", { preReq: [], posReq: [] });
disciplinas.set("adm", { preReq: [], posReq: [] });
disciplinas.set("c1", { preReq: [], posReq: ["c2", "analise", "fisica1"] });
disciplinas.set("c2", { preReq: ["c1"], posReq: ["estatistica"] });
disciplinas.set("fisica1", { preReq: ["c1"], posReq: ["fisica2"] });
disciplinas.set("fisica2", { preReq: ["fisica1"], posReq: [] });
disciplinas.set("po", { preReq: ["aeds", "algebra"], posReq: [] });
disciplinas.set("aps", { preReq: ["engenharia"], posReq: [] });
disciplinas.set("cg", { preReq: ["aeds", "algebra"], posReq: [] });
disciplinas.set("pdi", { preReq: ["aeds", "algebra"], posReq: [] });
disciplinas.set("empreendedorismo", { preReq: [], posReq: [] });
disciplinas.set("opt4", { preReq: [], posReq: [] });
disciplinas.set("ga", { preReq: [], posReq: ["algebra"] });
disciplinas.set("ingles1", { preReq: [], posReq: ["ingles2"] });
disciplinas.set("algebra", { preReq: ["ga"], posReq: ["po", "cg", "pdi"] });
disciplinas.set("ingles2", { preReq: ["ingles1"], posReq: [] });
disciplinas.set("sd", { preReq: [], posReq: ["arq1"] });
disciplinas.set("discreta", {
  preReq: [],
  posReq: ["intro-graf", "paa", "lfa"],
});
disciplinas.set("metodo", { preReq: [], posReq: [] });
disciplinas.set("arq1", { preReq: ["sd"], posReq: ["arq2"] });
disciplinas.set("intro-graf", { preReq: ["discreta"], posReq: ["alg-graf"] });
disciplinas.set("estatistica", { preReq: ["c2"], posReq: [] });
disciplinas.set("arq2", { preReq: ["arq1"], posReq: ["so"] });
disciplinas.set("poo", { preReq: ["aeds"], posReq: ["web", "engenharia"] });
disciplinas.set("analise", { preReq: ["c1"], posReq: [] });
disciplinas.set("engenharia", { preReq: ["poo"], posReq: ["aps"] });
disciplinas.set("so", { preReq: ["arq2"], posReq: ["sb", "sis-dis"] });
disciplinas.set("web", { preReq: ["poo"], posReq: [] });
disciplinas.set("paa", {
  preReq: ["aeds", "discreta"],
  posReq: ["alg-graf", "complexidade"],
});
disciplinas.set("parad", { preReq: ["aeds"], posReq: [] });
disciplinas.set("sb", { preReq: ["so"], posReq: ["compiladores"] });
disciplinas.set("alg-graf", { preReq: ["paa", "intro-graf"], posReq: [] });
disciplinas.set("sis-dis", { preReq: ["so"], posReq: [] });
disciplinas.set("redes", { preReq: [], posReq: [] });
disciplinas.set("lfa", { preReq: ["discreta"], posReq: ["compiladores"] });
disciplinas.set("complexidade", { preReq: ["paa"], posReq: [] });
disciplinas.set("compiladores", { preReq: ["aeds", "lfa", "sb"], posReq: [] });
disciplinas.set("projetos", { preReq: [], posReq: [] });
disciplinas.set("opt1", { preReq: [], posReq: [] });
disciplinas.set("opt2", { preReq: [], posReq: [] });
disciplinas.set("si", { preReq: [], posReq: [] });
disciplinas.set("tcc", { preReq: [], posReq: [] });
disciplinas.set("opt3", { preReq: [], posReq: [] });
disciplinas.set("opt5", { preReq: [], posReq: [] });

// Estiliza elementos
let styleMap = {
  current: [
    "outline-4",
    localStorage.getItem("theme") === "light"
      ? "outline-sky-300"
      : "outline-sky-400",
    "outline",
  ],
  parent: [
    "outline-4",
    localStorage.getItem("theme") === "light"
      ? "outline-red-300"
      : "outline-red-400",
    "outline",
  ],
  child: [
    "outline-4",
    localStorage.getItem("theme") === "light"
      ? "outline-green-300"
      : "outline-green-400",
    "outline",
  ],
};

function styleElements(elements, type, add) {
  elements.forEach((id) => {
    let element = document.getElementById(id);
    element.classList[add ? "add" : "remove"](...styleMap[type]);
  });
}

let currentReqs = {
  actual: [],
  parentReq: [],
  childReq: [],
};

// hover styles
let divs = document.querySelectorAll(".dsp");
divs.forEach((div) => {
  div.addEventListener("mouseover", (e) => {
    currentReqs.actual = div.id;
    currentReqs.parentReq = disciplinas.get(currentReqs.actual).preReq;
    currentReqs.childReq = disciplinas.get(currentReqs.actual).posReq;

    styleElements([currentReqs.actual], "current", true);
    styleElements(currentReqs.parentReq, "parent", true);
    styleElements(currentReqs.childReq, "child", true);
  });

  div.addEventListener("mouseout", (e) => {
    styleElements([currentReqs.actual], "current", false);
    styleElements(currentReqs.parentReq, "parent", false);
    styleElements(currentReqs.childReq, "child", false);
  });
});

// Overlay
let main = document.querySelector("main");
let overlay = document.querySelector(".overlay");
let treeIcons = document.querySelectorAll(".tree-icon");
let overlayContent = document.querySelector(".overlay-content");
let overflowContainer = document.querySelector(".overflow-container");
let header = document.querySelector("header");
let legenda = document.querySelector(".legenda"); // alinhamento da legenda
let closeBtn = document.querySelector(".close-btn"); // alinhamento da legenda

overlay.addEventListener("click", (e) => {
  if (!overlayContent.contains(e.target)) {
    overlay.classList.add("hidden");
    main.classList.remove("blur-sm");
    header.classList.remove("blur-sm"); // alinhamento da legenda
    legenda.classList.remove("invisible"); // alinhamento da legenda
    overflowContainer.classList.remove("overflow-x-hidden"); // remove scroll no overlay

    document.querySelector(".tree").remove();
    document.querySelector(".tree").remove();

    // Mantem pré-requisitos como padrão
    btnTreeVis.textContent === "Ver Pré-requisitos" ? toggleTreeVis() : null;
  }
});

// Evento fechar overlay mobile
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  main.classList.remove("blur-sm");
  header.classList.remove("blur-sm"); // alinhamento da legenda
  legenda.classList.remove("invisible"); // alinhamento da legenda
  overflowContainer.classList.remove("overflow-x-hidden"); // remove scroll no overlay

  document.querySelector(".tree").remove();
  document.querySelector(".tree").remove();

  // Mantem pré-requisitos como padrão
  btnTreeVis.textContent === "Ver Pré-requisitos" ? toggleTreeVis() : null;
});


// Tree
function TreeData(data, select) {
  var main = document.querySelector(select);
  var treecanvas = document.createElement("div");
  treecanvas.className = "tree";
  var treeCode = buildTree(data, Object.keys(data)[0]);
  treecanvas.innerHTML = treeCode;
  main.appendChild(treecanvas);
}

/* Recursive function to build tree structure :) */
function buildTree(obj, node) {
  var treeString = "<li class='flex-1 dark:last:before:border-white dark:before:border-white dark:after:border-white'><a href='#' class='dark:text-white dark:border-white'>" + obj[node].value + "</a>",
    sons = [];

  for (var i in obj) {
    if (obj[i].parent == node) sons.push(i);
  }

  if (sons.length > 0) {
    treeString += "<ul class='flex justify-center dark:before:border-white'>";

    for (var i in sons) {
      treeString += buildTree(obj, sons[i]);
    }

    treeString += "</ul>";
  }
  return treeString;
}


function getTreeData(idDisciplina) {
  let nomeDisciplina = document.getElementById(idDisciplina).querySelector("p").textContent.trim();
  let treeObj = {
    [idDisciplina]: { value: nomeDisciplina, parent: "" }, // Disciplina inicial não tem pai
  };

  // Inicializa uma fila para processar as disciplinas com seus pais
  let queueDisciplinas = [{ id: idDisciplina, parent: "" }];

  // Loop enquanto houver disciplinas na fila
  while (queueDisciplinas.length > 0) {
    // Remove a próxima disciplina da fila
    let { id, parent } = queueDisciplinas.shift();

    // Adiciona cada pré-requisito como filho da disciplina atual
    disciplinas.get(id).preReq.forEach((preReqId) => {
      let nomePreReq = document.getElementById(preReqId).querySelector("p").textContent.trim();

      // Adiciona a disciplina pré-requisito no objeto treeObj
      treeObj[preReqId] = { value: nomePreReq, parent: id };

      // Adiciona a disciplina pré-requisito à fila para processamento posterior
      queueDisciplinas.push({ id: preReqId, parent: id });
    });
  }


  // pos requisitos
  let nomeDisciplinaPos = document.getElementById(idDisciplina).querySelector("p").textContent.trim();
  let treeObjPos = {
    [idDisciplina]: { value: nomeDisciplinaPos, parent: "" }, // Disciplina inicial não tem pai
  };

  // Inicializa uma fila para processar as disciplinas com seus pais
  let queueDisciplinasPos = [{ id: idDisciplina, parent: "" }];

  // Loop enquanto houver disciplinas na fila
  while (queueDisciplinasPos.length > 0) {
    // Remove a próxima disciplina da fila
    let { id, parent } = queueDisciplinasPos.shift();

    // Adiciona cada pré-requisito como filho da disciplina atual
    disciplinas.get(id).posReq.forEach((preReqId) => {
      let nomePreReq = document.getElementById(preReqId).querySelector("p").textContent.trim();

      // Adiciona a disciplina pré-requisito no objeto treeObjPos
      treeObjPos[preReqId] = { value: nomePreReq, parent: id };

      // Adiciona a disciplina pré-requisito à fila para processamento posterior
      queueDisciplinasPos.push({ id: preReqId, parent: id });
    });
  }

  let trees = { treePre: treeObj, treePos: treeObjPos };
  return trees;
}


treeIcons.forEach((treeIcon) => {
  treeIcon.addEventListener("click", (e) => {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    main.classList.add("blur-sm");
    header.classList.add("blur-sm"); // alinhamento da legenda
    legenda.classList.add("invisible"); // alinhamento da legenda
    overflowContainer.classList.add("overflow-x-hidden"); // remove scroll no overlay

    let isSvg = e.target.tagName !== 'path' ? true : false;  // verifica se o clique foi no svg ou path
    let divId;
    if(isSvg) {
      divId = e.target.parentElement.parentElement.id;
    } else {
      divId = e.target.parentElement.parentElement.parentElement.id;
    }

    var trees = getTreeData(divId)
    TreeData(trees.treePre, "#tree");
    TreeData(trees.treePos, "#treePos");
  });
});

// Altera visibilidade da árvore
let btnTreeVis = document.getElementById("btnTreeVis");

function toggleTreeVis (){
  let treeReq = document.getElementById("containerPre");
  let treePos = document.getElementById("containerPos");
  treeReq.classList.toggle("hidden");
  treePos.classList.toggle("hidden");
  btnTreeVis.textContent = btnTreeVis.textContent === "Ver Pré-requisitos" ? "Ver Subsequentes" : "Ver Pré-requisitos";  // faz fechar ao clicar no botão
}

btnTreeVis.addEventListener("click", toggleTreeVis);
