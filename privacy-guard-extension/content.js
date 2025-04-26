// Patterns for sensitive information
const patterns = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g,
    creditCard: /\d{4}[-. ]?\d{4}[-. ]?\d{4}[-. ]?\d{4}/g,
    ssn: /\d{3}[-]?\d{2}[-]?\d{4}/g
};

// MutationObserver configuration
const config = { 
    childList: true, 
    subtree: true, 
    characterData: true 
};

// Function to check if element should be ignored
function shouldIgnoreElement(element) {
    const ignoredTags = ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'];
    return ignoredTags.includes(element.tagName) || 
           element.isContentEditable ||
           element.classList.contains('privacy-guard-ignored');
}

// Function to blur sensitive content
function blurSensitiveContent(node) {
    if (node.nodeType === Node.TEXT_NODE && node.parentElement && 
        !shouldIgnoreElement(node.parentElement)) {
        let content = node.textContent;
        let shouldBlur = false;
        
        // Check for sensitive patterns
        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(content)) {
                shouldBlur = true;
                break;
            }
        }
        
        if (shouldBlur) {
            const span = document.createElement('span');
            span.textContent = content;
            span.classList.add('privacy-guard-blur');
            node.parentElement.replaceChild(span, node);
        }
    }
}

// Process all text nodes in the document
function processNode(node) {
    if (shouldIgnoreElement(node)) return;
    
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let textNode;
    while (textNode = walker.nextNode()) {
        blurSensitiveContent(textNode);
    }
}

// Create and start MutationObserver
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
            blurSensitiveContent(mutation.target);
        } else {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processNode(node);
                }
            });
        }
    }
});

// Start observing
processNode(document.body);
observer.observe(document.body, config);
