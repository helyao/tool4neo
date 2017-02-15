var viewPortWidth = 0;
var viewPortHeight = 0;

function sizeReporter() {   // Resize player when window resize
    viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log("[INFO]Window inner size: Height = " + viewPortHeight + "px; Width = " + viewPortWidth + "px");
}

function drawCenter() {
    sizeReporter();

    var canvas = document.getElementById('canvas');
    if (canvas == null) {
        return false;
    }
    canvas.width = viewPortWidth;
    canvas.height = viewPortHeight;

    var context = canvas.getContext('2d');
    context.strokeStyle = 'rgb(250, 0, 0)';
    context.fillStyle = 'rgb(250, 0, 0)';

    context.moveTo(viewPortWidth / 2, 0);
    context.lineTo(viewPortWidth / 2, viewPortHeight);
    context.moveTo(0, viewPortHeight / 2);
    context.lineTo(viewPortWidth, viewPortHeight / 2);

    context.stroke();
}


function touch(e) {
    var event = e || window.event;
    switch(event.type) {
        case 'touchstart':
            if (event.touches.length == 1) {
                console.log('[TouchStart] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
            }
            break;
        case 'touchmove':
            if (event.touches.length == 1) {
                console.log('[TouchMove] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
            }
            break;
        case 'touchend':
            if (event.changedTouches.length == 1) {
                console.log('[TouchEnd] x = ' + event.changedTouches[0].clientX + '; y = ' + event.changedTouches[0].clientY);
            }
            break;
    }
}

var mouseTigger = false;

function click(e) {
    var event = e || window.event;
    switch (event.type) {
        case 'mousedown':
            mouseTigger = true;
            console.log('[MouseDown] x = ' + event.clientX + '; y = ' + event.clientY);
            break;
        case 'mousemove':
            if (mouseTigger) {
                console.log('[MouseMove] x = ' + event.clientX + '; y = ' + event.clientY);
            }
            break;
        case 'mouseout':
        case 'mouseup':
            mouseTigger = false;
            console.log('[MouseOut|Up] x = ' + event.clientX + '; y = ' + event.clientY);
            var out = BackEnd.print_log('js to python');
            console.log(out);
            break;
    }
}

window.onload = function () {
    console.log("[Event]Onload");
    drawCenter();
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);

    document.getElementById('canvas').addEventListener('mousedown', click, false);
    document.getElementById('canvas').addEventListener('mousemove', click, false);
    document.getElementById('canvas').addEventListener('mouseout', click, false);
    document.getElementById('canvas').addEventListener('mouseup', click, false);
};

window.addEventListener('resize', function() {
    console.log("[Event]Resize");
    drawCenter();
});