import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {

  constructor(private prisma: PrismaService) { }
  async create(createProfileDto: CreateProfileDto) {

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: createProfileDto.userEmail,
      }
    })
    //se me ocurrio esta validación sencilla xd que estar creando un boolean

    if (!emailExists) {
      throw new BadRequestException('Email not found');
    }


    try {
      const profile = await this.prisma.profile.create({
        data: {
          userEmail: createProfileDto.userEmail,
          description: createProfileDto.description,
        }
      })
      return profile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const profiles = await this.prisma.profile.findMany();
      return profiles;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const profileFound = await this.prisma.profile.findUnique({
        where: {
          idProfile: id,
        }
      })
      return profileFound;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }

  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {

    try {
      const profileupdated = await this.prisma.profile.update({
        where: {
          idProfile: id,
        },
        data: updateProfileDto
      })

      return profileupdated;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async remove(id: number): Promise<{ deleted: boolean }> {

    try {
      await this.prisma.profile.delete({
        where: {
          idProfile: id,
        }
      })
      return { deleted: true };
    } catch (error) {
      return { deleted: false };
    }
  }
}
