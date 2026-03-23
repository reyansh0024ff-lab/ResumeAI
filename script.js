// Global State for unique IDs
let expCount = 0;
let eduCount = 0;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Check contact fields to toggle icons visibility
    updateContactPreview();
    
    // Auto-focus first input
    const nameInput = document.getElementById('fullName');
    if(nameInput) nameInput.focus();
});

// Tab Switching logic
function switchTab(tabId, btn) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // Update Content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Simple Two-Way Data Binding for single fields
function updatePreview(previewId, value, defaultText) {
    const el = document.getElementById(previewId);
    if (!el) return;
    el.textContent = value.trim() === '' ? defaultText : value;
}

// Special hander for contact fields so we hide icons if empty
function updateContactPreview() {
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value.trim();

    const emailEl = document.getElementById('previewEmail');
    const phoneEl = document.getElementById('previewPhone');
    const locationEl = document.getElementById('previewLocation');

    emailEl.style.display = email ? 'inline-flex' : 'none';
    emailEl.innerHTML = `<i class="fa-solid fa-envelope"></i> ${email}`;

    phoneEl.style.display = phone ? 'inline-flex' : 'none';
    phoneEl.innerHTML = `<i class="fa-solid fa-phone"></i> ${phone}`;

    locationEl.style.display = location ? 'inline-flex' : 'none';
    locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${location}`;
    
    const container = document.getElementById('previewContact');
    if(!email && !phone && !location) {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
    }
}

// --- Experience Dynamic List ---
function addExperience() {
    expCount++;
    const template = document.getElementById('experienceTemplate').innerHTML;
    const html = template.replace(/{id}/g, expCount);
    
    const div = document.createElement('div');
    div.innerHTML = html;
    document.getElementById('experienceList').appendChild(div.firstElementChild);
    
    renderExperiencePreview();
    
    // Focus new company input
    setTimeout(() => {
        const inputs = document.querySelectorAll('.exp-company');
        if(inputs.length > 0) inputs[inputs.length - 1].focus();
    }, 50);
}

function removeExperience(id) {
    const el = document.querySelector(`.form-card[data-id="${id}"]`);
    if (el) el.remove();
    renderExperiencePreview();
}

function renderExperiencePreview() {
    const container = document.getElementById('previewExperienceList');
    container.innerHTML = '';
    
    const cards = document.querySelectorAll('#experienceList .form-card');
    
    if (cards.length === 0) {
        container.innerHTML = '<div class="preview-item empty-state">Add experience to see it here.</div>';
        return;
    }

    cards.forEach(card => {
        const company = card.querySelector('.exp-company').value.trim() || 'Company Name';
        const title = card.querySelector('.exp-title').value.trim() || 'Job Title';
        const start = card.querySelector('.exp-start').value.trim();
        const end = card.querySelector('.exp-end').value.trim();
        const desc = card.querySelector('.exp-desc').value.trim();
        
        const dateStr = [start, end].filter(Boolean).join(' - ');

        const item = document.createElement('div');
        item.className = 'preview-item';
        item.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title">${title}</span>
                ${dateStr ? `<span class="preview-item-date">${dateStr}</span>` : ''}
            </div>
            <div class="preview-item-subtitle">${company}</div>
            ${desc ? `<div class="preview-item-desc">${desc}</div>` : ''}
        `;
        container.appendChild(item);
    });
}

// --- Education Dynamic List ---
function addEducation() {
    eduCount++;
    const template = document.getElementById('educationTemplate').innerHTML;
    const html = template.replace(/{id}/g, eduCount);
    
    const div = document.createElement('div');
    div.innerHTML = html;
    document.getElementById('educationList').appendChild(div.firstElementChild);
    
    renderEducationPreview();
}

function removeEducation(id) {
    const el = document.querySelector(`.form-card[data-id="${id}"]`);
    if (el) el.remove();
    renderEducationPreview();
}

function renderEducationPreview() {
    const container = document.getElementById('previewEducationList');
    container.innerHTML = '';
    
    const cards = document.querySelectorAll('#educationList .form-card');
    
    if (cards.length === 0) {
        container.innerHTML = '<div class="preview-item empty-state">Add education to see it here.</div>';
        return;
    }

    cards.forEach(card => {
        const school = card.querySelector('.edu-school').value.trim() || 'Institution Name';
        const degree = card.querySelector('.edu-degree').value.trim() || 'Degree';
        const year = card.querySelector('.edu-year').value.trim();

        const item = document.createElement('div');
        item.className = 'preview-item';
        item.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title">${school}</span>
                ${year ? `<span class="preview-item-date">${year}</span>` : ''}
            </div>
            <div class="preview-item-subtitle">${degree}</div>
        `;
        container.appendChild(item);
    });
}

// --- Skills Processing ---
function renderSkillsPreview() {
    const text = document.getElementById('skillsText').value;
    const container = document.getElementById('previewSkillsList');
    container.innerHTML = '';

    if (!text.trim()) {
        container.innerHTML = '<span class="skill-tag fade-in" style="background:transparent; padding:0; color:#9ca3af; font-style:italic;">Add skills separated by commas</span>';
        return;
    }

    const skills = text.split(',').map(s => s.trim()).filter(Boolean);
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag fade-in';
        span.textContent = skill;
        container.appendChild(span);
    });
}

// --- PDF Export ---
function exportPDF() {
    window.print();
}

// --- Mock AI Enhance ---
const aiEnhancements = {
    summary: "Dynamic and results-oriented professional with a proven track record of delivering high-impact solutions. Adept at leveraging deep technical expertise and strategic thinking to solve complex problems, optimize processes, and drive organizational success in fast-paced environments.",
    experience: "• Spearheaded cross-functional initiatives leading to a 30% increase in operational efficiency.\n• Delivered high-quality, scalable solutions ahead of schedule by implementing robust agile methodologies.\n• Mentored junior team members and fostered a culture of continuous learning and technical excellence.",
    skills: "JavaScript, TypeScript, React.js, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, CI/CD, Agile Methodology, Strategic Leadership, Problem Solving"
};

function enhanceText(inputId, type) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // Show Overlay
    const overlay = document.getElementById('aiOverlay');
    const statusText = document.getElementById('aiStatusText');
    const progress = document.getElementById('aiProgress');
    
    overlay.classList.add('active');
    progress.style.width = '0%';
    statusText.textContent = 'Analyzing your current content...';

    // Simulate multi-step AI process
    setTimeout(() => {
        progress.style.width = '30%';
        statusText.textContent = 'Identifying key achievements and skills...';
    }, 800);

    setTimeout(() => {
        progress.style.width = '70%';
        statusText.textContent = 'Applying industry-standard professional vernacular...';
    }, 1600);

    setTimeout(() => {
        progress.style.width = '100%';
        statusText.textContent = 'Finalizing text structure...';
    }, 2400);

    // Complete and replace text
    setTimeout(() => {
        overlay.classList.remove('active');
        
        // Enhance text based on type
        input.value = aiEnhancements[type] || "Enhanced professional text generated by AI.";
        
        // Trigger the appropriate update function
        if(type === 'summary') {
            updatePreview('previewSummary', input.value, 'Your professional summary will appear here.');
        } else if(type === 'skills') {
            renderSkillsPreview();
        } else if(type === 'experience') {
            renderExperiencePreview();
        }
        
        // Add a highlight effect to the input
        input.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        input.style.boxShadow = '0 0 0 2px rgba(217, 70, 239, 0.4)';
        input.style.borderColor = '#d946ef';

        setTimeout(() => {
            input.style.boxShadow = '';
            input.style.borderColor = 'var(--border-color)';
        }, 1500);

    }, 3000);
}
