import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NewsService {

  constructor(private prisma: PrismaService) { };
  async create(createNewsDto: CreateNewsDto) {
    try {
      
      return await this.prisma.news.create({
        data: {
          title: createNewsDto.title,
          content: createNewsDto.content,
          newsOnCate:{
            create: createNewsDto.categories.map( newCategory => ({
              newCategory:{
                connect:{
                  idCaNews:newCategory.idCateNews,
                  category:newCategory.category,
                }
              }
            }))
          },

          // newsOnCate: {
          //   create: createNewsDto.categories.map(newCategory => ({  //para solo crear
          //     idCategory: newCategory.idCateNews
          //   }))
          // }

          UserOnNews:{
            create: createNewsDto.users.map( user =>({
              author:{
                connect:{
                  email:user.email
                }
              }
            }))
          }
        }
      })

    } catch (error) {
      throw new BadRequestException(error.message)
    };
  }

  async findAll() {
    try {

      const news = this.prisma.news.findMany({
        include: {
          UserOnNews: true,
          newsOnCate: true,
        }
      })

      return news;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.news.findUnique({
        where: {
          idNews: id,
        }
      })

      return data;
    } catch (error) {
      throw new BadRequestException(error.code);
    }

  }
    async update(id: number, updateNewsDto: UpdateNewsDto) {

      const categoriesExists = await this.prisma.newsOnCate.findMany({
        where: {
          newsId:id,
        },
        select:{
          idCategory:true,
        }
      })

      const existingCategory = categoriesExists.map((c =>c.idCategory))

      const newCategoryId= updateNewsDto.categories.map(c => c.idCateNews)


      const categegoriesToDisconnect = existingCategory.filter(
        categoryId => !newCategoryId.includes(categoryId)
      );

      const categoriesToConnect = newCategoryId.filter(
        categoryId =>!existingCategory.includes(categoryId)
      );

      try {
        return await this.prisma.news.update({
          where:{
            idNews: id,
          },
          data:{
            title:updateNewsDto.title,
            content:updateNewsDto.content,
            newsOnCate:{
              deleteMany:{
                idCategory:{in:categegoriesToDisconnect}
              },
              create:categoriesToConnect.map((categoryId)=>({
                newCategory:{
                  connect:{
                    idCaNews:categoryId,
                  }
                }
              }))
            }
          }
        })
      } catch (error) {
        return new BadRequestException(error.code);
      }
    }

    async remove(id: number):Promise<{deleted:boolean}>{
      try {
        await this.prisma.news.delete({
          where: {
            idNews: id,
          }
        })
        return { deleted: true }
      } catch (error) {
        return {deleted: false}
      }
    }
  }
