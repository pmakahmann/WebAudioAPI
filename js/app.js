// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator(); //use audioCtx because that is what you called it when you called the API
var gainNode = audioCtx.createGain();
var lfoGain = audioCtx.createGain();
var lfo = audioCtx.createOscillator();

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pitchUp = document.getElementById('up');
const pitchDown = document.getElementById('down');
const volume = document.getElementById('volume');
const lfoGainSlider = document.getElementById('lfoGainSlider');
const lfoUp = document.getElementById('lfoFrequencyUp');
const lfoDown = document.getElementById('lfoFrequencyDown');
const startLFOButton = document.getElementById('startLFO');
const stopLFOButton = document.getElementById('stopLFO');
const lfoSquareButton = document.getElementById('lfoSquare');
const lfoSineButton = document.getElementById('lfoSine');
const lfoSawtoothButton = document.getElementById('lfoSawtooth');
const lfoTriangleButton = document.getElementById('lfoTriangle');


gainNode.connect(audioCtx.destination); //sends gain node to the destination
gainNode.gain.value = volume.value;  //sets gainNode value to that of the slider
oscillator.type = 'sine';
oscillator.frequency.value = 440; // value in hertz
oscillator.connect(gainNode); //connects oscillator to gain node
lfoGain.gain.value = lfoGainSlider.value;  //sets the lfo Frequency to the value of the slider
lfoGain.connect(oscillator.frequency);  //connect lfo to oscillator
lfo.frequency.value = 3;  //set initial value to 0
lfo.connect(lfoGain);  //send the frequency to the lfoGain node

startButton.addEventListener('click', function(){
  oscillator.start();
});

pitchUp.addEventListener('click', function() {
  oscillator.detune.value += 100; //detune value is always in cents
});

pitchDown.addEventListener('click', function() {
  oscillator.detune.value -= 100;
});

stopButton.addEventListener('click', function(){
  oscillator.stop();
});

volume.addEventListener("input", function(){
  gainNode.gain.value = volume.value;
});

startLFOButton.addEventListener('click', function(){
  lfo.start();
});

stopLFOButton.addEventListener('click', function(){
  lfo.stop();
});

lfoGainSlider.addEventListener("input", function(){
  lfoGain.gain.value = lfoGainSlider.value;
});

lfoUp.addEventListener('click', function(){
  lfo.detune.value += 300;
});

lfoDown.addEventListener('click', function(){
  lfo.detune.value -= 300;
});

lfoSquareButton.addEventListener('click', function(){
  lfo.type = "square";
});

lfoSineButton.addEventListener('click', function(){
  lfo.type = "sine";
});

lfoSawtoothButton.addEventListener('click', function(){
  lfo.type = "sawtooth";
});

lfoTriangleButton.addEventListener('click', function(){
  lfo.type = "triangle";
});
