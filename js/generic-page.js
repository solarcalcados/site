
let topBar = $("#mob-header");
let nav = $("#pc-footer");
let bottomBar = $("#mob-footer");
let wppBtn = $("#wpp-btn");

function loadElementOntoDiv(div,elementPath){
    if(div)
        div.load(elementPath);
}

function loadGenericTemplateOntoDiv(div,elementPath){
    loadElementOntoDiv(div,"generic-template/"+elementPath);
}

loadGenericTemplateOntoDiv(topBar,"mob-header.html");
loadGenericTemplateOntoDiv(nav,"pc-footer.html");
loadGenericTemplateOntoDiv(bottomBar,"mob-footer.html");
loadGenericTemplateOntoDiv(wppBtn,"wpp-btn.html");
