// DOM Elements
const verifyForm = document.getElementById('verifyForm');
const playerIdInput = document.getElementById('playerId');
const verifyBtn = document.getElementById('verifyBtn');
const loadingElement = document.querySelector('.loading');
const successMessage = document.querySelector('.success-message');
const checkoutBtn = document.getElementById('checkoutBtn');
const paymentTimer = document.getElementById('paymentTimer');

// Only run if on verification page
if (verifyForm) {
  verifyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const playerId = playerIdInput.value.trim();
    
    if (!playerId) {
      alert('Please enter a valid BGMI Player ID');
      return;
    }
    
    // Show loading state
    verifyBtn.disabled = true;
    loadingElement.style.display = 'block';
    
    // Simulate verification process
    setTimeout(() => {
      // Hide loading, show success
      loadingElement.style.display = 'none';
      successMessage.style.display = 'block';
      verifyBtn.textContent = 'Verified!';
      
      // Store player ID in session storage for next page
      sessionStorage.setItem('playerId', playerId);
      
      // Show checkout button with animation
      setTimeout(() => {
        checkoutBtn.classList.add('fade-in');
        checkoutBtn.style.display = 'block';
      }, 500);
      
    }, 3000); // 3 second delay for verification
  });
}

// Handle checkout button click
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    window.location.href = 'checkout.html';
  });
}

// Handle payment selection
const paymentOptions = document.querySelectorAll('.payment-option');
if (paymentOptions.length > 0) {
  paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      paymentOptions.forEach(opt => opt.classList.remove('active'));
      // Add active class to selected option
      this.classList.add('active');
      
      // Get payment method
      const paymentMethod = this.getAttribute('data-method');
      
      // Store selected payment method
      sessionStorage.setItem('selectedPayment', paymentMethod);
      
      // Redirect to payment page after a short delay
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 500);
    });
  });
}

// Payment page countdown
if (paymentTimer) {
  let timeLeft = 300; // 5 minutes in seconds
  
  const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    paymentTimer.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
      paymentTimer.innerHTML = 'Payment link expired! <a href="checkout.html">Click here to try again</a>';
    } else {
      timeLeft--;
    }
  }, 1000);
}

// Load order details on checkout page
window.addEventListener('DOMContentLoaded', function() {
  // Set player ID on checkout page
  const playerIdElement = document.getElementById('playerIdDisplay');
  const storedPlayerId = sessionStorage.getItem('playerId');
  
  if (playerIdElement && storedPlayerId) {
    playerIdElement.textContent = `Player ID: ${storedPlayerId}`;
  }
  
  // Set selected plan details (you can modify this based on your plan selection logic)
  const planDetails = {
    name: '5200 UC',
    price: '₹420',
    delivery: 'Instant Delivery',
    total: '₹420'
  };
  
  // Update plan details if stored in session
  const storedPlan = sessionStorage.getItem('selectedPlan');
  if (storedPlan) {
    const plan = JSON.parse(storedPlan);
    Object.assign(planDetails, plan);
  }
  
  // Update plan details in the DOM
  const planNameElement = document.getElementById('planName');
  const planPriceElement = document.getElementById('planPrice');
  const deliveryElement = document.getElementById('delivery');
  const totalElement = document.getElementById('total');
  
  if (planNameElement) planNameElement.textContent = planDetails.name;
  if (planPriceElement) planPriceElement.textContent = planDetails.price;
  if (deliveryElement) deliveryElement.textContent = planDetails.delivery;
  if (totalElement) totalElement.textContent = planDetails.total;
  
  // Set payment method on payment page
  const paymentMethodElement = document.getElementById('paymentMethod');
  const storedPaymentMethod = sessionStorage.getItem('selectedPayment');
  
  if (paymentMethodElement && storedPaymentMethod) {
    paymentMethodElement.textContent = `Paying with: ${storedPaymentMethod.charAt(0).toUpperCase() + storedPaymentMethod.slice(1)}`;
  }
});

// Handle plan selection on home page
document.addEventListener('DOMContentLoaded', function() {
  const planButtons = document.querySelectorAll('.plan-btn');
  
  planButtons.forEach(button => {
    button.addEventListener('click', function() {
      const plan = {
        name: this.getAttribute('data-plan'),
        price: this.getAttribute('data-price'),
        delivery: 'Instant Delivery',
        total: this.getAttribute('data-price')
      };
      
      // Store selected plan in session
      sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
      
      // Redirect to verification page
      window.location.href = 'verify.html';
    });
  });
});
