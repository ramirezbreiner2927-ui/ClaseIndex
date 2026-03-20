let seccionActual = 'login';


// ══════════════════════════════════════════════════════════════
// DATOS
// ══════════════════════════════════════════════════════════════

// ARRAY: opciones del menú de navegación
const navItems = [
    { id: 'login',     label: '🔐 Iniciar Sesión', cta: false },
    { id: 'register',  label: '👤 Registrarse',    cta: true  },
    { id: 'dashboard', label: '📊 Dashboard',      cta: false },
    { id: 'about',     label: 'ℹ️ About Us',        cta: false },
];

// ARRAY: campos del formulario de Login
const camposLogin = [
    { label: 'Correo electrónico', type: 'email',    placeholder: 'tu@email.com', cls: '' },
    { label: 'Contraseña',         type: 'password', placeholder: '••••••••',    cls: '' },
];

// ARRAY: campos del formulario de Registro
const camposRegistro = [
    { label: 'Nombre completo',    type: 'text',     placeholder: 'Juan Pérez',   cls: 'blue-input' },
    { label: 'Correo electrónico', type: 'email',    placeholder: 'tu@email.com', cls: 'blue-input' },
    { label: 'Contraseña',         type: 'password', placeholder: '••••••••',     cls: 'blue-input' },
];

// MAP: estadísticas del dashboard (clave = nombre, valor = datos)
const estadisticas = new Map([
    ['Reservas de Hoy',      { valor: 12, color: 'purple', icono: '📅', sub: '+3 desde ayer', subColor: 'green' }],
    ['Restaurantes Activos', { valor: 8,  color: 'pink',   icono: '👥', sub: 'En tu red',     subColor: ''      }],
]);

// ARRAY: lista de reservaciones recientes
const reservaciones = [
    { restaurante: 'La Trattoria', cliente: 'María González', personas: 4, hora: '19:30', color: 'purple' },
    { restaurante: 'Sushi Bar',    cliente: 'Carlos Ruiz',    personas: 2, hora: '20:00', color: 'pink'   },
    { restaurante: 'El Asador',    cliente: 'Ana Martínez',   personas: 6, hora: '21:00', color: 'blue'   },
];

// SET: características únicas de la plataforma (el Set evita duplicados)
const caracteristicas = new Set([
    JSON.stringify({ icono: '🛡️', color: 'purple', titulo: 'Seguro y Confiable',  desc: 'Sistema de autenticación robusto para proteger tu información y la de tus clientes.' }),
    JSON.stringify({ icono: '👥', color: 'pink',   titulo: 'Multi-restaurante',   desc: 'Gestiona múltiples restaurantes desde un único panel de control intuitivo.' }),
    JSON.stringify({ icono: '⚡', color: 'blue',   titulo: 'Rápido y Eficiente',  desc: 'Interfaz moderna y responsive que te permite gestionar reservas en segundos.' }),
]);


// ══════════════════════════════════════════════════════════════
// navigate(seccion)
// Cambia la sección visible sin recargar la página.
// Usa: switch, if
// ══════════════════════════════════════════════════════════════
function navigate(seccion) {

    // if: si ya estamos en esa sección, no hacemos nada
    if (seccion === seccionActual) return;

    // Ocultar la sección que está activa
    document.getElementById('sec-' + seccionActual).classList.remove('active');

    // switch: mostrar la sección correcta según el parámetro
    switch (seccion) {
        case 'login':
            document.getElementById('sec-login').classList.add('active');
            break;
        case 'register':
            document.getElementById('sec-register').classList.add('active');
            break;
        case 'dashboard':
            document.getElementById('sec-dashboard').classList.add('active');
            break;
        case 'about':
            document.getElementById('sec-about').classList.add('active');
            break;
        default:
            // Si la sección no existe, volvemos a login
            document.getElementById('sec-login').classList.add('active');
            seccion = 'login';
    }

    seccionActual = seccion;
    marcarNavActivo();
}


// ══════════════════════════════════════════════════════════════
// marcarNavActivo()
// Resalta en el navbar el botón de la sección actual.
// Usa: if, forEach
// ══════════════════════════════════════════════════════════════
function marcarNavActivo() {
    const botones = document.querySelectorAll('.nav-btn');

    botones.forEach(btn => {
        // if: agregar o quitar clase 'active' según sección actual
        if (btn.dataset.id === seccionActual) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}


// ══════════════════════════════════════════════════════════════
// renderNav()
// Genera los botones del navbar iterando el array con while.
// Usa: while, array, if
// ══════════════════════════════════════════════════════════════
function renderNav() {
    const contenedor = document.getElementById('navLinks');
    const marca      = document.getElementById('brand');
    let html = '';
    let i    = 0;

    // Asignar navegación al logo
    marca.onclick = () => navigate('dashboard');

    // while: recorrer el array navItems de principio a fin
    while (i < navItems.length) {
        const item     = navItems[i];
        const ctaClass = item.cta ? ' cta' : '';
        html += `<button class="nav-btn${ctaClass}" data-id="${item.id}" onclick="navigate('${item.id}')">${item.label}</button>`;
        i++;
    }

    contenedor.innerHTML = html;
    marcarNavActivo();
}


// ══════════════════════════════════════════════════════════════
// renderLogin()
// Construye la sección Login e inyecta los campos con for..of.
// Usa: for..of, array
// ══════════════════════════════════════════════════════════════
function renderLogin() {
    const contenedor = document.getElementById('sec-login');
    let camposHTML   = '';

    // for..of: recorrer el array de campos del formulario
    for (const campo of camposLogin) {
        camposHTML += `
      <div class="form-group">
        <label>${campo.label}</label>
        <input type="${campo.type}" placeholder="${campo.placeholder}" class="${campo.cls}" />
      </div>`;
    }

    contenedor.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="auth-icon purple">🏛️</div>
        <h1>Iniciar Sesión</h1>
        <p class="auth-subtitle">Accede a tu panel de gestión de reservas</p>
        ${camposHTML}
        <button class="btn-submit purple" onclick="navigate('dashboard')">Iniciar Sesión</button>
        <p class="auth-foot">¿No tienes una cuenta? <span onclick="navigate('register')">Regístrate aquí</span></p>
      </div>
    </div>`;
}


// ══════════════════════════════════════════════════════════════
// renderRegister()
// Construye la sección Registro e inyecta los campos con for..of.
// Usa: for..of, array
// ══════════════════════════════════════════════════════════════
function renderRegister() {
    const contenedor = document.getElementById('sec-register');
    let camposHTML   = '';

    // for..of: recorrer el array de campos del formulario de registro
    for (const campo of camposRegistro) {
        camposHTML += `
      <div class="form-group">
        <label>${campo.label}</label>
        <input type="${campo.type}" placeholder="${campo.placeholder}" class="${campo.cls}" />
      </div>`;
    }

    contenedor.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="auth-icon blue">👤</div>
        <h1>Crear Cuenta</h1>
        <p class="auth-subtitle">Únete a nuestra plataforma de reservas</p>
        ${camposHTML}
        <button class="btn-submit blue" onclick="navigate('dashboard')">Registrarse</button>
        <p class="auth-foot">¿Ya tienes una cuenta? <span onclick="navigate('login')">Inicia sesión</span></p>
      </div>
    </div>`;
}


// ══════════════════════════════════════════════════════════════
// renderDashboard()
// Construye el dashboard: stats con Map, reservas con for clásico.
// Usa: for..of (Map), for clásico (array)
// ══════════════════════════════════════════════════════════════
function renderDashboard() {
    const contenedor = document.getElementById('sec-dashboard');
    let statsHTML    = '';
    let reservasHTML = '';

    // for..of sobre Map: cada entrada es [nombreStat, datosStat]
    for (const [nombre, datos] of estadisticas) {
        statsHTML += `
      <div class="stat-card">
        <div>
          <div class="stat-label">${nombre}</div>
          <div class="stat-num ${datos.color}">${datos.valor}</div>
          <div class="stat-sub ${datos.subColor}">${datos.sub}</div>
        </div>
        <div class="stat-icon ${datos.color}">${datos.icono}</div>
      </div>`;
    }

    // for clásico con índice sobre el array de reservaciones
    for (let i = 0; i < reservaciones.length; i++) {
        const r = reservaciones[i];
        reservasHTML += `
      <div class="res-item">
        <div class="res-icon ${r.color}">📅</div>
        <div class="res-info">
          <strong>${r.restaurante}</strong>
          <span>${r.cliente} • ${r.personas} personas</span>
        </div>
        <div class="res-time">
          <strong>${r.hora}</strong>
          <span>Hoy</span>
        </div>
      </div>`;
    }

    contenedor.innerHTML = `
    <div class="dash-main">
      <div class="hero">
        <h1>¡Hola, Usuario! 👋</h1>
        <p>Bienvenido a tu panel de gestión de reservas</p>
        <div class="hero-btns">
          <button class="dash-btn purple">📅 Nueva Reserva</button>
          <button class="dash-btn pink">👥 Ver Restaurantes</button>
        </div>
      </div>
      <div class="stats-grid">${statsHTML}</div>
      <div class="activity">
        <h2>Actividad Reciente</h2>
        <p class="activity-sub">Últimas reservas y actualizaciones</p>
        ${reservasHTML}
      </div>
    </div>`;
}


// ══════════════════════════════════════════════════════════════
// renderAbout()
// Construye la sección About iterando el Set con for..of.
// Usa: for..of (Set), JSON.parse
// ══════════════════════════════════════════════════════════════
function renderAbout() {
    const contenedor = document.getElementById('sec-about');
    let featHTML     = '';

    // for..of sobre Set: valores únicos serializados como JSON
    for (const raw of caracteristicas) {
        const feat = JSON.parse(raw); // deserializar cada objeto
        featHTML += `
      <div class="feat">
        <div class="feat-icon ${feat.color}">${feat.icono}</div>
        <h3>${feat.titulo}</h3>
        <p>${feat.desc}</p>
      </div>`;
    }

    contenedor.innerHTML = `
    <div class="about-main">
      <div class="about-hero">
        <div class="about-icon">⚠️</div>
        <h1>About Us</h1>
        <p>Conoce más sobre <strong>ReservaFácil</strong> y nuestra misión de simplificar la gestión de reservas</p>
      </div>
      <div class="info-card">
        <h2>ℹ️ ¿Qué es ReservaFácil?</h2>
        <p>Plataforma web diseñada para simplificar la gestión de reservas en múltiples restaurantes desde un solo lugar. Una solución moderna y fácil de usar para administradores y propietarios.</p>
      </div>
      <div class="features-grid">${featHTML}</div>
      <div class="dev-card">
        <div style="font-size:22px;flex-shrink:0">⚠️</div>
        <div>
          <h3>Desarrollado por Breiner Ramírez</h3>
          <p>Proyecto creado para proporcionar una solución moderna y eficiente en la gestión de reservas para múltiples restaurantes.</p>
        </div>
      </div>
    </div>`;
}


// ══════════════════════════════════════════════════════════════
// renderFooter()
// Genera el pie de página con el año actual.
// ══════════════════════════════════════════════════════════════
function renderFooter() {
    const anio = new Date().getFullYear();
    document.getElementById('footerBar').textContent =
        `Desarrollado por Breiner Ramírez · ReservaFácil © ${anio}`;
}


// ══════════════════════════════════════════════════════════════
// INIT — inicializar la aplicación al cargar la página
// Usa: array de funciones + while
// ══════════════════════════════════════════════════════════════

// ARRAY: funciones de inicialización en orden de ejecución
const inicializadores = [
    renderNav,
    renderLogin,
    renderRegister,
    renderDashboard,
    renderAbout,
    renderFooter,
];

// while: ejecutar cada función del array de inicializadores
let idx = 0;
while (idx < inicializadores.length) {
    inicializadores[idx]();
    idx++;
}