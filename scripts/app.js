// Main application initialization
function init() {
    Shopkeeper.init();
    Customer.init();
    updateSummary();
    
    // Form submission
    document.getElementById('add-baaki-form').addEventListener('submit', function(e) {
        e.preventDefault();
        Shopkeeper.addNewBaaki();
    });
}

// Tab switching
function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Update summary cards
function updateSummary() {
    Shopkeeper.updateSummary();
    Customer.updateSummary();
}

// Initialize the app when the page loads
window.onload = init;