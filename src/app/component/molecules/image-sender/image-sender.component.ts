import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-image-sender',
  templateUrl: './image-sender.component.html',
  styleUrls: ['./image-sender.component.css']
})
export class ImageSenderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent;

  @Input() labels = { 
    title: "Arraste e solte uma imagem aqui ou clique aqui para selecionar uma imagem. ", 
    subtitle: "Tamanho recomendando: 350 x 350 (tamanho máximo: 800px)"
  }
  @Input() isImageSquad: boolean = true;
  @Input() minimumSize: number;
  @Input() maximumSize: number;
  @Input() isMinButtonStyle: boolean = false;
  @Input() imagePlaceholder: string = "assets/images/icons/ic_token_image.svg";
  
  @Output() file: EventEmitter<File> = new EventEmitter<File>();

  imageSrc: any;

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
  
          if (this.isImageSquad && width !== height) {
            resolve({status: false, error: "A imagem enviada deve ser um quadrado"});
            return;
          }
  
          if (width < (this.minimumSize || 350)) {
            resolve({status: false, error: `A imagem deve ser maior que ${(this.minimumSize || 350)}px`});
            return;
          }

          if (width > (this.maximumSize || 800)) {
            resolve({status: false, error: `A imagem deve ser menor que ${(this.maximumSize || 800)}px`});
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
