var resp_old = "";
var art_bg_timeout;

function insertStory(data) {
    var story = document.getElementById("story");
    var story_data = document.getElementById("story_data");

    // New data to show
    if (data.length > 0) {
        story_data.innerHTML = "";
        data.forEach(function (l, i) {
            l = l.replace(/\*/g, "");
            if (!(i == data.length - 1 && l == "")) {
                if (l == "")
                    story_data.innerHTML += "<div>&nbsp;</div>";
                else
                    story_data.innerHTML += "<div>" + l + "</div>";
            }
        });

        // Was faded before
        if (story.classList.contains("story_fade"))
            story.classList.toggle('story_fade');
    }
    // No more data
    else if (data.length == 0 && !story.classList.contains("story_fade")) {
        story.classList.toggle('story_fade');
    }
}

function insertArt(data) {
    var art = document.getElementById("art");

    // New data to show
    if (data.length > 0) {
        art.innerHTML = "";

        var img = new Image();          
        img.onload = function() { 
            art.appendChild(img);

            // Was faded before
            if (art.classList.contains("art_fade"))
                art.classList.toggle('art_fade');

            art_bg_timeout = window.setTimeout(function() {
                art.classList.toggle('art_bg');
            }, 60000);
        }; 
         
        img.src = data;
    }
    // No more data
    else if (data.length == 0 && !art.classList.contains("art_fade")) {
        clearTimeout(art_bg_timeout);
        if (art.classList.contains("art_bg"))
            art.classList.toggle('art_bg');
        art.classList.toggle('art_fade');
    }
}

function refresh() {
    xhr = new XMLHttpRequest();
    var url = "http://luna.local:" + port + "/?action=storyart&key=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (resp_old !== xhr.responseText) {
                resp_old = xhr.responseText;
                var response = JSON.parse(xhr.responseText);
                insertStory(response.story);
                insertArt(response.art);
            }
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