import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = environment.apiHost;
        if (req.url.startsWith(baseUrl)) {
            return next.handle(req);
        }
        const apiReq = req.clone({ url: `${environment.apiHost}${req.url}` });
        return next.handle(apiReq);
    }
    
}
