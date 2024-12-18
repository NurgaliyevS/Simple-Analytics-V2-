declare global {
  interface Window {
    sa_event?: (...args: any[]) => void;
  }
}