import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial = null;
  message = '';


  constructor(private tutorialService: TutorialService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id){
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  updatePublished(status) {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          this.currentTutorial.published = status;
        },
        error => {
          console.log(error);
        }
      );
  }

  updateTutorial(){
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteTutorial(){
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
