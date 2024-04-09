import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-sender',
  templateUrl: './image-sender.component.html',
  styleUrls: ['./image-sender.component.css']
})
export class ImageSenderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @Output() file: File;

  imageSrc;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if(this.validateSupportedFile(file)){
      this.handleFile(file);
    }
  }

  onDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if(this.validateSupportedFile(file)){
      this.handleFile(file);
    }
  }

  handleFile(file: File){
    this.file = file;
    this.previewImage(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  validateSupportedFile(file: File){
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (validImageTypes.includes(file.type)) {
      return true;
    } else {
        console.log('Arquivo não suportado:', file.name);
        return false;
    }
  }

  handleClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
}
