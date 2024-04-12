import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-image-sender',
  templateUrl: './image-sender.component.html',
  styleUrls: ['./image-sender.component.css']
})
export class ImageSenderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent;
  
  @Output() file: EventEmitter<File> = new EventEmitter<File>();

  imageSrc = "assets/images/icons/ic_token_image.svg";

  alertIcon="warning"
  alertTitle=""
  alertMessage=""

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

  async handleFile(file: File){
    const validateImageSize: any = await this.validateImageSize(file)
    .then(valid => {
      return valid;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao validar a imagem:', error);
      return
    });

    if (!validateImageSize.status) {
      this.showAlert(validateImageSize.status, "Erro na Imagem", validateImageSize.error)
      return
    }

    this.previewImage(file);
    this.file.emit(file);
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

  validateImageSize(file: File): Promise<{status: boolean, error: string | null}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const width = img.width;
          const height = img.height;
  
          if (width !== height) {
            resolve({status: false, error: "A imagem enviada deve ser um quadrado"});
            return;
          }
  
          if (width < 350) {
            resolve({status: false, error: "A imagem deve ser maior que 350px"});
            return;
          }

          if (width > 800) {
            resolve({status: false, error: "A imagem deve ser menor que 800px"});
            return;
          }
  
          resolve({status: true, error: null});
        };
      };
  
      reader.readAsDataURL(file);
    });
  }

  handleClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  showAlert(success: boolean, title: string, message: string){
    this.alertIcon = success ? "success" : "warning";
    this.alertTitle = title;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertSwal.fire();
    }, 200);
  }
}
