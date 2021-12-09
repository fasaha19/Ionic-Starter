import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AboutUsPage } from 'src/app/about-us/about-us.page';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { ConfigService } from 'src/services/config/config.service';
import { CurrencyListPage } from '../currency-list/currency-list.page';
import { LanguagePage } from '../language/language.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { RefundPolicyPage } from '../refund-policy/refund-policy.page';
import { TermServicesPage } from '../term-services/term-services.page';

@Component({
  selector: 'app-app-settings-modal',
  templateUrl: './app-settings-modal.page.html',
  styleUrls: ['./app-settings-modal.page.scss'],
})
export class AppSettingsModalPage implements OnInit {

  darkModeToggle = false;
  constructor(
    public modalCtrl: ModalController,
    public appUserService: AppUserService,
    public appHttpService: AppHttpService,
    public config: ConfigService
  ) {
    if (this.config.darkModeBool) this.darkModeToggle = true
  }

  async openAboutUsPage() {
    let modal = await this.modalCtrl.create({
      component: AboutUsPage,
    });
    return await modal.present();
  }
  async openRefundPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: RefundPolicyPage,
    });
    return await modal.present();
  }
  async openPrivacyPolicyPage() {
    let modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage,
    });
    return await modal.present();
  }
  async openTermsPage() {
    let modal = await this.modalCtrl.create({
      component: TermServicesPage,
    });
    return await modal.present();
  }

  async openLanguagePage() {
    let modal = await this.modalCtrl.create({
      component: LanguagePage,
    });
    return await modal.present();
  }
  async openCurrencyPage() {
    let modal = await this.modalCtrl.create({
      component: CurrencyListPage,
    });
    return await modal.present();
  }
  logout() {

    this.appHttpService.postHttp('customer_logout', {}, true).then((data: any) => {
      this.appUserService.logOut()
      this.dismiss()
    });

  }

  changeDarkMode() {
    this.config.enableDarkMode(this.darkModeToggle)
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
