/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vunqr.com',
  generateRobotsTxt: false, // robots.txt'yi manuel oluşturduğumuz için false
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: false,
  // Dinamik rotalar için
  additionalPaths: async (config) => {
    const result = []
    
    // Burada dinamik sayfalarınızı ekleyebilirsiniz
    // Örnek:
    // const pages = await fetch('https://api.vunqr.com/pages')
    // pages.forEach((page) => {
    //   result.push({
    //     loc: `/${page.slug}`,
    //     changefreq: 'daily',
    //     priority: 0.7,
    //     lastmod: new Date().toISOString(),
    //   })
    // })

    return result
  },
} 