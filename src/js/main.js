import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import LocomotiveScroll from 'locomotive-scroll';
import anime from 'animejs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Initialize Three.js scene
let scene, camera, renderer, product;
const initThreeJS = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('product-canvas').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ffd1, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x00ffd1, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00ffd1, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);
    
    // Position camera
    camera.position.z = 5;
    
    // Create a more complex product placeholder
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ffd1,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    product = new THREE.Mesh(geometry, material);
    scene.add(product);
    
    animate();
};

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    if (product) {
        product.rotation.x += 0.005;
        product.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
};

// Initialize particle system
const initParticles = () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    for(let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
    
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 209, 0.5)';
            ctx.fill();
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if(particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if(particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
};

// Initialize smooth scroll
const initSmoothScroll = () => {
    try {
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (!scrollContainer) {
            console.warn('Scroll container not found, skipping smooth scroll initialization');
            return;
        }

        const scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1,
            lerp: 0.05
        });

        // Update ScrollTrigger when locomotive scroll updates
        scroll.on('scroll', ScrollTrigger.update);

        // Update ScrollTrigger proxy
        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
        });

        // Refresh ScrollTrigger after locomotive scroll is ready
        scroll.on('ready', ScrollTrigger.refresh);

    } catch (error) {
        console.warn('Error initializing smooth scroll:', error);
    }
};

// Create feature items
const createFeatureItems = () => {
    const features = [
        {
            title: "Neural Interface",
            description: "Direct brain-to-device communication for seamless control",
            icon: "🧠",
            stats: "99.9% Accuracy"
        },
        {
            title: "AI-Powered",
            description: "Advanced machine learning adapts to your neural patterns",
            icon: "🤖",
            stats: "10x Faster Learning"
        },
        {
            title: "Real-time Processing",
            description: "Instant response to your thoughts and commands",
            icon: "⚡",
            stats: "0.1ms Latency"
        }
    ];

    const timeline = document.querySelector('.feature-timeline');
    if (timeline) {
        features.forEach((feature, index) => {
            const featureElement = document.createElement('div');
            featureElement.className = `feature-item ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-1/2 mb-12 p-6 bg-cyber-gray rounded-xl transform hover:scale-105 transition-transform`;
            featureElement.innerHTML = `
                <div class="text-4xl mb-4">${feature.icon}</div>
                <h3 class="text-2xl font-display mb-2">${feature.title}</h3>
                <p class="text-gray-400 mb-4">${feature.description}</p>
                <div class="text-cyber-accent font-bold">${feature.stats}</div>
            `;
            timeline.appendChild(featureElement);
        });
    }
};

// Create testimonial cards
const createTestimonialCards = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Neural Engineer",
            text: "The precision and responsiveness of NeuroPulse is unlike anything I've experienced before. It's like having a direct connection to the digital world.",
            image: "👩‍🔬",
            rating: 5
        },
        {
            name: "Marcus Johnson",
            role: "Tech Innovator",
            text: "This technology has completely transformed how I interact with my digital environment. The learning curve was minimal, and the results were immediate.",
            image: "👨‍💻",
            rating: 5
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Research Scientist",
            text: "The potential applications in medical research are groundbreaking. We're seeing unprecedented levels of precision in neural mapping.",
            image: "👩‍⚕️",
            rating: 5
        }
    ];

    const grid = document.querySelector('.testimonial-grid');
    if (grid) {
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="text-4xl mb-4">${testimonial.image}</div>
                <div class="flex mb-4">
                    ${Array(testimonial.rating).fill('★').join('')}
                </div>
                <p class="text-lg mb-4">"${testimonial.text}"</p>
                <div class="font-semibold">${testimonial.name}</div>
                <div class="text-cyber-accent">${testimonial.role}</div>
            `;
            grid.appendChild(card);
        });
    }
};

// Create pricing cards
const createPricingCards = () => {
    const plans = [
        {
            name: "Starter",
            price: "$299",
            features: ["Basic Neural Interface", "Standard Support", "Monthly Updates"],
            highlighted: false
        },
        {
            name: "Professional",
            price: "$599",
            features: ["Advanced Neural Interface", "Priority Support", "Weekly Updates", "Custom Training"],
            highlighted: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["Full Neural Suite", "24/7 Support", "Custom Development", "Dedicated Team"],
            highlighted: false
        }
    ];

    const grid = document.querySelector('.pricing-grid');
    if (grid) {
        plans.forEach(plan => {
            const card = document.createElement('div');
            card.className = `pricing-card ${plan.highlighted ? 'border-2 border-cyber-accent' : ''}`;
            card.innerHTML = `
                <h3 class="text-2xl font-display mb-4">${plan.name}</h3>
                <div class="text-4xl font-bold mb-6">${plan.price}</div>
                <ul class="space-y-4 mb-8">
                    ${plan.features.map(feature => `<li class="flex items-center">
                        <span class="text-cyber-accent mr-2">✓</span>
                        ${feature}
                    </li>`).join('')}
                </ul>
                <button class="w-full bg-cyber-accent text-cyber-black py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                    Get Started
                </button>
            `;
            grid.appendChild(card);
        });
    }
};

// Initialize GSAP animations
const initGSAPAnimations = () => {
    // Loading screen animation
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            delay: 1,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                initHeroAnimations();
            }
        });
    }

    // Hero section animations
    gsap.from('.glitch-text', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    });

    gsap.from('.typewriter-text', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Scroll-based animations
    initScrollAnimations();
};

const initScrollAnimations = () => {
    // Hero section parallax
    gsap.to('#particles-canvas', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        ease: 'none'
    });

    // Feature section animations
    gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top center+=100',
                end: 'bottom center',
                scrub: 1
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1
        });
    });

    // Product showcase section
    const productSection = document.querySelector('#product-showcase');
    if (productSection) {
        // Animate product info
        gsap.from('.product-info', {
            scrollTrigger: {
                trigger: productSection,
                start: 'top center',
                end: 'center center',
                scrub: 1
            },
            x: -100,
            opacity: 0
        });

        // Animate feature list items
        gsap.utils.toArray('.feature-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top center+=100',
                    scrub: 1
                },
                x: -50,
                opacity: 0,
                delay: i * 0.2
            });
        });

        // Animate product visual
        gsap.from('.product-visual', {
            scrollTrigger: {
                trigger: productSection,
                start: 'top center',
                end: 'center center',
                scrub: 1
            },
            x: 100,
            opacity: 0
        });
    }

    // Neural network section
    gsap.from('#neural-testimonials .section-title', {
        scrollTrigger: {
            trigger: '#neural-testimonials',
            start: 'top center+=100',
            scrub: 1
        },
        y: 50,
        opacity: 0
    });

    // Pricing section
    gsap.utils.toArray('.pricing-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center+=100',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            delay: i * 0.2
        });
    });

    // CTA section
    gsap.from('#cta', {
        scrollTrigger: {
            trigger: '#cta',
            start: 'top center+=100',
            scrub: 1
        },
        y: 50,
        opacity: 0
    });

    // Footer animations
    gsap.from('.footer-brand', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom',
            scrub: 1
        },
        y: 30,
        opacity: 0
    });

    gsap.from('.footer-links', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom',
            scrub: 1
        },
        y: 30,
        opacity: 0,
        delay: 0.2
    });

    gsap.from('.footer-newsletter', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom',
            scrub: 1
        },
        y: 30,
        opacity: 0,
        delay: 0.4
    });
};

// Neural Network Visualization
let neuralScene, neuralCamera, neuralRenderer, neuralNodes = [], neuralLines = [];
let raycaster, mouse, currentIntersected = null;

const initNeuralNetwork = () => {
    // Scene setup
    neuralScene = new THREE.Scene();
    neuralCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    neuralRenderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('neural-canvas'),
        antialias: true,
        alpha: true 
    });
    neuralRenderer.setSize(window.innerWidth, window.innerHeight);
    
    // Camera position
    neuralCamera.position.z = 15;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    neuralScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffd1, 1, 100);
    pointLight.position.set(10, 10, 10);
    neuralScene.add(pointLight);
    
    // Raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Create neural network
    createNeuralNetwork();
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onNeuralResize);
    
    // Start animation
    animateNeuralNetwork();
};

const createNeuralNetwork = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Neural Engineer",
            text: "The precision and responsiveness of NeuroPulse is unlike anything I've experienced before. It's like having a direct connection to the digital world.",
            position: new THREE.Vector3(-10, 6, 0)
        },
        {
            name: "Marcus Johnson",
            role: "Tech Innovator",
            text: "This technology has completely transformed how I interact with my digital environment. The learning curve was minimal, and the results were immediate.",
            position: new THREE.Vector3(-6, -4, 2)
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Research Scientist",
            text: "The potential applications in medical research are groundbreaking. We're seeing unprecedented levels of precision in neural mapping.",
            position: new THREE.Vector3(0, 8, -2)
        },
        {
            name: "Alex Kim",
            role: "AI Researcher",
            text: "The neural interface's ability to adapt to individual brain patterns is revolutionary. It's like the device becomes an extension of your mind.",
            position: new THREE.Vector3(6, -6, 1)
        },
        {
            name: "Dr. Maya Patel",
            role: "Cognitive Scientist",
            text: "The data we're gathering about neural pathways is invaluable. This technology is advancing our understanding of human cognition.",
            position: new THREE.Vector3(10, 4, -1)
        },
        {
            name: "James Wilson",
            role: "Tech Entrepreneur",
            text: "The business applications are endless. We've seen a 300% increase in productivity since implementing NeuroPulse in our workflow.",
            position: new THREE.Vector3(-8, -8, -2)
        },
        {
            name: "Dr. Lisa Zhang",
            role: "Neuroscience Professor",
            text: "The educational potential is immense. Students are learning at unprecedented rates with this technology.",
            position: new THREE.Vector3(8, -2, 3)
        },
        {
            name: "Rachel Torres",
            role: "Creative Director",
            text: "It's like having a direct line to your creativity. The way it enhances creative thinking is beyond anything I've experienced.",
            position: new THREE.Vector3(0, -10, -3)
        }
    ];
    
    // Create nodes
    testimonials.forEach((testimonial, index) => {
        // Create node geometry
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ffd1,
            transparent: true,
            opacity: 0.8,
            emissive: 0x00ffd1,
            emissiveIntensity: 0.2
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.copy(testimonial.position);
        node.userData = testimonial;
        node.userData.originalScale = 1;
        
        neuralScene.add(node);
        neuralNodes.push(node);
    });
    
    // Create connections to nearby nodes
    testimonials.forEach((testimonial, index) => {
        testimonials.forEach((otherTestimonial, otherIndex) => {
            if (index !== otherIndex) {
                const distance = testimonial.position.distanceTo(otherTestimonial.position);
                if (distance < 12) { // Increased connection distance for better visual
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        testimonial.position,
                        otherTestimonial.position
                    ]);
                    
                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: 0x00ffd1,
                        transparent: true,
                        opacity: 0.2
                    });
                    
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    neuralScene.add(line);
                    neuralLines.push(line);
                }
            }
        });
    });
    
    // Create floating particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 40; // Increased spread
        particlePositions[i + 1] = (Math.random() - 0.5) * 40;
        particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffd1,
        size: 0.05,
        transparent: true,
        opacity: 0.3
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    neuralScene.add(particles);
};

const onMouseMove = (event) => {
    const rect = neuralRenderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
};

const onNeuralResize = () => {
    neuralCamera.aspect = window.innerWidth / window.innerHeight;
    neuralCamera.updateProjectionMatrix();
    neuralRenderer.setSize(window.innerWidth, window.innerHeight);
};

const animateNeuralNetwork = () => {
    requestAnimationFrame(animateNeuralNetwork);
    
    // Check for intersections
    raycaster.setFromCamera(mouse, neuralCamera);
    const intersects = raycaster.intersectObjects(neuralNodes);
    
    if (intersects.length > 0) {
        const intersectedNode = intersects[0].object;
        if (currentIntersected !== intersectedNode) {
            if (currentIntersected) {
                // Reset previous node
                gsap.to(currentIntersected.scale, {
                    x: currentIntersected.userData.originalScale,
                    y: currentIntersected.userData.originalScale,
                    z: currentIntersected.userData.originalScale,
                    duration: 0.3
                });
            }
            currentIntersected = intersectedNode;
            // Scale up current node
            gsap.to(currentIntersected.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 0.3
            });
            
            // Show testimonial
            showTestimonial(currentIntersected.userData);
        }
    } else {
        if (currentIntersected) {
            // Reset node scale
            gsap.to(currentIntersected.scale, {
                x: currentIntersected.userData.originalScale,
                y: currentIntersected.userData.originalScale,
                z: currentIntersected.userData.originalScale,
                duration: 0.3
            });
            currentIntersected = null;
            hideTestimonial();
        }
    }
    
    neuralRenderer.render(neuralScene, neuralCamera);
};

const showTestimonial = (testimonial) => {
    const container = document.getElementById('neural-container');
    if (!container.querySelector('.testimonial-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'testimonial-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyber-black bg-opacity-90 p-8 rounded-xl max-w-md z-50';
        overlay.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="text-4xl mr-4">${getEmojiForRole(testimonial.role)}</div>
                <div>
                    <h3 class="text-2xl font-display">${testimonial.name}</h3>
                    <p class="text-cyber-accent">${testimonial.role}</p>
                </div>
            </div>
            <p class="text-lg leading-relaxed">"${testimonial.text}"</p>
        `;
        document.body.appendChild(overlay); // Changed to append to body instead of container
        
        // Scale up from small size
        gsap.from(overlay, {
            scale: 0.5,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }
};

const hideTestimonial = () => {
    const overlay = document.querySelector('.testimonial-overlay');
    if (overlay) {
        gsap.to(overlay, {
            scale: 0.5,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => overlay.remove()
        });
    }
};

const getEmojiForRole = (role) => {
    const emojiMap = {
        'Neural Engineer': '🧠',
        'Tech Innovator': '💡',
        'Research Scientist': '🔬',
        'AI Researcher': '🤖',
        'Cognitive Scientist': '🧪',
        'Tech Entrepreneur': '🚀',
        'Neuroscience Professor': '📚',
        'Creative Director': '🎨'
    };
    return emojiMap[role] || '👤';
};

// Create product showcase content
const createProductShowcase = () => {
    const productInfo = document.querySelector('.product-info');
    if (productInfo) {
        productInfo.innerHTML = `
            <h2 class="text-4xl font-display mb-6">Experience the Future</h2>
            <p class="text-xl mb-8 text-gray-300">Our neural interface technology brings your thoughts to life with unprecedented precision and speed.</p>
            <div class="feature-list space-y-6">
                <div class="feature-item flex items-center p-4 bg-cyber-gray bg-opacity-50 rounded-lg transform hover:scale-105 transition-all">
                    <span class="text-4xl text-cyber-accent mr-4">⚡</span>
                    <div>
                        <h4 class="text-xl font-display mb-1">Instant Neural Response</h4>
                        <p class="text-gray-400">Experience zero-latency control with our advanced neural processing</p>
                    </div>
                </div>
                <div class="feature-item flex items-center p-4 bg-cyber-gray bg-opacity-50 rounded-lg transform hover:scale-105 transition-all">
                    <span class="text-4xl text-cyber-accent mr-4">🔒</span>
                    <div>
                        <h4 class="text-xl font-display mb-1">Advanced Security Protocol</h4>
                        <p class="text-gray-400">Your neural data is protected with military-grade encryption</p>
                    </div>
                </div>
                <div class="feature-item flex items-center p-4 bg-cyber-gray bg-opacity-50 rounded-lg transform hover:scale-105 transition-all">
                    <span class="text-4xl text-cyber-accent mr-4">🎯</span>
                    <div>
                        <h4 class="text-xl font-display mb-1">Precision Control</h4>
                        <p class="text-gray-400">Unmatched accuracy in neural signal interpretation</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 flex gap-4">
                <button class="cta-button bg-cyber-accent text-cyber-black px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                    Get Started
                </button>
                <button class="secondary-button border-2 border-cyber-accent text-cyber-accent px-8 py-4 rounded-full text-xl font-bold hover:bg-cyber-accent hover:text-cyber-black transition-all">
                    Learn More
                </button>
            </div>
        `;
    }
};

// Handle window resize
const handleResize = () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};

// Initialize everything
const init = () => {
    try {
        // Initialize Three.js first
        initThreeJS();
        
        // Initialize particle system
        initParticles();
        
        // Initialize neural network
        initNeuralNetwork();
        
        // Initialize smooth scroll
        initSmoothScroll();
        
        // Create dynamic content
        createFeatureItems();
        createProductShowcase();
        createTestimonialCards();
        createPricingCards();
        
        // Initialize animations
        initGSAPAnimations();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', init); 