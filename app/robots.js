// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/profile/',
        '/checkout/',
        '/payment-success/',
        '/sign-in/',
        '/sign-up/',
        '/_next/'
      ],
    },
    sitemap: 'https://dzbeninluxecajou.com/sitemap.xml',
  }
}