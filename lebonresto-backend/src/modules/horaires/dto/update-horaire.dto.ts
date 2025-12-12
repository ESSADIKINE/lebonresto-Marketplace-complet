import { PartialType } from '@nestjs/swagger';
import { CreateHoraireDto } from './create-horaire.dto';

export class UpdateHoraireDto extends PartialType(CreateHoraireDto) { }
