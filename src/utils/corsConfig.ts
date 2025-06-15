
interface CORSConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  credentials: boolean;
}

class CORSManager {
  private config: CORSConfig;

  constructor() {
    this.config = {
      allowedOrigins: this.getAllowedOrigins(),
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'apikey',
        'x-client-info'
      ],
      credentials: true,
    };
  }

  private getAllowedOrigins(): string[] {
    const origins = ['http://localhost:5173', 'http://localhost:3000'];
    
    // Add production domains
    if (import.meta.env.VITE_PRODUCTION_URL) {
      origins.push(import.meta.env.VITE_PRODUCTION_URL);
    }
    
    // Add current origin
    if (typeof window !== 'undefined') {
      origins.push(window.location.origin);
    }

    return origins;
  }

  public getHeaders(): Record<string, string> {
    return {
      'Access-Control-Allow-Origin': this.config.allowedOrigins.join(','),
      'Access-Control-Allow-Methods': this.config.allowedMethods.join(','),
      'Access-Control-Allow-Headers': this.config.allowedHeaders.join(','),
      'Access-Control-Allow-Credentials': this.config.credentials.toString(),
    };
  }

  public isOriginAllowed(origin: string): boolean {
    return this.config.allowedOrigins.includes(origin);
  }
}

export const corsManager = new CORSManager();
