const BACKEND_URL = 'https://led-iot-backend.onrender.com';
let isOn = false;

const elements = {
  glow: document.getElementById('glow'),
  ledCircle: document.getElementById('ledCircle'),
  statusBadge: document.getElementById('statusBadge'),
  statusText: document.getElementById('statusText'),
  btnLabel: document.getElementById('btnLabel'),
  toggleBtn: document.getElementById('toggleBtn'),
};

function toggleLed() {
  // Actualiza la interfaz inmediatamente y envía la petición en background
  isOn = !isOn;
  updateUI();

  const endpoint = isOn ? '/led/on' : '/led/off';
  // Fire-and-forget: no await para no bloquear la UI
  fetch(`${BACKEND_URL}${endpoint}`, { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log('Estado:', data.state))
  .catch(err => console.warn('Error:', err));
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
