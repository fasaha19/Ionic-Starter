import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AppAlertService } from '../app-alert/app-alert.service';
import { AppToastService } from '../app-toast/app-toast.service';
@Injectable({
  providedIn: 'root'
})
export class AppCoordinatesService {

  constructor(
    public appAlertService: AppAlertService,
    public appToastService: AppToastService,
  ) { }
  async getCurrentLocationCoordinates() {
    const checkPermission = await Geolocation.checkPermissions()
    //checkPermission.location
    if (checkPermission.location != 'granted') {
      this.appAlertService.showAlert("Please Grant Location Permission")
      Geolocation.requestPermissions()
    }
    console.log("Location Permisson", checkPermission.location)
    try {
      const coordinates = await Geolocation.getCurrentPosition()
      console.log(coordinates)
      return { lat: coordinates.coords.latitude, long: coordinates.coords.longitude }
    } catch (error) {
      this.appToastService.toastMiddle("Please enable Location service")
      console.log(error)
      return "error"
    }

  }
}
