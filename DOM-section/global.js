function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}

function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;

    var links = navs[0].getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        var linkurl;
        for (var i=0; i<links.length; i++) {
            linkurl = links[i].getAttribute("href");
            if (window.location.href.indexOf(linkurl) != -1) {
                links[i].className = "here";
                var linktext = links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute("id",linktext);
            }
        }
    }
}


// Home

function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","image/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src","image/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        links[i].onmouseover = function() {
            var destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview",-600,0,5);
            }
        }
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);


//about
function showsection(id){
    var sections=document.getElementsByTagName("section");
    for (var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id") != id){
            sections[i].style.display="none";
        }else{
            sections[i].style.display="block";
        }
    }
}


function prepareInternalnav(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById)return false;
    var article=document.getElementsByTagName("article");
    if(article.length == 0)return false;
    var navs=article[0].getElementsByTagName("nav");
    if(navs.length == 0)return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showsection(this.destination);
            return false;
        }
    }

}

addLoadEvent(prepareInternalnav);

//photo


function preparePlaceholder(){
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imagegallery"))return false;
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","image/palceholder.jpeg");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var destxt=document.createTextNode("choose an image");
    description.appendChild(destxt);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}



function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}



function showPic(whichpic){
    if(!document.getElementById("placeholder"))return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    if(placeholder.nodeName!="IMG")return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        var text=whichpic.getAttribute("title")? whichpic.getAttribute("title") : "";
        var description=document.getElementById("description");
        if(description.firstChild.nodeType==3){
            description.firstChild.nodeValue=text;
        }
    }
    return false;
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);


//live

function striptTables(){
    if(!document.getElementsByTagName)return false;
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd == true){
                addClass(rows[j],"odd");
                odd=false;
            }else {
                odd = true;
            }
        }
    }
}

function highlightRows(){
    if(!document.getElementsByTagName)return false;
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassname=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this,"highlight");
        }
        rows[i].onmouseout=function(){
           this.className=this.oldClassname;
        }
    }
}

function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i=0; i<abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRows);
addLoadEvent(striptTables);
