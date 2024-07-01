import {
    Body,
    Controller,
    Get,
    Delete,
    Post,
    UsePipes,
    ValidationPipe,
    Put,
    Param,
    Patch,
} from '@nestjs/common';

import { BlogService } from './blog.service';
import { CreatePost } from './dto/create-post.dto';
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    getAllPosts() {
        return this.blogService.getPost();
    }

    @Get('/byid/:id')
    getPostById(@Param('id') id: string) {
        return this.blogService.getPostById(id);
    }

    @Post()
    CreatePost(@Body() post: CreatePost) {
        return this.blogService.createPost(post);
    }

    @Patch(':id')
    updatePost(@Param('id') id:string, @Body() post: CreatePost){
        return this.blogService.updatePost(id, post);
    }

    @Delete(':id') 
    async deletePost(@Param('id') id: string):Promise<{deleted: boolean}> {
        return await this.blogService.deletePost(id);
    }
}
