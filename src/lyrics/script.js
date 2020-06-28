function insertLyrics(data) {
    var lyrics = document.getElementById("lyrics");
    var lyrics_data = document.getElementById("lyrics_data");

    // New data to show
    if (data.length > 0) {
        lyrics_data.innerHTML = "";
        data.forEach(function (l, i) {
            if (!(i == data.length - 1 && l == "")) {
                if (l == "")
                    lyrics_data.innerHTML += "<div>&nbsp;</div>";
                else
                    lyrics_data.innerHTML += "<div>" + l + "</div>";
            }
        });

        var fontSize = 12.0;
        lyrics_data.style.fontSize = fontSize + "pt";
        while (lyrics.offsetHeight > 680) {
            fontSize -= 0.1;
            lyrics_data.style.fontSize = fontSize + "pt";
        }

        // Was faded before
        if (lyrics.classList.contains("fade"))
            lyrics.classList.toggle('fade');
    }
    // No more data
    else if (data.length == 0 && !lyrics.classList.contains("fade")) {
        lyrics.classList.toggle('fade');
    }
}

function refresh() {
    xhr = new XMLHttpRequest();
    var url = "http://luna.thorinair.net:" + port + "/?action=lyrics&key=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            insertLyrics(response.lyrics);
        }
    }
    xhr.onerror = function () {
    };
    xhr.ontimeout = function () {
    };
    xhr.send();

    window.setTimeout(refresh, 1000);
}

refresh();