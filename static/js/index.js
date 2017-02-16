var viewPortWidth = 0;
var viewPortHeight = 0;

function sizeReporter() {   // Resize player when window resize
    viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log("[INFO]Window inner size: Height = " + viewPortHeight + "px; Width = " + viewPortWidth + "px");
}

function drawCenter() {
    sizeReporter();

    var canvas = document.getElementById('pad');
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
    var x,y;
    switch(event.type) {
        case 'touchstart':
            if (event.touches.length == 1) {
                console.log('[TouchStart] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
                BackEnd.print_log('[TouchStart] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
                x = ((event.touches[0].clientX - viewPortWidth/2) / (viewPortWidth/2)).toFixed(2);
                y = -((event.touches[0].clientY - viewPortHeight/2) / (viewPortHeight/2)).toFixed(2);
                BackEnd.update_data('{"state": 1, "x": ' + x + ', "y": ' + y + '}');
            }
            break;
        case 'touchmove':
            if (event.touches.length == 1) {
                console.log('[TouchMove] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
                BackEnd.print_log('[TouchMove] x = ' + event.touches[0].clientX + '; y = ' + event.touches[0].clientY);
                x = ((event.touches[0].clientX - viewPortWidth/2) / (viewPortWidth/2)).toFixed(2);
                y = -((event.touches[0].clientY - viewPortHeight/2) / (viewPortHeight/2)).toFixed(2);
                BackEnd.update_data('{"state": 2, "x": ' + x + ', "y": ' + y + '}');
            }
            break;
        case 'touchend':
            if (event.changedTouches.length == 1) {
                console.log('[TouchEnd] x = ' + event.changedTouches[0].clientX + '; y = ' + event.changedTouches[0].clientY);
                BackEnd.print_log('[TouchEnd] x = ' + event.changedTouches[0].clientX + '; y = ' + event.changedTouches[0].clientY);
                x = ((event.changedTouches[0].clientX - viewPortWidth/2) / (viewPortWidth/2)).toFixed(2);
                y = -((event.changedTouches[0].clientY - viewPortHeight/2) / (viewPortHeight/2)).toFixed(2);
                BackEnd.update_data('{"state": 0, "x": ' + x + ', "y": ' + y + '}');
            }
            break;
    }
}

window.onload = function () {
    console.log("[Event]Onload");
    drawCenter();
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);
};

window.addEventListener('resize', function() {
    console.log("[Event]Resize");
    drawCenter();
});