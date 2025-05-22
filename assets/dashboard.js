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

    // Theme Switcher Logic
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleButton) {
            themeToggleButton.innerHTML = theme === 'dark' ? '<i class="material-icons">light_mode</i>' : '<i class="material-icons">dark_mode</i>';
        }
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
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
}); 