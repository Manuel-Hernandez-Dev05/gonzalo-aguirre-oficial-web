document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Efecto de desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validación del formulario
    const consultaForm = document.getElementById('consulta-form');
    
    if (consultaForm) {
        consultaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            let isValid = true;
            const requiredFields = consultaForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulación de envío (en un sitio real, esto se conectaría a un backend)
                const formData = new FormData(consultaForm);
                const formDataObj = {};
                
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // Mostrar mensaje de confirmación
                consultaForm.innerHTML = `
                    <div class="form-success">
                        <h3>Solicitud Recibida</h3>
                        <p>Gracias por contactar a Gonzalo Aguirre Sánchez. Su solicitud ha sido recibida y será evaluada a la brevedad.</p>
                        <p>Nos pondremos en contacto con usted para informarle sobre el presupuesto y los detalles del trabajo.</p>
                        <p><strong>Recuerde:</strong> Los trabajos de magia negra representan un compromiso por la eternidad.</p>
                    </div>
                `;
                
                // Scroll al mensaje de confirmación
                window.scrollTo({
                    top: consultaForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Manejo de carga de imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.onload = () => {
                        image.classList.add('loaded');
                    };
                    observer.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.onload = () => {
                img.classList.add('loaded');
            };
        });
    }
    
    // Efecto de aparición al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Elementos a observar
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Añadir clase para efectos CSS
    document.querySelectorAll('.servicio-card, .biografia-content > div').forEach(el => {
        el.classList.add('fade-in');
    });
});