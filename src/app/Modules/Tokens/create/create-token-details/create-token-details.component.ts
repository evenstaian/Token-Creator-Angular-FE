import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-token-details',
  templateUrl: './create-token-details.component.html',
  styleUrls: ['./create-token-details.component.css']
})
export class CreateTokenDetailsComponent implements OnInit {

  pageTitles = {
    title: "Crie seu token",
    subtitle: "Informe abaixo os dados do seu token"
  }

  formStructure: any;

  form: FormGroup;


  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService) { 
    this.form = this.fb.group({});
    
    this.sharedDataService.formStructure.subscribe(data => { 
      this.formStructure = data;

      this.formStructure.forEach(field => {
        this.form.addControl(field.label, this.fb.control(field.defaultValue));
      });
    });
  }

  ngOnInit(): void {
  }

}
