// Sample data from the application requirements
const sampleData = {
  requirements: [
    {
      id: "REQ-001",
      title: "User Authentication System",
      description: "The system shall provide secure user authentication with username/password login",
      priority: "High",
      type: "Functional Requirement"
    },
    {
      id: "REQ-002", 
      title: "Data Encryption",
      description: "All sensitive data shall be encrypted using AES-256 encryption",
      priority: "High",
      type: "Security Requirement"
    },
    {
      id: "REQ-003",
      title: "Response Time",
      description: "System response time shall not exceed 2 seconds for any user action",
      priority: "Medium", 
      type: "Performance Requirement"
    }
  ],
  
  codeOutputs: {
    python: {
      authentication: `import hashlib
import secrets
from datetime import datetime, timedelta

class UserAuth:
    def __init__(self):
        self.users = {}
        self.sessions = {}
    
    def hash_password(self, password):
        salt = secrets.token_hex(16)
        pwdhash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return salt + pwdhash.hex()
    
    def verify_password(self, stored_password, provided_password):
        salt = stored_password[:32]
        stored_pwdhash = stored_password[32:]
        pwdhash = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return pwdhash.hex() == stored_pwdhash
    
    def register_user(self, username, password):
        if username in self.users:
            return False, 'User already exists'
        
        hashed_password = self.hash_password(password)
        self.users[username] = {
            'password': hashed_password,
            'created_at': datetime.now()
        }
        return True, 'User registered successfully'
    
    def login(self, username, password):
        if username not in self.users:
            return False, 'Invalid credentials'
        
        if self.verify_password(self.users[username]['password'], password):
            session_token = secrets.token_urlsafe(32)
            self.sessions[session_token] = {
                'username': username,
                'expires': datetime.now() + timedelta(hours=24)
            }
            return True, session_token
        return False, 'Invalid credentials'`
    },
    javascript: {
      api: `// RESTful API endpoints for user management
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiting middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

// User registration endpoint
app.post('/api/register', authLimiter, async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check password strength
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Save user (mock database operation)
    const user = {
      id: Date.now(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});`
    }
  },

  unitTest: `import unittest
from unittest.mock import patch, MagicMock
from your_module import UserAuth

class TestUserAuth(unittest.TestCase):
    def setUp(self):
        self.auth = UserAuth()
    
    def test_hash_password_returns_string(self):
        """Test that hash_password returns a string"""
        result = self.auth.hash_password('testpassword')
        self.assertIsInstance(result, str)
        self.assertGreater(len(result), 32)  # Should include salt + hash
    
    def test_register_user_success(self):
        """Test successful user registration"""
        success, message = self.auth.register_user('testuser', 'password123')
        self.assertTrue(success)
        self.assertEqual(message, 'User registered successfully')
        self.assertIn('testuser', self.auth.users)
    
    def test_register_duplicate_user_fails(self):
        """Test that registering duplicate user fails"""
        self.auth.register_user('testuser', 'password123')
        success, message = self.auth.register_user('testuser', 'password456')
        self.assertFalse(success)
        self.assertEqual(message, 'User already exists')
    
    def test_login_with_valid_credentials(self):
        """Test login with valid credentials"""
        self.auth.register_user('testuser', 'password123')
        success, token = self.auth.login('testuser', 'password123')
        self.assertTrue(success)
        self.assertIsInstance(token, str)
        self.assertIn(token, self.auth.sessions)
    
    def test_login_with_invalid_credentials(self):
        """Test login with invalid credentials"""
        success, message = self.auth.login('nonexistent', 'wrongpassword')
        self.assertFalse(success)
        self.assertEqual(message, 'Invalid credentials')
    
    @patch('secrets.token_urlsafe')
    def test_session_token_generation(self, mock_token):
        """Test that session tokens are generated correctly"""
        mock_token.return_value = 'mocked_token_12345'
        self.auth.register_user('testuser', 'password123')
        success, token = self.auth.login('testuser', 'password123')
        
        self.assertTrue(success)
        self.assertEqual(token, 'mocked_token_12345')
        mock_token.assert_called_once_with(32)

if __name__ == '__main__':
    unittest.main()`,

  buggyCode: `def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = total / len(numbers)
    return average

def process_user_input(user_data):
    if user_data['age'] >= 18:
        return 'adult'
    else:
        return 'minor'

def fetch_user_data(user_id):
    users = {
        1: {'name': 'John', 'age': 25},
        2: {'name': 'Jane', 'age': 17}
    }
    return users[user_id]`,

  identifiedIssues: [
    {
      line: 5,
      issue: "Division by zero error",
      description: "Function will crash if empty list is passed",
      severity: "High",
      fix: "Add check for empty list before division"
    },
    {
      line: 9,
      issue: "KeyError potential",
      description: "Missing key validation in dictionary access",
      severity: "Medium", 
      fix: "Add key existence check or use .get() method"
    },
    {
      line: 16,
      issue: "KeyError potential",
      description: "user_id might not exist in users dictionary",
      severity: "High",
      fix: "Add validation for user_id existence"
    }
  ],

  fixedCode: `def calculate_average(numbers):
    if not numbers:  # Fix: Check for empty list
        return 0
    
    total = 0
    for num in numbers:
        total += num
    average = total / len(numbers)
    return average

def process_user_input(user_data):
    # Fix: Add key validation
    if 'age' not in user_data:
        raise ValueError('Age not provided in user data')
        
    if user_data['age'] >= 18:
        return 'adult'
    else:
        return 'minor'

def fetch_user_data(user_id):
    users = {
        1: {'name': 'John', 'age': 25},
        2: {'name': 'Jane', 'age': 17}
    }
    
    # Fix: Add user existence validation
    if user_id not in users:
        raise ValueError(f'User with ID {user_id} not found')
        
    return users[user_id]`,

  chatResponses: {
    'requirements': "I can help you extract and structure requirements from your PDF documents. Upload your document and I'll analyze it to identify functional requirements, user stories, acceptance criteria, and technical specifications. I can also help you prioritize requirements and identify potential conflicts or gaps.",
    'code generation': "I'm ready to help you generate code! Just describe what you want to build in natural language. I can create functions, classes, APIs, database schemas, and more. I support multiple programming languages and follow best practices including error handling, documentation, and security considerations.",
    'testing': "I can generate comprehensive test suites for your code including unit tests, integration tests, and end-to-end tests. I'll create test cases that cover edge cases, error conditions, and happy paths. I also provide mock objects and test data as needed.",
    'debugging': "Share your buggy code with me and I'll analyze it to identify potential issues, performance problems, and security vulnerabilities. I'll provide detailed explanations of the problems and suggest specific fixes with improved code examples."
  }
};

// Application state
let currentSection = 'dashboard';

// Main initialization
window.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialize navigation
  setupNavigation();
  setupFeatureCards();
  
  // Initialize all sections
  setupRequirements();
  setupCodeGeneration();
  setupTesting();
  setupBugFixing();
  setupDocumentation();
  setupAIChat();
}

// Navigation system
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetSection = this.getAttribute('data-section');
      if (targetSection) {
        navigateToSection(targetSection);
      }
    });
  });
}

function setupFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card[data-navigate]');
  
  featureCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetSection = this.getAttribute('data-navigate');
      if (targetSection) {
        navigateToSection(targetSection);
      }
    });
  });
}

function navigateToSection(sectionId) {
  // Hide all sections
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentSection = sectionId;
  }
  
  // Update navigation buttons
  const allNavButtons = document.querySelectorAll('.nav-btn');
  allNavButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeNavButton = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeNavButton) {
    activeNavButton.classList.add('active');
  }
}

// Requirements section
function setupRequirements() {
  const uploadInput = document.getElementById('pdf-upload');
  const generateBtn = document.getElementById('generate-requirements');
  const output = document.getElementById('requirements-output');

  if (uploadInput && generateBtn && output) {
    uploadInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        showMessage(`File "${fileName}" uploaded successfully`, 'success', output.parentNode);
        generateBtn.disabled = false;
      }
    });

    generateBtn.addEventListener('click', function() {
      showLoading();
      
      setTimeout(() => {
        hideLoading();
        displayRequirements(output);
        showMessage('Requirements extracted successfully!', 'success', output.parentNode);
      }, 2000);
    });
  }
}

function displayRequirements(container) {
  const requirementsHTML = sampleData.requirements.map(req => `
    <div class="requirement-item">
      <div class="requirement-header">
        <span class="requirement-id">${req.id}</span>
        <span class="status priority-${req.priority.toLowerCase()}">${req.priority} Priority</span>
      </div>
      <h4 class="requirement-title">${req.title}</h4>
      <p class="requirement-description">${req.description}</p>
      <div class="requirement-meta">
        <span class="status status--info">${req.type}</span>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = requirementsHTML;
}

// Code generation section
function setupCodeGeneration() {
  const generateBtn = document.getElementById('generate-code');
  const promptInput = document.getElementById('code-prompt');
  const languageSelect = document.getElementById('language-selector');
  const output = document.getElementById('code-output');
  const copyBtn = document.getElementById('copy-code');

  if (generateBtn && promptInput && languageSelect && output && copyBtn) {
    generateBtn.addEventListener('click', function() {
      const prompt = promptInput.value.trim();
      const language = languageSelect.value;
      
      if (!prompt) {
        showMessage('Please enter a code generation prompt', 'error', output.parentNode);
        return;
      }

      showLoading();
      
      setTimeout(() => {
        hideLoading();
        generateCode(prompt, language, output);
        showMessage('Code generated successfully!', 'success', output.parentNode);
      }, 1500);
    });

    copyBtn.addEventListener('click', function() {
      const codeContent = output.textContent;
      if (codeContent && !codeContent.includes('Enter a prompt')) {
        navigator.clipboard.writeText(codeContent).then(() => {
          showMessage('Code copied to clipboard!', 'success', output.parentNode);
        });
      }
    });
  }
}

function generateCode(prompt, language, container) {
  let code = '';
  
  if (prompt.toLowerCase().includes('authentication') || prompt.toLowerCase().includes('login')) {
    code = language === 'python' ? sampleData.codeOutputs.python.authentication : sampleData.codeOutputs.javascript.api;
  } else {
    code = language === 'python' ? 
      `# Generated Python code based on: "${prompt}"
def main():
    """
    Main function implementing the requested functionality
    """
    print("Hello, World!")
    return True

if __name__ == "__main__":
    result = main()
    print(f"Execution result: {result}")` :
      `// Generated JavaScript code based on: "${prompt}"
function main() {
    /**
     * Main function implementing the requested functionality
     */
    console.log("Hello, World!");
    return true;
}

// Execute the main function
const result = main();
console.log(\`Execution result: \${result}\`);`;
  }
  
  container.textContent = code;
}

// Testing section
function setupTesting() {
  const generateBtn = document.getElementById('generate-tests');
  const codeInput = document.getElementById('test-code');
  const testType = document.getElementById('test-type');
  const output = document.getElementById('test-output');

  if (generateBtn && codeInput && testType && output) {
    generateBtn.addEventListener('click', function() {
      const code = codeInput.value.trim();
      
      if (!code) {
        showMessage('Please enter code to generate tests for', 'error', output.parentNode);
        return;
      }

      showLoading();
      
      setTimeout(() => {
        hideLoading();
        displayTests(code, testType.value, output);
        showMessage('Tests generated successfully!', 'success', output.parentNode);
      }, 1500);
    });
  }
}

function displayTests(code, testType, container) {
  const testCode = testType === 'unit' ? sampleData.unitTest : 
    `# Generated ${testType} tests
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestIntegration:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
    
    def test_user_workflow(self):
        """Test complete user workflow"""
        self.driver.get("http://localhost:3000")
        
        # Test navigation
        login_btn = self.driver.find_element(By.ID, "login-button")
        login_btn.click()
        
        # Verify redirect
        assert "login" in self.driver.current_url
        
    def teardown_method(self):
        self.driver.quit()`;
  
  container.textContent = testCode;
}

// Bug fixing section
function setupBugFixing() {
  const analyzeBtn = document.getElementById('analyze-bugs');
  const codeInput = document.getElementById('buggy-code');
  const analysisOutput = document.getElementById('bug-analysis');
  const fixedOutput = document.getElementById('fixed-code');

  if (analyzeBtn && codeInput && analysisOutput && fixedOutput) {
    // Pre-populate with sample buggy code
    codeInput.value = sampleData.buggyCode;
    
    analyzeBtn.addEventListener('click', function() {
      const code = codeInput.value.trim();
      
      if (!code) {
        showMessage('Please enter code to analyze', 'error', analysisOutput.parentNode);
        return;
      }

      showLoading();
      
      setTimeout(() => {
        hideLoading();
        displayBugAnalysis(analysisOutput);
        displayFixedCode(fixedOutput);
        showMessage('Bug analysis completed!', 'success', analysisOutput.parentNode);
      }, 2000);
    });
  }
}

function displayBugAnalysis(container) {
  const bugsHTML = sampleData.identifiedIssues.map(bug => `
    <div class="bug-item">
      <div class="bug-severity ${bug.severity.toLowerCase()}">${bug.severity} Severity</div>
      <div class="bug-line">Line ${bug.line}: ${bug.issue}</div>
      <div class="bug-description">${bug.description}</div>
      <div class="bug-fix">💡 Fix: ${bug.fix}</div>
    </div>
  `).join('');
  
  container.innerHTML = bugsHTML;
}

function displayFixedCode(container) {
  container.textContent = sampleData.fixedCode;
}

// Documentation section
function setupDocumentation() {
  const generateBtn = document.getElementById('generate-docs');
  const codeInput = document.getElementById('doc-code');
  const docType = document.getElementById('doc-type');
  const output = document.getElementById('doc-output');

  if (generateBtn && codeInput && docType && output) {
    generateBtn.addEventListener('click', function() {
      const code = codeInput.value.trim();
      
      if (!code) {
        showMessage('Please enter code to document', 'error', output.parentNode);
        return;
      }

      showLoading();
      
      setTimeout(() => {
        hideLoading();
        generateDocumentation(code, docType.value, output);
        showMessage('Documentation generated successfully!', 'success', output.parentNode);
      }, 1500);
    });
  }
}

function generateDocumentation(code, docType, container) {
  let documentation = '';
  
  switch (docType) {
    case 'api':
      documentation = `# API Documentation

## Authentication Endpoints

### POST /api/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "username": "string",
  "password": "string", 
  "email": "string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User registered successfully",
  "userId": "number"
}
\`\`\`

**Status Codes:**
- 201: User created successfully
- 400: Invalid input data
- 500: Internal server error

### POST /api/login
Authenticate user and return session token.

**Rate Limiting:** 5 attempts per 15 minutes per IP

**Security Features:**
- Password hashing with bcrypt
- Session token generation
- Input validation`;
      break;
      
    case 'readme':
      documentation = `# Project Name

A comprehensive user authentication system with secure password handling and session management.

## Features

- ✅ Secure password hashing using bcrypt
- ✅ Session-based authentication
- ✅ Rate limiting protection
- ✅ Input validation
- ✅ Error handling

## Installation

\`\`\`bash
npm install
npm start
\`\`\`

## Usage

\`\`\`javascript
const auth = new UserAuth();
const result = auth.register_user('username', 'password');
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct.`;
      break;
      
    default:
      documentation = `/**
 * User Authentication System
 * 
 * Provides secure user authentication with password hashing and session management.
 * Implements industry best practices for security and error handling.
 * 
 * @class UserAuth
 * @example
 * const auth = new UserAuth();
 * const [success, result] = auth.register_user('john_doe', 'secure_password');
 */`;
  }
  
  container.innerHTML = `<pre>${documentation}</pre>`;
}

// AI Chat section
function setupAIChat() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-message');
  const quickActionBtns = document.querySelectorAll('.quick-action-btn');

  if (chatInput && sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const prompt = this.getAttribute('data-prompt');
      if (chatInput) {
        chatInput.value = prompt;
        sendMessage();
      }
    });
  });
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();
  
  if (!message) return;

  addChatMessage(message, 'user');
  chatInput.value = '';

  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateAIResponse(message);
    addChatMessage(response, 'ai');
  }, 1000);
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;
  
  const avatar = sender === 'ai' ? '🤖' : '👤';
  
  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(sampleData.chatResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  if (lowerMessage.includes('help')) {
    return "I'm here to help you with your software development lifecycle! I can assist with requirements analysis, code generation, testing, debugging, and documentation. What specific area would you like to explore?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're welcome! I'm always here to help streamline your development process. Feel free to ask me anything about the SDLC phases or use the quick action buttons for common tasks.";
  }
  
  return "I understand you're working on your development project. I can help you with requirements extraction, code generation, test creation, bug fixing, and documentation. Which area would you like to focus on?";
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message ai-message typing-indicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <p>Typing...</p>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Utility functions
function showLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

function showMessage(message, type, container) {
  const existingMessage = container.querySelector(`.${type}-message`);
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `${type}-message`;
  messageDiv.textContent = message;
  
  container.insertBefore(messageDiv, container.firstChild);
  
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}