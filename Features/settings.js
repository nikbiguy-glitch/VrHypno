let frequency = 6000;

export function initSettings(onStart) {
  const slider = document.getElementById('frequency');
  const value = document.getElementById('freqValue');

  value.textContent = `${slider.value}s`;
  frequency = slider.value * 1000;

  slider.oninput = () => {
    value.textContent = `${slider.value}s`;
    frequency = slider.value * 1000;
  };

  document.getElementById('enter').onclick = () => {
    document.getElementById('overlay').remove();
    onStart();
  };
}

export function getFrequency() {
  return frequency;
}
