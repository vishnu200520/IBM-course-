// SmartSDLC Application JavaScript

// Application Data
const appData = {
  sampleProjects: [
    {
      id: 1,
      name: "E-Commerce Platform",
      status: "In Progress",
      completion: 75,
      requirements: 24,
      testCases: 156,
      bugsFixed: 12
    },
    {
      id: 2,
      name: "Mobile Banking App",
      status: "Testing",
      completion: 90,
      requirements: 18,
      testCases: 89,
      bugsFixed: 8
    }
  ],
  recentActivities: [
    {
      type: "code_generated",
      description: "Generated REST API endpoints for user management",
      timestamp: "2 hours ago"
    },
    {
      type: "requirements_extracted",
      description: "Extracted 15 requirements from project specification PDF",
      timestamp: "4 hours ago"
    },
    {
      type: "bug_fixed",
      description: "Fixed null pointer exception in payment service",
      timestamp: "1 day ago"
    }
  ],
  programmingLanguages: [
    "Python", "JavaScript", "Java", "C#", "TypeScript", "Go", "Rust", "PHP", "Ruby", "Swift"
  ],
  sampleRequirements: [
    {
      id: "REQ-001",
      title: "User Authentication System",
      description: "The system shall provide secure user authentication with multi-factor authentication support",
      priority: "High",
      category: "Security",
      status: "Approved"
    },
    {
      id: "REQ-002", 
      title: "Payment Processing",
      description: "The system shall integrate with multiple payment gateways for transaction processing",
      priority: "High",
      category: "Functional",
      status: "In Review"
    },
    {
      id: "REQ-003",
      title: "User Profile Management",
      description: "Users shall be able to create, update, and manage their profile information",
      priority: "Medium",
      category: "Functional",
      status: "Draft"
    }
  ],
  sampleTestCases: [
    {
      id: "TC-001",
      name: "User Login Test",
      description: "Verify user can successfully login with valid credentials",
      type: "Functional",
      priority: "High",
      steps: [
        "Navigate to login page",
        "Enter valid username and password",
        "Click login button",
        "Verify successful login"
      ]
    },
    {
      id: "TC-002",
      name: "Payment Processing Test",
      description: "Verify payment processing functionality",
      type: "Integration",
      priority: "High",
      steps: [
        "Select items to purchase",
        "Proceed to checkout",
        "Enter payment details",
        "Process payment",
        "Verify transaction completion"
      ]
    }
  ],
  codeTemplates: {
    python: `def validate_email(email):
    """
    Validates email address using regex pattern
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Example usage
if __name__ == "__main__":
    test_email = "user@example.com"
    if validate_email(test_email):
        print("Valid email address")
    else:
        print("Invalid email address")`,
    javascript: `function validateEmail(email) {
    // Validates email address using regex pattern
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

// Example usage
const testEmail = "user@example.com";
if (validateEmail(testEmail)) {
    console.log("Valid email address");
} else {
    console.log("Invalid email address");
}`,
    java: `import java.util.regex.Pattern;

public class EmailValidator {
    private static final String EMAIL_PATTERN = 
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    
    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    
    public static boolean validateEmail(String email) {
        return pattern.matcher(email).matches();
    }
    
    public static void main(String[] args) {
        String testEmail = "user@example.com";
        if (validateEmail(testEmail)) {
            System.out.println("Valid email address");
        } else {
            System.out.println("Invalid email address");
        }
    }
}`
  },
  aiResponses: [
    "I can help you generate code, extract requirements, create test cases, and much more. What would you like to work on today?",
    "Based on your uploaded document, I've identified several key requirements. Would you like me to generate user stories for them?",
    "I noticed some potential issues in your code. Let me help you fix those bugs and improve code quality.",
    "I can generate comprehensive documentation for your project. Which type would you prefer - API docs, user manual, or technical specifications?"
  ]
};

// Application State
let uploadedFiles = [];
let currentRequirements = [];
let currentTestCases = [];
let chatMessages = [
  {
    type: 'ai',
    content: "Hi! I'm your SmartSDLC AI assistant. How can I help you today?"
  }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const chatClose = document.getElementById('chatClose');
const chatMessages_elem = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing SmartSDLC Application...');
  initializeNavigation();
  initializeDashboard();
  initializeUpload();
  initializeRequirements();
  initializeCodeGenerator();
  initializeTestCreator();
  initializeBugAnalyzer();
  initializeDocumentation();
  initializeChat();
  initializeSettings();
  console.log('SmartSDLC Application initialized successfully');
});

// Navigation System - Fixed
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');

  console.log('Found nav items:', navItems.length);
  console.log('Found sections:', sections.length);

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      console.log('Navigation clicked:', targetSection);
      
      if (!targetSection) {
        console.error('No data-section attribute found');
        return;
      }
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add('active');
        console.log('Successfully switched to section:', targetSection);
      } else {
        console.error('Target section not found:', targetSection);
      }
    });
  });
}

// Dashboard Functions
function initializeDashboard() {
  renderProjects();
  renderActivities();
  renderProgressChart();
}

function renderProjects() {
  const projectsList = document.getElementById('projectsList');
  if (!projectsList) {
    console.error('Projects list element not found');
    return;
  }
  
  const projectsHTML = appData.sampleProjects.map(project => `
    <div class="project-item">
      <div class="project-name">${project.name}</div>
      <div class="project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${project.completion}%"></div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: var(--smart-text-muted);">
        <span>${project.requirements} requirements</span>
        <span>${project.testCases} tests</span>
        <span>${project.bugsFixed} bugs fixed</span>
      </div>
    </div>
  `).join('');
  
  projectsList.innerHTML = projectsHTML;
}

function renderActivities() {
  const activitiesList = document.getElementById('activitiesList');
  if (!activitiesList) {
    console.error('Activities list element not found');
    return;
  }
  
  const activitiesHTML = appData.recentActivities.map(activity => `
    <div class="activity-item">
      <div class="activity-description">${activity.description}</div>
      <div class="activity-time">${activity.timestamp}</div>
    </div>
  `).join('');
  
  activitiesList.innerHTML = activitiesHTML;
}

function renderProgressChart() {
  const chartElement = document.getElementById('progressChart');
  if (!chartElement) {
    console.error('Progress chart element not found');
    return;
  }
  
  const ctx = chartElement.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'In Progress', 'Pending'],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f8fafc',
            padding: 20
          }
        }
      }
    }
  });
}

// File Upload Functions
function initializeUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const uploadedFilesDiv = document.getElementById('uploadedFiles');

  if (!uploadArea || !fileInput || !uploadedFilesDiv) {
    console.error('Upload elements not found');
    return;
  }

  uploadArea.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('drop', handleFileDrop);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  fileInput.addEventListener('change', handleFileSelect);

  function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
  }

  function handleFileDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }

  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
  }

  function processFiles(files) {
    files.forEach(file => {
      if (file.type === 'application/pdf') {
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: formatFileSize(file.size),
          uploadTime: new Date().toISOString(),
          content: "Sample extracted content from " + file.name
        };
        
        uploadedFiles.push(fileData);
        renderUploadedFiles();
        showNotification('File uploaded successfully!', 'success');
      } else {
        showNotification('Please upload PDF files only.', 'error');
      }
    });
  }

  function renderUploadedFiles() {
    const filesHTML = uploadedFiles.map(file => `
      <div class="file-item">
        <div class="file-info">
          <div class="file-icon">📄</div>
          <div class="file-details">
            <h4>${file.name}</h4>
            <div class="file-size">${file.size}</div>
          </div>
        </div>
        <button class="btn btn--sm btn--secondary" onclick="removeFile('${file.id}')">Remove</button>
      </div>
    `).join('');
    
    uploadedFilesDiv.innerHTML = filesHTML;
  }
}

function removeFile(fileId) {
  uploadedFiles = uploadedFiles.filter(file => file.id !== fileId);
  const uploadedFilesDiv = document.getElementById('uploadedFiles');
  if (uploadedFilesDiv) {
    const filesHTML = uploadedFiles.map(file => `
      <div class="file-item">
        <div class="file-info">
          <div class="file-icon">📄</div>
          <div class="file-details">
            <h4>${file.name}</h4>
            <div class="file-size">${file.size}</div>
          </div>
        </div>
        <button class="btn btn--sm btn--secondary" onclick="removeFile('${file.id}')">Remove</button>
      </div>
    `).join('');
    uploadedFilesDiv.innerHTML = filesHTML;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Requirements Functions
function initializeRequirements() {
  const generateBtn = document.getElementById('generateReqs');
  const exportBtn = document.getElementById('exportReqs');

  if (generateBtn) generateBtn.addEventListener('click', generateRequirements);
  if (exportBtn) exportBtn.addEventListener('click', exportRequirements);

  renderRequirements();
}

function generateRequirements() {
  showLoading(true);
  
  setTimeout(() => {
    currentRequirements = [...appData.sampleRequirements];
    renderRequirements();
    showLoading(false);
    showNotification('Requirements generated successfully!', 'success');
  }, 2000);
}

function renderRequirements() {
  const requirementsList = document.getElementById('requirementsList');
  if (!requirementsList) return;
  
  if (currentRequirements.length === 0) {
    requirementsList.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px; color: var(--smart-text-secondary);">
        <h3>No requirements generated yet</h3>
        <p>Click "Generate Requirements" to extract requirements from your uploaded documents.</p>
      </div>
    `;
    return;
  }

  const requirementsHTML = currentRequirements.map(req => `
    <div class="requirement-item">
      <div class="requirement-header">
        <div class="requirement-id">${req.id}</div>
        <div class="requirement-priority ${req.priority.toLowerCase()}">${req.priority}</div>
      </div>
      <h4 class="requirement-title">${req.title}</h4>
      <p class="requirement-description">${req.description}</p>
    </div>
  `).join('');
  
  requirementsList.innerHTML = requirementsHTML;
}

function exportRequirements() {
  const dataStr = JSON.stringify(currentRequirements, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'requirements.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  showNotification('Requirements exported successfully!', 'success');
}

// Code Generator Functions
function initializeCodeGenerator() {
  const generateBtn = document.getElementById('generateCode');
  const copyBtn = document.getElementById('copyCode');
  
  if (generateBtn) generateBtn.addEventListener('click', generateCode);
  if (copyBtn) copyBtn.addEventListener('click', copyGeneratedCode);
}

function generateCode() {
  const promptElement = document.getElementById('codePrompt');
  const languageElement = document.getElementById('languageSelect');
  
  if (!promptElement || !languageElement) {
    console.error('Code generator elements not found');
    return;
  }
  
  const prompt = promptElement.value.trim();
  const language = languageElement.value;
  
  if (!prompt) {
    showNotification('Please enter a description of what you want to build.', 'warning');
    return;
  }
  
  showLoading(true);
  
  setTimeout(() => {
    const generatedCode = appData.codeTemplates[language] || appData.codeTemplates.python;
    const codeElement = document.getElementById('generatedCode');
    
    if (codeElement) {
      codeElement.textContent = generatedCode;
      codeElement.className = `language-${language}`;
      
      // Re-highlight the code
      if (window.Prism) {
        Prism.highlightElement(codeElement);
      }
    }
    
    showLoading(false);
    showNotification('Code generated successfully!', 'success');
  }, 1500);
}

function copyGeneratedCode() {
  const codeElement = document.getElementById('generatedCode');
  if (!codeElement) return;
  
  const text = codeElement.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Code copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('Failed to copy code.', 'error');
  });
}

// Test Creator Functions
function initializeTestCreator() {
  const generateBtn = document.getElementById('generateTests');
  
  if (generateBtn) generateBtn.addEventListener('click', generateTestCases);
  renderTestCases();
}

function generateTestCases() {
  showLoading(true);
  
  setTimeout(() => {
    currentTestCases = [...appData.sampleTestCases];
    renderTestCases();
    showLoading(false);
    showNotification('Test cases generated successfully!', 'success');
  }, 1500);
}

function renderTestCases() {
  const testCasesList = document.getElementById('testCasesList');
  if (!testCasesList) return;
  
  if (currentTestCases.length === 0) {
    testCasesList.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px; color: var(--smart-text-secondary);">
        <h3>No test cases generated yet</h3>
        <p>Click "Generate Test Cases" to create test cases based on your requirements.</p>
      </div>
    `;
    return;
  }

  const testCasesHTML = currentTestCases.map(testCase => `
    <div class="test-case-item">
      <div class="test-case-header">
        <div>
          <h4 class="test-case-name">${testCase.name}</h4>
          <p style="color: var(--smart-text-secondary); margin: 0; font-size: var(--font-size-sm);">${testCase.description}</p>
        </div>
        <div class="test-case-type">${testCase.type}</div>
      </div>
      <div class="test-steps">
        <h5>Test Steps:</h5>
        <ol>
          ${testCase.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    </div>
  `).join('');
  
  testCasesList.innerHTML = testCasesHTML;
}

// Bug Analyzer Functions
function initializeBugAnalyzer() {
  const analyzeBtn = document.getElementById('analyzeCode');
  
  if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeCodeForBugs);
}

function analyzeCodeForBugs() {
  const codeElement = document.getElementById('bugAnalysisCode');
  if (!codeElement) return;
  
  const code = codeElement.value.trim();
  
  if (!code) {
    showNotification('Please enter code to analyze.', 'warning');
    return;
  }
  
  showLoading(true);
  
  setTimeout(() => {
    const analysisResults = [
      {
        severity: 'High',
        description: 'Potential null pointer exception at line 15',
        suggestion: 'Add null check before accessing object properties'
      },
      {
        severity: 'Medium',
        description: 'Unused variable "tempVar" detected',
        suggestion: 'Remove unused variables to improve code cleanliness'
      },
      {
        severity: 'Low',
        description: 'Consider using more descriptive variable names',
        suggestion: 'Replace single-letter variables with meaningful names'
      }
    ];
    
    renderBugAnalysis(analysisResults);
    showLoading(false);
    showNotification('Code analysis completed!', 'success');
  }, 2000);
}

function renderBugAnalysis(results) {
  const analysisResults = document.getElementById('analysisResults');
  if (!analysisResults) return;
  
  const resultsHTML = results.map(result => `
    <div class="bug-item">
      <div class="bug-severity">${result.severity} Severity</div>
      <div class="bug-description">${result.description}</div>
      <div class="bug-suggestion">💡 Suggestion: ${result.suggestion}</div>
    </div>
  `).join('');
  
  analysisResults.innerHTML = resultsHTML;
}

// Documentation Functions
function initializeDocumentation() {
  const docButtons = document.querySelectorAll('.doc-type-btn');
  
  docButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      docButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const docType = this.getAttribute('data-doc-type');
      generateDocumentation(docType);
    });
  });
}

function generateDocumentation(docType) {
  showLoading(true);
  
  setTimeout(() => {
    const documentationOutput = document.getElementById('documentationOutput');
    if (!documentationOutput) return;
    
    let content = '';
    switch(docType) {
      case 'api':
        content = `
          <h3>📋 API Documentation</h3>
          <div style="background: var(--smart-bg-tertiary); padding: 20px; border-radius: 8px; margin-top: 16px;">
            <h4>Authentication Endpoints</h4>
            <div style="margin: 12px 0; font-family: var(--font-family-mono); font-size: 14px;">
              <strong>POST</strong> /auth/login<br>
              <strong>POST</strong> /auth/register<br>
              <strong>POST</strong> /auth/logout
            </div>
            <h4>User Management</h4>
            <div style="margin: 12px 0; font-family: var(--font-family-mono); font-size: 14px;">
              <strong>GET</strong> /users/profile<br>
              <strong>PUT</strong> /users/profile<br>
              <strong>DELETE</strong> /users/account
            </div>
          </div>
        `;
        break;
      case 'user':
        content = `
          <h3>📖 User Manual</h3>
          <div style="background: var(--smart-bg-tertiary); padding: 20px; border-radius: 8px; margin-top: 16px;">
            <h4>Getting Started</h4>
            <p>Welcome to SmartSDLC! This manual will guide you through using all features of the platform.</p>
            <h4>Quick Start Guide</h4>
            <ol>
              <li>Upload your project documents</li>
              <li>Generate requirements automatically</li>
              <li>Create code using AI assistance</li>
              <li>Generate comprehensive test cases</li>
            </ol>
          </div>
        `;
        break;
      case 'technical':
        content = `
          <h3>🔧 Technical Specifications</h3>
          <div style="background: var(--smart-bg-tertiary); padding: 20px; border-radius: 8px; margin-top: 16px;">
            <h4>System Architecture</h4>
            <p>SmartSDLC follows a modern microservices architecture with AI-powered components.</p>
            <h4>Technology Stack</h4>
            <ul>
              <li>Frontend: HTML5, CSS3, JavaScript (ES6+)</li>
              <li>AI Engine: IBM Granite 3.0</li>
              <li>Storage: Local Browser Storage</li>
              <li>Charts: Chart.js</li>
            </ul>
          </div>
        `;
        break;
    }
    
    documentationOutput.innerHTML = content;
    showLoading(false);
    showNotification(`${docType.toUpperCase()} documentation generated!`, 'success');
  }, 1500);
}

// Chat Functions - Fixed
function initializeChat() {
  console.log('Initializing chat...');
  
  if (!chatToggle || !chatContainer || !chatClose || !chatSend || !chatInput) {
    console.error('Chat elements not found');
    return;
  }
  
  chatToggle.addEventListener('click', toggleChat);
  chatClose.addEventListener('click', closeChat);
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  console.log('Chat initialized successfully');
}

function toggleChat() {
  console.log('Toggling chat');
  if (chatContainer) {
    chatContainer.classList.toggle('hidden');
    console.log('Chat container hidden class:', chatContainer.classList.contains('hidden'));
  }
}

function closeChat() {
  if (chatContainer) {
    chatContainer.classList.add('hidden');
  }
}

function sendMessage() {
  if (!chatInput) return;
  
  const message = chatInput.value.trim();
  if (!message) return;
  
  // Add user message
  addChatMessage('user', message);
  chatInput.value = '';
  
  // Simulate AI response
  setTimeout(() => {
    const responses = appData.aiResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addChatMessage('ai', randomResponse);
  }, 1000);
}

function addChatMessage(type, content) {
  if (!chatMessages_elem) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
  
  chatMessages_elem.appendChild(messageDiv);
  chatMessages_elem.scrollTop = chatMessages_elem.scrollHeight;
}

// Settings Functions
function initializeSettings() {
  console.log('Settings initialized');
}

// Utility Functions
function showLoading(show) {
  if (!loadingOverlay) return;
  
  if (show) {
    loadingOverlay.classList.remove('hidden');
  } else {
    loadingOverlay.classList.add('hidden');
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--smart-surface);
    color: var(--smart-text-primary);
    padding: 16px 20px;
    border-radius: 8px;
    border: 1px solid var(--smart-border);
    backdrop-filter: blur(12px);
    box-shadow: var(--smart-shadow-lg);
    z-index: 1200;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 300px;
    font-size: 14px;
  `;
  
  if (type === 'success') {
    notification.style.borderColor = 'var(--smart-accent)';
    notification.innerHTML = `✅ ${message}`;
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--smart-error)';
    notification.innerHTML = `❌ ${message}`;
  } else if (type === 'warning') {
    notification.style.borderColor = 'var(--smart-warning)';
    notification.innerHTML = `⚠️ ${message}`;
  } else {
    notification.innerHTML = `ℹ️ ${message}`;
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto remove
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Error: ', msg, ' at ', url, ':', lineNo);
  showNotification('An error occurred. Please try again.', 'error');
  return false;
};

// Initialize tooltips and additional interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleChat();
    }
    
    // Escape to close chat
    if (e.key === 'Escape' && chatContainer && !chatContainer.classList.contains('hidden')) {
      closeChat();
    }
  });
});

// Export functions for global access
window.removeFile = removeFile;