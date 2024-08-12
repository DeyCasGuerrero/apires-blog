import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { UpdatePost } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Injectable()
export class BlogService {

    constructor(private readonly prisma: PrismaService) { }
    async getPost() {

        try {
            return await this.prisma.blog.findMany({
                include: {
                    BlogOnCategory: true,
                    // author:true,
                }
            });

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getPostById(id: string) {
        try {
            return await this.prisma.blog.findUnique({
                where: {
                    idBlog: id,
                    
                },
                include: {
                    BlogOnCategory: true,
                    // author:true,
                }
            });

        } catch (error) {
            throw new BadRequestException(error.message, error.code);
        }
    }

    async createPost(post: CreatePost) {

        let emailExists = false;

        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: post.authorEmail
                }
            })

            if (user) {
                emailExists = true;
            }
        } catch (error) {
            throw new BadRequestException('Error checking if email exists', error.message);
        }

        if (!emailExists) {
            throw new BadRequestException('Email does not exist');//when it's !false = true
        } else {
            console.log('Email already exists') //when it's !true = false
        }


        try {
            return await this.prisma.blog.create({
                data: {
                    title: post.title,
                    content: post.content,
                    authorEmail: post.authorEmail,
                    BlogOnCategory: {
                        create: post.categories.map(category => ({ //create se usa para crear el registro en la tabla BlogOnCategory
                            category: {
                                connect: { //usamos connect para asociar la data que está en nuestra base de datos por medio de id y nombre
                                    idCategory: category.idCategory,
                                    name: category.name
                                }
                            }
                        }))
                    }
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message, error)
        }
    }

    async getPostsByEmail(email:string){
        try {
            return await this.prisma.blog.findMany({
                where:{
                    authorEmail:email,
                },
                include:{
                    BlogOnCategory: true,
                    // author:true,
                }
            })
        } catch (error) {
            throw new BadRequestException('Bad request ', error);
        }
        
    }

    async updatePost(id: string, updatePost: UpdatePost) {

        try {

            // obtengo todos las categorias de la base de datos
            const existingCategory = await this.prisma.blogOnCategory.findMany({
                where: {
                    blogId: id,
                },
                select: {
                    categoryId: true, //solo voy a mostrar la id de categoria
                    // blogId:true,
                }
            })

            console.log("id de la categoria asociada a la id del blog",existingCategory)

            // itero por el objeto que me da existingCategory
            const existingCategoryIds= existingCategory.map(c => c.categoryId)
            console.log("id de las categorias",existingCategory)

            //base de datos [1,3,5,6]

            const newCategoryIds = updatePost.categories.map(c => c.idCategory);
            console.log("ids de las categorias que vienen de cliente",newCategoryIds)

            //[1,3]

            const categoriesToDisconnect = existingCategoryIds.filter(
                categoryId => !newCategoryIds.includes(categoryId)
            );
            const categoriesToConnect = newCategoryIds.filter(
                categoryId => !existingCategoryIds.includes(categoryId)
            );

            return await this.prisma.blog.update({
                where: {
                    idBlog: id,
                },
                data: {
                    title: updatePost.title,
                    content: updatePost.content,
                    BlogOnCategory: {
                        deleteMany: {
                            categoryId: { in: categoriesToDisconnect } //in: para (en ese caso) eliminar a la vez emdiante el array categoriesToDisconnect
                        },
                        create: categoriesToConnect.map(categoryId => ({
                            category: {
                                connect: { idCategory: categoryId }
                            }
                        }))
                    }
                },
                include:{
                    BlogOnCategory: true,
                    // author:true,
                }
            });

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async deletePost(id: string): Promise<{ deleted: boolean }> {
        try {
            await this.prisma.blog.delete({
                where: {
                    idBlog: id,
                }
            });

            return { deleted: true }

        } catch (error) {
            return { deleted: false }
        }
    }
}
