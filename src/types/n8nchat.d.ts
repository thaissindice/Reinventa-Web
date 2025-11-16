declare global {
  interface Window {
    n8nChat?: {
      init: (config: any) => {
        sendMessage: (message: string) => void;
        onMessage: (callback: (data: any) => void) => void;
      };
    };
  }
}

export {};
