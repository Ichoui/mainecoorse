import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  async ping(): Promise<boolean> {
    return true;
  }
}
