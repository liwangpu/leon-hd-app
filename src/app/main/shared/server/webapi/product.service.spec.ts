// // import { TestBed, async } from '@angular/core/testing';
// // import { ProductService } from './product.service';
// // import { ConfigService } from '../config.service';
// // import { TranslateService } from '@ngx-translate/core';
// // import { TranslateModule } from '@ngx-translate/core';
// // import { AuthService } from './auth.service';
// // import { TestConfig } from '../../../tests/testConfig.spec';
// // import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// // import { AuthInterceptor } from '../../interceptors/auth.interceptor';
// // import { Product } from '../../models/product';
// // import 'rxjs/add/operator/toPromise';

// // describe('product service tests', () => {

// //     let productSrv: ProductService;
// //     let authorSrv: AuthService;

// //     beforeAll(async (done) => {
// //         TestBed.configureTestingModule({
// //             imports: [HttpClientModule, TranslateModule.forRoot()]
// //             , providers: [
// //                 { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// //                 , ProductService
// //                 , ConfigService
// //                 , AuthService
// //             ]
// //         });
// //         productSrv = TestBed.get(ProductService);
// //         authorSrv = TestBed.get(AuthService);

// //         authorSrv.login(TestConfig.AdminAccount, TestConfig.DefaultAdminPassword)
// //             .subscribe(rdata => console.log('product unit test login sucessful')
// //                 , err => { console.log('product unit test login failed') }
// //                 , () => done()
// //             );
// //     })//beforeAll

// //     it('getById', async (done) => {
// //         productSrv.getById('N0U5VNVW8MNG6Q').subscribe(rdata => done()
// //             , err => fail(err)
// //         );
// //     }, 5000)//it


// //     it('create', async (done) => {
// //         let product = new Product();
// //         product.name = "sample product";
// //         product.description = "sample product from unit test";
// //         productSrv.create(product).subscribe(rdata => { expect(rdata.id).not.toBeUndefined(), done() }
// //             , err => { fail(err) }
// //         );
// //     }, 5000)//it

// //     // it('update', async (done) => {
// //     //     let product = new Product();
// //     //     product.name = "sample product";
// //     //     product.description = "sample product from unit test";
// //     //     productSrv.create(product)
// //     //         .toPromise()
// //     //         .then(rdata => {
// //     //             product.id = rdata['id'];
// //     //             product.name = 'HelloProduct';
// //     //             return Promise.resolve();
// //     //         }).then(() => {
// //     //             productSrv.update(product).subscribe(rdata => {
// //     //                 expect(rdata['name']).toBe('HelloProduct');
// //     //                 done();
// //     //             }, err => fail(err))
// //     //         }).catch(err => fail(err))
// //     // }, 5000)//it

// //     it('delete', async (done) => {
// //         let product = new Product();
// //         product.name = "sample product";
// //         product.description = "sample product from unit test";
// //         productSrv.create(product)
// //             .toPromise()
// //             .then(rdata => {
// //                 product.id = rdata['id'];
// //                 product.name = 'HelloProduct';
// //                 return Promise.resolve();
// //             }).then(() => {
// //                 productSrv.delete(product.id).subscribe(() => {
// //                     done();
// //                 }, err => fail(err));
// //             }).catch(err => fail(err))
// //     }, 5000)//it

// //     it('query', async (done) => {
// //         productSrv.query("", 1, 100, "", true).subscribe(rdata => {
// //             done()
// //         });
// //     }, 5000)//it

// // });//describe




// import { TestBed, async } from '@angular/core/testing';
// import { ProductService } from './product.service';
// import { ConfigService } from '../config.service';
// import { TranslateService } from '@ngx-translate/core';
// import { TranslateModule } from '@ngx-translate/core';
// import { AuthService } from './auth.service';
// import { TestConfig } from '../../../tests/testConfig.spec';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../interceptors/auth.interceptor';
// import { Product } from '../../models/product';
// import { AppServiceModule } from '../app.service.module';
// import 'rxjs/add/operator/toPromise';


// describe('product service tests', () => {
//     let productSrv: ProductService;
//     let authorSrv: AuthService;

//     beforeAll(async (done) => {
//         TestBed.configureTestingModule({
//             imports: [AppServiceModule]
//         });
//         productSrv = TestBed.get(ProductService);
//         authorSrv = TestBed.get(AuthService);

//         authorSrv.login(TestConfig.AdminAccount, TestConfig.DefaultAdminPassword)
//             .subscribe(rdata => console.log('product unit test login sucessful')
//                 , err => { console.log('product unit test login failed') }
//                 , () => done()
//             );
//     })//beforeAll

//     it('create', async (done) => {
//         let product = new Product();
//         product.name = "sample product";
//         product.description = "sample product from unit test";
//         productSrv.create(product).subscribe(rdata => {
//             expect(rdata.id).not.toBeUndefined();
//             done()
//         }, err => {
//             fail(err);
//         });
//     }, 5000)//it

// })//describe