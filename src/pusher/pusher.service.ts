import { Injectable } from '@nestjs/common';
import { channel } from 'diagnostics_channel';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: '1409079',
      key: '7a5d084ba01736c92a64',
      secret: '92dfa2d70b55e5b6b301',
      cluster: 'mt1',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
