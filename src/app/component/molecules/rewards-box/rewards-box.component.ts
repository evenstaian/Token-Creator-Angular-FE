import { Component, OnInit } from '@angular/core';

interface Milestone {
  points: number;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-rewards-box',
  templateUrl: './rewards-box.component.html',
  styleUrls: ['./rewards-box.component.css']
})
export class RewardsBoxComponent implements OnInit {
  currentPoints: number = 150;
  currentLevel: number = 1;
  progressPercentage: number = 0;
  
  milestones: Milestone[] = [
    {
      points: 50,
      title: 'Criou uma conta',
      icon: 'mdi mdi-star-outline'
    },
    {
      points: 100,
      title: 'Criou um token testnet',
      icon: 'mdi mdi-star-half-full'
    },
    {
      points: 200,
      title: 'Fez sua primeira transação',
      icon: 'mdi mdi-star'
    },
    {
      points: 300,
      title: 'Criou seu primeito token MainNet',
      icon: 'mdi mdi-star-circle'
    },
    {
      points: 500,
      title: 'Fez seu primeiro MINT',
      icon: 'mdi mdi-star-face'
    }
  ];

  nextMilestone: Milestone | undefined;

  ngOnInit() {
    this.calculateProgress();
  }

  calculateProgress() {
    // Encontra o próximo milestone
    this.nextMilestone = this.milestones.find(m => m.points > this.currentPoints);
    
    if (this.nextMilestone) {
      const previousMilestone = this.milestones[this.milestones.indexOf(this.nextMilestone) - 1];
      const totalPoints = this.nextMilestone.points - previousMilestone.points;
      const earnedPoints = this.currentPoints - previousMilestone.points;
      this.progressPercentage = (earnedPoints / totalPoints) * 100;
    } else {
      this.progressPercentage = 100;
    }
  }

  isCurrentMilestone(milestone: Milestone): boolean {
    return this.nextMilestone ? milestone.points === this.nextMilestone.points : false;
  }
}
