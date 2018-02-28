$(function() {

    $("#reset").click(function() {
  
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
  
    $("input").on("input", function() {
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
          " hue-rotate(" + huerotate + "deg)" ,
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
  
    $("#submit").click(function() {
      var url = $("#imagelink").val();
  
      $(".iv-large-image").css("background-image", "url(" + url + ")");
    });
  
    $(".iv-large-image").click(function() {
      $(".iv-large-image").toggleClass("zoomed");
  
    });
  
  });