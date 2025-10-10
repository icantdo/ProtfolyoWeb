# Portfolio Website

A modern, responsive portfolio website built with Python Flask. Easy to customize and deploy!

## Features

- Modern, responsive design with smooth animations
- Dark theme with gradient accents
- Sections for: About, Skills, Projects, Experience, Education, and Contact
- Easy to edit through a single configuration file
- Mobile-friendly layout
- Smooth scrolling navigation

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Customize Your Portfolio

Edit the `config.json` file with your personal information:

- **name**: Your full name
- **title**: Your professional title (e.g., "Web Developer")
- **email**: Your email address
- **phone**: Your phone number
- **location**: Your city and country
- **bio**: A short description about yourself
- **social_links**: Your social media profiles (GitHub, LinkedIn, Twitter)
- **skills**: List your skills with proficiency levels (0-100)
- **projects**: Add your projects with descriptions, technologies, and links
- **experience**: Your work experience
- **education**: Your educational background

### 3. Run the Website

```bash
python app.py
```

The website will be available at `http://localhost:5000`

## Customization Guide

### Editing Your Information

All your personal information is stored in `config.json`. Simply edit this file and restart the server to see changes.

### Changing Colors

To customize the color scheme, edit the CSS variables in `static/style.css`:

```css
:root {
    --primary-color: #6366f1;  /* Main accent color */
    --secondary-color: #8b5cf6;  /* Secondary accent color */
    --dark-bg: #0f172a;  /* Dark background */
    --light-bg: #1e293b;  /* Light background */
}
```

### Adding Project Images

To add custom images for your projects:

1. Place your images in the `static` folder
2. Update the `image` field in `config.json` for each project
3. Modify the `project-image` section in `templates/index.html` to use the image

### Structure

```
PortfolioWeb/
├── app.py              # Flask application
├── config.json         # Your personal information (EDIT THIS!)
├── requirements.txt    # Python dependencies
├── static/
│   ├── style.css      # Styles
│   └── script.js      # JavaScript for animations
└── templates/
    └── index.html     # HTML template
```

## Deployment

### Deploy to Heroku

1. Create a `Procfile`:
```
web: python app.py
```

2. Update `app.py` to use environment port:
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
```

3. Deploy:
```bash
heroku create your-portfolio
git push heroku main
```

### Deploy to PythonAnywhere

1. Upload your files to PythonAnywhere
2. Set up a web app with Flask
3. Point it to your `app.py` file

## Tips

- Keep your bio concise and engaging
- Use high-quality project descriptions
- Update your skills and projects regularly
- Test the website on mobile devices
- Add real project links and GitHub repositories

## Troubleshooting

**Website not loading?**
- Make sure Flask is installed: `pip install flask`
- Check that you're running `python app.py` from the correct directory
- Verify the port 5000 is not already in use

**Changes not showing?**
- Restart the Flask server after editing `config.json`
- Clear your browser cache (Ctrl+F5)

## License

Feel free to use this template for your personal portfolio!
