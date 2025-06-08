import Head from 'next/head';
import LinkedInCalculator from '../components/LinkedInCalculator';
import HubSpotForm from '../components/HubSpotForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkedIn Ads Calculator - Optimize Your Campaign Budget & Audience Size | Factors.ai</title>
        <meta name="description" content="Free LinkedIn ads calculator to determine optimal audience size, budget allocation, and bidding strategy. Get data-driven recommendations for CPM, CPC, reach, and frequency." />
        <meta name="keywords" content="LinkedIn ads calculator, LinkedIn advertising budget, audience size calculator, CPM calculator, CPC calculator, LinkedIn campaign planning, social media advertising, B2B marketing calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Factors.ai" />
        <link rel="canonical" href="https://linkedinads.factors.ai" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="LinkedIn Ads Calculator - Optimize Your Campaign Budget | Factors.ai" />
        <meta property="og:description" content="Free LinkedIn ads calculator to determine optimal audience size, budget allocation, and bidding strategy. Get data-driven recommendations for CPM, CPC, reach, and frequency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkedinads.factors.ai" />
        <meta property="og:site_name" content="Factors.ai" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinkedIn Ads Calculator - Optimize Your Campaign Budget | Factors.ai" />
        <meta name="twitter:description" content="Free LinkedIn ads calculator to determine optimal audience size, budget allocation, and bidding strategy." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LinkedIn Ads Calculator",
              "description": "Calculate optimal LinkedIn audience size and budget allocation for advertising campaigns",
              "url": "https://linkedinads.factors.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "Factors.ai",
                "url": "https://factors.ai"
              },
              "featureList": [
                "LinkedIn audience size calculation",
                "Budget optimization recommendations",
                "CPM and CPC estimation",
                "Multi-currency support",
                "Real-time campaign insights"
              ]
            })
          }}
        />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>Factors.ai</h1>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.heroSection}>
            <h1>LinkedIn Ads Calculator</h1>
            <p className={styles.subtitle}>
              Optimize your LinkedIn campaign budget with data-driven audience size recommendations
            </p>
          </div>

          <LinkedInCalculator />
          <HubSpotForm />
          
          <section className={styles.infoSection}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h2>How Should You Calculate Your LinkedIn Ads Budget?</h2>
                <div className={styles.infoContent}>
                  <p>Calculating the right LinkedIn ads budget requires understanding key metrics and industry benchmarks:</p>
                  <ul>
                    <li><strong>Cost Per Mille (CPM):</strong> Typically ranges from $15-35 USD for LinkedIn ads</li>
                    <li><strong>Cost Per Click (CPC):</strong> Usually between $3-8 USD depending on targeting</li>
                    <li><strong>Audience Size:</strong> Should be 10,000-100,000 for optimal performance</li>
                    <li><strong>Frequency:</strong> Aim for 2-4 exposures per person for effective reach</li>
                    <li><strong>Campaign Duration:</strong> Longer campaigns often have better cost efficiency</li>
                  </ul>
                  <p>Our calculator uses the formula: <strong>Audience Size = (Total Budget ÷ CPM) ÷ Desired Frequency</strong> to help you determine the optimal audience size for your budget.</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <h2>Why Use This LinkedIn Ads Calculator?</h2>
                <div className={styles.infoContent}>
                  <ul>
                    <li><strong>Data-Driven Decisions:</strong> Make informed choices based on industry benchmarks and proven formulas</li>
                    <li><strong>Budget Optimization:</strong> Avoid overspending or underspending on your LinkedIn campaigns</li>
                    <li><strong>Audience Sizing:</strong> Get precise audience size recommendations for maximum ROI</li>
                    <li><strong>Multi-Currency Support:</strong> Calculate budgets in USD or INR with localized benchmarks</li>
                    <li><strong>Real-Time Results:</strong> Instantly see projected reach, frequency, and performance metrics</li>
                    <li><strong>Expert Insights:</strong> Receive actionable recommendations to improve campaign performance</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <h2>LinkedIn Advertising Best Practices</h2>
                <div className={styles.infoContent}>
                  <ul>
                    <li><strong>Start Small:</strong> Begin with smaller audiences to test messaging and creative</li>
                    <li><strong>A/B Testing:</strong> Test different ad formats, headlines, and targeting options</li>
                    <li><strong>Professional Content:</strong> LinkedIn users expect high-quality, business-focused content</li>
                    <li><strong>Target Job Functions:</strong> Use LinkedIn's unique professional targeting capabilities</li>
                    <li><strong>Monitor Frequency:</strong> Keep frequency between 2-4 to avoid ad fatigue</li>
                    <li><strong>Optimize Bidding:</strong> Use our suggested bid ranges for competitive positioning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024 Factors.ai. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}