document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

menu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

//chatbotttt

const bubble = document.getElementById("chatbot-bubble");
const windowChat = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const msgBox = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

if (bubble && windowChat && closeBtn && msgBox && input && sendBtn) {

// abrir chat y mostrar las opcionesss
bubble.addEventListener("click", () => {
  windowChat.classList.remove("hidden");

  if(msgBox.innerHTML.trim() === ""){
    agregarMensaje("bot", `
      👋 ¡Hola! Soy tu asistente Next Path.<br><br>
      Puedo ayudarte con:<br>
      • <strong>¿Qué es Next Path?</strong><br>
      • <strong>¿Cómo funciona?</strong><br>
      • <strong>¿Dónde descargar la app?</strong><br>
      • <strong>¿Cuánto dura el test?</strong><br>
      • <strong>¿Es gratis?</strong><br><br>
      Escribe una de estas preguntas o una palabra clave 😊
    `);
  }
});

// cerrar chat
closeBtn.addEventListener("click", () => {
  windowChat.classList.add("hidden");
});

// para enviar el mensajeee

sendBtn.addEventListener("click", enviarMensaje);
input.addEventListener("keypress", (e)=>{
  if(e.key === "Enter"){ enviarMensaje(); }
});

function enviarMensaje(){
  const texto = input.value.trim();
  if(texto === "") return;

  agregarMensaje("user", texto);
  procesarRespuesta(texto);
  input.value = "";
}

function agregarMensaje(tipo, texto){
  const div = document.createElement("div");
  div.className = tipo === "bot" ? "msg-bot" : "msg-user";
  div.innerHTML = texto;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}

// para las respuestasssss

function procesarRespuesta(texto){
  const msg = texto.toLowerCase();

  if(msg.includes("hola") || msg.includes("buenas")){
    return agregarMensaje("bot", "¡Hola! Puedo ayudarte con dudas sobre Next Path 🐼");
  }

  if(msg.includes("que es") || msg.includes("qué es") || msg.includes("next path")){
    return agregarMensaje("bot", "Next Path es una app de orientación vocacional que te ayuda a descubrir tu camino profesional.");
  }

  if(msg.includes("funciona") ){
    return agregarMensaje("bot", "Analizamos tus intereses, habilidades y valores para recomendarte carreras compatibles.");
  }

  if(msg.includes("dur") || msg.includes("test")){
    return agregarMensaje("bot", "Contamos con diversos test vocacionales, los cuales pueden durar entre 8 a 16 minutos");
  }

  if(msg.includes("descarg") || msg.includes("app store") || msg.includes("play")){
    return agregarMensaje("bot", "La app estará disponible próximamente en App Store y Google Play.");
  }

  if(msg.includes("precio") || msg.includes("costo") || msg.includes("gratis")){
    return agregarMensaje("bot", "El test inicial será gratuito 🐼");
  }

  if(msg.includes("gracias")){
    return agregarMensaje("bot", "¡Con gusto! ¿Necesitas algo más?");
  }
  if(msg.includes("adios") || msg.includes("chau")){
    return agregarMensaje("bot", "¡Hasta luego! Sigue creciendo con Next Path.");
  }

  agregarMensaje("bot", "Aún estoy aprendiendo 🐼. Puedo ayudarte con: <br>• Qué es Next Path<br>• Cómo funciona<br>• Duración del test<br>• Descargas y precio");
}
}
