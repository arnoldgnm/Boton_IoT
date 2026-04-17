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

function toggleLed() {
  // Actualiza la interfaz inmediatamente y envía la petición en background
  isOn = !isOn;
  updateUI();

  const endpoint = isOn ? '/led/on' : '/led/off';
  // Fire-and-forget: no await para no bloquear la UI
  fetch(`${ESP32_IP}${endpoint}`, { method: 'POST', mode: 'no-cors' })
    .catch((error) => {
      // No bloquear la experiencia del usuario si falla la petición
      console.warn('ESP32 no alcanzable (modo demo):', error);
    });
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
