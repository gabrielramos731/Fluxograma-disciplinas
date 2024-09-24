let disciplinas = new Map();
disciplinas.set("icc",[[], ["alg-prog"]]);
disciplinas.set("alg-prog",[["icc"], ["aeds"]]);
disciplinas.set("aeds",[["alg-prog"], ["tbo","bd","ia","poo","osa","po","parad","cg","pdi","compiladores"]]);
disciplinas.set("tbo",[["aeds"], ["paa"]]);
disciplinas.set("osa",[["aeds"], ["bd2"]]);
disciplinas.set("bd",[["aeds"], ["bd2"]]);
disciplinas.set("bd2",[["bd","osa"], []]);
disciplinas.set("ia",[["aeds"], []]);
disciplinas.set("etica",[[], []]);
disciplinas.set("adm",[[], []]);
disciplinas.set("c1",[[], ["c2","analise","fisica1"]]);
disciplinas.set("c2",[["c1"], ["estatistica"]]);
disciplinas.set("fisica1",[["c1"], ["fisica2"]]);
disciplinas.set("fisica2",[["fisica1"], []]);
disciplinas.set("po",[["aeds","algebra"], []]);
disciplinas.set("aps",[["engenharia"], []]);
disciplinas.set("cg",[["aeds","algebra"], []]);
disciplinas.set("pdi",[["aeds","algebra"], []]);
disciplinas.set("empreendedorismo",[[], []]);
disciplinas.set("opt4",[[], []]);
disciplinas.set("ga",[[], ["algebra"]]);
disciplinas.set("ingles1",[[], ["ingles2"]]);
disciplinas.set("algebra",[["ga"], ["po","cg","pdi"]]);
disciplinas.set("ingles2",[["ingles1"], []]);
disciplinas.set("sd",[[], ["arq1"]]);
disciplinas.set("discreta",[[], ["intro-graf","paa","lfa"]]);
disciplinas.set("metodo",[[], []]);
disciplinas.set("arq1",[["sd"], ["arq2"]]);
disciplinas.set("intro-graf",[["discreta"], ["alg-graf"]]);
disciplinas.set("estatistica",[["c2"], []]);
disciplinas.set("arq2",[["arq1"], ["so"]]);
disciplinas.set("poo",[["aeds"], ["web","engenharia"]]);
disciplinas.set("analise",[["c1"], []]);
disciplinas.set("engenharia",[["poo"], ["aps"]]);
disciplinas.set("so",[["arq2"], ["sb","sis-dis"]]);
disciplinas.set("web",[["poo"], []]);
disciplinas.set("paa",[["aeds","discreta"], ["alg-graf","complexidade"]]);
disciplinas.set("parad",[["aeds"], []]);
disciplinas.set("sb",[["so"], ["compiladores"]]);
disciplinas.set("alg-graf",[["paa","intro-graf"], []]);
disciplinas.set("sis-dis",[["so"], []]);
disciplinas.set("redes",[[], []]);
disciplinas.set("lfa",[["discreta"], ["compiladores"]]);
disciplinas.set("complexidade",[["paa"], []]);
disciplinas.set("compiladores",[["aeds","lfa","sb"], []]);
disciplinas.set("projetos",[[], []]);
disciplinas.set("opt1",[[], []]);
disciplinas.set("opt2",[[], []]);
disciplinas.set("si",[[], []]);
disciplinas.set("tcc",[[], []]);
disciplinas.set("opt3",[[], []]);
disciplinas.set("opt5",[[], []]);


function stylePre(parentReq, status){
    parentReq.forEach(item => {
        preReq = document.getElementById(item)
        if(status === "over")
            preReq.classList.add("bg-red-200")
        else
            preReq.classList.remove("bg-red-200")  
    });
}

function stylePos(childReq, status){
    childReq.forEach(item => {
        posReq = document.getElementById(item)
        if(status === "over")
            posReq.classList.add("bg-green-200")
        else
            posReq.classList.remove("bg-green-200")  
    });
}


let divs = document.querySelectorAll("div");
divs.forEach(div => {
    div.addEventListener("mouseover", e => {
        console.log(e);

        let target = e.target;
        let targetId = target.id

        parentReq = disciplinas.get(targetId)[0]
        childReq = disciplinas.get(targetId)[1]

        console.log(parentReq);
        console.log(childReq);
        
        target.classList.add("bg-blue-200");
        stylePre(parentReq, "over")
        stylePos(childReq, "over")
        
    })
    
    div.addEventListener("mouseout", e => {
        let target = e.target;
        target.classList.remove("bg-blue-200");
        stylePre(parentReq, "out")
        stylePos(childReq, "out")
    })
});

