import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  public trainers?: Trainer[];

  constructor(private readonly trainerService: TrainerService) {}

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe({
      next: (trainers: Trainer[]) => {
        this.trainers = trainers;
      },
      error: () => {
        console.log('error'); // TODO improve error handling
      },
    });
  }
}
