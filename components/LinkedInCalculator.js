import { useState, useEffect } from 'react';
import styles from '../styles/Calculator.module.css';

const LinkedInCalculator = () => {
  const [formData, setFormData] = useState({
    budget: '',
    currency: 'USD',
    duration: 30,
    goal: 'clicks',
    pricingModel: 'cpm',
    targetCost: '',
    frequency: 3
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const getDefaultRates = () => ({
    cpm: {
      USD: { min: 15, max: 35, average: 25 },
      INR: { min: 1200, max: 2800, average: 2000 }
    },
    cpc: {
      USD: { min: 3, max: 8, average: 5.5 },
      INR: { min: 240, max: 640, average: 440 }
    },
    ctr: 0.4
  });

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const exchangeRate = 80;
    if (fromCurrency === toCurrency) return amount;
    if (fromCurrency === 'INR' && toCurrency === 'USD') {
      return amount / exchangeRate;
    } else if (fromCurrency === 'USD' && toCurrency === 'INR') {
      return amount * exchangeRate;
    }
    return amount;
  };

  const calculateFromCPM = (budget, cpm, frequency, duration) => {
    const impressions = (budget / cpm) * 1000;
    const reach = Math.round(impressions / frequency);
    const audienceSizeMin = Math.round(reach * 0.7);
    const audienceSizeMax = Math.round(reach * 1.3);
    
    return {
      audienceSize: { min: audienceSizeMin, max: audienceSizeMax },
      reach: reach,
      impressions: Math.round(impressions),
      frequency: frequency,
      dailyReach: Math.round(reach / duration),
      estimatedClicks: Math.round(impressions * 0.004)
    };
  };

  const calculateFromCPC = (budget, cpc, frequency, duration, ctr) => {
    const estimatedClicks = budget / cpc;
    const impressions = estimatedClicks / (ctr / 100);
    const reach = Math.round(impressions / frequency);
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
  };

  const generateInsights = (results, currency, pricingModel) => {
    const insights = [];
    
    if (results.audienceSize.max < 10000) {
      insights.push("Your audience size is quite targeted. Consider broader targeting if reach is limited.");
    } else if (results.audienceSize.min > 100000) {
      insights.push("Large audience size detected. Consider more specific targeting for better relevance.");
    } else {
      insights.push("Your audience size is in the optimal range for LinkedIn campaigns.");
    }

    if (results.frequency < 2) {
      insights.push("Low frequency may limit campaign effectiveness. Consider increasing budget or reducing audience size.");
    } else if (results.frequency > 5) {
      insights.push("High frequency may lead to ad fatigue. Consider expanding your audience or reducing budget.");
    } else {
      insights.push("Frequency is optimal for brand awareness and engagement.");
    }

    if (results.estimatedClicks < 100) {
      insights.push("Expected clicks are low. Focus on compelling ad creative and precise targeting.");
    }

    if (results.dailyReach < 1000) {
      insights.push("Consider extending campaign duration to maximize reach efficiency.");
    }

    return insights;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const calculate = () => {
    const budget = parseFloat(formData.budget);
    if (!budget || budget <= 0) {
      setShowResults(false);
      return;
    }

    const defaults = getDefaultRates();
    const budgetUSD = convertCurrency(budget, formData.currency, 'USD');
    
    let costRate;
    if (formData.targetCost && parseFloat(formData.targetCost) > 0) {
      costRate = parseFloat(formData.targetCost);
    } else {
      costRate = defaults[formData.pricingModel].USD.average;
    }

    let calculationResults;
    if (formData.pricingModel === 'cpm') {
      calculationResults = calculateFromCPM(budgetUSD, costRate, formData.frequency, formData.duration);
    } else {
      calculationResults = calculateFromCPC(budgetUSD, costRate, formData.frequency, formData.duration, defaults.ctr);
    }

    const insights = generateInsights(calculationResults, formData.currency, formData.pricingModel);
    const bidRates = defaults[formData.pricingModel][formData.currency];

    setResults({
      ...calculationResults,
      insights,
      bidRates,
      currency: formData.currency,
      pricingModel: formData.pricingModel
    });
    setShowResults(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (formData.budget) {
      const timer = setTimeout(() => calculate(), 500);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorSection}>
        <h2>Campaign Details</h2>
        
        <div className={styles.inputGroup}>
          <label htmlFor="budget">Total Campaign Budget *</label>
          <div className={styles.currencyInput}>
            <select 
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
            </select>
            <input 
              type="number" 
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter budget amount" 
              min="0" 
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="duration">Campaign Duration (days)</label>
          <input 
            type="number" 
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 30" 
            min="1" 
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="goal">Campaign Goal</label>
          <select 
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option value="clicks">Clicks</option>
            <option value="impressions">Impressions</option>
            <option value="conversions">Conversions</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pricingModel">Pricing Model</label>
          <select 
            name="pricingModel"
            value={formData.pricingModel}
            onChange={handleInputChange}
          >
            <option value="cpm">CPM (Cost per 1,000 impressions)</option>
            <option value="cpc">CPC (Cost per click)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="targetCost">
            Target {formData.pricingModel.toUpperCase()} (USD)
          </label>
          <input 
            type="number" 
            name="targetCost"
            value={formData.targetCost}
            onChange={handleInputChange}
            placeholder={formData.pricingModel === 'cpm' ? 'e.g., 25' : 'e.g., 5'} 
            min="0" 
            step="0.01" 
          />
          <small className={styles.helpText}>Leave blank for industry averages</small>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="frequency">Desired Frequency</label>
          <input 
            type="number" 
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
            placeholder="e.g., 3" 
            min="1" 
            step="0.1" 
          />
          <small className={styles.helpText}>How many times each person should see your ad</small>
        </div>

        <button 
          type="button" 
          className={styles.calculateBtn}
          onClick={calculate}
        >
          Calculate Audience Size
        </button>
      </div>

      {showResults && results && (
        <div className={styles.resultsSection}>
          <h2>Recommendations</h2>
          
          <div className={styles.resultCard}>
            <h3>Audience Size Range</h3>
            <div className={styles.resultValue}>
              <strong>{formatNumber(results.audienceSize.min)} - {formatNumber(results.audienceSize.max)}</strong> people
            </div>
          </div>

          <div className={styles.resultCard}>
            <h3>Estimated Reach</h3>
            <div className={styles.resultValue}>
              <strong>{formatNumber(results.reach)}</strong> unique users<br />
              <small>{formatNumber(results.impressions)} total impressions</small>
            </div>
          </div>

          <div className={styles.resultCard}>
            <h3>Expected Frequency</h3>
            <div className={styles.resultValue}>
              <strong>{results.frequency.toFixed(1)}x</strong><br />
              <small>Each person sees your ad {results.frequency.toFixed(1)} times</small>
            </div>
          </div>

          <div className={styles.resultCard}>
            <h3>Suggested Bid Range</h3>
            <div className={styles.resultValue}>
              <strong>
                {results.currency === 'USD' ? '$' : '₹'}{results.bidRates.min} - {results.currency === 'USD' ? '$' : '₹'}{results.bidRates.max}
              </strong><br />
              <small>Recommended {results.pricingModel.toUpperCase()} range</small>
            </div>
          </div>

          <div className={styles.insights}>
            <h3>Insights & Tips</h3>
            <div className={styles.insightsContent}>
              {results.insights.map((insight, index) => (
                <div key={index}>{insight}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInCalculator;