import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { TokenTypeService } from 'src/app/shared/token-type.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [AppService]
})
export class DetailsComponent implements OnInit {
  token: any;
  tokenMints: any[] = [];
  tokenBurns: any[] = [];
  tokenTransfers: any[] = [];
  loading: boolean = true;
  isLoading: boolean = false;
  isERC721: boolean = false;
  activeTab: 'mints' | 'burns' | 'transfers' = 'mints';

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private tokenTypeService: TokenTypeService
  ) { }

  ngOnInit(): void {
    const contractAddress = this.route.snapshot.paramMap.get('contractAddress');
    console.log(contractAddress);
    if (contractAddress) {
      setTimeout(() => {
        this.loadTokenDetails(contractAddress);
      }, 1000);
    }
  }

  isLogged(){
    const authToken = localStorage.getItem('auth_token');
    return authToken;
  }

  setActiveTab(tab: 'mints' | 'burns' | 'transfers') {
    this.activeTab = tab;
    this.loadTabData();
  }

  private loadTokenDetails(contractAddress: string) {
    this.loading = true;
    this.appService.getTokenPublicInfo(contractAddress).subscribe(
      (data: any) => {
        this.token = data.token;
        this.isERC721 = this.token.standard === 'ERC721';
        this.tokenMints = data.mints;
        this.tokenBurns = data.burns;
        this.tokenTransfers = data.transfers;
        this.loading = false;
        this.loadTabData();
      },
      error => {
        console.error('Error loading token details:', error);
        this.loading = false;
      }
    );
  }

  private loadTabData() {
    //this.isLoading = true;
    const contractAddress = this.token?.address;
    
    if (!contractAddress) return;

    switch (this.activeTab) {
      case 'mints':
        this.loadMints(contractAddress);
        break;
      case 'burns':
        this.loadBurns(contractAddress);
        break;
      case 'transfers':
        this.loadTransfers(contractAddress);
        break;
    }
  }

  private loadMints(contractAddress: string) {
    // this.appService.getTokenMints(contractAddress).subscribe(
    //   (data: any) => {
    //     this.tokenMints = data;
    //     this.isLoading = false;
    //   },
    //   error => {
    //     console.error('Error loading mints:', error);
    //     this.isLoading = false;
    //   }
    // );
  }

  private loadBurns(contractAddress: string) {
    // this.appService.getTokenBurns(contractAddress).subscribe(
    //   (data: any) => {
    //     this.tokenBurns = data;
    //     this.isLoading = false;
    //   },
    //   error => {
    //     console.error('Error loading burns:', error);
    //     this.isLoading = false;
    //   }
    // );
  }

  private loadTransfers(contractAddress: string) {
    // this.appService.getTokenTransfers(contractAddress).subscribe(
    //   (data: any) => {
    //     this.tokenTransfers = data;
    //     this.isLoading = false;
    //   },
    //   error => {
    //     console.error('Error loading transfers:', error);
    //     this.isLoading = false;
    //   }
    // );
  }

  getCurrentTabData(): any[] {
    switch (this.activeTab) {
      case 'mints':
        return this.tokenMints;
      case 'burns':
        return this.tokenBurns;
      case 'transfers':
        return this.tokenTransfers;
      default:
        return [];
    }
  }

  shouldShowEmptyState(): boolean {
    return this.getCurrentTabData().length === 0;
  }

  getEmptyStateIcon(): string {
    const icons = {
      mints: 'fas fa-file-invoice',
      burns: 'fas fa-fire',
      transfers: 'fas fa-exchange-alt'
    };
    return icons[this.activeTab];
  }

  getEmptyStateMessage(): string {
    const messages = {
      mints: 'Nenhum mint encontrado para este token',
      burns: 'Nenhum burn encontrado para este token',
      transfers: 'Nenhuma transferência encontrada para este token'
    };
    return messages[this.activeTab];
  }

  getShortAddress(address: string): string {
    if (!address) return '--';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  getBackgroundStyle(): any {
    if (this.token?.image_url) {
      return {
        'background-image': `url(${this.token.image_url})`,
        'background-color': 'transparent'
      };
    }
    return {
      'background-color': '#6b46c1', // Cor roxa padrão
      'background-image': 'none'
    };
  }

  getTokenImageUrl(): string {
    return this.token?.image_url || 'assets/images/default-token-purple.png';
  }

  isTestnet(): boolean {
    return this.token?.is_mainnet === 0;
  }
}
