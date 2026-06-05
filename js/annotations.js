
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.annotation-trigger');
    const panel = document.getElementById('evidence-panel');
    const panelContent = document.getElementById('evidence-panel-content');
    const closeButton = document.getElementById('close-evidence');
    let evidenceData = null;


    async function loadEvidenceData() {
        try {
        
            const response = await fetch('./data/memo.json');
            evidenceData = await response.json();
        } catch (error) {
            console.error('Error loading corporate evidence database:', error);
        }
    }


    function displayEvidence(evidenceId, triggerElement) {
        if (!evidenceData || !evidenceData[evidenceId]) return;

        const data = evidenceData[evidenceId];
        
        panelContent.innerHTML = `
            <div class="evidence-card">
                <p class="evidence-meta-label">ASSERTED CLAIM</p>
                <blockquote class="evidence-claim-quote">"${data.claim}"</blockquote>
                
                <hr style="border:0; border-top:1px solid var(--color-border); margin:16px 0;">
                
                <p class="evidence-meta-label">LEGAL PROVISION / DATA CORROBORATION</p>
                <p class="evidence-clause-title">${data.clause}</p>
                <p class="evidence-provision-text">${data.provision}</p>
                
                <div class="evidence-source-tag">
                    <strong>Source:</strong> ${data.source}
                </div>
            </div>
        `;

        // UI Interactions
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        triggerElement.setAttribute('aria-expanded', 'true');
    }

    function closePanel() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        
        // Reset triggers
        triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    }

    // Event Listeners
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const evidenceId = e.target.getAttribute('data-evidence-id');
            displayEvidence(evidenceId, e.target);
        });
    });

    closeButton.addEventListener('click', closePanel);

    // Initial load
    loadEvidenceData();
});