import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Iquiz} from '../../models/iquiz';

@Component({
  selector: 'app-subject-question',
  templateUrl: './subject-question.component.html',
  styleUrls: ['./subject-question.component.css']
})
export class SubjectQuestionComponent implements OnInit {


  public isLinear = false;
  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  public thirdFormGroup!: FormGroup;
  public score = 0;
  public subject: string;
  // @ts-ignore
  public status: boolean;
  // @ts-ignore
  public question: Iquiz[] = [null, null, null];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private quizService: QuizService) {
    this.subject = this.activatedRoute.snapshot.params.subject;
    this.status = true;
    this.quizService.getQuestion(this.subject).subscribe((data) => {
      this.question[0] = data;
      this.question[0].options = SubjectQuestionComponent.shuffle(this.question[0].options);
    });
    this.quizService.getQuestion(this.subject).subscribe((data) => {
      this.question[1] = data;
      this.question[1].options = SubjectQuestionComponent.shuffle(this.question[1].options);
    });
    this.quizService.getQuestion(this.subject).subscribe((data) => {
      this.question[2] = data;
      this.question[2].options = SubjectQuestionComponent.shuffle(this.question[2].options);
      this.status = false;
    });
  }

  private static shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    // @ts-ignore
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      // @ts-ignore
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  public finalScore(): void {
    this.score = 0;
    if (this.firstFormGroup.value.firstCtrl === this.question[0].correct_answer) {
      this.score += 1;
    }
    if (this.secondFormGroup.value.secondCtrl === this.question[1].correct_answer) {
      this.score += 1;
    }
    if (this.thirdFormGroup.value.thirdCtrl === this.question[2].correct_answer) {
      this.score += 1;
    }
    window.alert('You have scored:' + this.score + '\n' +
      'Answers: 1. ' + this.question[0].correct_answer +
      ' 2. ' + this.question[1].correct_answer +
      ' 3. ' + this.question[2].correct_answer);
  }
}
