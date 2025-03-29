import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

// Глобальный счетчик активных соединений
let activeConnections = 0;

// Функциональный интерцептор для Angular 16+
export const connectionLimitInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Увеличиваем счетчик при запросе
  activeConnections++;

  // Логирование активных соединений
  if (activeConnections > 8) {
    console.log(`Active connections: ${activeConnections}`);
  }

  return next(req).pipe(
    finalize(() => {
      // Уменьшаем счетчик после завершения запроса
      activeConnections--;
    })
  );
};
