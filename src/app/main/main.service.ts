import { endpoints } from './../core/config/endpoints';
import { HttpClient } from '@angular/common/http';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { secret } from 'secret/secret';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
declare var Strophe;
declare var $iq;
declare var $msg;
declare var $pres;
@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private appService: AppService, private httpClient: HttpClient) {}
  conn: any;
  strangers: any = {};
  purge() {
    this.conn.options.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
    this.conn.flush();
    this.conn.disconnect();
    this.strangers = {};
  }
  public message$ = new Subject<any>();
  connect() {
    this.conn = new Strophe.Connection(secret.WS);
    console.log(this.conn);
    this.conn.xmlInput = (body) => {
      // this.showTraffic('INCOMING', body);
    };

    this.conn.xmlOutput = (body) => {
      // this.showTraffic('OUTGOING', body);
    };
    console.log('conn user', this.appService.user);
    this.conn.connect(
      this.appService.user.username + '@localhost',
      this.appService.user.password,
      (status) => {
        if (status === Strophe.Status.CONNECTED) {
          console.info('CONNECTED');
          var iq = $iq({ type: 'get' }).c('query', {
            xmlns: 'jabber:iq:roster',
          });

          // On message Handler
          this.conn.addHandler(
            (msg) => {
              console.log('MESSAGE!!!!!', msg);
              this.message$.next(msg);
              return true;
            },
            null,
            'message',
            'chat'
          );

          // On presence Handler
          this.conn.addHandler(
            (presence) => {
              //console.log('PRESENCE: ', presence);
            },
            null,
            'presence'
          );

          // Recieve IQ Handler
          this.conn.addHandler(
            (iq) => {
              console.log(iq);
            },
            'jabber:iq:roster',
            'iq',
            'set'
          );
          // Send IQ Handler
          this.conn.sendIQ(iq, (iq) => {
            console.log(iq);
          });

          // Send Presence
          this.conn.send($pres());
        } else if (status === Strophe.Status.DISCONNECTED) {
          console.info('DISCONNECTED');
        }
      }
    );
  }
  showTraffic(type, body) {
    if (body.childNodes.length > 0) {
      body.childNodes.forEach((element) => {
        console.log(type, 'CHILD NODE', element);
      });
    }
  }

  ping() {
    let start_time = new Date().getTime();
    this.conn.addHandler(
      (iq) => {
        var elapsed = new Date().getTime() - start_time;
        console.log('Received pong from server in ' + elapsed + 'ms.');
        return false;
      },
      null,
      'iq',
      null,
      'ping1'
    );
    let domain = Strophe.getDomainFromJid(this.conn.jid);
    var ping = $iq({
      to: domain,
      type: 'get',
      id: 'ping1',
    }).c('ping', { xmlns: 'urn:xmpp:ping' });

    console.log('Sending ping to ' + domain + '.');

    this.conn.send(ping);
  }
  send(to, text) {
    // var builder = new Strophe.Builder("message", {
    //   to: this.to + "@localhost",
    //   body: this.text,
    //   "xml:lang": "en",
    // });
    var msg = $msg({ to: to + '@localhost', type: 'chat' })
      .c('body')
      .t(text);
    console.log(msg);
    this.conn.send(msg);
    let time = new Date().toLocaleString();
    let username: string = to;
    let message: string = text;
    let sender: string = 'you';
    if (this.strangers[username]) {
      if (this.strangers[username].chat) {
        this.strangers[username].chat.push({ message, sender, time });
      } else {
        this.strangers[username].chat = [{ message, sender, time }];
      }
    } else {
      this.strangers[username] = {
        chat: [{ message, sender, time }],
      };
      this.updateStranger(username);
    }
  }
  searchUser(data): Observable<any> {
    return this.httpClient.post(endpoints.search_user.url, data);
  }
  updateStranger(username: string): void {
    this.getUserImage({ username }).subscribe(
      (res: any) => {
        console.log(res);
        this.strangers[username].image = `data:${'image/jpeg'};base64,${
          res.data.base64
        }`;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setImage(data): Observable<any> {
    return this.httpClient.post(endpoints.setImage.url, data);
  }
  public image$ = new BehaviorSubject<any>(null);

  getImageSub: Subscription;
  getImage() {
    if (this.getImageSub) this.getImageSub.unsubscribe();
    this.getImageSub = this.httpClient
      .post(endpoints.getImage.url, {})
      .subscribe(
        (res: any) => {
          console.log(res);
          this.image$.next(res);
        },
        (err) => {
          console.log(err);
          this.appService.user.base64 = null;
          this.image$.next({
            data: { base64: null },
          });
        }
      );
  }
  getUserImage(data) {
    return this.httpClient.post(endpoints.getUserImage.url, data);
  }

  fileSize(str) {
    if (!str) return 0;
    str = str.split(',').pop();
    return str.length * (3 / 4);
  }
}
