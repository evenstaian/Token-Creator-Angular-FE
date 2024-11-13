import { Component, OnInit } from '@angular/core';
import { REWARDS_MILESTONES_TYPES } from 'criptolab-types';

interface Milestone {
  name: string;
  points: number;
  earnedPoints: number;
  title: string;
  icon: string;
  tokenSymbol: string;
}

@Component({
  selector: 'app-rewards-box',
  templateUrl: './rewards-box.component.html',
  styleUrls: ['./rewards-box.component.css']
})
export class RewardsBoxComponent implements OnInit {
  currentPoints: number;
  currentLevel: number = 1;
  progressPercentage: number = 0;
  
  milestones: Milestone[];

  nextMilestone: Milestone | undefined;

  userRewards: any[] = [];

  isHidden: boolean = false;

  toggleVisibility() {
    this.isHidden = !this.isHidden;
    localStorage.setItem('rewards-box-hidden', this.isHidden.toString());

    if (!this.isHidden && window.innerWidth <= 768) {
      setTimeout(() => {
        this.scrollToCurrentMilestone();
      }, 300);
    }
  }

  ngOnInit() {
    const savedState = localStorage.getItem('rewards-box-hidden');
    if (savedState !== null) {
      this.isHidden = savedState === 'true';
    }
    
    this.createMilestoneList();
    this.userRewards = this.getUserRewards();
    this.rebuildMilestones();
    this.calculateProgress();
  }

  ngAfterViewInit() {
    this.scrollToCurrentMilestone();
  }

  createMilestoneList() {
    const TEST_MILES = {
      FIRST_MINT_ERC20_TESTNET: {
        name: "FIRST_MINT_ERC20_TESTNET",
        description: "Primeiro Mint de Token ERC20 na Testnet",
        amount: 100,
        tokenSymbol: "FITS",
    },
    
    FIRST_MINT_ERC20_MAINNET: {
        name: "FIRST_MINT_ERC20_MAINNET",
        description: "Primeiro Mint de Token ERC20 na Mainnet",
        amount: 100,
        tokenSymbol: "FITS",
    },
    SECOND_MINT_ERC20_MAINNET: {
      name: "SECOND_MINT_ERC20_MAINNET",
      description: "Primeiro Mint de Token ERC20 na Mainnet",
      amount: 50,
      tokenSymbol: "FITS",
    },
    THIRD_MINT_ERC20_MAINNET: {
      name: "THIRD_MINT_ERC20_MAINNET",
      description: "Terceiro Mint de Token ERC20 na Mainnet",
      amount: 60,
      tokenSymbol: "FITS",
    },
    FOURTH_MINT_ERC20_MAINNET: {
      name: "FOURTH_MINT_ERC20_MAINNET",
      description: "Quarto Mint de Token ERC20 na Mainnet",
      amount: 70,
      tokenSymbol: "FITS",
    },
    FIFTH_MINT_ERC20_MAINNET: {
      name: "FIFTH_MINT_ERC20_MAINNET",
      description: "Quinto Mint de Token ERC20 na Mainnet",
      amount: 80,
      tokenSymbol: "FITS",
    }
  }
    this.milestones = Object.values(TEST_MILES).map((milestone) => ({
      name: milestone.name,
      points: milestone.amount,
      earnedPoints: 0,
      tokenSymbol: milestone.tokenSymbol,
      title: milestone.description,
      icon: 'mdi mdi-star-outline'
    }));

    this.distribuiteStarsIconInOrder();
  }

  distribuiteStarsIconInOrder() {
    const starsIcons = ['mdi mdi-star-outline', 'mdi mdi-star-half-full', 'mdi mdi-star', 'mdi mdi-star-circle', 'mdi mdi-star-face'];
    this.milestones.forEach((milestone, index) => {
      const iconIndex = index % starsIcons.length;
      milestone.icon = starsIcons[iconIndex];
    });
  }

  getUserRewards() {
    const userRewards = [
      {
        milestoneName: "FIRST_MINT_ERC20_TESTNET",
        milestoneDescription: "Primeiro Mint de Token ERC20 na Testnet",
        amount: 100,
        tokenSymbol: "FITS",
        txHash: "0x1234567890",
        created_at: new Date()
      },
      {
        milestoneName: "FIRST_MINT_ERC20_MAINNET",
        milestoneDescription: "Primeiro Mint de Token ERC20 na Mainnet",
        amount: 100,
        tokenSymbol: "FITS",
        txHash: "0x1234567890",
        created_at: new Date()
      },
      {
        milestoneName: "SECOND_MINT_ERC20_MAINNET",
        milestoneDescription: "Segundo Mint de Token ERC20 na Mainnet",
        amount: 50,
        tokenSymbol: "FITS",
        txHash: "0x1234567890",
        created_at: new Date()
      }
    ]
    return userRewards;
  }

  calculateProgress() {
    const userRewards = this.getUserRewards();
    const currentMilestone = this.getCurrentMilestone();
    this.currentPoints = currentMilestone?.earnedPoints || 0;

    this.nextMilestone = this.getNextMilestone();
    
    if (this.nextMilestone) {
      const previousMilestone = this.milestones[this.milestones.indexOf(this.nextMilestone) - 1];
      const totalPoints = this.nextMilestone.earnedPoints;
      const earnedPoints = this.currentPoints;
      this.progressPercentage = (earnedPoints / totalPoints) * 100;
    } else {
      this.progressPercentage = 100;
    }
  }

  getCurrentMilestone(): Milestone | undefined {
    const userRewards = this.getUserRewards();
    if (userRewards.length === 0) return undefined;
    const lastReward = userRewards[userRewards.length - 1];
    return this.milestones.find(m => m.name === lastReward.milestoneName);
  }

  getNextMilestone(): Milestone | undefined {
    const currentMilestone = this.getCurrentMilestone();
    if (!currentMilestone) return this.milestones[0];
    
    const currentIndex = this.milestones.findIndex(m => m.name === currentMilestone.name);
    if (currentIndex === -1 || currentIndex === this.milestones.length - 1) return undefined;
    
    return this.milestones[currentIndex + 1];
  }

  isCurrentMilestone(milestone: Milestone): boolean {
    const userRewards = this.getUserRewards();
    if (userRewards.length === 0) return false;
    const lastReward = userRewards[userRewards.length - 1];
    return lastReward.milestoneName === milestone.name;
  }

  rebuildMilestones() {
    const firstReceivedIndex = this.milestones.findIndex(m => 
      this.userRewards.some(reward => reward.milestoneName === m.name)
    );

    this.milestones = this.milestones.filter((milestone, index) => {
      return index >= firstReceivedIndex && firstReceivedIndex !== -1;
    });

    this.milestones = this.milestones.map((milestone, index) => {
      if (index === 0) {
        milestone.earnedPoints = milestone.points;
      } else {
        milestone.earnedPoints = milestone.points + this.milestones[index - 1].earnedPoints;
      }
      return milestone;
    });
  }

  scrollToCurrentMilestone() {
    setTimeout(() => {
      const milestonesContainer = document.querySelector('.milestones') as HTMLElement;
      const currentMilestone = document.querySelector('.milestone.current') as HTMLElement;
      
      if (milestonesContainer && currentMilestone) {
        const containerWidth = milestonesContainer.clientWidth;
        const milestoneLeft = currentMilestone.offsetLeft;
        const milestoneWidth = currentMilestone.clientWidth;
        
        const scrollPosition = milestoneLeft - (containerWidth / 2) + (milestoneWidth / 2);
        
        milestonesContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}
