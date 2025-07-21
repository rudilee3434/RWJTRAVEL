/* ============================================================= 
   RWJ TRAVEL - Navegación de una sola página (SPA ligera)
   Código corregido y afinado para Dino (Docente) - 2025-07-21
   ============================================================= */

// ⚠️ IMPORTANTE: Coloca este <script> AL FINAL del <body> o
// envuélvelo en DOMContentLoaded (ya lo hacemos abajo) para asegurar
// que los elementos del DOM existan antes de buscarlos.

(function(){
  'use strict';

  // ============================
  // Configuración de rutas de imágenes (ajusta según tus carpetas)
  // ============================
  // Recomendación: usa nombres en minúsculas y sin espacios/acentos para URLs.
  // 👇 Corrigido según indicaste: machu.jpg, mancora.jpg, montana.jpg, huacachina.jpg, amazonia.png, arequipa.jpg
  const IMG = {
    logo: 'logo.png',            // Logo principal
    machu: 'machu.jpg',          // Machu Picchu
    montana: 'montana.jpg',      // Montaña de Colores (Vinicunca)
    amazonia: 'amazonia.png',    // Amazonía Peruana
    mancora: 'mancora.jpg',      // Máncora - Piura
    arequipa: 'arequipa.jpg',    // Arequipa - Ciudad Blanca
    huacachina: 'huacachina.jpg' // Oasis de Huacachina - Ica
  };

  // Espera al DOM para asegurar que los elementos existan
  document.addEventListener('DOMContentLoaded', init);

  function init(){
    // ============================
    // Elementos del DOM
    // ============================
    const abrir = document.getElementById('abrir-menu');
    const cerrar = document.getElementById('cerrar-menu');
    const menu = document.getElementById('menu');
    const contenido = document.getElementById('contenido');

    // Enlaces de navegación
    const inicioLink = document.getElementById('inicio-link');
    const destinosLink = document.getElementById('destinos-link');
    const serviciosLink = document.getElementById('servicios-link');
    const inversionesLink = document.getElementById('inversiones-link');
    const contactoLink = document.getElementById('contacto-link');
    const acercaLink = document.getElementById('acerca-link');

    // Filtra nulos por si algún ID falta en el HTML
    const navLinks = [inicioLink, destinosLink, serviciosLink, inversionesLink, contactoLink, acercaLink].filter(Boolean);

    // ============================
    // Utilidades
    // ============================

    // Mostrar/ocultar menú (móvil)
    function abrirMenu() {
      if(!menu) return;
      menu.classList.add('mostrar');
      if(abrir) abrir.setAttribute('aria-expanded', 'true');
    }
    function cerrarMenu() {
      if(!menu) return;
      menu.classList.remove('mostrar');
      if(abrir) abrir.setAttribute('aria-expanded', 'false');
    }

    if(abrir) abrir.addEventListener('click', abrirMenu);
    if(cerrar) cerrar.addEventListener('click', cerrarMenu);

    // Cerrar menú al hacer clic en un enlace (móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', cerrarMenu);
    });

    // Cerrar menú con tecla Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarMenu();
    });

    // Reset + animación de entrada
    function addFadeIn(element) {
      if(!element) return;
      element.classList.remove('fade-in'); // reinicia
      // fuerza reflow para reiniciar la animación (hack simple)
      void element.offsetWidth;
      element.classList.add('fade-in');
    }

    // Marca el enlace activo
    function setActivo(linkEl) {
      navLinks.forEach(l => l.classList.remove('activo'));
      if(linkEl) linkEl.classList.add('activo');
    }

    // Botón volver al inicio (inserta string HTML)
    // show=true para mostrar; úsalo en secciones internas.
    function renderBackHomeBtn(show=true) {
      if(!show) return '';
      return `
        <div class="volver-inicio-wrapper">
          <button class="btn-volver-inicio" type="button" aria-label="Volver al inicio">← Volver al Inicio</button>
        </div>
      `;
    }

    // Delegación para botón volver
    if(contenido){
      contenido.addEventListener('click', (e) => {
        if (e.target.closest('.btn-volver-inicio')) {
          renderInicio();
          setActivo(inicioLink);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // ============================
    // Secciones
    // ============================

    function renderInicio() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="hero-section">
          ${renderBackHomeBtn(false)}
          <h1>Bienvenido a RWJ TRAVEL</h1>
          <p>Descubre la magia del país de los Incas - Tu puerta de entrada a destinos extraordinarios</p>
          <div class="logo-wrapper">
            <img src="${IMG.logo}" alt="Logo RWJ Travel" width="300" height="300" style="border-radius:50%; box-shadow:0 10px 30px rgba(0,0,0,.2);">
          </div>
          <p class="intro-text">
            Explora desde las alturas de Machu Picchu hasta las profundidades de la Amazonía. 
            Perú te espera con su rica historia, cultura milenaria y paisajes que te quitarán el aliento.
          </p>
        </div>
      `;
      addFadeIn(contenido);
    }

    function renderDestinos() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="services-section">
          ${renderBackHomeBtn()}
          <h2>🗺️ Destinos Imperdibles del Perú</h2>
          <p class="texto-centro">
            Descubre los lugares más fascinantes que hacen del Perú un destino único en el mundo
          </p>
          <div class="destinations-grid">
            <!-- Machu Picchu -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.machu}" alt="Machu Picchu - Cusco" class="destination-image">
                <div class="destination-overlay">🏔️ Machu Picchu</div>
              </div>
              <div class="destination-content">
                <h3>Machu Picchu - Cusco</h3>
                <p>La ciudadela inca más famosa del mundo, considerada una de las 7 Maravillas Modernas. Un lugar místico entre las nubes que te transportará al pasado glorioso del Imperio Inca.</p>
                <div class="destination-price">Desde S/ 450</div>
              </div>
            </div>
            <!-- Montaña de Colores (Vinicunca) -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.montana}" alt="Vinicunca - Montaña de Colores" class="destination-image">
                <div class="destination-overlay">🌈 Montaña de Colores</div>
              </div>
              <div class="destination-content">
                <h3>Vinicunca - Montaña de Colores</h3>
                <p>Una maravilla natural de la Cordillera del Vilcanota. Sus laderas pintadas de colores naturales crean un paisaje surrealista a 5,200 metros de altura.</p>
                <div class="destination-price">Desde S/ 180</div>
              </div>
            </div>
            <!-- Amazonía -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.amazonia}" alt="Amazonía Peruana - Iquitos" class="destination-image">
                <div class="destination-overlay">🌿 Amazonía</div>
              </div>
              <div class="destination-content">
                <h3>Amazonía Peruana - Iquitos</h3>
                <p>Sumérgete en la selva más grande del mundo. Observa delfines rosados, anacondas y una biodiversidad única mientras navegas por el río Amazonas.</p>
                <div class="destination-price">Desde S/ 350</div>
              </div>
            </div>
            <!-- Máncora -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.mancora}" alt="Máncora - Piura" class="destination-image">
                <div class="destination-overlay">🏖️ Máncora</div>
              </div>
              <div class="destination-content">
                <h3>Máncora - Piura</h3>
                <p>Playas hermosas del norte peruano. Perfecto para surf, relajación y disfrutar del clima tropical todo el año con aguas cálidas.</p>
                <div class="destination-price">Desde S/ 220</div>
              </div>
            </div>
            <!-- Arequipa -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.arequipa}" alt="Arequipa - Ciudad Blanca" class="destination-image">
                <div class="destination-overlay">🦙 Arequipa</div>
              </div>
              <div class="destination-content">
                <h3>Arequipa - Ciudad Blanca</h3>
                <p>Patrimonio de la Humanidad con arquitectura colonial. Visita el Cañón del Colca y observa cóndores en vuelo.</p>
                <div class="destination-price">Desde S/ 280</div>
              </div>
            </div>
            <!-- Huacachina -->
            <div class="destination-card">
              <div class="destination-image-container">
                <img src="${IMG.huacachina}" alt="Oasis de Huacachina - Ica" class="destination-image">
                <div class="destination-overlay">🏞️ Huacachina</div>
              </div>
              <div class="destination-content">
                <h3>Oasis de Huacachina - Ica</h3>
                <p>Oasis natural en medio del desierto. Sandboard, buggies y un paisaje de cuento.</p>
                <div class="destination-price">Desde S/ 150</div>
              </div>
            </div>
          </div>
        </div>
      `;
      addFadeIn(contenido);
    }

    function renderServicios() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="services-section">
          ${renderBackHomeBtn()}
          <h2>🎯 Nuestros Servicios</h2>
          <p class="texto-centro">
            Ofrecemos experiencias completas para que disfrutes al máximo tu aventura peruana
          </p>
          <div class="services-grid">
            <div class="service-card"><h3>🏨 Hospedaje y Alojamiento</h3><p>Desde hostales económicos hasta hoteles de lujo.</p></div>
            <div class="service-card"><h3>🚌 Transporte Turístico</h3><p>Buses cómodos, vuelos domésticos y transfers privados.</p></div>
            <div class="service-card"><h3>🗣️ Guías Especializados</h3><p>Locales certificados: español, inglés y quechua.</p></div>
            <div class="service-card"><h3>🍽️ Experiencias Gastronómicas</h3><p>Tours de cocina peruana y reservas especiales.</p></div>
            <div class="service-card"><h3>🎒 Paquetes Completos</h3><p>Tours 3–15 días con todo incluido.</p></div>
            <div class="service-card"><h3>📱 Asistencia 24/7</h3><p>Soporte continuo por WhatsApp.</p></div>
          </div>
          <div class="promo-especial">
            <h3>🎁 Promoción Especial</h3>
            <p><strong>¡15% de descuento en paquetes de 5 días o más!</strong> Incluye seguro de viaje. Válido hasta fin de mes.</p>
          </div>
        </div>
      `;
      addFadeIn(contenido);
    }

    function renderInversiones() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="services-section">
          ${renderBackHomeBtn()}
          <h2>💰 Planifica tu Presupuesto de Viaje</h2>
          <p class="texto-centro">Información de costos y opciones de financiamiento para tu aventura peruana</p>
          
          <div class="budget-grid">
            <div class="budget-card">
              <h3>💸 Presupuesto Económico</h3>
              <div class="price-range">S/ 800 - S/ 1,500</div>
              <ul>
                <li>🏠 Hostales y albergues</li>
                <li>🚌 Transporte público</li>
                <li>🍜 Comida local</li>
                <li>👥 Tours grupales</li>
                <li>⏰ 3-5 días</li>
              </ul>
            </div>
            
            <div class="budget-card featured">
              <h3>⭐ Presupuesto Medio</h3>
              <div class="price-range">S/ 1,500 - S/ 3,000</div>
              <ul>
                <li>🏨 Hoteles 3 estrellas</li>
                <li>🚐 Transporte turístico</li>
                <li>🍽️ Restaurantes turísticos</li>
                <li>🎯 Tours semi-privados</li>
                <li>⏰ 5-8 días</li>
              </ul>
            </div>
            
            <div class="budget-card">
              <h3>💎 Presupuesto Premium</h3>
              <div class="price-range">S/ 3,000 - S/ 6,000+</div>
              <ul>
                <li>🏰 Hoteles boutique</li>
                <li>✈️ Vuelos domésticos</li>
                <li>👨‍🍳 Experiencias gastronómicas</li>
                <li>🥇 Tours privados VIP</li>
                <li>⏰ 8-15 días</li>
              </ul>
            </div>
          </div>
          
          <div class="financing-section">
            <h3>💳 Opciones de Financiamiento</h3>
            <div class="financing-options">
              <div class="financing-card">
                <h4>🔢 Cuotas sin Interés</h4>
                <p>Divide tu viaje en hasta 6 cuotas sin interés con tarjetas participantes</p>
              </div>
              <div class="financing-card">
                <h4>📅 Reserva Anticipada</h4>
                <p>Paga solo el 30% ahora y el resto 15 días antes del viaje</p>
              </div>
              <div class="financing-card">
                <h4>👥 Descuento Grupal</h4>
                <p>15% de descuento para grupos de 4 o más personas</p>
              </div>
            </div>
          </div>
        </div>
      `;
      addFadeIn(contenido);
    }

    function renderContacto() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="services-section">
          ${renderBackHomeBtn()}
          <h2>📧 Contáctanos</h2>
          <p class="texto-centro">Estamos aquí para hacer realidad tu viaje soñado</p>
          
          <div class="contact-grid">
            <div class="contact-card">
              <h3>📱 WhatsApp</h3>
              <p>Respuesta inmediata las 24 horas</p>
              <a href="https://wa.me/51987654321" class="contact-link" target="_blank">
                +51 901 911 854
                +51 916 599 102
              </a>
            </div>
            
            <div class="contact-card">
              <h3>📧 Email</h3>
              <p>Cotizaciones detalladas y consultas</p>
              <a href="mailto:info@rwjtravel.pe" class="contact-link">
                info@rwjtravel.pe
              </a>
            </div>
            
            <div class="contact-card">
              <h3>📍 Oficina</h3>
              <p>Lima, Perú</p>
              <span class="contact-link">
                IESTP "PAMPAS - TAYACAJA "
              </span>
            </div>
            
            <div class="contact-card">
              <h3>⏰ Horarios</h3>
              <p>Atención personalizada</p>
              <span class="contact-link">
                Lun - Sab: 8:00 AM - 
                8:00 PM
              </span>
            </div>
          </div>
          
          <div class="contact-form-section">
            <h3>✉️ Envíanos tu Consulta</h3>
            <form class="contact-form">
              <div class="form-group">
                <input type="text" placeholder="Tu nombre completo" required>
                <input type="email" placeholder="Tu email" required>
              </div>
              <div class="form-group">
                <input type="tel" placeholder="Tu teléfono (opcional)">
                <select required>
                  <option value="">Destino de interés</option>
                  <option value="machu">Machu Picchu</option>
                  <option value="montana">Montaña de Colores</option>
                  <option value="amazonia">Amazonía</option>
                  <option value="mancora">Máncora</option>
                  <option value="arequipa">Arequipa</option>
                  <option value="huacachina">Huacachina</option>
                  <option value="multiple">Múltiples destinos</option>
                </select>
              </div>
              <textarea placeholder="Cuéntanos sobre tu viaje ideal: fechas, número de personas, preferencias..." rows="4" required></textarea>
              <button type="submit" class="submit-btn">Enviar Consulta 🚀</button>
            </form>
          </div>
          
          <div class="social-section">
            <h3>🌐 Síguenos en Redes</h3>
            <div class="social-links">
              <a href="#" class="social-link">📘 Facebook</a>
              <a href="#" class="social-link">📸 Instagram</a>
              <a href="#" class="social-link">🐦 Twitter</a>
              <a href="#" class="social-link">📺 TikTok</a>
            </div>
          </div>
        </div>
      `;
      addFadeIn(contenido);
    }

    function renderAcerca() {
      if(!contenido) return;
      contenido.innerHTML = `
        <div class="about-section">
          ${renderBackHomeBtn()}
          <h2>ℹ️ Acerca de RWJ Travel</h2>
          <div class="historical-review">
            <h3>📜 Reseña Histórica</h3>
            <p>RWJ Travel nació en 2025 como una idea de tres amigos apasionados: Rudi, Waldir y José. Comenzó como una galería local y creció a agencia integral.</p>
            <p>Nuestra misión: democratizar el turismo sin sacrificar calidad. Viajar nutre el alma.</p>
          </div>
          <div class="team-section">
            <h3>👥 Nuestro Equipo Fundador</h3>
            <div class="team-grid">
              <div class="team-member">
                <img src="RUDI.jpeg" alt="Foto de Rudi" class="team-member-image" width="120" height="120">
                <h4>🎯 Rudi</h4>
                <p>Estudiante de C.I. Especialista en destinos internacionales.</p>
              </div>
              <div class="team-member">
                <img src="WALDIR.jpeg" alt="Foto de Waldir" class="team-member-image" width="120" height="120">
                <h4>💼 Waldir</h4>
                <p>Estudiante de C.I. Experto en logística de viajes.</p>
              </div>
              <div class="team-member">
                <img src="JOSE.jpeg" alt="Foto de José" class="team-member-image" width="120" height="120">
                <h4>🌟 José</h4>
                <p>Estudiante de C.I. Atención personalizada.</p>
              </div>
            </div>
          </div>
          <div class="historical-review valores" style="margin-top:30px;">
            <h3>🎯 Nuestros Valores</h3>
            <ul>
              <li><strong>Excelencia:</strong> Superar expectativas en cada servicio.</li>
              <li><strong>Accesibilidad:</strong> Viajar para todos los presupuestos.</li>
              <li><strong>Autenticidad:</strong> Experiencias culturales reales.</li>
              <li><strong>Sostenibilidad:</strong> Turismo responsable con comunidades.</li>
            </ul>
          </div>
        </div>
      `;
      addFadeIn(contenido);
    }

    // ============================
    // Listeners de navegación
    // ============================
    if(inicioLink) inicioLink.addEventListener('click', (e) => { e.preventDefault(); renderInicio(); setActivo(inicioLink); });
    if(destinosLink) destinosLink.addEventListener('click', (e) => { e.preventDefault(); renderDestinos(); setActivo(destinosLink); });
    if(serviciosLink) serviciosLink.addEventListener('click', (e) => { e.preventDefault(); renderServicios(); setActivo(serviciosLink); });
    if(inversionesLink) inversionesLink.addEventListener('click', (e) => { e.preventDefault(); renderInversiones(); setActivo(inversionesLink); });
    if(contactoLink) contactoLink.addEventListener('click', (e) => { e.preventDefault(); renderContacto(); setActivo(contactoLink); });
    if(acercaLink) acercaLink.addEventListener('click', (e) => { e.preventDefault(); renderAcerca(); setActivo(acercaLink); });

    // ============================
    // Mostrar Inicio al cargar
    // ============================
    renderInicio();
    setActivo(inicioLink);
  }
})();