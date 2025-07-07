const Customer = {
    init: function() {
        this.renderBaaki();
    },

    renderBaaki: function() {
        const baakiList = document.getElementById('customer-baaki-list');
        baakiList.innerHTML = '';

        if (!window.customerBaaki || window.customerBaaki.length === 0) {
            baakiList.innerHTML = '<p>No baaki records found.</p>';
            return;
        }

        window.customerBaaki.forEach(baaki => {
            const isOverdue = baaki.status === 'overdue' ||
                (new Date(baaki.dueDate) < new Date() && baaki.status !== 'paid');
            const baakiCard = document.createElement('div');
            baakiCard.className = `baaki-card${isOverdue ? ' overdue' : ''}`;

            baakiCard.innerHTML = `
                <h3>${baaki.shop} (${baaki.phone})</h3>
                <div class="baaki-meta">
                    <span>${baaki.item}</span>
                    <span>Due: ${Helpers.formatDate(baaki.dueDate)}</span>
                </div>
                <div class="baaki-meta">
                    <strong>Amount: ₹${baaki.amount}</strong>
                    <span>Added: ${Helpers.formatDate(baaki.date)}</span>
                </div>
                <div class="baaki-actions">
                    <button onclick="Customer.payBaaki(${baaki.id})">Pay Now</button>
                    <button class="secondary" onclick="Customer.requestExtension(${baaki.id})">Request Extension</button>
                </div>
            `;

            baakiList.appendChild(baakiCard);
        });
    },

    payBaaki: function(id) {
        const baaki = window.customerBaaki.find(b => b.id === id);
        if (!baaki) return;
        alert(`In a real app, this would open UPI payment for ₹${baaki.amount} to ${baaki.shop}`);
        // In actual implementation:
        // 1. Integrate with UPI payment API
        // 2. On successful payment:
        //    baaki.status = 'paid';
        //    this.renderBaaki();
        //    this.updateSummary();
    },

    requestExtension: function(id) {
        const baaki = window.customerBaaki.find(b => b.id === id);
        if (!baaki) return;
        const newDate = prompt(`Request extension for ${baaki.shop}'s baaki (₹${baaki.amount}). Enter new date (YYYY-MM-DD):`);
        if (newDate) {
            alert(`Extension requested until ${newDate}. Shopkeeper will be notified.`);
            // In actual implementation:
            // 1. Send notification to shopkeeper
            // 2. Update record if approved
        }
    },

    updateSummary: function() {
        const totalBaaki = window.customerBaaki.reduce((sum, baaki) => sum + baaki.amount, 0);
        const pendingCount = window.customerBaaki.filter(b => b.status !== 'paid').length;
        const overdueCount = window.customerBaaki.filter(baaki =>
            baaki.status === 'overdue' || (new Date(baaki.dueDate) < new Date() && baaki.status !== 'paid')
        ).length;

        document.getElementById('customer-total-baaki').textContent = `₹${totalBaaki}`;
        document.getElementById('customer-pending-count').textContent = pendingCount;
        document.getElementById('customer-overdue-count').textContent = overdueCount;
    }
};