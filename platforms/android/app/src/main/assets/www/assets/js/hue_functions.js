$(function () {

  $("#reset").click(function () {

    // $("#grayscale").val(0);
    // $("#blur").val(0);
    $("#brightness").val(100);
    $("#contrast").val(100);
    $("#huerotate").val(0);
    // $("#invert").val(0);
    // $("#opacity").val(100);
    // $("#saturate").val(1);
    // $("#sepia").val(0);

    $(".iv-large-image").css("-webkit-filter", "none");
    $(".iv-large-image").css("-moz-filter", "none");
  });

  $("input").on("input", function () {
    // var grayscale = $("#grayscale").val(),
    //   blur = $("#blur").val(),
    var brightness = $("#brightness").val(),
      contrast = $("#contrast").val(),
      huerotate = $("#huerotate").val();
    // invert = $("#invert").val(),
    // opacity = $("#opacity").val(),
    // saturate = $("#saturate").val(),
    // sepia = $("#sepia").val();

    $(".iv-large-image").css({
      "-webkit-filter": //"grayscale(" + grayscale + "%)" +
        //"blur(" + blur + "px)" +
        "brightness(" + brightness + "%)" +
        " contrast(" + contrast + "%)" +
        " hue-rotate(" + huerotate + "deg)",
      //" invert(" + invert + "%)" +
      //" opacity(" + opacity + "%)" +
      //" saturate(" + saturate + ")" +
      //" sepia(" + sepia + "%)",

      "filter": //"grayscale(" + grayscale + "%)" +
        //"blur(" + blur + "px)" + 
        "brightness(" + brightness + "%)" +
        " contrast(" + contrast + "%)" +
        " hue-rotate(" + huerotate + "deg)"
      //" invert(" + invert + "%)" +
      //" opacity(" + opacity + "%)" +
      //" saturate(" + saturate + ")" +
      //" sepia(" + sepia + "%)"
    });

  });

  $("#submit").click(function () {
    var url = $("#imagelink").val();

    $(".iv-large-image").css("background-image", "url(" + url + ")");
  });

  $(".iv-large-image").click(function () {
    $(".iv-large-image").toggleClass("zoomed");

  });

  var brightness = 100;
  var contrast = 100;
  var hueRotate = 0;

  // Brightness
  var lineHeightB = $("#drag-lineB").height() - 15;
  
  $("#draggable-buttonB").draggable({
    axis: "y",
    containment: "parent"
  });

  $("#draggable-buttonB").on("drag", function () {
    var positionB = $("#draggable-buttonB").position();
    var marginTopB = positionB.top;

    $("#lineB").css({
      clip: "rect(" + marginTopB + "px,8px, 183px,0px)"
    });

    brightness = marginTopB + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });
  });

  $("#fa-minusB").on("click", function () {
    var positionB = $("#draggable-buttonB").position();
    var marginTopB = positionB.top;

    $("#lineB").css({
      clip: "rect(" + (marginTopB + 14) + "px,8px, 183px,0px)"
    });

    if (marginTopB < lineHeightB) {
      $("#draggable-buttonB").css({
        top: marginTopB + 14
      });
    }

    brightness = marginTopB + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });

  });

  $("#fa-plusB").on("click", function () {
    var positionB = $("#draggable-buttonB").position();
    var marginTopB = positionB.top;

    $("#lineB").css({
      clip: "rect(" + (marginTopB - 14) + "px,8px, 183px,0px)"
    });

    if (marginTopB > 0) {
      $("#draggable-buttonB").css({
        top: marginTopB - 14
      });
    }

    brightness = marginTopB + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });

  });

  // Contrast
  var lineHeightC = $("#drag-lineC").height() - 15;
  
  $("#draggable-buttonC").draggable({
    axis: "y",
    containment: "parent"
  });

  $("#draggable-buttonC").on("drag", function () {
    var positionC = $("#draggable-buttonC").position();
    var marginTopC = positionC.top;

    $("#lineC").css({
      clip: "rect(" + marginTopC + "px,8px, 183px,0px)"
    });

    contrast = marginTopC + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });
  });

  $("#fa-minusC").on("click", function () {
    var positionC = $("#draggable-buttonC").position();
    var marginTopC = positionC.top;

    $("#lineC").css({
      clip: "rect(" + (marginTopC + 14) + "px,8px, 183px,0px)"
    });

    if (marginTopC < lineHeightC) {
      $("#draggable-buttonC").css({
        top: marginTopC + 14
      });
    }

    contrast = marginTopC + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });

  });

  $("#fa-plusC").on("click", function () {
    var positionC = $("#draggable-buttonC").position();
    var marginTopC = positionC.top;
    
    $("#lineC").css({
      clip: "rect(" + (marginTopC - 14) + "px,8px, 183px,0px)"
    });

    if (marginTopC > 0) {
      $("#draggable-buttonC").css({
        top: marginTopC - 14
      });
    }

    contrast = marginTopC + 100;

    $(".iv-large-image").css({
      "-webkit-filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)",

      "filter": "brightness(" + brightness + "%)" +
      " contrast(" + contrast + "%)" +
      " hue-rotate(" + hueRotate + "deg)"
    });

  });


// Hue Rotate
var lineHeightH = $("#drag-lineH").height() - 15;
  
$("#draggable-buttonH").draggable({
  axis: "y",
  containment: "parent"
});

$("#draggable-buttonH").on("drag", function () {
  var positionH = $("#draggable-buttonH").position();
  var marginTopH = positionH.top;

  $("#lineH").css({
    clip: "rect(" + marginTopH + "px,8px, 183px,0px)"
  });

  hueRotate = marginTopH;
  hueRotate = 360/153*hueRotate;

  $(".iv-large-image").css({
    "-webkit-filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)",

    "filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)"
  });
});

$("#fa-minusH").on("click", function () {
  var positionH = $("#draggable-buttonH").position();
  var marginTopH = positionH.top;

  $("#lineH").css({
    clip: "rect(" + (marginTopH + 14) + "px,8px, 183px,0px)"
  });

  if (marginTopH < lineHeightH) {
    $("#draggable-buttonH").css({
      top: marginTopH + 14
    });
  }

  hueRotate = marginTopH;
  hueRotate = hueRotate>153 ? 153 : hueRotate;
  hueRotate = 360/153*hueRotate;

  $(".iv-large-image").css({
    "-webkit-filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)",

    "filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)"
  });

});

$("#fa-plusH").on("click", function () {
  var positionH = $("#draggable-buttonH").position();
  var marginTopH = positionH.top;
  
  $("#lineH").css({
    clip: "rect(" + (marginTopH - 14) + "px,8px, 183px,0px)"
  });

  if (marginTopH > 0) {
    $("#draggable-buttonH").css({
      top: marginTopH - 14
    });
  }

  hueRotate = marginTopH;
  hueRotate = hueRotate>153 ? 153 : hueRotate;
  hueRotate = 360/153*hueRotate;

  $(".iv-large-image").css({
    "-webkit-filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)",

    "filter": "brightness(" + brightness + "%)" +
    " contrast(" + contrast + "%)" +
    " hue-rotate(" + hueRotate + "deg)"
  });

});




















  // function init() {
  //     var mouseEventTypes = {
  //         touchstart : "mousedown",
  //         touchmove : "mousemove",
  //         touchend : "mouseup"
  //     };

  //     for (originalType in mouseEventTypes) {
  //         document.addEventListener(originalType, function(originalEvent) {
  //             if(originalEvent.type == 'click')
  //                 return;
  //             if (originalEvent.type != 'touchstart' && originalEvent.type !='touchend'){
  //                 originalEvent.preventDefault();
  //             }
  //             event = document.createEvent("MouseEvents");
  //             touch = originalEvent.changedTouches[0];
  //             event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey, touch.metaKey, 0, null);
  //             originalEvent.target.dispatchEvent(event);
  //             event.preventDefault();         
  //         });
  //     }
  // }

  // init();
  var mouseEventTypes = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
  };

  for (originalType in mouseEventTypes) {
    document.addEventListener(originalType, function (originalEvent) {
      event = document.createEvent("MouseEvents");
      touch = originalEvent.changedTouches[0];
      event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
        window, 0, touch.screenX, touch.screenY, touch.clientX,
        touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
        touch.metaKey, 0, null);
      originalEvent.target.dispatchEvent(event);
    });
  }

});