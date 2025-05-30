
import { useEffect, useRef, useState } from 'react';

interface WebSocketManagerProps {
  onCodeUpdate: (code: string) => void;
  onConnectionChange: (connected: boolean) => void;
}

export const WebSocketManager = ({ onCodeUpdate, onConnectionChange }: WebSocketManagerProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = () => {
    try {
      // In a real implementation, this would connect to your WebSocket server
      // For now, we'll simulate the connection
      const mockWs = {
        readyState: WebSocket.OPEN,
        send: (data: string) => console.log('Mock WS send:', data),
        close: () => console.log('Mock WS close'),
        addEventListener: (event: string, handler: Function) => {
          if (event === 'message') {
            // Simulate receiving updates
            setTimeout(() => {
              handler({ data: JSON.stringify({ type: 'codeUpdate', code: '// Updated via WebSocket' }) });
            }, 5000);
          }
        },
        removeEventListener: () => {}
      } as any;

      wsRef.current = mockWs;
      setIsConnected(true);
      onConnectionChange(true);

      // Listen for code updates
      mockWs.addEventListener('message', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'codeUpdate') {
            onCodeUpdate(data.code);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      });

    } catch (error) {
      console.error('WebSocket connection failed:', error);
      scheduleReconnect();
    }
  };

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = setTimeout(() => {
      if (!isConnected) {
        connect();
      }
    }, 3000);
  };

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Expose methods for external use
  useEffect(() => {
    (window as any).sendWebSocketUpdate = (code: string) => {
      if (wsRef.current && isConnected) {
        wsRef.current.send(JSON.stringify({ type: 'codeUpdate', code }));
      }
    };

    return () => {
      delete (window as any).sendWebSocketUpdate;
    };
  }, [isConnected]);

  return null;
};
