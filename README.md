# NeuroPulse Landing Page

A futuristic, animated landing page for the NeuroPulse smart gadget brand. This landing page features immersive 3D animations, smooth scrolling effects, and interactive elements to showcase the product's innovative features.

## Features

- 🎨 Modern, futuristic design with cyberpunk aesthetics
- 🎭 Smooth scroll-driven animations using GSAP and ScrollTrigger
- 🎮 Interactive 3D product showcase using Three.js
- 📱 Responsive design for all devices
- ⚡ Optimized performance with Vite
- 🎯 Engaging user experience with micro-interactions

## Tech Stack

- HTML5
- TailwindCSS
- JavaScript (ES6+)
- GSAP + ScrollTrigger
- Three.js
- Locomotive Scroll
- Anime.js
- Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/neuropulse-landing.git
cd neuropulse-landing
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
neuropulse-landing/
├── src/
│   ├── js/
│   │   └── main.js
│   └── styles/
│       └── main.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

- Colors and theme: Edit the `tailwind.config.js` file
- Animations: Modify the animation parameters in `src/js/main.js`
- 3D Model: Replace the placeholder geometry in `initThreeJS()` with your actual product model

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for 3D rendering
- GSAP for smooth animations
- Locomotive Scroll for smooth scrolling
- Anime.js for micro-animations 