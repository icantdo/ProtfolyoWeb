// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
        }
    });
}, observerOptions);

// Observe all skill progress bars
document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.width = width;
    }, 100);
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// Add animation to elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .timeline-item, .education-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    animateOnScroll.observe(el);
});

// Load projects dynamically from config.json
async function loadProjects() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        const projectsGrid = document.querySelector('.projects-grid');

        if (!projectsGrid) return;

        // Clear existing projects
        projectsGrid.innerHTML = '';

        // Create project cards from config
        config.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const technologies = project.technologies.map(tech =>
                `<span class="tag">${tech}</span>`
            ).join('');

            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="static/images/${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.parentElement.querySelector('.project-placeholder').style.display='flex';">
                    <div class="project-placeholder" style="display:none;">
                        <div class="project-placeholder-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="project-placeholder-title">${project.title}</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${technologies}
                    </div>
                    <a href="${project.link}" target="_blank" class="project-link">
                        View Project <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });

        // Re-apply animations to newly created project cards
        document.querySelectorAll('.project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            animateOnScroll.observe(el);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Handle missing project images gracefully
document.addEventListener('DOMContentLoaded', function() {
    // Load projects dynamically
    loadProjects();

    const projectImages = document.querySelectorAll('.project-image img');

    projectImages.forEach(img => {
        // Check if image loads successfully
        img.addEventListener('error', function() {
            // Hide the broken image
            this.style.display = 'none';

            // Show the placeholder
            const placeholder = this.parentElement.querySelector('.project-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });

        // Also check if image is already loaded (for cached images)
        if (img.complete && img.naturalHeight === 0) {
            img.style.display = 'none';
            const placeholder = img.parentElement.querySelector('.project-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        }
    });
});
