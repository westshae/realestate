import { useClientStore } from '@/components/stores/client';
import { Alert, AlertDescription } from '@/components/ui/basic/alert';
import { Button } from '@/components/ui/basic/button';
import { Coffee } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const UpdatesPage: React.FC = () => {
  const { getOrGenerateClientId } = useClientStore();
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const id = getOrGenerateClientId();
    console.log('Generated Client ID:', id);

    const eventSource = new EventSource(`/api/stages?client_id=${id}`);

    eventSource.onopen = () => {
      console.log('SSE connection established');
      setIsConnected(true);
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
      setIsConnected(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (!parsed.stageMessage) return;
        setMessages((prev) => [...prev, parsed.stageMessage]);
      } catch (error) {
        console.error('Error processing SSE message:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [getOrGenerateClientId]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Coffee Updates
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay informed about the status of your coffee order in real-time
          </p>
        </div>



        <div className="space-y-3">
          {isConnected && messages.length === 0 && (

            <Alert className="border-gray-200 bg-white shadow-sm flex items-center gap-2 p-3">
              <AlertDescription className='flex items-center gap-2 text-sm sm:text-base'>
                <Coffee className="h-6 w-6 text-accent" />
                Waiting for updates...
              </AlertDescription>
            </Alert>
          )}

          {messages.map((message, index) => (
            <Alert
              key={index}
              className="border-accent bg-white shadow-sm flex items-center gap-2 p-3"
            >
              <AlertDescription className='flex items-center gap-2 text-sm sm:text-base'>
                <Coffee className="h-6 w-6 text-accent" />
                {message}
              </AlertDescription>

            </Alert>
          ))}

          {messages.length > 0 && (
            <div className="pt-4 text-center">
              <Button variant="navigation" size="lg" className="w-full max-w-xs">
                <Link href="/pickup">Go to Pickup</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatesPage;
