var YFT = function(elem_id){
  var elem = document.getElementById(elem_id);
  for (var b = 0; b <= 255; b += 25){
    (function(){
      var pos = b;
      setTimeout(function(){elem.style.backgroundColor="rgb(255,255,"+pos+")";}, (pos + 1) * 5);
    })();
  }
}
