
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, Server } from 'lucide-react';

interface ServerStatus {
  id: string;
  name: string;
  url: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  load: number;
  lastCheck: Date;
}

const LoadBalancingManager: React.FC = () => {
  const [servers, setServers] = useState<ServerStatus[]>([
    {
      id: '1',
      name: 'Primary API',
      url: 'https://api.orchidai.com',
      status: 'healthy',
      responseTime: 120,
      load: 65,
      lastCheck: new Date()
    },
    {
      id: '2',
      name: 'Secondary API',
      url: 'https://api-backup.orchidai.com',
      status: 'healthy',
      responseTime: 180,
      load: 35,
      lastCheck: new Date()
    },
    {
      id: '3',
      name: 'Image Processing',
      url: 'https://images.orchidai.com',
      status: 'degraded',
      responseTime: 450,
      load: 85,
      lastCheck: new Date()
    }
  ]);

  const [autoFailover, setAutoFailover] = useState(true);

  useEffect(() => {
    const checkServerHealth = async () => {
      const updatedServers = await Promise.all(
        servers.map(async (server) => {
          try {
            const start = Date.now();
            const response = await fetch(`${server.url}/health`, {
              method: 'HEAD',
              timeout: 5000
            } as any);
            const responseTime = Date.now() - start;

            return {
              ...server,
              status: response.ok ? 'healthy' as const : 'degraded' as const,
              responseTime,
              lastCheck: new Date()
            };
          } catch (error) {
            return {
              ...server,
              status: 'unhealthy' as const,
              responseTime: 0,
              lastCheck: new Date()
            };
          }
        })
      );

      setServers(updatedServers);

      // Auto-failover logic
      if (autoFailover) {
        const primaryUnhealthy = updatedServers[0].status === 'unhealthy';
        if (primaryUnhealthy) {
          console.log('Primary server unhealthy, failing over to secondary');
          // In a real implementation, this would update the API endpoint
        }
      }
    };

    // Check health every 30 seconds
    const interval = setInterval(checkServerHealth, 30000);
    checkServerHealth(); // Initial check

    return () => clearInterval(interval);
  }, [servers, autoFailover]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'unhealthy': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const overallHealth = () => {
    const healthyCount = servers.filter(s => s.status === 'healthy').length;
    const total = servers.length;
    return `${healthyCount}/${total} Healthy`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Load Balancing Status
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{overallHealth()}</Badge>
              <Button
                variant={autoFailover ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoFailover(!autoFailover)}
              >
                Auto Failover: {autoFailover ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {servers.map((server) => (
              <div key={server.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(server.status)}
                      <h3 className="font-semibold">{server.name}</h3>
                    </div>
                    <Badge className={getStatusColor(server.status)}>
                      {server.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last check: {server.lastCheck.toLocaleTimeString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="font-semibold">
                      {server.responseTime > 0 ? `${server.responseTime}ms` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Load</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            server.load > 80 ? 'bg-red-500' :
                            server.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${server.load}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{server.load}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Endpoint</p>
                    <p className="font-mono text-sm">{server.url}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {servers.filter(s => s.status === 'healthy').map((server, index) => {
              const weight = server.status === 'healthy' ? 
                Math.max(10, 100 - server.load) : 0;
              const totalWeight = servers
                .filter(s => s.status === 'healthy')
                .reduce((sum, s) => sum + Math.max(10, 100 - s.load), 0);
              const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;

              return (
                <div key={server.id} className="flex items-center gap-3">
                  <div className="w-24 text-sm">{server.name}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-right">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadBalancingManager;
