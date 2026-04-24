// This is an example file. Copy to environment.ts and fill in your actual values.
// DO NOT commit environment.ts to version control!

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  
  // OAuth Configuration
  googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  
  // Azure AD Configuration
  azureAd: {
    clientId: 'YOUR_AZURE_AD_CLIENT_ID',
    tenantId: 'YOUR_AZURE_TENANT_ID',
    redirectUri: 'http://localhost:4200'
  }
};