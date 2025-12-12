import { Injectable } from '@nestjs/common';
import { HorairesRepository } from './horaires.repository';
import { CreateHoraireDto } from './dto/create-horaire.dto';
import { UpdateHoraireDto } from './dto/update-horaire.dto';

@Injectable()
export class HorairesService {
    constructor(private readonly repository: HorairesRepository) { }

    findAllByRestaurant(restaurantId: string) {
        return this.repository.findAllByRestaurant(restaurantId);
    }

    findOne(id: string) {
        return this.repository.findOne(id);
    }

    create(restaurantId: string, createHoraireDto: CreateHoraireDto) {
        return this.repository.create(restaurantId, createHoraireDto);
    }

    update(id: string, updateHoraireDto: UpdateHoraireDto) {
        return this.repository.update(id, updateHoraireDto);
    }

    remove(id: string) {
        return this.repository.remove(id);
    }
}
