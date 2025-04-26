import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EFlags } from '@shared-interfaces/flags';

@Entity({
  name: 'settings',
})
export class SettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('rowid')
  settingsId: number;

  @Column({ type: 'enum', enum: EFlags })
  flag: EFlags;

  @Column({ default: false })
  strict: boolean;
}
