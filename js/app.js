var list_id = 'todo_list',
    source;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function dragenter(e) {
    this.classList.add('over');
    let targetelem = e.target;

    if (isbefore(source, targetelem)) {
        targetelem.parentNode.insertBefore(source, targetelem);
    } else {
        targetelem.parentNode.insertBefore(source, targetelem.nextSibling);
    }
}

function dragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('moving');
}

function dragover(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
};

function dragleave(e) {
    this.classList.remove('over');
};

function dragend(e) {
    let ul = document.getElementById(list_id),
        li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        li[i].classList.remove('over', 'moving');
    }
};

function drop(e) {
    orderPositions();
    let ul = document.getElementById(list_id),
        li = ul.getElementsByTagName('li'),
        job_priority = [];

    for (let i = 0; i < li.length; i++) {
        job_priority.push({
            id: li[i].id,
            position: li[i].getAttribute('position')
        });
    }
    postAjaxUpdate(job_priority);
}

function postAjaxUpdate(payload) {
    let xhr = new XMLHttpRequest(),
        url = window.location.href + 'php/update.php',
        data = JSON.stringify(payload);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            highLight(xhr.responseText, source);
        }
    };
    xhr.send(data);
}

function highLight(response, element) {
    let status = response === 'true' ? 'success' : 'error';


    element.classList.add(status);
    setTimeout(() => {
        element.classList.remove(status);
    }, 2000);
}

function orderPositions() {
    let ul = document.getElementById(list_id),
        li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        li[i].setAttribute('position', i);
    }
}

function addListListener() {
    orderPositions();
    let ul = document.getElementById(list_id),
        li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        li[i].setAttribute('draggable', 'true');
        li[i].addEventListener('dragstart', dragstart, false);
        li[i].addEventListener('dragenter', dragenter, false);
        li[i].addEventListener('dragover', dragover, false);
        li[i].addEventListener('dragleave', dragleave, false);
        li[i].addEventListener('drop', drop, false);
        li[i].addEventListener('dragend', dragend, false);
    }
}

addListListener();