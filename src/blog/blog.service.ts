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

    createPost(post: CreatePost) {
        
        return this.prisma.blog.create({data:{
                title: post.title,
                content: post.content,
                // categories: post.categories, // Usa `categories` que es el nombre correcto en Prisma
        }});
    }

    updatePost(id:string, updatePost: UpdatePost) {
        return ;
    }

    deletePost(id:string){
        return ;
    }
}
