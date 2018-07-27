import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

export class WebapiBaseService {

  header: HttpHeaders;//默认为application/json的Content-Type Header
  private uriBase: string;//webapi基路径 例如:localhost:4200
  public uriPart: string;//webapi实体路径 例如products
  /**
   * 完整的webapi请求路径
   */
  public get uri(): string {
    return `${this.uriBase}/${this.uriPart}`;
  }
  constructor(protected httpClient: HttpClient) {
    this.uriBase = environment.serveBase;

    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}
