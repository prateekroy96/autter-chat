import { MainService } from './../main.service';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {
  searchForm: FormGroup;
  searchState = {
    submitted: false,
    loading: false,
  };
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private appService: AppService,
    private router: Router
  ) {
    this.searchForm = formBuilder.group({
      username: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.searchForm.get('username');
  }
  searchSub: Subscription;
  search() {
    // console.log(this.searchForm.value);
    // if (this.searchState.loading) return;
    // this.searchState.submitted = true;
    // if (this.searchForm.invalid) return;
    // if (this.searchSub) this.searchSub.unsubscribe();
    // this.searchState.loading = true;
    // this.searchSub = this.mainService.search(this.searchForm.value).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.searchState.loading = false;
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.searchState.loading = false;
    //   }
    // );
  }
}
