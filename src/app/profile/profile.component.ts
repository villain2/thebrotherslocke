import { Component, NgZone, AfterViewInit } from '@angular/core';

declare const FB: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {

  token: any;
  logged: boolean         = false;
  user                    = { name: 'Your Name'};
  progress: number        = 0;
  loginPanel: boolean     = false;
  userLogged: boolean     = false;
  storedFB: any;

  constructor(private _ngZone: NgZone) {
    FB.init({
      appId      : '1111081642294428',
      cookie     : false,
      xfbml      : true,
      version    : 'v2.8'
    });

    console.log(this);
  }

  facebookLoginClickHandler ()
  {
    FB.login(response => {
      this.statusChangeCallback(response);
    });
  }

  updated(doneCallback: () => void)
  {
    var self = this;
    FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends',
      function(result) {
        if (result && !result.error) {
          this.user = result;
          console.log(result);
          localStorage.setItem("user", JSON.stringify(this.user));
          console.log(localStorage);
          return this.user;
        } else {
          console.log(result.error);
        }
      });
    doneCallback();
  }

  statusChangeCallback ( resp )
  {
    if(resp.status === 'connected')
    {
      //connect here with your serer for facebook login by passing access token given by facebbok
      this.loginPanel     = false;
      this.userLogged     = true;

      this._ngZone.runOutsideAngular(() => {

        this.updated(() => {
          this._ngZone.run(() =>
          {
            console.log('OUTSIDE DONE');
            this.storedFB    = JSON.parse(localStorage.getItem("user"));
            console.log(this.storedFB);

            this.user     = this.storedFB;
          });
        })
      })
    }
    else if( resp.status === 'not_authorized')
    {
      console.log('not authorized');
    }
    else
    {
      console.log('not logged');
      this.loginPanel     = true;
    }
  };

  checkForLogin ()
  {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }


  login ()
  {
    var self  = this;
    FB.login((result: any) => {
      self.logged = true;
      self.token = result;
    }, { scope: 'user_friends' });
  }

  ngAfterViewInit() {
    this.checkForLogin();
  }
}
