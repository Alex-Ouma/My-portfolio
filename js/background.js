class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'matrix-bg';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = 'ABCDEF0123456789'.split('');
        this.drops = [];
        this.init();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.init();
    }

    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    draw() {
        // Semi-transparent black background for fade effect
        this.ctx.fillStyle = 'rgba(15, 23, 36, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0f8';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Draw the character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset position if drop reaches bottom or randomly
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            // Move drop
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Create floating icons background
class CyberIcons {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'cyber-icons';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.icons = [];
        this.resizeCanvas();
        this.createIcons();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createIcons() {
        const iconTypes = ['🔒', '🔑', '🌐', '💻', '🛡️', '⚡', '📡'];
        const numIcons = 20;

        for (let i = 0; i < numIcons; i++) {
            this.icons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
                speed: 0.2 + Math.random() * 0.5,
                size: 20 + Math.random() * 20,
                opacity: 0.1 + Math.random() * 0.2
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.icons.forEach(icon => {
            this.ctx.font = `${icon.size}px Arial`;
            this.ctx.fillStyle = `rgba(6, 182, 212, ${icon.opacity})`;
            this.ctx.fillText(icon.icon, icon.x, icon.y);

            // Move icon
            icon.y += icon.speed;

            // Reset position if icon goes off screen
            if (icon.y > this.canvas.height) {
                icon.y = -50;
                icon.x = Math.random() * this.canvas.width;
            }
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize both backgrounds when the page loads
window.addEventListener('load', () => {
    const matrix = new MatrixBackground();
    const icons = new CyberIcons();
    matrix.animate();
    icons.animate();
});