import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders({
      'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI0NDMzNjQ1NDViNTE5OTQwM2Y3MDkiLCJpYXQiOjE1OTcwOTcyOTN9.nhYHdxbhCvacTnMHJ131OBM5bBVZpGdJGdzmgdW-gfM'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError( this.manejarError )
    );

  }

  manejarError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(`Error inesperado en la petición ${error}`)
  }

}
