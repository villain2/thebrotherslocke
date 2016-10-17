import { Component, OnInit, NgZone } from '@angular/core';

declare const FB: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token: any;
  logged: boolean   = false;
  user  = { };

  constructor(private _ngZone: NgZone) { }

  statusChangeCallback ( response: any)
  {
    if(response.status === 'connected')
    {
      console.log('connected');
      this.me();
    }
    else
    {
      this.login();
    }
  }

  login ()
  {
    FB.login((result: any) => {
      this.logged = true;
      this.token = result;
    }, { scope: 'user_friends' });
  }

  me() {
    FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends',
      function(result) {
        if (result && !result.error) {
          this.user = result;
          console.log(this.user);
          console.log(this.logged);
        } else {
          console.log(result.error);
        }
      });
  }


  ngOnInit() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

}
