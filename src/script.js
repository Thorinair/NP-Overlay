function refresh() {
    xhr = new XMLHttpRequest();
    var url = "http://luna.thorinair.net:" + port + "/?action=np&key=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("np").innerHTML = response.nowplaying;
        }
    }
    xhr.onerror = function () {
    };
    xhr.send();

    window.setTimeout(refresh, 1000);
}

refresh();