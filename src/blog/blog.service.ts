import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { UpdatePost } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Injectable()
export class BlogService {

    constructor(private readonly prisma: PrismaService) { }
    getPost() {
        return this.prisma.blog.findMany();
    }

    getPostById(id: string) {
        return this.prisma.blog.findUnique({
            where: {
                idBlog: id,
            }
        });
    }

    async createPost(post: CreatePost) {
        
        let emailExists = false;

        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: post.authorEmail
                }
            })

            if(user){
                emailExists = true;
            }
        } catch (error) {
            throw new BadRequestException('Error checking if email exists', error.message);
        }

        if(!emailExists){
            throw new BadRequestException('Email does not exist');//when it's !false = true
        }else{
            console.log('Email already exists') //when it's !true = false
        }

        const categoryData = post.categories.map(category => ({
            category: {
                connect: {
                    name: category.name, // Ajusta según tu estructura de datos
                },
            },
        }));
        
        try {
            return await this.prisma.blog.create({
                data: {
                    title: post.title,
                    content: post.content,
                    authorEmail: post.authorEmail,
                    // BlogOnCategory:{
                    //     create: categoryData
                    // }
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message, error)
        }
    }

    updatePost(id: string, updatePost: UpdatePost) {
        return this.prisma.blog.update({
            where: {
                idBlog: id,
            },
            data: {
                title: updatePost.title,
                content: updatePost.content,
                // categories: updatePost.categories, 
            }
        });
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
