var SETTINGS = new Map();
SETTINGS.set("projectName-103", "Введите полное название проекта, которое его описывает")
SETTINGS.set("fa748cf9-457c-4483-ac10-6b16c49a04d9-153", "Укажите адресс проживания руководителя")
SETTINGS.set("0e0813ae-65ae-455b-9fc7-da9b8bf12048-148", "Что помимо руководства он делает?")
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

document.head.innerHTML += '<style>\n' +
    '        .modal-dialog{background:#fefefe;border:#333 solid 1px;border-radius:5px;margin-left:-180px;position:fixed;left:50%;top:-100%;z-index:11;width:360px;-webkit-transform:translate(0,-500%);-ms-transform:translate(0,-500%);transform:translate(0,-500%);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}\n' +
    '        .modal:target .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0);top:25%}\n' +
    '        .modal-body{padding:20px}\n' +
    '    </style>'


// while (true) {
setInterval(function () {

    setTimeout(() => {
        var textAreas = document.body.getElementsByTagName('textarea');
        var inputs = document.body.getElementsByTagName('input');
        if (document.body.getElementsByClassName('extension__help__button').length === 0) {
            for (let el of textAreas) {
                insertAfter(htmlToElement(
                        '<p data-tooltip="' + SETTINGS.get(el.id) + '">' +
                        '<img class="extension__help__button" width="16" height="16" src="https://cdn-icons-png.flaticon.com/512/471/471664.png">' +
                        '</p>'
                    ),
                    el.parentNode
                )
            }
            for (let el of inputs) {
                if (
                    el.id === "projectName-103" ||
                    el.id === "fa748cf9-457c-4483-ac10-6b16c49a04d9-153" ||
                    el.id === "9c53bcbb-9854-4ee7-a0af-fc275fe41509-162" ||
                    el.id === "file116" ||
                    el.id === "file158"
                ) {
                    insertAfter(htmlToElement(
                        '<p data-tooltip="' + SETTINGS.get(el.id) + '">' +
                        '<img class="extension__help__button" width="16" height="16" src="https://cdn-icons-png.flaticon.com/512/471/471664.png">' +
                        '</p>'
                    ), el.parentNode)
                }
            }
        }


        var imgURL = chrome.extension.getURL("images/question_mark_icon.png");
        document.getElementsByClassName("help_button").src = imgURL;

        //------------------------------WRITE HERE-----------------------------------------------


    }, 1000);
}, 1000);