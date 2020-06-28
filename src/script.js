var element = 1;

function refresh() {
    xhr = new XMLHttpRequest();
    var url = "http://luna.thorinair.net:" + port + "/?action=np&key=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);

            var np = document.getElementById("np" + element);
            var np_data = document.getElementById("np" + element + "_data");

            if (np_data.innerHTML != response.nowplaying) {

                if (element == 1)
                    element = 2;
                else
                    element = 1;

                var npx = document.getElementById("np" + element);
                var npx_data = document.getElementById("np" + element + "_data");

                npx_data.innerHTML = response.nowplaying;

                np.classList.toggle('fade');
                npx.classList.toggle('fade');
            }
        }
    }
    xhr.onerror = function () {
    };
    xhr.send();

    window.setTimeout(refresh, 1000);
}

refresh();