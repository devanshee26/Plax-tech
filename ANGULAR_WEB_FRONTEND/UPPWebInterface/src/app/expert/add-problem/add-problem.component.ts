import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CodingService} from '../../services/coding.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {

  public Form: FormGroup;
  public message: string;

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      [
      ],
      [
        'insertImage',
        'insertVideo',
      ]
    ]
  };

  constructor(private codingService: CodingService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.message = '';
    this.Form = this.formBuilder.group({
      title: ['', Validators.required],
      ProblemStatement: ['', Validators.required],
      InputFormat: ['', Validators.required],
      OutputFormat: ['', Validators.required],
      SampleTestCasesTest: ['', Validators.required],
      SampleTestCasesOutput: ['', Validators.required],
      TestCasesTest: ['', Validators.required],
      TestCasesOutput: ['', Validators.required],
      Solution: ['', Validators.required],
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
        title: this.Form.value.title,
        ProblemStatement: this.Form.value.ProblemStatement,
        InputFormat: this.Form.value.InputFormat,
        OutputFormat: this.Form.value.OutputFormat,
        SampleTestCases: {
          test: this.Form.value.SampleTestCasesTest,
          output: this.Form.value.SampleTestCasesOutput
        },
        TestCases: {
          test: this.Form.value.TestCasesTest,
          output: this.Form.value.TestCasesOutput
        },
        Solution: this.Form.value.Solution,
        token: this.Form.value.token
      };
      this.codingService.add(json).subscribe(data => {
        window.alert('Added Successfully');
        this.router.navigate(['/index']);
      }, error => {
        this.router.navigate(['/internalerror']);
      });
    }
  }

}
