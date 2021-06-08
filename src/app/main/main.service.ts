import { endpoints } from './../core/config/endpoints';
import { HttpClient } from '@angular/common/http';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { secret } from 'secret/secret';
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
  connect() {
    this.conn = new Strophe.Connection(secret.WS);
    console.log(this.conn);
    this.conn.xmlInput = (body) => {
      this.showTraffic('INCOMING', body);
    };

    this.conn.xmlOutput = (body) => {
      this.showTraffic('OUTGOING', body);
    };
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
            (message) => {
              console.log('MESSAGE: ', message);
              return true;
            },
            null,
            'message',
            'chat'
          );

          // On presence Handler
          this.conn.addHandler(
            (presence) => {
              console.log('PRESENCE: ', presence);
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
  search(data) {}
}
