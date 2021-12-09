import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {


  public slideOpts: { [k: string]: any } = {
    autoplay: {
      delay: 2500,
      //disableOnInteraction: false,
    }
  };

  constructor(
    public shared: SharedDataService,
    public navCtrl: NavController,
    public config: ConfigService,
    public loading: LoadingService,
    public appHttpService: AppHttpService,
    public appUserService: AppUserService,
    public appLogService: AppLogService
  ) {

  }
  failedImageLoad($event) {
    console.log($event)
  }
  //===============================================================================================
  //on click image banners
  bannerClick(image) {

    // if (image.banner_navigation.name == 'Category') {
    //   this.navCtrl.navigateForward("/products/" + image.banner_ref_id);
    // }
    // else if (image.banner_navigation.name == 'Product') {
    //   this.navCtrl.navigateForward("/product-detail/" + image.banner_ref_id)
    // }
    // else {
      this.navCtrl.navigateForward("/products");
   // }
  }

  ngOnInit() {
  }

}
