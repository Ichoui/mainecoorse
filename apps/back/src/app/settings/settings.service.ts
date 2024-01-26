import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { EFlags } from '@shared-interfaces/flags';
import { SettingsDto } from './settings.dto';

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

  async updateFlag(settings: SettingsDto): Promise<void> {
    await this._settingsEntityRepository.update({ settingsId: 1 }, { flag: settings.flag }).catch(() => {
      throw new Error('Le flag ne peut pas être mis à jour');
    });
  }

  async updateStrict(settings: SettingsDto): Promise<void> {
    await this._settingsEntityRepository.update({ settingsId: 1 }, { strict: settings.strict }).catch(() => {
      throw new Error('Le mode strict ne peut pas être mis à jour');
    });
  }
}
