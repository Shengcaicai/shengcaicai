function displayAbbreviation(){
    if(!document.getElementsByTagName || document.createElement || document.createTextNode)return false;
    //取得所有abbr缩略词
    var abbreviation=document.getElementsByTagName("abbr");
    if(abbreviation.length<1)return false;
    var defs=new Array();
    //遍历所有abbr缩略词
    for(var i=0;i<abbreviation.length;i++){
        var current_abbr=abbreviation[i];
        if(current_abbr.childNodes.length < 1)continue;
        var definition=current_abbr.getAttribute("title");
        var key=current_abbr.lastChild.nodeValue;
        defs[key]=definition;
    }
        //创建定义列表
        var dlist=document.createElement("dl");
        for(key in defs){
            var definition=defs[key];
            var dtitle=document.createElement("dt");
            var dititle_text=document.createTextNode(key);
            dtitle.appendChild(dititle_text);
            var ddesc=document.createElement("dd");
            var ddesc_text=document.createTextNode(definition);
            ddesc.appendChild(ddesc_text);
            //添加到定义列表
            dlist.appendChild(dtitle);
            dlist.appendChild(ddesc);
        }
           if(list.childNodes.length < 1)return false;
           //创建定义标题
           var header=document.createElement("h2");
           var header_text=document.createTextNode("Abbreviations");
           header.appendChild(header_text);
           //标题添加到文本
           document.body.appendChild(header);
           //列表添加到文本
           document.body.appendChild(dlist);
     }

addLoadEvent(displayAbbreviation);
