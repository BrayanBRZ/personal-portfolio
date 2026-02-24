// integração com API
const githubUsername = 'BrayanBRZ';
const apiUrl = `https://api.github.com/users/${githubUsername}`;

async function fetchGitHubData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro na API');
        const data = await response.json();

        // Atualiza os elementos na tela
        document.getElementById('repo-count').innerText = data.public_repos;
        document.getElementById('follower-count').innerText = data.followers;
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        document.getElementById('github-stats').style.display = 'none'; // Esconde se der erro
    }
}

fetchGitHubData();

// internacionalização
const translations = {
    'pt-BR': {
        'nav-projects': 'projetos',
        'nav-contact': 'contato',
        'hero-title': 'Olá, me chamo<br>Brayan Barros.',
        'hero-desc': 'Estudante de Engenharia de Software no IFPR e estagiário na Unimake Software. Gosto de construir coisas do zero e aprender com cada projeto.',
        'status-work': 'estagiário na Unimake Software',
        'api-repos': 'repos',
        'api-followers': 'seguidores',
        'label-education': 'formação',
        'edu-1-title': 'Bacharelado em Engenharia de Software',
        'edu-1-date': '2024 — 2027 (Cursando)',
        'edu-2-title': 'Técnico em Informática',
        'edu-2-date': '2020 — 2023 (Concluído)',
        'label-experience': 'experiência',
        'exp-1-title': 'Suporte Técnico em Informática',
        'exp-2-title': 'Desenvolvedor (Estagiário)',
        'exp-2-date': '2025 — Atual',
        'label-tech': 'tecnologias',
        'label-projects': 'projetos',
        'label-repos-count': '3 repositórios',
        'proj-1-desc': 'Sistema de gerenciamento de loja com back-end em Node.js. Inclui cadastro de produtos, controle de estoque e registro de vendas.',
        'proj-2-desc': 'Emulador de um processador monociclo implementado em C++. Simula o ciclo de busca, decodificação e execução de instruções.',
        'proj-3-desc': 'Aplicação desktop para organizar e gerenciar uma biblioteca de jogos. Permite catalogar, filtrar e acompanhar o progresso.',
        'label-contact': 'contato',
        'contact-desc': 'Quer trocar uma ideia, colaborar em algum projeto ou só dar um oi? Me manda uma mensagem.'
    },
    'en': {
        'nav-projects': 'projects',
        'nav-contact': 'contact',
        'hero-title': 'Hello, I am<br>Brayan Barros.',
        'hero-desc': 'Software Engineering student at IFPR and intern at Unimake Software. I like building things from scratch and learning with every project.',
        'status-work': 'intern at Unimake Software',
        'api-repos': 'repos',
        'api-followers': 'followers',
        'label-education': 'education',
        'edu-1-title': 'B.S. in Software Engineering',
        'edu-1-date': '2024 — 2027 (In Progress)',
        'edu-2-title': 'IT Technician',
        'edu-2-date': '2020 — 2023 (Completed)',
        'label-experience': 'experience',
        'exp-1-title': 'IT Technical Support',
        'exp-2-title': 'Developer (Intern)',
        'exp-2-date': '2025 — Present',
        'label-tech': 'technologies',
        'label-projects': 'projects',
        'label-repos-count': '3 repositories',
        'proj-1-desc': 'Store management system with Node.js backend. Includes product registration, inventory control, and sales recording.',
        'proj-2-desc': 'Single-cycle processor emulator implemented in C++. Simulates the fetch, decode, and execute cycle of low-level instructions.',
        'proj-3-desc': 'Desktop application to organize and manage a game library. Allows cataloging, filtering, and tracking progress.',
        'label-contact': 'contact',
        'contact-desc': 'Want to share ideas, collaborate on a project, or just say hi? Send me a message.'
    }
};

let currentLang = 'pt-BR';
const langBtn = document.getElementById('lang-toggle');

langBtn.addEventListener('click', () => {

    currentLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
    langBtn.innerText = currentLang === 'pt-BR' ? 'EN' : 'PT';

    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
});
