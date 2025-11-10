/**
 * Performance monitoring utilities
 */

export function measureTime<T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> {
  const start = performance.now();
  return fn().then((result) => {
    const duration = performance.now() - start;
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    return result;
  });
}

export class PerformanceMonitor {
  private start: number;
  private checkpoints: Map<string, number> = new Map();

  constructor(private label: string) {
    this.start = performance.now();
  }

  checkpoint(name: string) {
    const now = performance.now();
    const duration = now - this.start;
    this.checkpoints.set(name, duration);
    console.log(`[${this.label}] ${name}: ${duration.toFixed(2)}ms`);
  }

  end() {
    const total = performance.now() - this.start;
    console.log(`[${this.label}] Total: ${total.toFixed(2)}ms`);
    return {
      total,
      checkpoints: Object.fromEntries(this.checkpoints),
    };
  }
}
