# Contact Form

A modern, responsive contact form built with HTML, CSS, and JavaScript. Features include real-time validation, smooth animations, and a beautiful user interface.

## Features

### ✨ User Interface
- **Modern Design**: Clean, professional appearance with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Slide-up animations and hover effects
- **Icon Integration**: Font Awesome icons for better visual appeal
- **Custom Styling**: Beautiful form elements with focus states

### 🔧 Form Functionality
- **Real-time Validation**: Instant feedback as users type
- **Comprehensive Validation**: Email, phone, name, and message validation
- **Phone Number Formatting**: Automatic formatting as user types
- **Loading States**: Visual feedback during form submission
- **Success Messages**: Clear confirmation when form is submitted
- **Error Handling**: User-friendly error messages

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Layout**: Adapts to different screen sizes
- **Touch-Friendly**: Large touch targets for mobile users

## Form Fields

1. **Full Name** (Required)
   - Minimum 2 characters
   - Letters and spaces only
   - Real-time validation

2. **Email Address** (Required)
   - Standard email format validation
   - Real-time validation

3. **Phone Number** (Optional)
   - Automatic formatting: (123) 456-7890
   - International format support
   - Validation for valid phone numbers

4. **Subject** (Required)
   - Dropdown with predefined options:
     - General Inquiry
     - Technical Support
     - Sales Question
     - Feedback
     - Other

5. **Message** (Required)
   - Minimum 10 characters
   - Maximum 1000 characters
   - Multi-line text area

6. **Newsletter Subscription** (Optional)
   - Custom checkbox design
   - Optional subscription

## File Structure

```
contact-form/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Usage

### Basic Setup
1. Download all files to your project directory
2. Open `index.html` in a web browser
3. The form is ready to use!

### Customization

#### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Update the gradient colors in the CSS variables
- Adjust form dimensions and spacing

#### Functionality
- Edit `script.js` to modify validation rules
- Update the `submitForm()` method to connect to your backend
- Add additional form fields as needed

#### Backend Integration
Replace the `submitForm()` method in `script.js`:

```javascript
async submitForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Failed to submit form');
    }
}
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Dependencies

- **Font Awesome**: Icons (loaded via CDN)
- **Google Fonts**: Inter font family (loaded via CDN)

## Features in Detail

### Validation Rules

#### Name Field
- Required field
- Minimum 2 characters
- Only letters and spaces allowed
- Real-time validation on blur

#### Email Field
- Required field
- Standard email format validation
- Real-time validation on blur

#### Phone Field
- Optional field
- Automatic formatting as user types
- Validates international phone numbers
- Removes formatting for validation

#### Subject Field
- Required field
- Must select from dropdown options
- Validation on form submission

#### Message Field
- Required field
- Minimum 10 characters
- Maximum 1000 characters
- Real-time character count feedback

### Animations and Effects

- **Slide-up Animation**: Form appears with smooth animation
- **Hover Effects**: Button and input hover states
- **Focus States**: Clear visual feedback on input focus
- **Loading Animation**: Spinning loader during submission
- **Shake Animation**: Form shakes on validation errors
- **Success States**: Green borders for valid fields

### Accessibility Features

- Proper label associations
- ARIA attributes for screen readers
- Keyboard navigation support
- High contrast color scheme
- Clear error messages
- Focus indicators

## Customization Examples

### Change Color Scheme
```css
/* Update gradient colors */
.form-header {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

.submit-btn {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Add New Form Field
```html
<div class="form-group">
    <label for="company">
        <i class="fas fa-building"></i> Company
    </label>
    <input type="text" id="company" name="company" placeholder="Enter your company name">
    <span class="error-message" id="companyError"></span>
</div>
```

### Modify Validation Rules
```javascript
// In script.js, update the validateField method
case 'company':
    if (value && value.length < 2) {
        errorMessage = 'Company name must be at least 2 characters';
        isValid = false;
    }
    break;
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

## Support

If you have any questions or need help with customization, please open an issue in the repository.