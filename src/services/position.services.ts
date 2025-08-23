import {positionRepository} from "../repositories/position.repository";
import {CreatePositionDto} from "../dto/create-position.dto";
import {NotFoundException} from "../exceptions/exceptions";
import {UpdatePositionDto} from "../dto/update-position.dto";

export class PositionService {
    public async create(dto: CreatePositionDto) {
        const position =positionRepository.create(dto);
        return await positionRepository.save(position);
    }

    public async findAll(page: number, limit: number) {
        const [position, total ]= await positionRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {id:"desc"}
        });

        return {
            total,
            results: position,
            currentPage:page,
            totalPages: Math.ceil(total / limit)
        }
    }

    public async findOne(id: number) {
        const position = await positionRepository.findOne({
            where: {id: id}
        });

        if (!position) {
            throw new NotFoundException("Position not found");
        }

        return position;
    }

    public async update(id: number, dto: UpdatePositionDto) {
        const position = await positionRepository.findOne({
            where: {id: id}
        });

        if (!position) {
            throw new NotFoundException("Position not found");
        }

        position.nameEn = dto.nameEn ?? position.nameEn;
        position.nameKh = dto.nameKh ?? position.nameKh;
        return await positionRepository.save(position);
    }

    public async remove(id: number) {
        const position = await positionRepository.findOne({
            where: {id: id}
        });

        if (!position) {
            throw new NotFoundException("Position not found");
        }

        return await positionRepository.remove(position);
    }
}
