
let topBar = $("#mob-header");
let nav = $("#pc-header");
let bottomBar = $("#mob-footer");
let footer = $("#pc-footer");
let wppBtn = $("#wpp-btn");
let firebase = $("#firebase-script")

function loadElementOntoDiv(div,elementPath){
    if(div)
        div.load(elementPath);
}

function loadGenericTemplateOntoDiv(div,elementPath){
    loadElementOntoDiv(div,"generic-template/"+elementPath);
}

loadGenericTemplateOntoDiv(topBar,"mob-header.html");
loadGenericTemplateOntoDiv(nav,"pc-header.html");
loadGenericTemplateOntoDiv(bottomBar,"mob-footer.html");
loadGenericTemplateOntoDiv(footer,"pc-footer.html");
loadGenericTemplateOntoDiv(wppBtn,"wpp-btn.html");
loadGenericTemplateOntoDiv(firebase,"firebase.html");
