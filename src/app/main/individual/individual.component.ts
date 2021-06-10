import { MainService } from './../main.service';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
declare var Strophe;
declare var $iq;
declare var $msg;
declare var $pres;
declare var jQuery;
const $ = jQuery;

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {
  msgForm: FormGroup;

  test = [];
  searchState = {
    submitted: false,
    loading: false,
  };
  click$ = new Subject<string>();
  stranger: string = '';
  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    private appService: AppService,
    private router: Router
  ) {
    this.click$.subscribe((res) => {
      if (mainService.strangers[res]) {
      } else {
        mainService.strangers[res] = { chat: [] };
      }
      this.mainService.updateStranger(res);
    });
    this.msgForm = formBuilder.group({
      message: [null, [Validators.required, Validators.maxLength(100)]],
    });
    this.mainService.message$.subscribe((msg) => {
      console.log('MESSAGE: ', msg);
      let isDelayed: boolean = $(msg).find('delay').length > 0;

      let time = null;
      if (isDelayed) {
        time = new Date(
          $($(msg).find('delay')[0]).attr('stamp')
        ).toLocaleString();
      } else {
        time = new Date().toLocaleString();
      }
      let username: string = $(msg).attr('from').split('@')[0];
      // let message: string = Strophe.getText(
      //   msg.getElementsByTagName('body')[0]
      // );
      let message: string = msg.getElementsByTagName('body')[0].textContent;
      let sender: string = 'them';
      if (this.mainService.strangers[username]) {
        if (this.mainService.strangers[username].chat) {
          this.mainService.strangers[username].chat.push({
            message,
            sender,
            time,
          });
        } else {
          this.mainService.strangers[username].chat = [
            { message, sender, time },
          ];
        }
      } else {
        this.mainService.strangers[username] = {
          chat: [{ message, sender, time }],
        };
        this.mainService.updateStranger(username);
      }
      return true;
    });
  }

  keys(obj) {
    return Object.keys(obj);
  }
  ngOnInit(): void {}
  get message() {
    return this.msgForm.get('message');
  }
  msg() {
    console.log(this.msgForm.value);
    if (this.msgForm.invalid) return;
    this.mainService.send(this.stranger, this.msgForm.value.message);
    this.msgForm.reset();
  }
  select(username) {
    this.stranger = username;
  }

  searchSub: Subscription;
  search = (text$: Observable<string>): Observable<string[]> => {
    console.log('search call');
    return text$.pipe(
      debounceTime(500),
      switchMap((term) => {
        console.log('searching');
        let result: string[] = [];
        if (term.length < 2) return of(result);
        else
          return this.mainService.searchUser({ username: term }).pipe(
            catchError((err, caught) => {
              return of([]);
            }),
            map((res: any) => {
              console.log('search res', res);
              let data: string[] = [];
              if (res.status) {
                data.push(res.data.username);
              }
              console.log(data);
              return data;
            })
          );
      })
    );
  };
}
