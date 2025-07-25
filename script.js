// Contact Form JavaScript
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            newsletter: document.getElementById('newsletter')
        };
        this.errorElements = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };
        
        this.init();
    }

    init() {
        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            if (this.fields[fieldName] && fieldName !== 'newsletter') {
                this.fields[fieldName].addEventListener('blur', () => this.validateField(fieldName));
                this.fields[fieldName].addEventListener('input', () => this.clearFieldError(fieldName));
            }
        });

        // Phone number formatting
        if (this.fields.phone) {
            this.fields.phone.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }
    }

    // Validate individual field
    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        const errorElement = this.errorElements[fieldName];
        
        if (!errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters and spaces';
                    isValid = false;
                }
                break;

            case 'email':
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!this.isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'phone':
                if (value && !this.isValidPhone(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message cannot exceed 1000 characters';
                    isValid = false;
                }
                break;
        }

        this.displayFieldError(fieldName, errorMessage);
        return isValid;
    }

    // Validate entire form
    validateForm() {
        let isValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            if (fieldName !== 'newsletter') {
                if (!this.validateField(fieldName)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Display field error
    displayFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        const errorElement = this.errorElements[fieldName];
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }

        if (field) {
            field.classList.remove('success');
            if (message) {
                field.classList.add('error');
                field.classList.add('shake');
                setTimeout(() => field.classList.remove('shake'), 500);
            } else {
                field.classList.remove('error');
                if (field.value.trim()) {
                    field.classList.add('success');
                }
            }
        }
    }

    // Clear field error
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        const errorElement = this.errorElements[fieldName];
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        if (field) {
            field.classList.remove('error');
            if (field.value.trim()) {
                field.classList.add('success');
            } else {
                field.classList.remove('success');
            }
        }
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Format phone number
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = value;
    }

    // Show loading state
    showLoading() {
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        this.form.classList.add('form-loading');
    }

    // Hide loading state
    hideLoading() {
        this.submitBtn.classList.remove('loading');
        this.submitBtn.disabled = false;
        this.form.classList.remove('form-loading');
    }

    // Show success message
    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.remove('hidden');
        this.successMessage.style.animation = 'slideUp 0.6s ease-out';
    }

    // Collect form data
    collectFormData() {
        const formData = {
            name: this.fields.name.value.trim(),
            email: this.fields.email.value.trim(),
            phone: this.fields.phone.value.trim(),
            subject: this.fields.subject.value,
            message: this.fields.message.value.trim(),
            newsletter: this.fields.newsletter.checked,
            timestamp: new Date().toISOString()
        };

        return formData;
    }

    // Simulate form submission (replace with actual API call)
    async submitForm(formData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically send the data to your server
        console.log('Form data submitted:', formData);
        
        // For demo purposes, we'll just return success
        return { success: true, message: 'Message sent successfully!' };
    }

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.form.classList.add('shake');
            setTimeout(() => this.form.classList.remove('shake'), 500);
            return;
        }

        // Show loading state
        this.showLoading();

        try {
            // Collect form data
            const formData = this.collectFormData();

            // Submit form
            const result = await this.submitForm(formData);

            if (result.success) {
                // Show success message
                this.showSuccess();
                
                // Reset form
                this.resetForm();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Show error message
    showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee;
            color: #e74c3c;
            padding: 15px;
            border-radius: 8px;
            margin: 20px;
            text-align: center;
            border: 1px solid #fcc;
        `;
        errorDiv.textContent = message;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Reset form
    resetForm() {
        Object.keys(this.fields).forEach(fieldName => {
            if (this.fields[fieldName]) {
                if (this.fields[fieldName].type === 'checkbox') {
                    this.fields[fieldName].checked = false;
                } else {
                    this.fields[fieldName].value = '';
                    this.fields[fieldName].classList.remove('success', 'error');
                }
            }
        });

        Object.keys(this.errorElements).forEach(fieldName => {
            if (this.errorElements[fieldName]) {
                this.errorElements[fieldName].textContent = '';
                this.errorElements[fieldName].style.display = 'none';
            }
        });
    }
}

// Initialize the contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Add some additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Sanitize input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactForm, utils };
}