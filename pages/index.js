import Head from 'next/head';
import LinkedInCalculator from '../components/LinkedInCalculator';
import HubSpotForm from '../components/HubSpotForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkedIn Ads Calculator - Optimize Your Campaign Budget | Factors.ai</title>
        <meta name="description" content="Calculate the ideal LinkedIn audience size for your campaign budget. Get recommended audience ranges, reach estimates, and bid suggestions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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