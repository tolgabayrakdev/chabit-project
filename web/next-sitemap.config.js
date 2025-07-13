/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vunqr.com',
  generateRobotsTxt: false, // robots.txt'yi manuel oluşturduğun için false
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: false,
  
  additionalPaths: async (config) => {
    const result = [];
    const baseApiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://vunqr-backend-production.up.railway.app' 
      : 'http://localhost:1234';

    try {
      const response = await fetch(`${baseApiUrl}/api/link-in-bio/public/all`);
      if (response.ok) {
        const profiles = await response.json();

        profiles.forEach((profile) => {
          result.push({
            loc: `/u/${profile.username}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date(profile.created_at || Date.now()).toISOString(),
          });
        });
      }
    } catch (error) {
      console.error('Link-in-bio profilleri alınamadı:', error.message);
    }

    return result;
  },
};
