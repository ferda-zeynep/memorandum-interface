
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-focus-mode');
    const appContainer = document.querySelector('.app-container');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text-display'); // Will fall back if not explicitly found

    // 1. Focus Mode Toggle logic
    toggleBtn.addEventListener('click', () => {
        const isPressed = toggleBtn.getAttribute('aria-pressed') === 'true';
        
      
        toggleBtn.setAttribute('aria-pressed', !isPressed);
        
    
        appContainer.classList.toggle('focus-mode-active');
        
        if (!isPressed) {
            toggleBtn.classList.add('active-mode');
        } else {
            toggleBtn.classList.remove('active-mode');
        }
    });

    // 2. Dynamic Reading Progress Calculation
    window.addEventListener('scroll', () => {
        const docElement = document.documentElement;
        const scrollTop = window.scrollY || docElement.scrollTop;
        const scrollHeight = docElement.scrollHeight - docElement.clientHeight;
        
        if (scrollHeight > 0) {
            const progressPercent = Math.round((scrollTop / scrollHeight) * 100);
            
            // Update UI elements
            progressBarFill.style.width = `${progressPercent}%`;
            
            const progressTextEl = document.getElementById('reading-progress-text');
            if (progressTextEl) {
                progressTextEl.textContent = `Progress: ${progressPercent}%`;
            }
            
            // Accessibility updates
            const progressContainer = document.querySelector('.progress-bar-container');
            if (progressContainer) {
                progressContainer.setAttribute('aria-valuenow', progressPercent);
            }
        }
    });
});