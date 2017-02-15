var result = document.querySelector("#result"),
    testDiv = document.querySelector("#test"),
    html = "";
BackEnd.test_conn('onloaded...');

new AlloyFinger(testDiv, {
    touchStart: function () {
        html = "";
        html += "start<br/>";
        result.innerHTML = html;
        BackEnd.print_log('touchStart');
    },
    touchEnd: function () {
        html += "end<br/>";
        result.innerHTML = html;
        BackEnd.print_log('touchEnd');
    },
    tap: function () {
        html += "tap<br/>";
        result.innerHTML = html;
    },
    rotate: function (evt) {
        html += "rotate [" + evt.angle + "]<br/>";
        result.innerHTML = html;
    },
    pinch: function (evt) {
        html += "pinch [" + evt.scale + "]<br/>";
        result.innerHTML = html;
    },
    pressMove: function (evt) {
        html += "pressMove [" + evt.deltaX.toFixed(4) + "|" + evt.deltaY.toFixed(4) + "]<br/>";
        result.innerHTML = html;
        evt.preventDefault();
    },
    swipe: function (evt) {
        html += "swipe [" + evt.direction+"]<br/>";
        result.innerHTML = html;
    }
});

window.onload = function () {
    BackEnd.test_conn('onloaded...');
};
