document.getElementById('id_button_exec').onclick = () => {
    chrome.cookies.getAll({"domain": ".myrosmol.ru", "name": "_ym_uid"}, ((cookies) => {
        var user_site_id = "";
        for (let cookie of cookies) {
            user_site_id = cookie.value;
        }
        let url = "http://130.193.53.184:8000/user/set/tg_id";
        var username_tg = document.getElementById("id_tg_user").value
        let get_from = fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username_tg': username_tg,
                'user_site_id': user_site_id
            })
        }).then(response => {
            if (response.ok) {
                return response.text();
            }
        })
        document.getElementById("register_telegram").innerHTML = ""
        chrome.tabs.create({
            url: 'https://t.me/itmem_youngbit_bot',
            active: true
        });
    }));
}
chrome.cookies.getAll({"domain": ".myrosmol.ru", "name": "_ym_uid"}, ((cookies) => {
    var user_site_id = "";
    for (let cookie of cookies) {
        user_site_id = cookie.value;
    }
    let url = "http://130.193.53.184:8000/user/check_register";
    let get_from = fetch(url + "?user_site_id=" + user_site_id, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(function (data) {
        var userid = JSON.parse(data);
        if (userid === true) {
            document.getElementById("main").innerHTML =
                '<div class="messenger" id="send_question">\n' +
                '        <div class="form-container">\n' +
                '            <iframe name="dummyface" id="dummyface" style="display: none;"></iframe>\n' +
                '            <form action="" target="dummyface">\n' +
                '                <h3> Цифровой помощник</h3>\n' +
                '                <div> С радостью отвечу на любой вопрос! </div>\n' + '<br><br><br><br>' +
                '                <label id="answer">  </label>' +
                '                <br><br>' +
                '                <div class="record-button-container text-center mt-5">\n' +
                '                    <button class="bg-transparent btn record-button text-center no-outline" style="box-shadow: none"\n' +
                '                            id="recordButton">\n' +
                '                        <img src="/images/microphone.svg" height="64" width="64" alt="Record" class="img-fluid"/>\n' +
                '                    </button>\n' +
                '                </div>' +
                '                <div class="form-floating">\n' +
                '                    <input type="text" class="message-form form-control" height="200" id="id_text_question"/>\n' +
                '                    <label> Жду ваш вопрос </label>\n' +
                '                </div><br>' +
                '                <input type="submit" class="send-button-question  w-100 btn btn-lg btn-primary" id="id_send_question" value="Отправить">\n' +
                '                <div id="answer_get"></div>\n' +
                '            </form>\n' +
                '        </div>\n' +
                '    </div>'
            document.getElementById('id_send_question').onclick = () => {
                chrome.cookies.getAll({"domain": ".myrosmol.ru", "name": "_ym_uid"}, ((cookies) => {
                    var user_site_id = "";
                    for (let cookie of cookies) {
                        user_site_id = cookie.value;
                    }
                    let url = "http://130.193.53.184:8000/user/message/site";
                    var question = document.getElementById("id_text_question").value
                    let get_from = fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'user_site_id': user_site_id,
                            "message": question
                        })
                    }).then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                    }).then(function (data) {
                        const obj = JSON.parse(data);
                        document.getElementById("answer").innerHTML = '<label id="answer">' + obj.message + '</label>'
                    });
                }));
            }
        }
    });
}));
