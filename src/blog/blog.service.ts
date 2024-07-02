import { Injectable } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { UpdatePost } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {

    constructor(private prisma: PrismaService) { }
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

        // const category = await this.prisma.category.findUnique({
        //     where: { 
        //         name: post.categories.name 
        //     },
        // });


        return this.prisma.blog.create({
            data: {
                title: post.title,
                content: post.content,
                authorEmail:post.authorEmail,
            },
        });
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
