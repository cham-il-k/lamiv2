var ctxTrain = document.getElementById('ctx').getContext('2d');
      var WIDTH = 500;
      var HEIGHT = 500;
      ctxTrain.font = '20px Calibri';

      var ball = {
        x:0,
        y:0,
        radius:5,
        color:'blue'
      }

      var base = {
        x:0,
        y:400,
        height:20,
        width:100,
        color:'red'
      }

