import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  async generalSettings(): Promise<boolean> {
    return true;
  }

  async getFlag() : Promise<void> {
    return Promise.resolve()
  }

  async updateFlag() : Promise<void> {
    return Promise.resolve()
  }

  async updateStrict() : Promise<void> {
    return Promise.resolve()
  }
}
