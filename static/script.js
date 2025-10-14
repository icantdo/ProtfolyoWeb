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
        const projectsContainer = document.querySelector('#projects .container');

        if (!projectsContainer) return;

        // Clear existing content except the title
        const sectionTitle = projectsContainer.querySelector('.section-title');
        projectsContainer.innerHTML = '';
        if (sectionTitle) {
            projectsContainer.appendChild(sectionTitle);
        } else {
            projectsContainer.innerHTML = '<h2 class="section-title">Projects</h2>';
        }

        // Group projects by status
        const currentWorkProjects = config.projects.filter(p => p.status === 'current work');
        const finishedProjects = config.projects.filter(p => p.status === 'finished');

        // Helper function to create project card
        function createProjectCard(project) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const technologies = project.technologies.map(tech =>
                `<span class="tag">${tech}</span>`
            ).join('');

            // Determine status badge
            const statusBadge = project.status === 'current work'
                ? '<span class="status-badge status-current">Current Work</span>'
                : '<span class="status-badge status-finished">Finished</span>';

            projectCard.innerHTML = `
                <div class="project-image">
                    ${statusBadge}
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

            return projectCard;
        }

        // Create Current Work section if there are current work projects
        if (currentWorkProjects.length > 0) {
            const currentWorkSection = document.createElement('div');
            currentWorkSection.className = 'project-category project-category-current';
            currentWorkSection.innerHTML = '<h3 class="category-title">Current Work</h3>';

            const currentWorkGrid = document.createElement('div');
            currentWorkGrid.className = 'projects-grid';

            currentWorkProjects.forEach(project => {
                const card = createProjectCard(project);
                card.classList.add('project-card-current');
                card.style.border = '4px solid #fbbf24';
                card.style.boxShadow = '0 0 0 4px #fbbf24, 0 4px 20px rgba(251, 191, 36, 0.3)';
                currentWorkGrid.appendChild(card);
            });

            currentWorkSection.appendChild(currentWorkGrid);
            projectsContainer.appendChild(currentWorkSection);
        }

        // Create Finished Projects section if there are finished projects
        if (finishedProjects.length > 0) {
            const finishedSection = document.createElement('div');
            finishedSection.className = 'project-category project-category-finished';
            finishedSection.innerHTML = '<h3 class="category-title">Finished Projects</h3>';

            const finishedGrid = document.createElement('div');
            finishedGrid.className = 'projects-grid';

            finishedProjects.forEach(project => {
                const card = createProjectCard(project);
                card.classList.add('project-card-finished');
                card.style.border = '4px solid #3b82f6';
                card.style.boxShadow = '0 0 0 4px #3b82f6, 0 4px 20px rgba(59, 130, 246, 0.3)';
                finishedGrid.appendChild(card);
            });

            finishedSection.appendChild(finishedGrid);
            projectsContainer.appendChild(finishedSection);
        }

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
