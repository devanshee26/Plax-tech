import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CodingService} from '../services/coding.service';
import {Iproblems} from '../models/iproblems';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {angularEditorConfig} from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-problem-solve',
  templateUrl: './problem-solve.component.html',
  styleUrls: ['./problem-solve.component.css']
})
export class ProblemSolveComponent implements OnInit {

  public id: string;
  public message: string;
  public stderr: string;
  // tslint:disable-next-line:variable-name
  public compile_output: string;
  // @ts-ignore
  public problem: Iproblems;
  public submissionForm: FormGroup;
  public status: boolean;
  public languages = [
    {
      id: 50,
      name: 'C (GCC 9.2.0)'
    },
    {
      id: 54,
      name: 'C++ (GCC 9.2.0)'
    },
    {
      id: 62,
      name: 'Java (OpenJDK 13.0.1)'
    },
    {
      id: 70,
      name: 'Python (2.7.17)'
    },
    {
      id: 71,
      name: 'Python (3.8.1)'
    }];

  public editorConfig: AngularEditorConfig = {
    editable: false,
    enableToolbar: false,
    showToolbar: false,
    sanitize: false
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private codingService: CodingService,
              private formBuilder: FormBuilder) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.status = true;
    this.codingService.getById(this.id).subscribe(data => {
      this.problem = data;
      this.status = false;
    }, error => {
      this.router.navigate(['/error']);
    });
    this.message = '';
    this.stderr = '';
    this.compile_output = '';
    this.submissionForm = this.formBuilder.group({
      source_code: ['Code goes here', Validators.required],
      language_id: [54, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  add(): void {
    let data;
    if (this.submissionForm.invalid) {
      return;
    } else {
      data = {
        _id: this.problem._id,
        source_code: this.submissionForm.controls.source_code.value,
        language_id: this.submissionForm.controls.language_id.value,
        stdin: this.problem.TestCases[0].test,
        expected_output: this.problem.TestCases[0].output,
        cpu_time_limit: this.problem.TimeLimit,
        memory_limit: this.problem.MemoryLimit,
      };
      console.log(data);
      this.message = 'processing...';
      this.codingService.create(data).subscribe(value => {
        this.message = value.status;
        this.stderr = value.stderr;
        this.compile_output = value.compile_output;
        console.log(value);
      }, error => {
        console.log(error);
      });
    }
  }

}
