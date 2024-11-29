import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { GameService } from '../game.service';
import { Level, Question } from '../level.model'; // Import Level interface
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('questionAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('optionAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class GameComponent implements OnInit {
  levels: Level[] = []; // Correctly using Level[]
  currentLevel!: Level;
  currentQuestion!: Question | null;
  selectedOption: string | null = null;
  score = 0;
  timer = 30;
  gameStarted = false;
  gameEnded = false;
  showHint = false;
  hintCount = 0;
  timerInterval: any;
  isButtonClicked = false; // New property to handle button click effect

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load levels from the service or static data
    this.gameService.getLevels().subscribe((data) => {
      this.levels = data.levels;

      // Get levelName from query parameters and find the corresponding level
      this.route.queryParams.subscribe((params) => {
        const levelName = params['levelName'];
        if (levelName) {
          // Find the level based on the name
          this.currentLevel = this.levels.find(level => level.name === levelName) || this.levels[0];

          // Start the game once the level is found
          if (this.currentLevel) {
            this.startGame(this.currentLevel);
          }
        }
      });
    });
  }

  startGame(level: Level): void {
    this.currentLevel = level;
    this.gameStarted = true;
    this.gameEnded = false;
    this.score = 0;
    this.loadRandomQuestion();
    this.startTimer();
  }

  loadRandomQuestion(): void {
    const questions = this.currentLevel.questions;
    if (questions && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      this.currentQuestion = questions[randomIndex];
      this.selectedOption = null;
      this.showHint = false;
      this.resetTimer(); // Reset the timer each time a new question is loaded
  
      // Automatically shuffle the options for the current question
      if (this.currentQuestion?.options) {
        this.currentQuestion.options = [...this.currentQuestion.options].sort(() => Math.random() - 0.5);
      }
    }
  }
  

  selectOption(option: string): void {
    Math.random()
    this.selectedOption = option;
  }

  checkAnswer(): void {
    if (this.selectedOption === this.currentQuestion?.answer) {
      this.score += 10;
      this.loadRandomQuestion();
    } else {
      alert("Incorrect Answer! Game Over.");
      this.endGame();
    }
  }

  // shuffleOptions(): void {
  //   if (this.currentQuestion) {
  //     this.currentQuestion.options = [...this.currentQuestion.options].sort(() => Math.random() - 0.5);
  //   }
  // }

  showHintMessage(): void {
    if (this.hintCount < 2) {
      this.showHint = true;
      this.hintCount++;
    } else {
      alert("No more hints available!");
    }
  }

  startTimer(): void {
    this.timer = 30;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        alert("Time's up! Game Over.");
        this.endGame();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timer = 30;
    clearInterval(this.timerInterval);
    this.startTimer(); // Restart the timer after resetting
  }

  endGame(): void {
    clearInterval(this.timerInterval);
    this.gameStarted = false;
    this.gameEnded = true;
    this.currentQuestion = null;
  }

  resetGame(): void {
    this.score = 0;
    this.hintCount = 0;
    this.startGame(this.currentLevel);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  // Add this function to navigate back to the level selection
  goBackToLevels(): void {
    this.router.navigate(['/select-level']); // Adjust the path as per your route configuration
  }

  handleButtonClick(): void {
    this.isButtonClicked = true; // Set to true on button click
    setTimeout(() => {
      this.isButtonClicked = false; // Reset after a short delay
    }, 300); // Duration for the "clicked" effect
  }
}
