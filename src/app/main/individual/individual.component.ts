import { MainService } from './../main.service';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.mainService.connect()
  }

  get username() {
    return this.searchForm.get('username');
  }
  searchSub: Subscription;

  search=(text$: Observable<string>): Observable<string[]> =>{
    console.log("search call");
    return text$.pipe(
      debounceTime(500),
      switchMap((term) => {
        console.log("searching");
        let result: string[] = [];
        if (term.length < 2) return of(result);
        else   return this.mainService.searchUser({username: term})
        .pipe(
          catchError((err, caught) => {
            return of([]);
          }),
          map((res: any) =>
            {
              console.log("search res",res)
              let data:string[] = [];
              if(res.status){
                data.push(res.data.username)
              }
              console.log(data)
              return data;
            }
          )
        );
        
      })
    );
  }
}
