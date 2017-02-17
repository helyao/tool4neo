function initPad() {
    $("#pad").css("width", $("#pad").parent().css("width"));
    $("#pad").css("height", $("#pad").parent().css("height"));

    var canvas = document.getElementById('pad');
    if (canvas == null) {
        return false;
    }

    var context = canvas.getContext('2d');
    context.strokeStyle = 'rgb(250, 0, 0)';
    context.fillStyle = 'rgb(250, 0, 0)';

    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);

    context.stroke();
}

function initZoom() {
    $("#zoom").css("width", $("#zoom").parent().css("width"));
    $("#zoom").css("height", $("#zoom").parent().css("height"));

    var canvas = document.getElementById('zoom');
    if (canvas == null) {
        return false;
    }

    var context = canvas.getContext('2d');
    context.strokeStyle = 'rgb(250, 0, 0)';
    context.fillStyle = 'rgb(250, 0, 0)';

    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);

    context.stroke();
}

function initSlider() {
    $("#valYAW").slider({
        ticks: [-80, -60, -40, -20, 0, 20, 40, 60, 80],
        ticks_labels: ["-80", "-60", "-40", "-20", "0", "20", "40", "60", "80"],
        ticks_snap_bounds: 10,
        value: 80
    });

    $("#valPITCH").slider({
        ticks: [-80, -60, -40, -20, 0, 20, 40, 60, 80],
        ticks_labels: ["-80", "-60", "-40", "-20", "0", "20", "40", "60", "80"],
        ticks_snap_bounds: 10,
        value: 80
    });

    $("#valZOOM").slider({
        ticks: [1, 2, 3, 4],
        ticks_labels: ["1", "2", "3", "4"],
        ticks_snap_bounds: 1,
        value: 4
    });
}

window.onload = function () {
    initPad();
    initZoom();
    initSlider();
};