// because we don't know if we're in localhost or our domain, 
// we create a baseUrl identifier

export default function getBaseURL() {
    if(typeof window !== 'undefined') return ''
    //because vercel intentionally returns "vercel_url" we should set it to our own cutstom domain
    if(process.env.VERCEL_URl) return `https://${process.env.DOMAIN_URL}`
    'http://localhost:3000'
}