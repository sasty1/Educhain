import { useState, useEffect } from 'react';
import { getCurrentNetwork, switchToTargetNetwork, getNetworkConfig } from '../lib/contract';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

/**
 * NetworkSwitcher Component
 * Shows current network status and allows switching to the target network
 */
export default function NetworkSwitcher() {
  const [networkInfo, setNetworkInfo] = useState<{
    chainId: string;
    name: string;
    isCorrectNetwork: boolean;
    targetNetwork: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = getNetworkConfig();

  useEffect(() => {
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    try {
      const info = await getCurrentNetwork();
      setNetworkInfo(info);
      setError(null);
    } catch (err: any) {
      console.error('Failed to get network info:', err);
      setError(err.message);
    }
  };

  const handleSwitchNetwork = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await switchToTargetNetwork();
      // Wait a bit for the network to switch
      setTimeout(async () => {
        await checkNetwork();
        setIsLoading(false);
      }, 1000);
    } catch (err: any) {
      console.error('Failed to switch network:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (!networkInfo) {
    return null;
  }

  if (networkInfo.isCorrectNetwork) {
    return (
      <Alert variant="success" className="mb-6">
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          Connected to <strong>{networkInfo.name}</strong>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="warning" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Wrong Network Detected</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>
          You're on <strong>{networkInfo.name}</strong> but this app requires{' '}
          <strong>{networkInfo.targetNetwork}</strong>
        </p>
        
        {config.environment === 'sepolia' && (
          <p className="text-xs">
            💡 Need Sepolia ETH? Get it from{' '}
            <a
              href="https://sepoliafaucet.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-900 font-medium"
            >
              sepoliafaucet.com
            </a>
          </p>
        )}

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleSwitchNetwork}
          disabled={isLoading}
          variant="default"
          className="w-full mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Switching...
            </>
          ) : (
            `Switch to ${networkInfo.targetNetwork}`
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
