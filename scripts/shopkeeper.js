const Shopkeeper = {
    init: function() {
        this.renderBaaki();
    },
    
    renderBaaki: function() {
        const baakiList = document.getElementById('shopkeeper-baaki-list');
        baakiList.innerHTML = '';
        
        if (window.shopkeeperBaaki.length === 0) {
            baakiList.innerHTML = '<p>No pending baaki records found.</p>';
            return;
        }
        
        window.shopkeeperBaaki.forEach(baaki => {
            const isOverdue = baaki.status === 'overdue' || 
                             (new Date(baaki.dueDate) < new Date() && baaki.status !== 'paid');
            const baakiCard = document.createElement('div');
            baakiCard.className = `baaki-card${isOverdue ? ' overdue' : ''}`;
            
            baakiCard.innerHTML = `
                <h3>${baaki.name} (${baaki.phone})</h3>
                <div class="baaki-meta">
                    <span>${baaki.item}</span>
                    <span>Due: ${Helpers.formatDate(baaki.dueDate)}</span>
                </div>
                <div class="baaki-meta">
                    <strong>Amount: ₹${baaki.amount}</strong>
                    <span>Added: ${Helpers.formatDate(baaki.date)}</span>
                </div>
                <div class="baaki-actions">
                    <button onclick="Shopkeeper.sendReminder(${baaki.id})">Send Reminder</button>
                    <button class="secondary" onclick="Shopkeeper.markAsPaid(${baaki.id})">Mark as Paid</button>
                </div>
            `;
            
            baakiList.appendChild(baakiCard);
        });
    },
    
    addNewBaaki: function() {
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const item = document.getElementById('item-name').value;
        const amount = parseInt(document.getElementById('baaki-amount').value);
        const dueDate = document.getElementById('due-date').value;
        
        const newBaaki = {
            id: window.shopkeeperBaaki.length + 1,
            name,
            phone,
            item,
            amount,
            date: new Date().toISOString().split('T')[0],
            dueDate,
            status: 'pending'
        };
        
        window.shopkeeperBaaki.push(newBaaki);
        document.getElementById('add-baaki-form').reset();
        this.renderBaaki();
        updateSummary();
        
        alert(`Baaki of ₹${amount} added for ${name}`);
    },
    
    sendReminder: function(id) {
        const baaki = window.shopkeeperBaaki.find(b => b.id === id);
        alert(`Reminder sent to ${baaki.name} (${baaki.phone}):\n\n"Namaste, aapki baaki ₹${baaki.amount} hai. Kripya jama kar dein. Dhanyavaad!"`);
    },
    
    markAsPaid: function(id) {
        const baaki = window.shopkeeperBaaki.find(b => b.id === id);
        baaki.status = 'paid';
        this.renderBaaki();
        updateSummary();
        alert(`Marked as paid: ${baaki.name}'s baaki of ₹${baaki.amount}`);
    },
    
    updateSummary: function() {
        const totalBaaki = window.shopkeeperBaaki.reduce((sum, baaki) => sum + baaki.amount, 0);
        const pendingCount = window.shopkeeperBaaki.filter(b => b.status !== 'paid').length;
        const overdueCount = window.shopkeeperBaaki.filter(baaki => 
            baaki.status === 'overdue' || (new Date(baaki.dueDate) < new Date() && baaki.status !== 'paid')
        ).length;
        
        document.getElementById('total-baaki').textContent = `₹${totalBaaki}`;
        document.getElementById('pending-count').textContent = pendingCount;
        document.getElementById('overdue-count').textContent = overdueCount;
    }
};