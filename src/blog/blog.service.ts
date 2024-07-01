import { Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { UpdatePost } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {

    constructor(private prisma:PrismaService){}
    getPost() {
        return this.prisma.blog.findMany();
    }

    getPostById(id:string){
        return this.prisma.blog.findUnique({
            where:{
                idBlog: id,
            }
        });
    }

    createPost(post: CreatePost) {
        
        return this.prisma.blog.create({
            data:{
                title: post.title,
                content: post.content,
                // categories: post.categories, // Usa `categories` que es el nombre correcto en Prisma*/
            }
        });
    }

    updatePost(id:string, updatePost: UpdatePost) {
        return this.prisma.blog.update({
            where:{
                idBlog: id,
            },
            data:{
                title: updatePost.title,
                content: updatePost.content,
                // categories: updatePost.categories, // Usa `categories` que es el nombre correcto en Prisma*/
            }
        });
    }

    async deletePost(id:string):Promise<{deleted: boolean}>{
        try {
            await this.prisma.blog.delete({
                where:{
                    idBlog: id,
                }
            });

            return {deleted: true}
            
        } catch (error) {
            return {deleted: false}
        }
    }
}
