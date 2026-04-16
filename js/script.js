// integração com API GitHub
const githubUsername = 'BrayanBRZ';
const apiUrl = `https://api.github.com/users/${githubUsername}`;

async function fetchGitHubData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro na API');
        const data = await response.json();

        document.getElementById('repo-count').innerText = data.public_repos;
        document.getElementById('follower-count').innerText = data.followers;
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        document.getElementById('github-stats').style.display = 'none';
    }
}

fetchGitHubData();

// nav scroll effect
const mainNav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        mainNav.classList.add('nav-scrolled');
    } else {
        mainNav.classList.remove('nav-scrolled');
    }
}, { passive: true });

// internacionalização
let currentLang = 'pt-BR';
let translations = {};

async function loadTranslations() {
    const [pt, en] = await Promise.all([
        fetch('./lang/ptBR.json').then(r => r.json()),
        fetch('./lang/en.json').then(r => r.json())
    ]);

    translations = {
        "pt-BR": pt,
        "en": en
    };
}

function applyTranslations() {
    const t = translations[currentLang];
    if (!t) return;

    // texto interno
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.innerHTML = t[key];
    });

    // placeholders de inputs/textareas
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (t[key]) el.placeholder = t[key];
    });
}

const langBtn = document.getElementById('lang-toggle');

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
    langBtn.innerText = currentLang === 'pt-BR' ? 'EN' : 'PT';
    document.documentElement.lang = currentLang;
    applyTranslations();
});

loadTranslations().then(applyTranslations);

// formulário de contato
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.innerText = translations[currentLang]['form-error'] || 'Preencha todos os campos.';
        return;
    }

    // simula envio — substitua por fetch() real se necessário
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;

    setTimeout(() => {
        formFeedback.className = 'form-feedback';
        formFeedback.innerText = translations[currentLang]['form-success'] || 'Mensagem enviada!';
        contactForm.reset();
        submitBtn.disabled = false;
    }, 600);
});