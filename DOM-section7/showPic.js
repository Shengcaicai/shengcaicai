
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


function preparePlaceholder(){
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imagegallery"))return false;
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../../img1/WechatIMG7.jpeg");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var destxt=document.createTextNode("choose an image");
    description.appendChild(destxt);
    var gallery=document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}



function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}


addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
