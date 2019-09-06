import { Component, OnInit } from '@angular/core';
// AlertController for displaying alerts to capture updated data
import { AlertController } from '@ionic/angular';
// AuthService and ProfileService for calling functions from them
import { AuthService} from '../../services/user/auth.service';
import { ProfileService} from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // userProfile holding all data from Firebase
  public userProfile: any = {};
  // birthDate will be used in interactions with data picker component
  public birthDate: string;
  public emailMessage: any = null;
  public passwordMessage: any = null;

  constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,
      private router: Router
  ) { }

  // called after the view rendered
  ngOnInit() {
  }

  // logOut function for user
  logOut(): void {
    // if logOut succeeds, navigate to login page.
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      // creating a prompt to ask users for their last name and first name
      subHeader: 'First name & Last name: ',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          // value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          // value: this.userProfile.lastName,
        }
      ],
      buttons: [
          // save button will take the input last name and first name
          // to the updateName function in ProfileService
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateFirstName(data.firstName);
            this.profileService.updateLastName(data.lastName);
            this.userProfile.firstName = data.firstName;
            this.userProfile.lastName = data.lastName;
          }
        }
      ]
    });
    await alert.present();
  }

  updateDOB(birthDate: string): void {
    // (ionChange) can trigger on page load,
    // so we need this validation to make sure birthDate is not undefined
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'New eamil & Current password: ',
      inputs: [
          // change type for email and password.
        { name: 'newEmail', placeholder: 'Your new email', type: 'text' },
        { name: 'password', placeholder: 'Your password', type: 'password'}
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
                .updateEmail(data.newEmail, data.password)
                .then(() => {
                  this.emailMessage = 'Email Changed Successfully';
                })
                .catch(error => {
                  this.emailMessage = 'ERROR: ' + error.message;
                });
            this.userProfile.email = data.newEmail;
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'New password & Current password: ',
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password'},
        { name: 'oldPassword', placeholder: 'Old password', type: 'password'},
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
                data.newPassword,
                data.oldPassword
            ).then(() => {
              this.passwordMessage = 'Password changed Successfully!';
            }).catch(error => {
              this.passwordMessage = 'ERROR: ' + error.message;
            });
            this.userProfile.password = data.newPassword;
          }
        }
      ]
    });
    await alert.present();
  }
}
