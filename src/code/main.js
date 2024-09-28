let disciplinas = new Map();
disciplinas.set("icc", [[], ["alg-prog"]]);
disciplinas.set("alg-prog", [["icc"], ["aeds"]]);
disciplinas.set("aeds", [
  ["alg-prog"],
  ["tbo", "bd", "ia", "poo", "osa", "po", "parad", "cg", "pdi", "compiladores"],
]);
disciplinas.set("tbo", [["aeds"], ["paa"]]);
disciplinas.set("osa", [["aeds"], ["bd2"]]);
disciplinas.set("bd", [["aeds"], ["bd2"]]);
disciplinas.set("bd2", [["bd", "osa"], []]);
disciplinas.set("ia", [["aeds"], []]);
disciplinas.set("etica", [[], []]);
disciplinas.set("adm", [[], []]);
disciplinas.set("c1", [[], ["c2", "analise", "fisica1"]]);
disciplinas.set("c2", [["c1"], ["estatistica"]]);
disciplinas.set("fisica1", [["c1"], ["fisica2"]]);
disciplinas.set("fisica2", [["fisica1"], []]);
disciplinas.set("po", [["aeds", "algebra"], []]);
disciplinas.set("aps", [["engenharia"], []]);
disciplinas.set("cg", [["aeds", "algebra"], []]);
disciplinas.set("pdi", [["aeds", "algebra"], []]);
disciplinas.set("empreendedorismo", [[], []]);
disciplinas.set("opt4", [[], []]);
disciplinas.set("ga", [[], ["algebra"]]);
disciplinas.set("ingles1", [[], ["ingles2"]]);
disciplinas.set("algebra", [["ga"], ["po", "cg", "pdi"]]);
disciplinas.set("ingles2", [["ingles1"], []]);
disciplinas.set("sd", [[], ["arq1"]]);
disciplinas.set("discreta", [[], ["intro-graf", "paa", "lfa"]]);
disciplinas.set("metodo", [[], []]);
disciplinas.set("arq1", [["sd"], ["arq2"]]);
disciplinas.set("intro-graf", [["discreta"], ["alg-graf"]]);
disciplinas.set("estatistica", [["c2"], []]);
disciplinas.set("arq2", [["arq1"], ["so"]]);
disciplinas.set("poo", [["aeds"], ["web", "engenharia"]]);
disciplinas.set("analise", [["c1"], []]);
disciplinas.set("engenharia", [["poo"], ["aps"]]);
disciplinas.set("so", [["arq2"], ["sb", "sis-dis"]]);
disciplinas.set("web", [["poo"], []]);
disciplinas.set("paa", [
  ["aeds", "discreta"],
  ["alg-graf", "complexidade"],
]);
disciplinas.set("parad", [["aeds"], []]);
disciplinas.set("sb", [["so"], ["compiladores"]]);
disciplinas.set("alg-graf", [["paa", "intro-graf"], []]);
disciplinas.set("sis-dis", [["so"], []]);
disciplinas.set("redes", [[], []]);
disciplinas.set("lfa", [["discreta"], ["compiladores"]]);
disciplinas.set("complexidade", [["paa"], []]);
disciplinas.set("compiladores", [["aeds", "lfa", "sb"], []]);
disciplinas.set("projetos", [[], []]);
disciplinas.set("opt1", [[], []]);
disciplinas.set("opt2", [[], []]);
disciplinas.set("si", [[], []]);
disciplinas.set("tcc", [[], []]);
disciplinas.set("opt3", [[], []]);
disciplinas.set("opt5", [[], []]);

// Estiliza elementos
let styleMap = {
  current: ["outline-4", localStorage.getItem("theme") === "light" ? "outline-sky-300" : "outline-sky-400", "outline"],
  parent: ["outline-4", localStorage.getItem("theme") === "light" ? "outline-red-300" : "outline-red-400", "outline"],
  child: ["outline-4", localStorage.getItem("theme") === "light" ? "outline-green-300" : "outline-green-400", "outline"],
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

let divs = document.querySelectorAll(".dsp");
divs.forEach((div) => {
  div.addEventListener("mouseover", (e) => {
    currentReqs.actual = div.id;
    currentReqs.parentReq = disciplinas.get(currentReqs.actual)[0];
    currentReqs.childReq = disciplinas.get(currentReqs.actual)[1];

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
let overlay = document.querySelector(".overlay");
let treeIcons = document.querySelectorAll(".tree-icon");
let overlayContent = document.querySelector(".overlay-content");
let main = document.querySelector("main");

treeIcons.forEach(treeIcon => {
  treeIcon.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    main.classList.add("blur-sm");
  });
});

overlay.addEventListener("click", (e) => {
  if (!overlayContent.contains(e.target)) {
    overlay.classList.add("hidden");
    main.classList.remove("blur-sm");
  }
});

