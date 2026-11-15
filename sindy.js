// Assistente Virtual Sindy - Inteligência de Atendimento SINDAE-BA
(function () {
    const knowledgeBase = [
        {
            keywords: ['juridico', 'jurídico', 'advogado', 'processo', 'acao', 'ação', 'gabriela', 'eduardo', 'daniel', 'plantao', 'plantão'],
            answer: `⚖️ <strong>Plantão Jurídico do SINDAE-BA:</strong><br><br>
            • <strong>Terças:</strong> Dra. Gabriela (8h30–12h | 13h30–17h30)<br>
            • <strong>Quartas:</strong> Dr. Eduardo (8h30–12h | 13h30–17h30)<br>
            • <strong>Quintas:</strong> Dr. Daniel (8h30–12h | 13h30–17h30)<br><br>
            📱 WhatsApp Jurídico: <a href="https://wa.me/5571997180853" target="_blank" class="underline font-bold text-green-600">(71) 99718-0853</a><br>
            📧 E-mail: <em>atendimentojuridico@sindae-ba.org.br</em>`
        },
        {
            keywords: ['filiar', 'filiacao', 'filiação', 'associar', 'socio', 'sócio', 'cadastro', 'ficha'],
            answer: `🤝 <strong>Como se filiar ao SINDAE-BA:</strong><br><br>
            Trabalhadores da Embasa, CERB, SAAEs, Cetrel, DAC e BRK podem se filiar para ter acesso à assessoria jurídica, convênios e participação nas assembleias.<br><br>
            Ligue para a secretaria no <strong>(71) 3111-1700</strong> ou envie um e-mail para <strong>secretaria@sindae-ba.org.br</strong> solicitando a ficha cadastral.`
        },
        {
            keywords: ['ppr', 'lucros', 'resultados', 'embasa', 'reajuste', 'salario', 'salário', 'acordo', 'act'],
            answer: `📊 <strong>PPR 2026 & Acordos Coletivos:</strong><br><br>
            O SINDAE-BA está em negociação permanente com a diretoria da Embasa cobrando o pagamento integral do <strong>PPR 2026</strong> e a conclusão dos aditivos pendentes ao ACT.<br><br>
            Você pode conferir os índices de reajuste vs. INPC no nosso <strong>Dashboard BI</strong> aqui mesmo no portal!`
        },
        {
            keywords: ['edital', 'assembleia', 'assembléia', 'convocacao', 'convocação', 'paralisacao', 'paralisação', 'saae', 'correntina'],
            answer: `📢 <strong>Editais e Convocações Recentes:</strong><br><br>
            • <strong>SAAE Correntina:</strong> Comunicado de paralisação.<br>
            • <strong>EMBASA:</strong> Edital de Convocação de Assembleias Gerais Extraordinárias.<br>
            • <strong>CETREL e DAC:</strong> Edital de Convocação AGE.<br><br>
            Role até a seção <em>Editais & Convocações</em> para filtrar por sua empresa.`
        },
        {
            keywords: ['endereco', 'endereço', 'onde fica', 'sede', 'telefone', 'contato', 'email', 'e-mail', 'barris', 'salvador', 'horario', 'horário'],
            answer: `🏢 <strong>Sede Central do SINDAE-BA:</strong><br><br>
            📍 <strong>Endereço:</strong> Rua General Labatut, Nº 65, Barris, Salvador - BA (CEP: 40070-100)<br>
            ☎️ <strong>Telefone:</strong> (71) 3111-1700<br>
            📱 <strong>WhatsApp:</strong> (71) 99718-0853<br>
            📧 <strong>E-mail:</strong> secretaria@sindae-ba.org.br`
        },
        {
            keywords: ['escala', '5x2', 'terceirizado', 'terceirizados', 'jornada'],
            answer: `⏱️ <strong>Escala 5x2 e Terceirizados:</strong><br><br>
            O SINDAE-BA acompanha de perto o debate sobre o fim da escala 6x1 e a adoção da <strong>escala 5x2</strong>, especialmente para trabalhadores terceirizados de manutenção de redes, varrição e estações de tratamento.`
        },
        {
            keywords: ['oi', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem', 'ajuda', 'menu'],
            answer: `Olá! Eu sou a <strong>Sindy</strong>, assistente virtual do SINDAE-BA 💧.<br><br>
            Posso te ajudar com informações sobre:<br>
            • ⚖️ <strong>Plantão Jurídico</strong> e horários<br>
            • 🤝 <strong>Filiação Sindical</strong><br>
            • 📊 <strong>PPR 2026 e Acordos Coletivos</strong><br>
            • 📢 <strong>Editais e Assembleias</strong><br>
            • 🏢 <strong>Endereço e Telefones da Sede</strong><br><br>
            Sobre qual assunto você deseja falar?`
        }
    ];

    function normalizeText(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function getSindyResponse(userText) {
        const clean = normalizeText(userText);
        let bestMatch = null;
        let maxScore = 0;

        for (const item of knowledgeBase) {
            let score = 0;
            for (const kw of item.keywords) {
                if (clean.includes(normalizeText(kw))) {
                    score++;
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item.answer;
            }
        }

        if (bestMatch) {
            return bestMatch;
        }

        return `Não encontrei uma resposta exata para essa dúvida na minha base rápida, mas nossa equipe atende você diretamente!<br><br>
        👉 <a href="https://wa.me/5571997180853?text=Ol%C3%A1%2C%20vim%20pelo%20site%20do%20SINDAE-BA%20e%20preciso%20de%20atendimento." target="_blank" class="inline-block mt-1 bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs">Falar no WhatsApp (71) 99718-0853</a>`;
    }

    function initSindy() {
        if (document.getElementById('sindy-launcher')) return;

        const container = document.createElement('div');
        container.innerHTML = `
            <button id="sindy-launcher" aria-label="Abrir chat com a Sindy">
                <span class="sindy-pulse"></span>
                <i class="fas fa-robot text-lg"></i>
                <span>Falar com a Sindy</span>
            </button>

            <div id="sindy-window" role="dialog" aria-label="Atendimento Virtual Sindy">
                <div class="sindy-header">
                    <div class="flex items-center gap-3">
                        <div class="sindy-avatar">S</div>
                        <div>
                            <div class="font-bold text-sm flex items-center gap-1.5">
                                Sindy • IA SINDAE-BA
                                <span class="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                            </div>
                            <div class="text-[11px] text-cyan-200">Online agora • Atendimento 24h</div>
                        </div>
                    </div>
                    <button id="sindy-close" class="text-white/80 hover:text-white text-xl leading-none p-1">&times;</button>
                </div>

                <div id="sindy-messages" class="sindy-messages">
                    <div class="sindy-msg bot">
                        Olá! 👋 Sou a <strong>Sindy</strong>, assistente virtual do <strong>SINDAE-BA</strong>.<br><br>
                        Como posso ajudar você hoje? Escolha um tema abaixo ou digite sua pergunta:
                    </div>
                </div>

                <div class="sindy-quick-replies">
                    <button class="sindy-chip" data-q="Qual o horário do Plantão Jurídico?">⚖️ Plantão Jurídico</button>
                    <button class="sindy-chip" data-q="Como faço para me filiar?">🤝 Como me filiar</button>
                    <button class="sindy-chip" data-q="Novidades sobre o PPR 2026">📊 PPR 2026</button>
                    <button class="sindy-chip" data-q="Editais e assembleias abertas">📢 Editais</button>
                    <button class="sindy-chip" data-q="Endereço e telefone do sindicato">🏢 Sede e Contatos</button>
                </div>

                <form id="sindy-form" class="sindy-input-area">
                    <input type="text" id="sindy-input" placeholder="Digite sua dúvida para a Sindy..." autocomplete="off" required />
                    <button type="submit" class="sindy-send-btn" aria-label="Enviar mensagem">
                        <i class="fas fa-paper-plane text-xs"></i>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(container);

        const launcher = document.getElementById('sindy-launcher');
        const win = document.getElementById('sindy-window');
        const closeBtn = document.getElementById('sindy-close');
        const form = document.getElementById('sindy-form');
        const input = document.getElementById('sindy-input');
        const messages = document.getElementById('sindy-messages');

        function appendMessage(html, sender) {
            const div = document.createElement('div');
            div.className = `sindy-msg ${sender}`;
            div.innerHTML = html;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
            return div;
        }

        function handleUserMessage(text) {
            if (!text.trim()) return;
            appendMessage(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 'user');

            const typingEl = appendMessage('<i class="fas fa-ellipsis-h animate-pulse"></i> Sindy está digitando...', 'bot');
            setTimeout(() => {
                typingEl.innerHTML = getSindyResponse(text);
                messages.scrollTop = messages.scrollHeight;
            }, 500);
        }

        launcher.addEventListener('click', () => {
            const isOpen = win.style.display === 'flex';
            win.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) input.focus();
        });

        closeBtn.addEventListener('click', () => {
            win.style.display = 'none';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = input.value;
            input.value = '';
            handleUserMessage(val);
        });

        container.querySelectorAll('.sindy-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                handleUserMessage(chip.getAttribute('data-q'));
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSindy);
    } else {
        initSindy();
    }
})();
