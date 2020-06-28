var npOld = "No Data";

function getVisibleNum() {
    if (document.getElementById("np1").classList.contains("fade"))
        return 2;
    else
        return 1;
}

function getInvisibleNum() {
    if (document.getElementById("np2").classList.contains("fade"))
        return 2;
    else
        return 1;
}

function insertNp(text) {    
    var np = document.getElementById("np" + getVisibleNum());
    var np_data = document.getElementById("np" + getVisibleNum() + "_data");

    if (npOld.trim() != text.trim()) {
        var npx = document.getElementById("np" + getInvisibleNum());
        var npx_data = document.getElementById("np" + getInvisibleNum() + "_data");

        npOld = text;
        npx_data.innerHTML = text;

        np.classList.toggle('fade');
        npx.classList.toggle('fade');
    }
}

function refresh() {
    xhr = new XMLHttpRequest();
    var url = "http://luna.thorinair.net:" + port + "/?action=np&key=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            insertNp(response.nowplaying);
        }
    }
    xhr.onerror = function () {
        insertNp("No Data");
    };
    xhr.ontimeout = function () {
        insertNp("No Data");
    };
    xhr.send();

    window.setTimeout(refresh, 1000);
}

refresh();