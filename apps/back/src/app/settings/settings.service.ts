import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { EFlags } from '@shared-interfaces/flags';

@Injectable()
export class SettingsService {
  constructor(@InjectRepository(SettingsEntity) private _settingsEntityRepository: Repository<SettingsEntity>) {}

  async generalSettings(): Promise<SettingsEntity> {
    const entity = await this._settingsEntityRepository.findOne({ where: { settingsId: 1 } });
    console.log(entity);
    if (!entity) {
      const createEntity = this._settingsEntityRepository.create({
        settingsId: 1,
        flag: EFlags.QCOCCITAN,
        strict: false,
      });
      return this._settingsEntityRepository.save(createEntity);
    }
    return entity;
  }

  async getFlag(): Promise<EFlags> {
    const entity = await this._settingsEntityRepository.findOne({ where: { settingsId: 1 } });
    if (!entity) {
      throw new NotFoundException('Flagblem...');
    }
    return entity.flag;
  }

  async updateFlag(): Promise<void> {
    return Promise.resolve();
  }

  async updateStrict(): Promise<void> {
    return Promise.resolve();
  }
}
