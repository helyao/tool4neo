// Direction pad size info
var pad_x = 0;
var pad_y = 0;
var pad_width = 0;
var pad_height = 0;
// Zoom pad size info
var zoom_x = 0;
var zoom_y = 0;
var zoom_width = 0;
var zoom_height = 0;

// Draw guide line on direction canvas
function initPad() {
    pad_x = $("#pad").parent().offset().left;
    pad_y = $("#pad").parent().offset().top;
    pad_width = parseInt($("#pad").parent().css("width"));
    pad_height = parseInt($("#pad").parent().css("height"));
    $("#pad").css("width", pad_width);
    $("#pad").css("height", pad_height);

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
    zoom_x = $("#zoom").parent().offset().left;
    zoom_y = $("#zoom").parent().offset().top;
    zoom_width = parseInt($("#zoom").parent().css("width"));
    zoom_height = parseInt($("#zoom").parent().css("height"));
    $("#zoom").css("width", zoom_width);
    $("#zoom").css("height", zoom_height);

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

var gesture_direction = new AlloyFinger(document.getElementById("pad"), {
    touchStart: function (evt) {
        var x = evt.touches[0].clientX.toFixed(2);
        var y = evt.touches[0].clientY.toFixed(2);
        if (x > pad_x && x < (pad_x+pad_width)) {
            if (y > pad_y && y < (pad_y+pad_height)) {
                x = (x - (pad_x + (pad_width/2))) / (pad_width/2);
                y = -(y - (pad_y + (pad_height/2))) / (pad_height/2);
                var touchlog = '[pad]touchStart x = ' + x.toFixed(2) + '; y = ' + y.toFixed(2);
                console.log(touchlog);
                BackEnd.print_log(touchlog);
                BackEnd.set_control('{"c_yaw": ' + x + ', "c_pitch": ' + y + '}');
            }
        }
    },
    touchMove: function (evt) {
        var x = evt.changedTouches[0].clientX.toFixed(2);
        var y = evt.changedTouches[0].clientY.toFixed(2);
        if (x > pad_x && x < (pad_x+pad_width)) {
            if (y > pad_y && y < (pad_y+pad_height)) {
                x = (x - (pad_x + (pad_width/2))) / (pad_width/2);
                y = -(y - (pad_y + (pad_height/2))) / (pad_height/2);
                var touchlog = '[pad]touchMove x = ' + x.toFixed(2) + '; y = ' + y.toFixed(2);
                console.log(touchlog);
                BackEnd.print_log(touchlog);
                BackEnd.set_control('{"c_yaw": ' + x + ', "c_pitch": ' + y + '}');
            }
        }
    },
    touchEnd: function() {
        var touchlog = '[pad]touchEnd x = 0; y = 0';
        console.log(touchlog);
        BackEnd.print_log(touchlog);
        BackEnd.set_control('{"c_yaw": 0, "c_pitch": 0}');
    }
});

var gesture_zoom = new AlloyFinger(document.getElementById("zoom"), {
    touchStart: function (evt) {
        var x = evt.touches[0].clientX.toFixed(2);
        var y = evt.touches[0].clientY.toFixed(2);
        if (x > zoom_x && x < (zoom_x+zoom_width)) {
            if (y > zoom_y && y < (zoom_y+zoom_height)) {
                x = (x - (zoom_x + (zoom_width/2))) / (zoom_width/2);
                y = -(y - (zoom_y + (zoom_height/2))) / (zoom_height/2);
                var touchlog = '[zoom]touchStart y = ' + y.toFixed(2);
                console.log(touchlog);
                BackEnd.print_log(touchlog);
                BackEnd.set_control('{"c_zoom": ' + y + '}');
            }
        }
    },
    touchMove: function (evt) {
        var x = evt.changedTouches[0].clientX.toFixed(2);
        var y = evt.changedTouches[0].clientY.toFixed(2);
        if (x > zoom_x && x < (zoom_x+zoom_width)) {
            if (y > zoom_y && y < (zoom_y+zoom_height)) {
                x = (x - (zoom_x + (zoom_width/2))) / (zoom_width/2);
                y = -(y - (zoom_y + (zoom_height/2))) / (zoom_height/2);
                var touchlog = '[zoom]touchMove y = ' + y.toFixed(2);
                console.log(touchlog);
                BackEnd.print_log(touchlog);
                BackEnd.set_control('{"c_zoom": ' + y + '}');
            }
        }
    },
    touchEnd: function() {
        var touchlog = '[zoom]touchEnd y = 0';
        console.log(touchlog);
        BackEnd.print_log(touchlog);
        BackEnd.set_control('{"c_zoom": 0}');
    }
});