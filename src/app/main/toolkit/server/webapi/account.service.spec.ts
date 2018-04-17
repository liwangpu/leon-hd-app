// import { TestBed, async } from '@angular/core/testing';
// import { ConfigService } from '../config.service';
// import { TranslateService } from '@ngx-translate/core';
// import { TranslateModule } from '@ngx-translate/core';
// import { AuthService } from './auth.service';
// import { TestConfig } from '../../../tests/testConfig.spec';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../interceptors/auth.interceptor';
// import { AccountService } from './account.service';
// import 'rxjs/add/operator/toPromise';

// describe('product service tests', () => {

//     let accountSrv: AccountService;
//     let authorSrv: AuthService;

//     beforeAll(async (done) => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientModule, TranslateModule.forRoot()]
//             , providers: [
//                 { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
//                 , AccountService
//                 , ConfigService
//                 , AuthService
//             ]
//         });
//         accountSrv = TestBed.get(AccountService);
//         authorSrv = TestBed.get(AuthService);

//         authorSrv.login(TestConfig.AdminAccount, TestConfig.DefaultAdminPassword)
//             .subscribe(rdata => console.log('product unit test login sucessful')
//                 , err => { console.log('product unit test login failed') }
//                 , () => done()
//             );
//     }, 5000)//beforeAll


//     it('getNavigation', async (done) => {
//         done();
//         accountSrv.getNavigation().subscribe(rdata => {
//             console.log(666, 'AccountService', rdata);
//         }, err => {
//             console.log(666, 'AccountService err:', err);
//         }, () => done());
//     }, 5000);

// });//describe