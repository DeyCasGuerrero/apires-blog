import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {

    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email:createUserDto.email,
          password:createUserDto.password,
        }
      })
      
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async findAll() {
    return await this.prisma.user.findMany({
      include:{
        Blog: true,
        profile:true,
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where:{
        idUser:id,
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    try {
      const dataUpdate = await this.prisma.user.update({
        where:{
          idUser:id,
        },
        data:{
          name:updateUserDto.name,
          email:updateUserDto.email,
          password:updateUserDto.password,
        }
      })
      
      return dataUpdate;
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async remove(id: string): Promise<{deleted: boolean}> {
    try {
      await this.prisma.user.delete({
        where:{
          idUser:id,
        }
      })
      return { deleted: true }
    } catch (error) {
      return { deleted:false }
    }
  }
}
