// This is an example file. Copy to environment.prod.ts and fill in your actual values.
// DO NOT commit environment.prod.ts to version control!

export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  
  // OAuth Configuration
  googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  
  // Azure AD Configuration
  azureAd: {
    clientId: 'YOUR_AZURE_AD_CLIENT_ID',
    tenantId: 'YOUR_AZURE_TENANT_ID',
    redirectUri: 'https://your-production-domain.com'
  }
};