import { Observable } from 'rxjs';

export function getRandomDelay(start: number = 5000, end: number = 10000) {
  return new Observable(sub => {
    let timeout: NodeJS.Timer;
    
    (function push() {
      const random = getRandomNumber(start, end);
      timeout = setTimeout(() => {
        sub.next(random);
        push();
      }, random);
    })();
    
    return () => clearTimeout(timeout);
  })
}

export function getRandomNumber(start: number, end: number) {
  return (Math.random() * end) + start;
}