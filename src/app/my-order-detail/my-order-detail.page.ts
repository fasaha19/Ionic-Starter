import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, IonContent, IonRefresher } from '@ionic/angular';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { LoadingService } from 'src/services/loading/loading.service';
import { GoogleMaps, GoogleMapsEvent, LatLng, Marker, Environment } from '@ionic-native/google-maps';

import firebase from 'firebase/app';
import 'firebase/database';

import { AppHttpService } from 'src/services/app-http/app-http.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { AppUserService } from 'src/services/app-user/app-user.service';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { AppAlertService } from 'src/services/app-alert/app-alert.service';
@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.page.html',
  styleUrls: ['./my-order-detail.page.scss'],
})
export class MyOrderDetailPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonRefresher, { static: false }) ionRefresher: IonRefresher;
  order: { [k: string]: any } = {};
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public shared: SharedDataService,
    public appHttpService: AppHttpService,
    public loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    public appTranslationService: AppTranslationService,
    public appUserService: AppUserService,
    public appLogService: AppLogService,
    public appAlertService: AppAlertService
  ) {
    //this.order = this.shared.myOrderDetialPageData;
    this.getData()
  }
  getSingleProductDetail(id) {
    var dat: { [k: string]: any } = {};
    if (this.appUserService.customerData != null)
      dat.customers_id = this.appUserService.customerData.customers_id;
    else
      dat.customers_id = null;
    dat.products_id = id;
    dat.language_id = this.config.languageIdNumber;
    dat.currency_code = this.config.currencyCodeString;
    this.appHttpService.postHttp(this.config.urlString + 'getallproducts', dat).then((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        let p = data.product_data[0]
        this.shared.singleProductPageDataArray.push(p);
        this.navCtrl.navigateForward("product-detail/" + p.id);
      }
    });
  }

  getShippingAddressData() {
    let selected = false
    return {
      text1: this.order.delivery_first_name + ' ' + this.order.delivery_last_name,
      text2: this.order.delivery_country_name,
      text3: this.order.delivery_street_aadress + " " + this.order.delivery_city + " " + this.order.delivery_postcode,
      selected: selected
    }
  }
  getBillingAddressData() {
    let selected = false
    return {
      text1: this.order.billing_first_name + ' ' + this.order.billing_last_name,
      text2: this.order.billing_country_name,
      text3: this.order.billing_street_aadress + " " + this.order.billing_city + " " + this.order.billing_postcode,
      selected: selected
    }
  }

  getData() {
    this.order = {}
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    let url = "customer/order/" + id
    url += "?orderDetail=1"
    url += "&productDetail=1"
    url += "&language_id=" + this.config.languageIdNumber
    url += "&currency=" + this.config.currencyIdNumber
    this.appHttpService.getHttp(url).then((data: any) => {
      this.order = data
      this.ionRefresher.complete()
    })
  }
  goBack() {
    this.navCtrl.back()
  }
  dataIsEmpty() {
    for (var prop in this.order) {
      if (this.order.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
  getSubtotal() {
    let total = 0;
    this.order.data.forEach(element => {
      total += parseFloat(element.final_price);
    });
    return total;
  }

  ionViewDidEnter() {
    this.order = this.shared.myOrderDetialPageData;
  }
  // For Scroll To Top Content
  scrollToBottom() {
    this.content.scrollToBottom(700);
  }
  trackOrder() {
    let message = "Order is not Dispatched Yet!"
    if (this.order.delivery_boy_id == null) {
      this.appAlertService.showAlert(message)
      return 0
    }
    this.scrollToBottom();
    let _this = this;
    var deliveryBoyLocationDatabase = firebase.database().ref('location/' + this.order.delivery_boy_id);
    deliveryBoyLocationDatabase.on('value', function (value) {
      if (value.val() == null) {
        _this.appAlertService.showAlert(message)
      }
      var loc = value.val()
      _this.loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation(loc.latitude, loc.longitude);
    });
  }
  public countLoation = 0;

  public orderMap: any
  public deliveryBoyMarker: any

  loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation(lat, long) {
    if (this.countLoation == 0) {
      console.log(this.order)
      const loader = new Loader({ apiKey: this.config.googleMapApiString })

      let str = this.order.latlong
      const arrayLatLongDestination = str.split(",")
      let destinationLat = parseFloat(arrayLatLongDestination[0])
      let destinationLong = parseFloat(arrayLatLongDestination[1])

      console.log(arrayLatLongDestination)

      let mapStyles = [{
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }];
      //load the map on run time
      loader.load().then(() => {

        let marker = null;

        let deliveryBoyStartPosition = new google.maps.LatLng(lat, long)
        let departurePosition = new google.maps.LatLng(lat, long)
        let destinationPosition = new google.maps.LatLng(destinationLat, destinationLong)

        // departurePosition = new google.maps.LatLng(31.411382823495547, 73.10702210045106)
        // deliveryBoyStartPosition = new google.maps.LatLng(31.414898804236866, 73.11107766722843)
        //destinationPosition = new google.maps.LatLng(31.440399503460657, 73.1073430000827)

        this.orderMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: lat, lng: long },
          zoom: 16,
          disableDefaultUI: true,
          styles: mapStyles,
        })

        // Marker does not exist - Create it
        // this.deliveryBoyMarker = new google.maps.Marker({ position: deliveryBoyStartPosition, map: this.orderMap, icon: 'assets/food-delivery.png' })
        // Marker for departure point 
        let departureMarker = new google.maps.Marker({ position: departurePosition, map: this.orderMap, icon: 'assets/departure.png' })
        // MMarker for destination
        let destinationMarker = new google.maps.Marker({ position: destinationPosition, map: this.orderMap, icon: 'assets/destination.png' })
        // Center the map on the new position
        this.orderMap.setCenter(deliveryBoyStartPosition)
      })
    }
    else {
      //if (this.deliveryBoyMarker) {
      let newLatLong = new google.maps.LatLng(lat, long)
      // Marker does not exist - Create it
      if (this.countLoation % 5 == 0) {
        let deliveryBoyMarker = new google.maps.Marker({ position: newLatLong, map: this.orderMap, icon: 'assets/food-delivery.png' })
      }
      else {
        let dotMarker = new google.maps.Marker({ position: newLatLong, map: this.orderMap, icon: 'assets/dot.png' })
      }
      this.orderMap.setCenter(newLatLong)
      // }
    }
    this.countLoation++;
  }
  searchString: any;

  testMapLocation() {
    let str = this.searchString
    const arrayLatLongDestination = str.split(",")
    let destinationLat = parseFloat(arrayLatLongDestination[0])
    let destinationLong = parseFloat(arrayLatLongDestination[1])
    this.loadMapAndSetMarkersThenUpdateDeliveryMarkerLocation(destinationLat, destinationLong)
  }
  ngOnInit() {
  }

}
//map code for show route
// var display = new google.maps.DirectionsRenderer();
        // var services = new google.maps.DirectionsService();
        // display.setMap(map);
        // var request = {
        //   origin: departurePosition,
        //   destination: destinationPosition,
        //   travelMode: google.maps.TravelMode.DRIVING
        // };
        // services.route(request, function (result, status) {
        //   if (status == 'OK') {
        //     display.setDirections(result);
        //   }
        // });
