// Lógica do Site e Gráficos do Dashboard

// Tema Escuro / Claro
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

themeToggle.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    if (htmlEl.classList.contains('dark')) {
        themeToggle.innerHTML = '<i class="fas fa-sun text-amber-400"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Modal de Notícias
function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerText = text;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Filtro de Editais
const searchEditais = document.getElementById('search-editais');
if (searchEditais) {
    searchEditais.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.edital-item').forEach(item => {
            const text = item.getAttribute('data-text');
            if (text.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Inicialização dos Gráficos com Chart.js
window.addEventListener('DOMContentLoaded', () => {
    const ctxReajuste = document.getElementById('chartReajuste');
    if (ctxReajuste) {
        new Chart(ctxReajuste, {
            type: 'line',
            data: {
                labels: ['2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'Reajuste Sindae (%)',
                    data: [5.8, 6.2, 5.5, 6.0, 6.4],
                    borderColor: '#0056b3',
                    backgroundColor: 'rgba(0, 86, 179, 0.1)',
                    fill: true,
                    tension: 0.3
                }, {
                    label: 'INPC Acumulado (%)',
                    data: [4.5, 5.0, 4.2, 4.8, 5.1],
                    borderColor: '#00bcd4',
                    borderDash: [5, 5],
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
            }
        });
    }

    const ctxEmpresas = document.getElementById('chartEmpresas');
    if (ctxEmpresas) {
        new Chart(ctxEmpresas, {
            type: 'doughnut',
            data: {
                labels: ['Embasa', 'SAAEs (Municipais)', 'CERB', 'Cetrel / DAC / BRK'],
                datasets: [{
                    data: [68, 18, 8, 6],
                    backgroundColor: ['#0056b3', '#00bcd4', '#10b981', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
            }
        });
    }
});

function switchDashboardTab(tab) {
    ['geral', 'empresas', 'juridico'].forEach(t => {
        const btn = document.getElementById(`btn-${t}`);
        if(btn) {
            if(t === tab) {
                btn.className = "px-3 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-slate-600 shadow transition";
            } else {
                btn.className = "px-3 py-1.5 text-xs font-bold rounded-md text-slate-600 dark:text-slate-300 transition";
            }
        }
    });
}
