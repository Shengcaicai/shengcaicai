/**
 * Created by shengcai on 2017/5/13.
 */


/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

//创建aqiData对象
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


function addAqiData() {
    var oCity = document.getElementById("aqi-city-input").value.trim();
    var oVal = document.getElementById("aqi-value-input").value.trim();

    if (!oCity.match(/^[A-ZA-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符！");
        return;
    }
    if (!oVal.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
    aqiData[oCity] = oVal;
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var oTable = document.getElementById("aqi-table");

    oTable.innerHTML = "";
    for (var oCity in aqiData) {
        if (oTable.children.length === 0) {
            oTable.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }

        var tr = document.createElement("tr");
        oTable.appendChild(tr);
        var td1 = document.createElement("td");
        td1.innerHTML = oCity;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[oCity];
        tr.appendChild(td2);


        var td3 = document.createElement("td");
        td3.innerHTML = "<button class = 'del-btn'>删除</button>";
        tr.appendChild(td3);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

function delBtnHandle(target) {
    // do sth.
    var tr = target.parentElement.parentElement;
    var oCity = tr.children[0].innerHTML;
    delete aqiData[oCity];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var oBtn = document.getElementById("add-btn");
    oBtn.onclick = function () {
        addBtnHandle();
    };


    var oTable = document.getElementById("aqi-table");
    var oDel = oTable.getElementsByClassName("del-btn");

    oTable.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            //使用事件委托，e.target即为我们点击的删除按钮
            delBtnHandle(e.target);
        }
    })
}



init();


