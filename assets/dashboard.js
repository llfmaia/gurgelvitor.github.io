document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic greeting
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            greetingElement.textContent = 'Bom dia!';
        } else if (currentHour < 18) {
            greetingElement.textContent = 'Boa tarde!';
        } else {
            greetingElement.textContent = 'Boa noite!';
        }
    }

    // Motivational Quote
    const motivationalQuoteElement = document.getElementById('motivational-quote');
    if (motivationalQuoteElement) {
        const quotes = [
            "Acredite em você mesmo e tudo será possível.",
            "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
            "A persistência realiza o impossível.",
            "Não espere por oportunidades extraordinárias. Agarre as ocasiões comuns e as torne grandes.",
            "Sua única limitação é você mesmo.",
            "Comece onde você está. Use o que você tem. Faça o que você pode.",
            "A jornada de mil milhas começa com um único passo."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        motivationalQuoteElement.innerHTML = `<em>${randomQuote}</em>`;
    }

    // Placeholder for Weather API
    const temperatureElement = document.getElementById('temperature');
    const locationElement = document.getElementById('location');
    if (temperatureElement && locationElement) {
        // Simulating weather data
        temperatureElement.textContent = '28°C'; // Example temperature
        locationElement.textContent = 'Rio de Janeiro'; // Example Location
        // Replace with actual API call as commented in previous versions
    }

    // Advanced Theme System with Multiple Themes
    const themeToggleButton = document.getElementById('theme-toggle');
    const paletteToggleButton = document.getElementById('palette-toggle');
    const themeSelector = document.querySelector('.theme-selector');
    const themePickers = document.querySelectorAll('.theme-picker');
    
    // Get current theme and mode from localStorage or defaults
    const currentTheme = localStorage.getItem('fitness-theme') || 'default';
    const currentMode = localStorage.getItem('fitness-mode') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme, mode) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-mode', mode);
        localStorage.setItem('fitness-theme', theme);
        localStorage.setItem('fitness-mode', mode);
        
        // Update mode toggle icon
        if (themeToggleButton) {
            themeToggleButton.innerHTML = mode === 'dark' ? '<i class="material-icons">light_mode</i>' : '<i class="material-icons">dark_mode</i>';
        }
        
        // Update theme picker active state
        themePickers.forEach(picker => {
            picker.classList.remove('active');
            if (picker.getAttribute('data-theme') === theme) {
                picker.classList.add('active');
            }
        });
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Initialize theme
    applyTheme(currentTheme, currentMode);

    // Palette toggle functionality
    if (paletteToggleButton && themeSelector) {
        paletteToggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = themeSelector.classList.contains('active');
            const themeControls = document.querySelector('.theme-controls');
            
            if (isActive) {
                themeSelector.classList.remove('active');
                paletteToggleButton.classList.remove('active');
                themeControls.classList.remove('expanded');
            } else {
                themeSelector.classList.add('active');
                paletteToggleButton.classList.add('active');
                themeControls.classList.add('expanded');
            }
            
            // Visual feedback
            paletteToggleButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                paletteToggleButton.style.transform = '';
            }, 150);
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });

        // Close palette when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-controls')) {
                const themeControls = document.querySelector('.theme-controls');
                themeSelector.classList.remove('active');
                paletteToggleButton.classList.remove('active');
                themeControls.classList.remove('expanded');
            }
        });
    }

    // Mode toggle (light/dark) event listener
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentMode = document.documentElement.getAttribute('data-mode');
            const newMode = currentMode === 'dark' ? 'light' : 'dark';
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            // Add visual feedback
            themeToggleButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggleButton.style.transform = '';
            }, 150);
            
            applyTheme(currentTheme, newMode);
        });
    }

    // Theme picker event listeners
    themePickers.forEach(picker => {
        picker.addEventListener('click', (e) => {
            const selectedTheme = e.target.getAttribute('data-theme');
            const currentMode = document.documentElement.getAttribute('data-mode');
            
            // Add visual feedback with ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: 40px;
                height: 40px;
                left: 50%;
                top: 50%;
                margin-left: -20px;
                margin-top: -20px;
            `;
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Apply new theme
            applyTheme(selectedTheme, currentMode);
            
            // Haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        });
        
        // Add hover effects
        picker.addEventListener('mouseenter', () => {
            picker.style.transform = 'scale(1.1) translateY(-2px)';
        });
        
        picker.addEventListener('mouseleave', () => {
            picker.style.transform = '';
        });
    });

    // Add CSS for ripple animation
    if (!document.querySelector('#theme-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Card Animations with IntersectionObserver
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    // observer.unobserve(entry.target); // Optional: unobserve after animation
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    }

    // Bottom Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const pageMap = {
        'home': 'index.html',
        'workout': 'treinos.html', // Updated to use the main workouts page
        'nutrition': 'tabelanutricional.html',
        'progress': 'mapacorpo.html', // Using body map as progress page
        'profile': 'sobrenos.html' // About us as profile
    };

    // Set active nav item based on current page
    function setActiveNav() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        
        navItems.forEach(item => {
            const page = item.getAttribute('data-page');
            item.classList.remove('active');
            
            // Smart page detection
            if (page === 'home' && (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/'))) {
                item.classList.add('active');
            } else if (page === 'workout' && (currentPath.includes('pasttreinos') || currentPath.includes('treino'))) {
                item.classList.add('active');
            } else if (page === 'nutrition' && (currentPage === 'tabelanutricional.html' || currentPath.includes('nutri'))) {
                item.classList.add('active');
            } else if (page === 'progress' && (currentPage === 'mapacorpo.html' || currentPath.includes('mapa') || currentPath.includes('progress'))) {
                item.classList.add('active');
            } else if (page === 'profile' && (currentPage === 'sobrenos.html' || currentPage === 'dicas.html' || currentPath.includes('sobre') || currentPath.includes('dica'))) {
                item.classList.add('active');
            }
        });
    }

    // Navigation click handlers
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            let targetUrl = pageMap[page];
            
            // Calculate relative path based on current location
            const currentPath = window.location.pathname;
            const currentDepth = currentPath.split('/').length - 1;
            
            if (currentDepth > 1) {
                // We're in a subdirectory, need to go up
                const upLevels = currentDepth - 1;
                const prefix = '../'.repeat(upLevels);
                targetUrl = prefix + targetUrl;
            }
            
            if (targetUrl) {
                // Add loading state
                e.currentTarget.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.currentTarget.style.transform = '';
                }, 150);
                
                // Navigate to page
                window.location.href = targetUrl;
            }
        });

        // Add haptic feedback for mobile devices
        item.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(10); // Very light vibration
            }
        });
    });

    // Set initial active state
    setActiveNav();

    // Update active nav when page changes (for single page apps)
    window.addEventListener('popstate', setActiveNav);
    
    // Add glassmorphism effect on scroll for better visual depth
    let ticking = false;
    function updateGlassEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.glass');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateGlassEffects);
            ticking = true;
        }
    }
    
    // Only add scroll effects on devices that support it well
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
}); 