import { UserDetailsUpdateRequest } from '../../modym/request/UserDetailsUpdateRequest';
import { AuthService } from '../../providers/AuthService';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Config } from '../../providers/Config';
import { ModymService } from '../../providers/ModymService';
import { AbstractPage } from '../AbstractPage';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage extends AbstractPage {
  userDetails: UserDetailsUpdateRequest;
  
  //will be something like 2017
  maxDOB : string;

  constructor(
    public navCtrl: NavController,
    protected config: Config,
    private authService: AuthService,
    private modymService: ModymService,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController
  ) {
    super(alertCtrl, loadingCtrl);
    this.userDetails = new UserDetailsUpdateRequest();
    this.userDetails.title = authService.currentUser.title;
    this.userDetails.firstName = authService.currentUser.firstName;
    this.userDetails.lastName = authService.currentUser.lastName;
//    this.userDetails.email = authService.currentUser.email;
//    this.userDetails.phone = authService.currentUser.phoneMobile;
    this.userDetails.dateOfBirth = authService.currentUser.dateOfBirth;
    this.userDetails.gender = authService.currentUser.gender;
    
    this.maxDOB= (new Date().getFullYear()-5).toString();;
  }

  updateDetails() {
    this.showLoading();
    this.modymService.updateUser(this.userDetails).subscribe(response => {
      this.dismissLoading();
      if (response && response.customerId ) {
        this.showPopup("Success", "Data updated successfully");
        this.authService.currentUser = this.copy(response, this.authService.currentUser);
      } else {
        var message = typeof response === 'string' ? response : "Data update failed";
        this.showError(message);
      }
    },
      error => {
        this.dismissLoading();
        this.showError(error);
      });
  }
  //helper function to clone a given object instance
  copy(source, target) {
      for (var key in source) {
          target[key] = source[key];
      }
      return target;
  }
}
