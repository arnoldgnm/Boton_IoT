const ESP32_IP = 'http://192.168.1.100';
let isOn = false;

const elements = {
  glow: document.getElementById('glow'),
  ledCircle: document.getElementById('ledCircle'),
  statusBadge: document.getElementById('statusBadge'),
  statusText: document.getElementById('statusText'),
  btnLabel: document.getElementById('btnLabel'),
  apiEndpoint: document.getElementById('apiEndpoint'),
  toggleBtn: document.getElementById('toggleBtn'),
};

async function toggleLed() {
  elements.toggleBtn.disabled = true;
  elements.toggleBtn.classList.add('loading');

  isOn = !isOn;
  updateUI();

  try {
    const endpoint = isOn ? '/led/on' : '/led/off';
    await fetch(`${ESP32_IP}${endpoint}`, { method: 'POST', mode: 'no-cors' });
  } catch (error) {
    console.warn('ESP32 no alcanzable (modo demo):', error);
  } finally {
    elements.toggleBtn.disabled = false;
    elements.toggleBtn.classList.remove('loading');
  }
}

function updateUI() {
  const isActive = isOn;

  elements.glow.classList.toggle('on', isActive);
  elements.ledCircle.classList.toggle('on', isActive);
  elements.statusBadge.classList.toggle('on', isActive);
  elements.statusText.textContent = isActive ? 'Encendido' : 'Apagado';
  elements.btnLabel.textContent = isActive ? 'Apagar' : 'Encender';
  elements.apiEndpoint.textContent = isActive ? 'POST /led/on' : 'POST /led/off';
}

updateUI();
