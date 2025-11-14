export {};

declare global {
  interface Window {
    n8nChat?: {
      sendMessage: (msg: string) => void;
      onMessage?: (callback: (msg: any) => void) => void;
    };
  }
}
