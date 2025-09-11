// Recipe deletion confirmation
function deleteRecipe(recipeId) {
    if (confirm('🗑️ Are you sure you want to delete this recipe? This action cannot be undone.')) {
        fetch(`/recipes/${recipeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                // Redirect to my recipes page
                window.location.href = '/recipes/my';
            } else {
                alert('❌ Error deleting recipe. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('❌ Error deleting recipe. Please try again.');
        });
    }
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Password confirmation validation for registration
    const registerForm = document.querySelector('form[action="/auth/register"]');
    if (registerForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        function validatePasswords() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
            } else {
                confirmPassword.setCustomValidity('');
            }
        }
        
        password.addEventListener('input', validatePasswords);
        confirmPassword.addEventListener('input', validatePasswords);
    }
    
    // Recipe form enhancements
    const recipeForm = document.querySelector('form[action="/recipes/new"]');
    if (recipeForm) {
        const ingredientsTextarea = document.getElementById('ingredients');
        const instructionsTextarea = document.getElementById('instructions');
        
        // Auto-resize textareas
        function autoResize(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
        
        if (ingredientsTextarea) {
            ingredientsTextarea.addEventListener('input', () => autoResize(ingredientsTextarea));
        }
        
        if (instructionsTextarea) {
            instructionsTextarea.addEventListener('input', () => autoResize(instructionsTextarea));
        }
    }
    
    // Smooth animations for recipe cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe recipe cards for animation
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'error' ? '#e74c3c' : '#27ae60',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Enhanced recipe card interactions
document.addEventListener('DOMContentLoaded', function() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        // Add hover effect with subtle tilt
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
        
        // Add click effect for better UX
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) rotateX(2deg)';
        });
    });
});

// Typing indicator for forms
function addTypingIndicator() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: #7f8c8d;
                margin-top: 0.5rem;
            `;
            
            function updateCounter() {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${remaining} characters remaining`;
                
                if (remaining < 50) {
                    counter.style.color = '#e74c3c';
                } else if (remaining < 100) {
                    counter.style.color = '#f39c12';
                } else {
                    counter.style.color = '#7f8c8d';
                }
            }
            
            updateCounter();
            textarea.addEventListener('input', updateCounter);
            textarea.parentNode.appendChild(counter);
        }
    });
}

// Initialize typing indicators
document.addEventListener('DOMContentLoaded', addTypingIndicator);