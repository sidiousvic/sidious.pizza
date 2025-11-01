import { logger } from './logger.js';

// Time update functionality
function updateTime() {
    const now = new Date();
    const tokyo = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    const timeString = tokyo.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

// Fetch last commit info
async function fetchLastCommit() {
    try {
        const response = await fetch('https://api.github.com/repos/sidiousvic/sidious.pizza/commits?per_page=1');
        const commits = await response.json();
        if (commits && commits.length > 0) {
            const lastCommit = commits[0];
            const commitDate = new Date(lastCommit.commit.author.date);
            const jstDate = new Date(commitDate.getTime() + (9 * 60 * 60 * 1000)); // Convert to JST
            const month = String(jstDate.getMonth() + 1).padStart(2, '0');
            const day = String(jstDate.getDate()).padStart(2, '0');
            const hours = String(jstDate.getHours()).padStart(2, '0');
            const minutes = String(jstDate.getMinutes()).padStart(2, '0');
            const formattedDate = `${month}月${day}日 ${hours}:${minutes} JST`;
            
            // Update status bar
            const statusElement = document.getElementById('last-commit');
            if (statusElement) {
                statusElement.textContent = `UPDATED ${formattedDate}`;
            }
            
            // Update meta page uptime if it exists
            const metaElement = document.getElementById('meta-uptime');
            if (metaElement) {
                metaElement.textContent = `Site last updated: ${formattedDate}`;
            }
        }
    } catch (error) {
        logger.error('Failed to fetch last commit:', error);
        const statusElement = document.getElementById('last-commit');
        if (statusElement) {
            statusElement.textContent = 'UPDATED N/A';
        }
        const metaElement = document.getElementById('meta-uptime');
        if (metaElement) {
            metaElement.textContent = 'Site last updated: N/A';
        }
    }
}

let HHH = 0;

// Shared command handling
const commandHandler = {
    commands: {
        'home': '/',
        'about': '/about/',
        'writes': '/writes/',
        'write': '/writes/',
        'graphics': '/graphics/',
        'graphic': '/graphics/',
        'art': '/graphics/',
        'meta': '/meta/',
        'help': '/help/',
        'back': () => {
            window.history.back();
            return '';
        },
        'forward': () => {
            window.history.forward();
            return '';
        },
        'refresh': () => {
            window.location.reload();
            return '';
        },
        'reload': () => {
            window.location.reload();
            return '';
        },
        'clear': () => {
            return 'clear';
        }
    },
    
    // Process command and return result object
    processCommand(command) {
        if (!command) return { type: 'none' };

        // Handle tulips
        if (command.includes("hana")) {
            return { 
                type: 'error', 
                message: "Did you ever love me?",
                timeout: 3000
            };
        }

        // Handle hello
        if (command.includes('hello')) {
            return { 
                type: 'error', 
                message: 'Hola :) how you doin',
                timeout: 3000
            };
        }
        
        // Handle profanity
        if (command.includes('fuck you')) {
            return { 
                type: 'error', 
                message: 'Fuck YOU, actually.',
                timeout: 3000
            };
        }
        
        const cmd = this.commands[command];
        
        if (typeof cmd === 'string') {
            // Navigation command
            return { type: 'navigation', url: cmd };
        } else if (typeof cmd === 'function') {
            // Function command
            const result = cmd();
            if (result === 'clear') {
                return { type: 'clear' };
            } else if (result) {
                return { type: 'success', message: result };
            } else {
                return { type: 'none' };
            }
        } else {
            // Unknown command
            return { 
                type: 'error', 
                message: `Unknown command: ${command}. Type 'help' for available commands.`,
                timeout: 3000
            };
        }
    }
};

// Global Command Modal functionality
const globalCommandModal = {
    modal: null,
    input: null,
    output: null,
    
    init() {
        this.modal = document.getElementById('command-modal');
        this.input = document.getElementById('modal-command-input');
        this.output = document.getElementById('modal-command-output');
        this.cursor = document.querySelector('.command-cursor');
        const closeBtn = document.getElementById('modal-close');
        
        if (!this.modal || !this.input || !this.output) return;
        
        // Position cursor at end of input field
        if (this.input && this.cursor) {
            this.input.addEventListener('input', () => this.updateCursorPosition());
            this.input.addEventListener('click', () => this.updateCursorPosition());
            this.input.addEventListener('keyup', () => this.updateCursorPosition());
        }
        
        // Cmd+P / Ctrl+P to toggle modal (not on homepage)
        document.addEventListener('keydown', (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
                // Don't open modal on homepage
                if (document.body.getAttribute('data-homepage') === 'true') {
                    return;
                }
                event.preventDefault();
                if (this.modal.classList.contains('active')) {
                    this.hideModal();
                } else {
                    this.showModal();
                }
            }
            
            // Escape to close modal
            if (event.key === 'Escape' && this.modal.classList.contains('active')) {
                this.hideModal();
            }
        });
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }
        
        // Click outside to close
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Enter to execute command
        this.input.addEventListener('keydown', (event) => {
            // Update cursor position for all keydown events
            setTimeout(() => this.updateCursorPosition(), 5);
            
            if (event.key === 'Enter') {
                event.preventDefault();
                this.executeCommand(this.input.value.trim().toLowerCase());
                this.input.value = '';
                this.updateCursorPosition();
            }
        });
    },
    
    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.input.focus();
        this.output.classList.remove('visible', 'error', 'success');
        
        // Update cursor position when modal opens
        setTimeout(() => this.updateCursorPosition(), 50);
    },
    
    hideModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.output.classList.remove('visible', 'error', 'success');
    },
    
    updateCursorPosition() {
        if (!this.input || !this.cursor) return;
        
        // Create a temporary span to measure text width
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'pre';
        span.style.font = window.getComputedStyle(this.input).font;
        span.textContent = this.input.value;
        document.body.appendChild(span);
        
        // Calculate position
        const inputRect = this.input.getBoundingClientRect();
        const textWidth = span.offsetWidth;
        
        // Position cursor
        this.cursor.style.left = `${inputRect.left + textWidth + 4}px`;
        this.cursor.style.top = `${inputRect.top}px`;
        
        // Remove temporary span
        document.body.removeChild(span);
    },
    
    executeCommand(command) {
        if (!command) return;
        
        const result = commandHandler.processCommand(command.trim().toLowerCase());
        
        switch(result.type) {
            case 'navigation':
                this.output.classList.remove('visible', 'error', 'success');
                window.location.href = result.url;
                break;
                
            case 'success':
                this.output.textContent = result.message;
                this.output.classList.remove('error');
                this.output.classList.add('success', 'visible');
                break;
                
            case 'error':
                this.output.textContent = result.message;
                this.output.classList.remove('success');
                this.output.classList.add('error', 'visible');
                if (result.timeout) {
                    setTimeout(() => {
                        this.output.classList.remove('visible', 'error');
                    }, result.timeout);
                }
                break;
                
            case 'clear':
                const output = document.getElementById('modal-command-output');
                if (output) output.innerHTML = '';
                this.output.classList.remove('visible', 'error', 'success');
                break;
                
            case 'none':
            default:
                this.output.classList.remove('visible', 'error', 'success');
                break;
        }
    }
};

// Command prompt functionality for inline prompt (home page)
const inlineCommandPrompt = {
    
    init() {
        const input = document.querySelector('.command-input:not(#modal-command-input)');
        const output = document.getElementById('command-output');
        
        if (!input || !output) return;
        
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.executeCommand(input.value.trim().toLowerCase(), output);
                input.value = '';
            }
        });
    },
    
    executeCommand(command, output) {
        if (!command) return;
        
        const result = commandHandler.processCommand(command);
        
        switch(result.type) {
            case 'navigation':
                window.location.href = result.url;
                break;
                
            case 'success':
                output.innerHTML = `<div class="success">${result.message}</div>`;
                break;
                
            case 'error':
                output.innerHTML = `<div class="error">${result.message}</div>`;
                break;
                
            case 'clear':
                const cmdOutput = document.getElementById('command-output');
                if (cmdOutput) cmdOutput.innerHTML = '';
                break;
                
            case 'none':
            default:
                break;
        }
    }
};

// Homepage terminal functionality
const homepageTerminal = {
    commandText: '',
    textElement: null,
    
    init() {
        this.textElement = document.getElementById('homepage-command-text');
        if (!this.textElement) return;
        
        // Listen for all keydown events when on homepage
        if (document.body.getAttribute('data-homepage') === 'true') {
            document.addEventListener('keydown', (event) => {
                // Don't interfere with modal or input fields
                if (globalCommandModal.modal.classList.contains('active') || 
                    event.target.tagName === 'INPUT' || 
                    event.target.tagName === 'TEXTAREA') {
                    return;
                }
                
                this.handleKeypress(event);
            });
        }
    },
    
    handleKeypress(event) {
        event.preventDefault();
        
        if (event.key === 'Enter') {
            this.executeCommand();
        } else if (event.key === 'Backspace') {
            this.commandText = this.commandText.slice(0, -1);
            this.updateDisplay();
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
            this.commandText += event.key;
            this.updateDisplay();
        }
    },
    
    updateDisplay() {
        if (this.textElement) {
            this.textElement.textContent = this.commandText;
        }
    },
    
    executeCommand() {
        const command = this.commandText.trim().toLowerCase();
        if (!command) return;
        
        const output = document.getElementById('homepage-output');
        if (!output) return;
        
        const result = commandHandler.processCommand(command);
        
        switch(result.type) {
            case 'navigation':
                output.classList.remove('visible');
                window.location.href = result.url;
                break;
                
            case 'success':
                output.textContent = result.message;
                output.classList.add('visible');
                if (result.timeout) {
                    setTimeout(() => {
                        output.classList.remove('visible');
                    }, result.timeout);
                }
                break;
                
            case 'error':
                output.textContent = result.message;
                output.classList.add('visible');
                if (result.timeout) {
                    setTimeout(() => {
                        output.classList.remove('visible');
                    }, result.timeout);
                }
                break;
                
            case 'clear':
                output.classList.remove('visible');
                break;
                
            case 'none':
            default:
                output.classList.remove('visible');
                break;
        }
        
        // Clear command
        this.commandText = '';
        this.updateDisplay();
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
    
    fetchLastCommit();
    
    globalCommandModal.init();
    inlineCommandPrompt.init();
    homepageTerminal.init();
});