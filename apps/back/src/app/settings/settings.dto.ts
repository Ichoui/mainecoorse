import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { EFlags } from '@shared-interfaces/flags';

export class SettingsDto {
  @IsNotEmpty()
  @IsEnum(EFlags)
  flag: EFlags;

  @IsNotEmpty()
  @IsBoolean()
  strict: boolean;
}
