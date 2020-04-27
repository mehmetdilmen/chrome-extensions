$(document).ready(function () {
    var lastseen = "";

    function onlineTester(html) {
        var statusUser = $('.O90ur', html[0]);
        if (statusUser.length === 1) {
            if (statusUser[0].title === 'çevrimiçi') {
                lastseen = Date().toString();
            }
        }
    }


    function modifyDOM() {
        return document.body.innerHTML;
    }

    chrome.tabs.executeScript(null, {}, function () {
        setInterval(function () {
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                onlineTester(results);

                var resHTML = results[0];
                var username = $('._2y17h', resHTML);
                var usernameInfo = username[0];
                username = $('._1wjpf', username[0]);
                username = username[0].title;
                var img = $('img', usernameInfo);
                img = img[0].src;
                var newData = null;
                var allreadyStore = JSON.parse(localStorage.getItem("user"));
                let update = false;

                if (allreadyStore !== null) {
                    for (var i = 0; i < allreadyStore.length; i++) {
                        if (allreadyStore[i].username === username) {
                            if (lastseen !== "") {
                                allreadyStore[i].lastseen = lastseen;
                            }
                            update = true;
                            newData = allreadyStore;
                            break;
                        }
                    }
                } else {
                    newData = [{"username": username, "img": img, "lastseen": lastseen}];
                }

                if (allreadyStore !== null) {
                    if (update === false) {
                        newData = [...allreadyStore, {"username": username, "img": img, "lastseen": lastseen}];
                    }
                }
                localStorage.setItem("user", JSON.stringify(newData));

                $('#online').empty();
                allreadyStore.map(user => {
                    var items = "<div style='width: 100%; display: inline-block;'><div style='width: 35%; display: inline-block;'><img src=" + user.img + " width='80' height='80' /></div> <div style='width:60%; display: inline-block;position: relative; top: -40px;'> <span>Username: " + user.username + "</span> </br> <span>Last Seen: " + user.lastseen + "</span></div></div>"
                    $('#online').append(items)
                });


            });
        }, 1000);
    });


});
