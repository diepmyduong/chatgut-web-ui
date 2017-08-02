import { Component,ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,Searchbar } from 'ionic-angular';
import { MapsAPILoader } from 'angular2-google-maps/core';
import {} from '@types/googlemaps';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AddressFormGroup } from '../../forms/address.group';
/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var $,google,MessengerExtensions: any;

@IonicPage({
  name: "Checkout",
  segment: "checkout"
})
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  @ViewChild("searchbar") searchbarRef:Searchbar;
  //config
  tab = "location";
  mapConfig = {
    position: {
      lng: 10,
      lat: 10
    },
    zoom: 13,
    markerIcon : "assets/img/marker.png"
  }
  nextStepButtonTitle = "Tiếp";

  //Tab location
  addressAutocomplete: google.maps.places.Autocomplete;
  addressSearchBox: google.maps.places.SearchBox;
  frmAddress:FormGroup;

  //Tab orderInfo
  baskets:any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mapsAPILoader: MapsAPILoader,
    public zone: NgZone,
    public fb: FormBuilder
  ) {
    //Tab location
    this.frmAddress =  AddressFormGroup(fb);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.initGoogleMap();
    this.getBackets();
  }

  loadScripts(resourse = []){
    return new Promise((resolve,reject)=>{
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.com/vi_VN/messenger.Extensions.js";
        js.addEventListener('load', function() {
          resolve("messenger loaded");
        });
        fjs.parentNode.insertBefore(js, fjs);
        resourse.forEach(src =>{
          var ext:any = d.createElement(s);
          ext.src = src;
          fjs.parentNode.insertBefore(ext,fjs);
        });
        
      }(document, 'script', 'Messenger'));
    })
  }

  initGoogleMap(){
    this.mapsAPILoader.load().then((()=>{
      console.log("THIS",this);
      console.log("SEARCH bar",this.searchbarRef);
      this.addressAutocomplete = new google.maps.places.Autocomplete(this.searchbarRef._searchbarInput.nativeElement, {
        types: ["address"]
      });
      this.addressSearchBox = new google.maps.places.SearchBox(this.searchbarRef._searchbarInput.nativeElement);
      this.addressSearchBox.addListener("places_changed",this.onSearchPlaceChange.bind(this));
    }).bind(this));
  }

  onSearchPlaceChange(){
    //get the place result
    let place: google.maps.places.PlaceResult = this.addressSearchBox.getPlaces()[0];
    if (place === undefined || place.geometry === undefined || place.geometry === null) {   
      return;
    }
    //set latitude, longitude and zoom]
    console.log('place change');
    this.zone.run(()=>{
      this.mapConfig.position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.mapConfig.zoom = 17;
      this.loadAddress(this.mapConfig.position).then((addressInfo:any)=>{
        this.frmAddress.controls['address'].setValue(addressInfo.formatted_address);
        this.frmAddress.controls['area'].setValue(addressInfo.administrative_area_level_2);
      })
    })
  }

  loadAddress(location){
    return new Promise((resolve,reject)=>{ 
      this.mapsAPILoader.load().then(()=>{
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        }},(results,status)=>{
          var result = {};
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              results[0].address_components.map(component =>{
                component.types.map(type =>{
                  result[type] = component.long_name;
                })
              })
              result['formatted_address'] = results[0].formatted_address;
              result['place_id'] = results[0].formatted_address;
              result['latitude'] = parseFloat(location.lat);
              result['longitude'] = parseFloat(location.lng);
              resolve(result);
            } else {
              reject('No results found')
            }
          } else {
            reject('Geocoder failed due to: '+status)
          }
        });
      })
    })
  }
  
  initGoogleMapTimeout:any;
  onTabChanged(event){
    if(this.initGoogleMapTimeout){
      clearTimeout(this.initGoogleMapTimeout);
    }
    switch(event._value){
      case 'location':
        this.nextStepButtonTitle = "Tiếp";
        this.initGoogleMapTimeout = setTimeout(()=>{
          try{ 
            this.initGoogleMap();
          }catch(err){

          }
        },1000)
        break;
      case 'orderInfo':
        this.nextStepButtonTitle = "Gửi Đơn Hàng"
        break;
    }
  }

  getBackets(){
    setTimeout(()=>{
      this.baskets = [
        {
          id: 1,
          title: "Some Title",
          subtitle: "Some Subtitle",
          quantity: 4,
          price: 20000
        },
        {
          id: 2,
          title: "Some Title",
          subtitle: "Some Subtitle",
          quantity: 4,
          price: 20000
        }
      ]
    },3000);
  }

  nextStep(){
    switch(this.tab){
      case 'location':
        this.tab = "orderInfo";
        break;
      case 'orderInfo':
        this.navCtrl.push('Success',{message: "Đơn hàng đã được gửi"});
        this.loadScripts().then(()=>{
          this.closeWebView();
        })
        break;
    }
  }

  closeWebView(){
    setTimeout(()=>{
      if(MessengerExtensions.isInExtension()){
        MessengerExtensions.requestCloseBrowser();
      }
    },2000);
  }

}
