import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { DessertService } from "./main/content/services/dessert.service";
import { environment } from "../environments/environment";
@Component({
    selector: 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    moc: string;
    constructor(private fuseSplashScreen: FuseSplashScreenService, private translate: TranslateService, private dessertSrv: DessertService) {
        // Add languages
        this.translate.addLangs(['en', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language
        this.translate.use('en');

        this.dessertSrv.restoreCache();

        //测试专用
        this.moc = environment.moc;
    }
}
