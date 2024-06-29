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

    @Post()
    CreatePost(@Body() post: CreatePost) {
        return this.blogService.createPost(post);
    }

    @Patch()
    updatePost(@Param('id') id:string, @Body() post: CreatePost){
        return this.blogService.updatePost(id, post);
    }

    @Delete(':id') 
    deletePost(@Param('id') id: string) {
        return this.blogService.deletePost(id);
    }
}
