# LinkedIn Ads Calculator - Factors.ai

A lead generation calculator that helps marketers determine the optimal LinkedIn audience size based on their campaign budget.

## Features

- **Budget Input**: Supports both USD ($) and INR (₹) currencies
- **Campaign Planning**: Input campaign duration, goals, and pricing models
- **Smart Calculations**: Uses industry-standard LinkedIn advertising formulas
- **Audience Recommendations**: Provides optimal audience size ranges
- **Performance Estimates**: Shows expected reach, frequency, and engagement
- **Lead Capture**: Integrated HubSpot form for lead generation
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

The calculator uses the core formula:
```
Audience Size = (Total Budget ÷ CPM) ÷ Desired Frequency
```

### Input Parameters
- **Total Budget**: Campaign budget in USD or INR
- **Campaign Duration**: Length of campaign in days (optional)
- **Pricing Model**: CPM (Cost per 1,000 impressions) or CPC (Cost per click)
- **Target Cost**: Custom CPM/CPC or use industry averages
- **Desired Frequency**: How many times each person should see the ad

### Output Results
- **Audience Size Range**: Recommended min-max audience size
- **Estimated Reach**: Number of unique users and total impressions
- **Expected Frequency**: Average times each person sees the ad
- **Suggested Bid Range**: Recommended bidding range
- **Insights & Tips**: Personalized optimization recommendations

## Setup Instructions

### 1. HubSpot Integration
Replace the placeholder values in `calculator.js` and `index.html`:

```javascript
// In calculator.js, update:
portalId: "YOUR_PORTAL_ID", // Replace with your HubSpot Portal ID
formId: "YOUR_FORM_ID", // Replace with your HubSpot Form ID
```

```html
<!-- In index.html, update: -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/YOUR_HUBSPOT_ID.js"></script>
```

### 2. Customization
- Update `style.css` to match your brand colors
- Modify the Factors.ai branding in `index.html`
- Adjust default rates and formulas in `calculator.js` if needed

### 3. Deployment
Simply upload the files to your web server:
- `index.html` - Main landing page
- `calculator.js` - Calculator logic
- `style.css` - Styling and responsive design

## LinkedIn Advertising Benchmarks

The calculator uses these industry averages:

| Metric | USD | INR |
|--------|-----|-----|
| CPM | $15-35 (avg $25) | ₹1,200-2,800 (avg ₹2,000) |
| CPC | $3-8 (avg $5.50) | ₹240-640 (avg ₹440) |
| CTR | 0.4% average | 0.4% average |

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

© 2024 Factors.ai. All rights reserved.