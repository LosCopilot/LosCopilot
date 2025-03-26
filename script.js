import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const initHeroParticles = () => {
        const container = document.getElementById('particles-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        container.appendChild(renderer.domElement);

        // Particle Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 500;

        const posArray = new Float32Array(particlesCnt * 3);

        for (let i = 0; i < particlesCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10; // Random positions between -5 and 5
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Particle Material
        let particleColor = new THREE.Color(config.particleColor);
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: particleColor
        });

        // Particles
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);


        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.005;
            particles.rotation.y += 0.005;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        };

        window.addEventListener('resize', handleResize);
    };

    initHeroParticles();
});