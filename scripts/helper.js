const Helpers = {
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    },
    
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    validatePhone: function(phone) {
        return /^[6-9]\d{9}$/.test(phone);
    },
    
    generateReminderText: function(baaki) {
        const templates = [
            `Namaste ${baaki.name}, aapki baaki ₹${baaki.amount} hai. Kripya jama kar dein. Dhanyavaad!`,
            `Dear ${baaki.name}, your pending amount ₹${baaki.amount} is due. Please settle at your earliest.`,
            `${baaki.name} ji, ₹${baaki.amount} udhaar chukta karein. Aabhaar.`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }
};