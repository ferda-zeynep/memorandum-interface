

document.addEventListener('keydown', (e) => {
   
    if (e.altKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        
        const sectionMapping = {
            '1': '#executive-summary',
            '2': '#facts',
            '3': '#analysis',
            '4': '#risks',
            '5': '#recommendation'
        };
        
        const targetId = sectionMapping[e.key];
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
          
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus({ preventScroll: true });
            
        
            const outlineLinks = document.querySelectorAll('.outline-link');
            outlineLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    }
});