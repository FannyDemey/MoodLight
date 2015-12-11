//Mouse click on connect
$('#connect').on('click', event => {
  showLoader();
  playbulbCandle.connect()
  .then(() => {
    console.log(playbulbCandle.device);
    document.querySelector('#state').classList.add('connected');
    document.querySelector('#errorLabel').textContent="";
    hideLoader();
    return playbulbCandle.getDeviceName().then(handleDeviceName)
    .then(() => playbulbCandle.getBatteryLevel().then(handleBatteryLevel))
    .then(showStep2());

  })
  .catch(error => {
    console.error('Argh!', error);
    document.getElementById("errorLabel").innerHTML ="Oops... <br/>Something went wrong.";
    hideLoader();
  });
});


function handleDeviceName(deviceName) {
  document.querySelector('#deviceName').textContent = deviceName;
}

function handleBatteryLevel(batteryLevel) {
  document.querySelector('#batteryLevel').textContent = 'Batterie Level :'+ batteryLevel + '%';
}

function showLoader() {
    document.getElementById("loader").style.display = 'block';
}
function hideLoader() {
    document.getElementById("loader").style.display = 'none';
}

function showStep2() {
    document.getElementById("step2").style.display = 'block';
}


$('#moodList a').on('click', function(evt) {
  $('#moodList a').removeClass("active ");
  $(evt.target).addClass("active ");
  changeColor(evt.target.id);
});

function changeColor(mood) {
  switch(mood) {
    case 'perfect':
      playbulbCandle.setFlashingColor(79,195,247).then(onColorChanged); //fix bug after candle effect
      playbulbCandle.setColor(79,195,247).then(onColorChanged);
      break;
    case 'ok':
      playbulbCandle.setFlashingColor(0,175,0).then(onColorChanged); //fix bug after candle effect
      playbulbCandle.setColor(0,175,0).then(onColorChanged);
      break;
    case 'notok':
      playbulbCandle.setCandleEffectColor(244,67,54).then(onColorChanged);
      break;
    case 'trouble':
      playbulbCandle.setCandleEffectColor(255,28,8).then(onColorChanged);
      break;  
    case 'problem':
      playbulbCandle.setFlashingColor(255, 0, 0).then(onColorChanged);
      break; 
    default :
      playbulbCandle.setColor(250,250, 250).then(onColorChanged);

  }
}

function onColorChanged(rgb) {
  if (rgb) {
    console.log('Color changed to ' + rgb);
    r = rgb[0]; g = rgb[1]; b = rgb[2];
  } else {
    console.log('Color changed');
  }
}