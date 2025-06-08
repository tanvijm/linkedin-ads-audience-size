# LinkedIn Ads Calculator - Factors.ai (Next.js)

A Next.js-powered lead generation calculator that helps marketers determine the optimal LinkedIn audience size based on their campaign budget.

## Features

- **Modern React Architecture**: Built with Next.js for optimal performance
- **Budget Input**: Supports both USD ($) and INR (₹) currencies
- **Real-time Calculations**: Uses React hooks for instant results
- **Smart Calculations**: Uses industry-standard LinkedIn advertising formulas
- **Audience Recommendations**: Provides optimal audience size ranges
- **Performance Estimates**: Shows expected reach, frequency, and engagement
- **Lead Capture**: Integrated HubSpot form for lead generation
- **Responsive Design**: CSS modules for clean, maintainable styling

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

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: CSS Modules
- **Form Integration**: HubSpot Forms API
- **Deployment**: Vercel-optimized

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanvijm/linkedin-ads-audience-size.git
   cd linkedin-ads-audience-size
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Static export (for static hosting)
npm run export
```

## HubSpot Integration

The calculator is pre-configured with Factors.ai HubSpot credentials:

- **Portal ID**: 242999486
- **Form ID**: 30c33fd0-8d8e-4d35-949d-2ade093e4b5d

The integration is handled in `components/HubSpotForm.js` using dynamic script loading.

## Project Structure

```
├── components/
│   ├── LinkedInCalculator.js    # Main calculator component
│   └── HubSpotForm.js          # Lead capture form
├── pages/
│   ├── _app.js                 # Next.js app wrapper
│   └── index.js                # Home page
├── styles/
│   ├── globals.css             # Global styles
│   ├── Home.module.css         # Homepage styles
│   ├── Calculator.module.css   # Calculator component styles
│   └── HubSpotForm.module.css  # Form component styles
├── package.json
├── next.config.js              # Next.js configuration
└── vercel.json                 # Vercel deployment config
```

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import `tanvijm/linkedin-ads-audience-size`
   - Vercel will auto-detect Next.js configuration

2. **Deploy:**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start

# Or export static files
npm run export
```

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

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

© 2024 Factors.ai. All rights reserved.