// Draw guide line on direction canvas
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

// Draw guide line on zoom canvas
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

// Init slider for paras' max range
function initSlider() {
    $("#valYAW").slider({
        ticks: [-80, -60, -40, -20, 0, 20, 40, 60, 80],
        ticks_labels: ["-80", "-60", "-40", "-20", "0", "20", "40", "60", "80"],
        ticks_snap_bounds: 10,
        value: $('#init-data').attr('yaw')
    });

    $("#valPITCH").slider({
        ticks: [-80, -60, -40, -20, 0, 20, 40, 60, 80],
        ticks_labels: ["-80", "-60", "-40", "-20", "0", "20", "40", "60", "80"],
        ticks_snap_bounds: 10,
        value: $('#init-data').attr('pitch')
    });

    $("#valZOOM").slider({
        ticks: [1, 2, 3, 4],
        ticks_labels: ["1", "2", "3", "4"],
        ticks_snap_bounds: 1,
        value: $('#init-data').attr('zoom')
    });
}

window.onload = function () {
    initPad();
    initZoom();
    initSlider();
    initEvent();
};

// Event on slider and button
function initEvent() {
    $("#valYAW").on("change", function(slideEvt){
        console.log("YAW " + slideEvt.value.newValue);
        BackEnd.update_para('{"yaw":' + slideEvt.value.newValue + '}')
    });
    $("#valPITCH").on("change", function(slideEvt){
        console.log("PITCH " + slideEvt.value.newValue);
        BackEnd.update_para('{"pitch":' + slideEvt.value.newValue + '}')
    });
    $("#valZOOM").on("change", function(slideEvt){
        console.log("ZOOM " + slideEvt.value.newValue);
        BackEnd.update_para('{"zoom":' + slideEvt.value.newValue + '}')
    });
    $("#setting").on("click", function() {
        console.log("Setting button clicked");
        if (checkIPVaild($("#rs232ip").val()) && checkIPVaild($("#debugip").val()) && checkPortVaild($("#rs232port").val()) && checkPortVaild($("#debugport").val())) {
            console.log("Vaild setting");
            var setting = '{"rs232_ip": "'+$("#rs232ip").val()+'", "rs232_port": '+$("#rs232port").val()+', "debug_ip": "'+$("#debugip").val()+'", "debug_port": '+$("#debugport").val()+'}';
            BackEnd.update_conn(setting)
        }
        else {
            console.log("Invaild setting");
        }
    });
}

function checkIPVaild(ip) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
        return true;
    }
    return false;
}

function checkPortVaild(port) {
    if (port.match(/^\d+$/)) {
        if (parseInt(port) > 0 && parseInt(port) < 65536) {
            return true;
        }
    }
    return false;
}