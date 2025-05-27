# 🏭 SMO Interactive Cost Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML](https://img.shields.io/badge/HTML-5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS](https://img.shields.io/badge/CSS-3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.x-FF6384.svg)](https://www.chartjs.org/)

A modern, interactive web application for analyzing spinning mill costs with real-time calculations, beautiful visualizations, and comprehensive reporting.

## 🌟 Features

### 📊 Interactive Cost Analysis

- **Real-time Calculations**: Dynamic cost computations as you input data
- **Comprehensive Breakdown**: Detailed analysis of all operational costs per kilogram of yarn
- **Profit Margin Analysis**: Calculate net profit before tax with visual indicators

### 📈 Data Visualization

- **Interactive Charts**: Beautiful Chart.js powered visualizations
- **Cost Breakdown Pie Chart**: Visual representation of expense distribution
- **Responsive Design**: Charts adapt to all screen sizes

### 💻 Modern UI/UX

- **Glass Morphism Design**: Modern backdrop-blur effects and translucent elements
- **Tailwind CSS Styling**: Clean, responsive, and professional interface
- **Animated Elements**: Smooth transitions and hover effects
- **Mobile-First**: Fully responsive design for all devices

### 🔧 Technical Features

- **No Backend Required**: Pure client-side application
- **Fast Loading**: Optimized assets and efficient code
- **Accessible**: WCAG compliant design patterns
- **Cross-Browser**: Compatible with all modern browsers

## 🚀 Demo

[**Live Demo**](https://ZiadNagar.github.io/smo-interactive-cost-analysis) _(Will be available after GitHub Pages setup)_

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)

## 🛠️ Installation

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/smo-interactive-cost-analysis.git
   cd smo-interactive-cost-analysis
   ```

2. **Open in browser**

   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Using Node.js (if installed)
   npx serve .

   # Or simply open index.html in your browser
   ```

3. **Access the application**
   - If using a local server: `http://localhost:8000`
   - If opening directly: Open `index.html` in your browser

## 📖 Usage Guide

### Getting Started

1. **Input Parameters**: Fill in the mill parameters in the data input table
2. **Generate Analysis**: Click "Generate Analysis Report" to calculate costs
3. **Review Results**: Analyze the cost breakdown and profit margins
4. **Interactive Charts**: Explore the visual representations of your data

### Input Parameters

The application accepts various mill parameters including:

- Raw material costs
- Labor expenses
- Utility costs
- Overhead expenses
- Production capacity
- And more...

### Understanding Results

- **Total Expenses**: Complete cost per kilogram of yarn produced
- **Net Profit Before Tax**: Calculated profit margin percentage
- **Cost Breakdown Chart**: Visual distribution of all expense categories
- **Detailed Components**: Expandable sections for each cost category

## 🏗️ Project Structure

```
smo-interactive-cost-analysis/
├── index.html              # Main application file
├── script.js              # JavaScript functionality
├── style.css              # Custom CSS styles
├── README.md              # Project documentation
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Contribution guidelines
├── .gitignore            # Git ignore rules
├── package.json          # Project metadata
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Actions deployment
```

## 🛠️ Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/smo-interactive-cost-analysis.git
cd smo-interactive-cost-analysis

# Start local development server
npm start
# or
python -m http.server 8000
```

### Building for Production

This is a static web application - no build process required. Simply deploy the files to any web server.

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Charts**: Chart.js (via CDN)
- **Fonts**: Google Fonts (Inter)
- **Icons**: Heroicons (via Tailwind)

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This application is based on course materials prepared by **Dr. Hasan Abdellatif**, who taught the Spinning Mill Organization Course at the Textile Engineering Department - Alexandria University. His lectures and educational content formed the foundation of this interactive tool.

Special thanks to:

- **Dr. Hasan Abdellatif** - Course instructor and content creator
- **Alexandria University** - Textile Engineering Department
- **Chart.js Community** - For the excellent charting library
- **Tailwind CSS Team** - For the utility-first CSS framework

## 👨‍💻 Developer

**Ziad Elnagar**

- Portfolio: [https://ziadelnagar-portfolio.vercel.app/](https://ziadelnagar-portfolio.vercel.app/)
- GitHub: [@your-username](https://github.com/your-username)

## 📊 Screenshots

### Main Dashboard

![Dashboard Screenshot](screenshots/dashboard.png)
_Modern glass morphism design with interactive elements_

### Cost Analysis

![Cost Analysis Screenshot](screenshots/cost-analysis.png)
_Comprehensive cost breakdown with visual charts_

### Data Input

![Data Input Screenshot](screenshots/data-input.png)
_User-friendly parameter input interface_

---

**Made with ❤️ for the Textile Engineering Community**
