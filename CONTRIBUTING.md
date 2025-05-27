# Contributing to SMO Interactive Cost Analysis

Thank you for your interest in contributing to the SMO Interactive Cost Analysis project! This document provides guidelines for contributing to this open-source medical cost analysis tool.

## Table of Contents

- [Contributing to SMO Interactive Cost Analysis](#contributing-to-smo-interactive-cost-analysis)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
  - [How to Contribute](#how-to-contribute)
    - [Types of Contributions](#types-of-contributions)
    - [Medical Data Contributions](#medical-data-contributions)
  - [Development Setup](#development-setup)
  - [Submitting Changes](#submitting-changes)
    - [Pull Request Process](#pull-request-process)
    - [Commit Message Guidelines](#commit-message-guidelines)
  - [Reporting Issues](#reporting-issues)
    - [Bug Reports](#bug-reports)
    - [Feature Requests](#feature-requests)
  - [Style Guidelines](#style-guidelines)
    - [HTML](#html)
    - [CSS](#css)
    - [JavaScript](#javascript)
    - [Medical Data](#medical-data)
  - [Testing](#testing)
  - [Questions?](#questions)
  - [Acknowledgments](#acknowledgments)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a topic branch for your changes
5. Make your changes and test them
6. Submit a pull request

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **Bug fixes**: Fix issues with calculations, UI bugs, or functionality problems
- **Feature enhancements**: Add new features that improve the cost analysis capabilities
- **Documentation**: Improve README, add code comments, or create user guides
- **UI/UX improvements**: Enhance the visual design and user experience
- **Performance optimizations**: Improve loading times and calculation efficiency
- **Testing**: Add unit tests or integration tests
- **Accessibility improvements**: Make the application more accessible to all users

### Medical Data Contributions

**Important**: Any changes to cost calculation methodologies, medical data, or research-based formulas must be:

- Based on peer-reviewed research or established medical guidelines
- Properly documented with academic sources
- Reviewed by qualified medical professionals
- Attributed to the appropriate researchers (like Dr. Hasan Abdellatif's original contributions)

## Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ziadelnagar/smo-interactive-cost-analysis.git
   cd smo-interactive-cost-analysis
   ```

2. **Install dependencies** (optional, for development servers):

   ```bash
   npm install
   ```

3. **Start a local server**:

   ```bash
   # Option 1: Using npm
   npm start

   # Option 2: Using Python
   python -m http.server 8000

   # Option 3: Using npm dev server with live reload
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:8000`

## Submitting Changes

### Pull Request Process

1. **Create a descriptive branch name**:

   ```bash
   git checkout -b feature/add-new-cost-category
   # or
   git checkout -b fix/calculation-error
   # or
   git checkout -b docs/update-readme
   ```

2. **Make your changes**:

   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add new cost category for equipment maintenance"
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/add-new-cost-category
   ```

5. **Create a Pull Request**:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Describe how to test your changes

### Commit Message Guidelines

Use conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Browser/Environment**: Browser version, OS, device type
- **Screenshots**: If applicable
- **Input data**: Sample data that causes the issue (if applicable)

### Feature Requests

For feature requests, please provide:

- **Use case**: Why this feature would be valuable
- **Description**: Detailed description of the proposed feature
- **Examples**: Mockups or examples if applicable
- **Medical justification**: For medical-related features, provide research backing

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include appropriate ARIA labels for accessibility
- Use descriptive class names

### CSS

- Follow BEM methodology for class naming
- Use CSS custom properties for theme colors
- Maintain mobile-first responsive design
- Comment complex styling decisions

### JavaScript

- Use modern ES6+ features
- Write descriptive function and variable names
- Add JSDoc comments for functions
- Handle errors gracefully
- Validate user inputs

### Medical Data

- Always cite sources for medical formulas or costs
- Use clear variable names that reflect medical terminology
- Document units of measurement
- Include validation for medical input ranges

## Testing

Before submitting changes:

1. Test with various input combinations
2. Verify calculations with known examples
3. Test on different browsers and devices
4. Check accessibility with screen readers
5. Validate with medical professionals if applicable

## Questions?

If you have questions about contributing, please:

- Open an issue with the "question" label
- Contact the maintainer: Ziad Elnagar (https://ziadelnagar-portfolio.vercel.app/)
- Check existing issues and discussions

## Acknowledgments

We appreciate all contributions to improving medical cost analysis tools. Special thanks to:

- Dr. Hasan Abdellatif for the foundational research and data
- All contributors who help improve this tool
- The medical community for providing feedback and validation

Thank you for contributing to making medical cost analysis more accessible and accurate!
