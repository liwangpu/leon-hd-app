// import { TestBed, async } from '@angular/core/testing';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ConfigService } from '../config.service';
// import { AuthService } from './auth.service';
// import { TestConfig } from '../../../tests/testConfig.spec';
// import { TranslateModule } from '@ngx-translate/core';
// import { AuthInterceptor } from '../../interceptors/auth.interceptor';

// describe('auth service tests', () => {

//     let authorSrv: AuthService;

//     beforeAll(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientModule, TranslateModule.forRoot()]
//             , providers: [
//                 ConfigService
//                 , AuthService
//                 , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
//             ]
//         });
//         authorSrv = TestBed.get(AuthService);
//     })//beforeAll

//     it('admin login test', async (done) => {
//         authorSrv.login(TestConfig.AdminAccount, TestConfig.DefaultAdminPassword)
//             .subscribe(rdata => done()
//                 , err => fail(err)
//             );
//     })//it

// });//describe