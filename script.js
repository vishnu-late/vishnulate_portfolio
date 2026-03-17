// --- Preloader / Boot Sequence ---
function removePreloader() {
    const preloader = document.getElementById('preloader');
    const diagText = document.getElementById('diagnostic-text');
    
    if (preloader) {
        // Dynamic Diagnostic messages
        const messages = [
            "DECRYPTING_BIO_DATA...",
            "ESTABLISHING_NEURAL_LINK...",
            "SYNCHRONIZING_CORES...",
            "LOAD_MODULE: SMART_INVENTORY_AI",
            "LOAD_MODULE: ROBOTIC_CONTROL",
            "UPLINK_STABLE. ACCESS_GRANTED."
        ];
        
        let msgIndex = 0;
        const interval = setInterval(() => {
            if (diagText) {
                diagText.textContent = messages[msgIndex];
                msgIndex++;
                if (msgIndex >= messages.length) clearInterval(interval);
            }
        }, 400);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }, 2800); 
    }
}

if (document.readyState === 'complete') {
    removePreloader();
} else {
    window.addEventListener('load', removePreloader);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if(hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if(cursor && cursorDot) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-container, .stat-box');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorDot.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorDot.classList.remove('active');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar Logic
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const scrollBar = document.getElementById("scroll-bar");
        if (scrollBar) {
            scrollBar.style.width = scrolled + "%";
        }

        // Highlight active nav link on scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- Reveal Elements on Scroll ---
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 

    // --- Stats Counter Animation ---
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-grid');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const text = stat.innerText;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            if (isNaN(target)) return;
            
            let current = 0;
            const duration = 2000; 
            const stepTime = 20;
            const increment = target / (duration / stepTime);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    };

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter-js');
    if (typewriterElement) {
        const words = ['AIML Student', 'AI / Machine Learning Engineer', 'Data Scientist', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 100;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; 
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // --- Glitch & Decryption Text Effect ---
    const glitchTitle = document.querySelector('.glitch-text');
    if (glitchTitle) {
        const originalText = glitchTitle.innerText;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let iterations = 0;

        const decryptInterval = setInterval(() => {
            glitchTitle.innerText = glitchTitle.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 36)];
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(decryptInterval);
            }
            iterations += 1 / 3;
        }, 30);

        setInterval(() => {
            glitchTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0,255,255,0.8),
                ${Math.random() * -10 + 5}px ${Math.random() * 10 - 5}px 0 rgba(255,0,255,0.8)
            `;
            setTimeout(() => {
                glitchTitle.style.textShadow = '0 0 10px rgba(255,255,255,0.3)';
            }, 50);
        }, 3000);
    }

    // --- Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            const formData = new FormData(contactForm);

            btn.innerHTML = '<span class="btn-text">Transmitting...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.style.pointerEvents = 'none';
            btn.classList.remove('glow-btn');

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = '<span class="btn-text">Payload Delivered</span> <i class="fas fa-check"></i>';
                    btn.style.borderColor = '#00ff00';
                    btn.style.color = '#00ff00';
                    contactForm.reset();
                } else {
                    throw new Error('Transmission Failed');
                }
            })
            .catch(error => {
                btn.innerHTML = '<span class="btn-text">Transmission Error</span> <i class="fas fa-exclamation-triangle"></i>';
                btn.style.borderColor = '#ff0000';
                btn.style.color = '#ff0000';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.style.pointerEvents = 'auto';
                    btn.classList.add('glow-btn');
                }, 4000);
            });
        });
    }

    // --- Form Label Animation Handling ---
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        if (control.value) {
            control.classList.add('has-value');
        }

        control.addEventListener('input', () => {
            if (control.value) {
                control.classList.add('has-value');
            } else {
                control.classList.remove('has-value');
            }
            if (control.checkValidity()) {
                control.style.borderColor = 'var(--color-primary)';
            } else {
                control.style.borderColor = 'var(--glass-border)';
            }
        });
    });

    // --- Particle Canvas Anti-Gravity Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); 
        });

        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 80) * (canvas.width / 80)
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
                    if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
                    if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 2) - 1;
                let directionY = (Math.random() * 2) - 1;
                let color = 'rgba(0, 245, 255, 0.3)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }
        init();
        animate();
    }

    // --- Digital Data Stream ---
    const createDataStream = () => {
        const hero = document.querySelector('.hero');
        if(!hero) return;
        const streamContainer = document.createElement('div');
        streamContainer.className = 'data-stream';
        hero.appendChild(streamContainer);

        const spawnBit = () => {
            const bit = document.createElement('div');
            bit.className = 'bit';
            bit.textContent = Math.random() > 0.5 ? '1' : '0';
            bit.style.left = Math.random() * 100 + '%';
            bit.style.fontSize = (Math.random() * 10 + 10) + 'px';
            bit.style.animationDuration = (Math.random() * 3 + 2) + 's';
            bit.style.opacity = Math.random() * 0.4;
            bit.style.color = 'var(--color-primary)';
            bit.style.fontFamily = 'monospace';
            
            streamContainer.appendChild(bit);
            setTimeout(() => bit.remove(), 5000);
        };
        setInterval(spawnBit, 150);
    };
    createDataStream();

    // --- Matrix Rain Effect ---
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        const mctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%&_#@";
        const fontSize = 16;
        const columns = matrixCanvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) drops[x] = 1;

        function drawMatrix() {
            mctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            mctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            mctx.fillStyle = "rgba(0, 245, 255, 0.35)";
            mctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                mctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);
        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        });
    }

    // --- 3D Tilt Effect ---
    const cards = document.querySelectorAll('.glass-panel');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 25;
            const rotateY = (x - centerX) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 245, 255, 0.2)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            card.style.boxShadow = '';
        });
    });

    // --- Certificate Modal Logic ---
    const certModal = document.getElementById('certModal');
    const modalImg = certModal ? certModal.querySelector('#modalImg') : null;
    const closeBtn = certModal ? certModal.querySelector('.modal-close') : null;
    const verifyLinks = document.querySelectorAll('.verify-link');

    verifyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = link.getAttribute('href');
            if(modalImg) modalImg.src = imgSrc;
            if(certModal) certModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeModal = () => {
        if(certModal) certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeModal();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });



    // --- Vishnu AI Chatbot Logic ---
    const chatLauncher = document.getElementById('chat-launcher');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendMsg = document.getElementById('send-msg');
    const voiceBtn = document.getElementById('voice-btn');
    const globalStopBtn = document.getElementById('stop-voice');
    const stopGenBtn = document.getElementById('stop-generation');

    let currentSpeakerBtn = null;
    let typeInterval = null;
    let currentFullText = "";
    let currentMsgElement = null;

    const GEMINI_API_KEY = "AIzaSyDurBDcQ-wiKujlpUP-Ks7fEDHC8tmvs9s";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const toggleChat = () => {
        if(!chatWindow) return;
        const isVisible = getComputedStyle(chatWindow).display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
        // Stop audio when closing chat
        if (isVisible) window.speechSynthesis.cancel();
        if (!isVisible && userInput) userInput.focus();
    };

    if(chatLauncher) chatLauncher.addEventListener('click', toggleChat);
    if(closeChat) closeChat.addEventListener('click', toggleChat);

    if (globalStopBtn) {
        globalStopBtn.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            if (currentSpeakerBtn) {
                currentSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                currentSpeakerBtn.classList.remove('playing');
                currentSpeakerBtn = null;
            }
        });
    }

    if (stopGenBtn) {
        stopGenBtn.addEventListener('click', () => {
            if (typeInterval) {
                clearInterval(typeInterval);
                typeInterval = null;
                if (currentMsgElement && currentFullText) {
                    currentMsgElement.innerHTML = currentFullText;
                }
                stopGenBtn.classList.remove('active');
            }
        });
    }

    const getFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        // Priority: Microsoft Zira (Natural) -> Google Female -> Samantha -> Any Female
        return voices.find(v => v.name.includes('Zira') || v.name.includes('Female') || v.name.includes('Google US English') || v.name.includes('Samantha')) || 
               voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Zira')));
    };

    const speakText = (text, btn) => {
        if (window.speechSynthesis.speaking && currentSpeakerBtn === btn) {
            window.speechSynthesis.cancel();
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            btn.classList.remove('playing');
            return;
        }

        window.speechSynthesis.cancel();
        if (currentSpeakerBtn) {
            currentSpeakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            currentSpeakerBtn.classList.remove('playing');
        }

        const utterance = new (window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance)(text);
        
        const femaleVoice = getFemaleVoice();
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        utterance.rate = 1.0; 
        utterance.pitch = 1.2; // Optimized for female tone
        
        utterance.onstart = () => {
            btn.innerHTML = '<i class="fas fa-stop"></i>';
            btn.classList.add('playing');
            currentSpeakerBtn = btn;
        };

        utterance.onend = () => {
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            btn.classList.remove('playing');
            currentSpeakerBtn = null;
        };

        utterance.onerror = () => {
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            btn.classList.remove('playing');
            currentSpeakerBtn = null;
        };

        window.speechSynthesis.speak(utterance);
    };

    // Ensure voices are loaded (Chrome/Safari requirement)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = getFemaleVoice;
    }

    const typeMessage = (text, element) => {
        let i = 0;
        const speed = 20; 
        currentFullText = text;
        currentMsgElement = element;
        if (stopGenBtn) stopGenBtn.classList.add('active');

        typeInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                if(chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                clearInterval(typeInterval);
                typeInterval = null;
                if (stopGenBtn) stopGenBtn.classList.remove('active');
            }
        }, speed);
    };

    const addMessage = (text, type) => {
        if(!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        msgDiv.appendChild(contentDiv);

        if (type === 'system') {
            const speakerBtn = document.createElement('button');
            speakerBtn.className = 'tts-btn';
            speakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            speakerBtn.title = "Translate to Audio";
            speakerBtn.onclick = () => speakText(text, speakerBtn);
            msgDiv.appendChild(speakerBtn);
            
            typeMessage(text, contentDiv);
        } else {
            contentDiv.textContent = text;
        }

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const fetchAIResponse = async (prompt) => {
        const models = ["gemini-1.5-flash", "gemini-flash-latest", "gemini-2.0-flash", "gemini-pro"];
        let lastError = "";

        for (const model of models) {
            try {
                const api_url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
                const response = await fetch(api_url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });
                
                const data = await response.json();
                
                if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
                    return data.candidates[0].content.parts[0].text;
                } else if (data.error) {
                    lastError = `${data.error.message} (${data.error.status})`;
                    if (data.error.status === "RESOURCE_EXHAUSTED") {
                        return `QUOTA_EXCEEDED: Neural pathways busy. Please wait 60s.`;
                    }
                    console.warn(`[DIAGNOSTIC] ${model} failed:`, lastError);
                    continue; 
                }
            } catch (error) {
                lastError = "CORE_UPLINK_OFFLINE";
                continue;
            }
        }
        return `UPLINK_FAILURE: No response from [${models.join("/")}]. Error: ${lastError}`;
    };

    const handleSend = async () => {
        if(!userInput) return;
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'message system loading';
        loadingMsg.innerHTML = '<div class="msg-content"><span class="neon-text">PROCESSING</span><span class="dot-flow">...</span></div>';
        if(chatMessages) {
            chatMessages.appendChild(loadingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        const aiResponse = await fetchAIResponse(text);
        loadingMsg.remove();
        addMessage(aiResponse, 'system');
    };

    if(sendMsg) sendMsg.addEventListener('click', handleSend);
    if(userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // --- Voice-to-Text Logic ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && voiceBtn) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            voiceBtn.classList.add('listening');
            if(userInput) userInput.placeholder = "Listening...";
        };

        recognition.onspeechend = () => {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            if(userInput) userInput.placeholder = "Enter query...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if(userInput) {
                userInput.value = transcript;
                handleSend();
            }
        };

        recognition.onerror = () => {
            voiceBtn.classList.remove('listening');
            if(userInput) userInput.placeholder = "Voice Error. Try typing...";
        };

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('listening')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else if(voiceBtn) {
        voiceBtn.style.display = 'none';
    }
});
