class LinkedInAdsCalculator {
    constructor() {
        this.initializeEventListeners();
        this.setDefaultValues();
    }

    initializeEventListeners() {
        document.getElementById('calculate-btn').addEventListener('click', () => this.calculate());
        document.getElementById('pricing-model').addEventListener('change', () => this.updatePricingModel());
        document.getElementById('currency').addEventListener('change', () => this.updateCurrencyLabels());
        
        // Real-time calculation on input change
        const inputs = ['budget', 'duration', 'target-cost', 'frequency'];
        inputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.debounceCalculate());
        });
    }

    setDefaultValues() {
        this.updatePricingModel();
        this.updateCurrencyLabels();
    }

    updatePricingModel() {
        const pricingModel = document.getElementById('pricing-model').value;
        const targetCostGroup = document.getElementById('target-cost-group');
        const targetCostInput = document.getElementById('target-cost');
        const label = targetCostGroup.querySelector('label');
        
        if (pricingModel === 'cpm') {
            label.textContent = 'Target CPM (USD)';
            targetCostInput.placeholder = 'e.g., 25';
        } else {
            label.textContent = 'Target CPC (USD)';
            targetCostInput.placeholder = 'e.g., 5';
        }
    }

    updateCurrencyLabels() {
        const currency = document.getElementById('currency').value;
        const budgetInput = document.getElementById('budget');
        
        if (currency === 'INR') {
            budgetInput.placeholder = 'Enter budget amount in ₹';
        } else {
            budgetInput.placeholder = 'Enter budget amount in $';
        }
    }

    debounceCalculate() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.calculate(), 500);
    }

    getDefaultRates() {
        return {
            cpm: {
                USD: { min: 15, max: 35, average: 25 },
                INR: { min: 1200, max: 2800, average: 2000 }
            },
            cpc: {
                USD: { min: 3, max: 8, average: 5.5 },
                INR: { min: 240, max: 640, average: 440 }
            },
            ctr: 0.4 // Average click-through rate for LinkedIn ads (0.4%)
        };
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        const exchangeRate = 80; // Approximate INR to USD rate
        
        if (fromCurrency === toCurrency) return amount;
        
        if (fromCurrency === 'INR' && toCurrency === 'USD') {
            return amount / exchangeRate;
        } else if (fromCurrency === 'USD' && toCurrency === 'INR') {
            return amount * exchangeRate;
        }
        
        return amount;
    }

    calculate() {
        try {
            const budget = parseFloat(document.getElementById('budget').value);
            const currency = document.getElementById('currency').value;
            const duration = parseInt(document.getElementById('duration').value) || 30;
            const goal = document.getElementById('goal').value;
            const pricingModel = document.getElementById('pricing-model').value;
            const targetCost = parseFloat(document.getElementById('target-cost').value);
            const frequency = parseFloat(document.getElementById('frequency').value) || 3;

            if (!budget || budget <= 0) {
                this.hideResults();
                return;
            }

            const defaults = this.getDefaultRates();
            const budgetUSD = this.convertCurrency(budget, currency, 'USD');
            
            // Use target cost or default rates
            let costRate;
            if (targetCost && targetCost > 0) {
                costRate = targetCost;
            } else {
                costRate = defaults[pricingModel].USD.average;
            }

            let results;
            if (pricingModel === 'cpm') {
                results = this.calculateFromCPM(budgetUSD, costRate, frequency, duration);
            } else {
                results = this.calculateFromCPC(budgetUSD, costRate, frequency, duration, defaults.ctr);
            }

            this.displayResults(results, currency, pricingModel, defaults);
            this.showResults();

        } catch (error) {
            console.error('Calculation error:', error);
            this.hideResults();
        }
    }

    calculateFromCPM(budget, cpm, frequency, duration) {
        // Formula: Audience Size = (Budget ÷ CPM) ÷ Frequency * 1000
        const impressions = (budget / cpm) * 1000;
        const reach = Math.round(impressions / frequency);
        
        // Calculate audience size ranges (±30%)
        const audienceSizeMin = Math.round(reach * 0.7);
        const audienceSizeMax = Math.round(reach * 1.3);
        
        return {
            audienceSize: { min: audienceSizeMin, max: audienceSizeMax },
            reach: reach,
            impressions: Math.round(impressions),
            frequency: frequency,
            dailyReach: Math.round(reach / duration),
            estimatedClicks: Math.round(impressions * 0.004) // 0.4% CTR
        };
    }

    calculateFromCPC(budget, cpc, frequency, duration, ctr) {
        // Calculate from CPC backwards to impressions
        const estimatedClicks = budget / cpc;
        const impressions = estimatedClicks / (ctr / 100);
        const reach = Math.round(impressions / frequency);
        
        // Calculate audience size ranges (±30%)
        const audienceSizeMin = Math.round(reach * 0.7);
        const audienceSizeMax = Math.round(reach * 1.3);
        
        return {
            audienceSize: { min: audienceSizeMin, max: audienceSizeMax },
            reach: reach,
            impressions: Math.round(impressions),
            frequency: frequency,
            dailyReach: Math.round(reach / duration),
            estimatedClicks: Math.round(estimatedClicks)
        };
    }

    displayResults(results, currency, pricingModel, defaults) {
        // Audience Size
        document.getElementById('audience-size').innerHTML = 
            `<strong>${this.formatNumber(results.audienceSize.min)} - ${this.formatNumber(results.audienceSize.max)}</strong> people`;

        // Estimated Reach
        document.getElementById('estimated-reach').innerHTML = 
            `<strong>${this.formatNumber(results.reach)}</strong> unique users<br>
             <small>${this.formatNumber(results.impressions)} total impressions</small>`;

        // Expected Frequency
        document.getElementById('expected-frequency').innerHTML = 
            `<strong>${results.frequency.toFixed(1)}x</strong><br>
             <small>Each person sees your ad ${results.frequency.toFixed(1)} times</small>`;

        // Bid Range
        const bidRates = defaults[pricingModel][currency];
        const bidSymbol = currency === 'USD' ? '$' : '₹';
        document.getElementById('bid-range').innerHTML = 
            `<strong>${bidSymbol}${bidRates.min} - ${bidSymbol}${bidRates.max}</strong><br>
             <small>Recommended ${pricingModel.toUpperCase()} range</small>`;

        // Insights
        this.generateInsights(results, currency, pricingModel);
    }

    generateInsights(results, currency, pricingModel) {
        const insights = [];
        
        // Audience size insights
        if (results.audienceSize.max < 10000) {
            insights.push("• Your audience size is quite targeted. Consider broader targeting if reach is limited.");
        } else if (results.audienceSize.min > 100000) {
            insights.push("• Large audience size detected. Consider more specific targeting for better relevance.");
        } else {
            insights.push("• Your audience size is in the optimal range for LinkedIn campaigns.");
        }

        // Frequency insights
        if (results.frequency < 2) {
            insights.push("• Low frequency may limit campaign effectiveness. Consider increasing budget or reducing audience size.");
        } else if (results.frequency > 5) {
            insights.push("• High frequency may lead to ad fatigue. Consider expanding your audience or reducing budget.");
        } else {
            insights.push("• Frequency is optimal for brand awareness and engagement.");
        }

        // Performance insights
        if (results.estimatedClicks < 100) {
            insights.push("• Expected clicks are low. Focus on compelling ad creative and precise targeting.");
        }

        // Budget optimization
        if (results.dailyReach < 1000) {
            insights.push("• Consider extending campaign duration to maximize reach efficiency.");
        }

        document.getElementById('insights-content').innerHTML = insights.join('<br>');
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    showResults() {
        document.getElementById('results-section').style.display = 'block';
        document.getElementById('results-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    hideResults() {
        document.getElementById('results-section').style.display = 'none';
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkedInAdsCalculator();
});

// HubSpot form initialization
function initializeHubSpotForm() {
    if (window.hbspt) {
        window.hbspt.forms.create({
            region: "na1",
            portalId: "242999486",
            formId: "30c33fd0-8d8e-4d35-949d-2ade093e4b5d"
            target: "#hubspot-form"
        });
    }
}

// Initialize HubSpot form when script loads
window.addEventListener('load', () => {
    setTimeout(initializeHubSpotForm, 1000);
});