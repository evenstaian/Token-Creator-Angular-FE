import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    Auth
  ]
})
export class ProfileComponent implements OnInit {

  imageUrl: string;
  file: File;
  imagePlaceholder: string = "assets/images/vectors/ic_user_placeholder.svg";

  user: any = {};

  constructor(private authService: Auth) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    const userDataString = localStorage.getItem("user_data");

    if(userDataString){
      try {
        this.user = JSON.parse(userDataString);
        if(this.user.image_url){
          this.imageUrl = this.user.image_url
          this.imagePlaceholder = this.user.image_url
        }

        console.log(this.user)
      } catch (error) {
        
      }
    }
  }

  setImageFile(file: File){
    this.file = file;
    this.updateUserData(file)
  }

  updateUserData(image: File){
    this.authService.update(image).subscribe(
      data => {},
      error => {
        console.log(error)
      },
    )
  }

}
