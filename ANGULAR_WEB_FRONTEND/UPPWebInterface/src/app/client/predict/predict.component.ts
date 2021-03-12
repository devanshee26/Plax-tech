import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PredictService} from '../../services/predict.service';


@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private predictionService: PredictService) {
    this.form = this.formBuilder.group({
      ssc_p: [50, Validators.required],
      hsc_p: [50, Validators.required],
      degree_p: [7.5, Validators.required],
      workex: [5, Validators.required],
      gender: ['1', Validators.required],
      specialisation: [true, Validators.required],
      stream: ['1', Validators.required],
      degree: ['1', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  predict(): void {
    const predict = {
      gender: this.form.value.gender,
      ssc_p: this.form.value.ssc_p,
      hsc_p: this.form.value.hsc_p,
      degree_p: this.form.value.degree_p * 10,
      workex: this.form.value.workex,
      etest_p: 0,
      specialisation: this.form.value.specialisation ? 5 : 0,
      mba_p: 0,
      dummy_Arts: this.form.value.stream === '3' ? 1 : 0,
      dummy_Commerce: this.form.value.stream === '2' ? 1 : 0,
      dummy_Science: this.form.value.stream === '1' ? 1 : 0,
      'dummy_Comm&Mgmt': this.form.value.degree === '2' ? 1 : 0,
      dummy_Others: this.form.value.degree === '3' ? 1 : 0,
      'dummy_Sci&Tech': this.form.value.degree === '1' ? 1 : 0
    };
    console.log(predict);
    this.predictionService.get(predict).subscribe((value => {
      if (value.body.prediction[1] === '1') {
        window.alert('Yaay!!! You\'re likely to be placed!!!');
      } else {
        window.alert('You may have to improve!!!');
      }
    }), error => {
      this.router.navigate(['/internalerror']);
    });
  }


}

