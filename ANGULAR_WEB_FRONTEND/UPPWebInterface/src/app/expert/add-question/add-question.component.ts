import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Form: FormGroup;
  public message: string;
  public subjects = ['Login and Reasoning', 'Language', 'Coding', 'CS fundamental'];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private quizService: QuizService) {
    this.message = '';
    this.Form = this.formBuilder.group({
      question: ['', Validators.required],
      subject: ['Coding', Validators.required],
      correct_answer: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      // @ts-ignore
      token: [JSON.parse(localStorage.getItem('token')).token]
    });
  }

  ngOnInit(): void {
  }

  add(): void {
    this.message = 'Uploading...';
    if (this.Form.invalid) {
      return;
    } else {
      const json = {
        question: this.Form.value.question,
        subject: this.Form.value.subject,
        correct_answer: this.Form.value.correct_answer,
        options: [this.Form.value.correct_answer, this.Form.value.option2, this.Form.value.option3, this.Form.value.option4],
        token: this.Form.value.token
      };
      this.quizService.addQuestion(json).subscribe(data => {
        window.alert('Added Successfully');
        this.router.navigate(['/index']);
      }, error => {
        this.router.navigate(['/internalerror']);
      });
    }
  }

}
