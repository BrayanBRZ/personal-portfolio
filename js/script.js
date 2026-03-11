// integração com API
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
        document.getElementById('github-stats').style.display = 'none'; // Esconde se der erro
    }
}

fetchGitHubData();

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
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");

        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
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