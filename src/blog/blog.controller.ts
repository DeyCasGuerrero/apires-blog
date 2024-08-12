import {
    Body,
    Controller,
    Get,
    Delete,
    Post,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';

import { BlogService } from './blog.service';
import { CreatePost } from './dto/create-post.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('blog')

export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    getAllPosts() {
        return this.blogService.getPost();
    }

    @Get('/byid/:id')
    @UseGuards(AuthGuard)
    getPostById(@Param('id') id: string) {
        return this.blogService.getPostById(id);
    }

    @Get('/email/:email')
    getPostsByEmail(@Param('email') email: string) {
        return this.blogService.getPostsByEmail(email);
    }

    @Post()
    @UseGuards(AuthGuard)
    CreatePost(@Body() post: CreatePost) {
        return this.blogService.createPost(post);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    updatePost(@Param('id') id:string, @Body() post: CreatePost){
        return this.blogService.updatePost(id, post);
    }

    @Delete(':id') 
    @UseGuards(AuthGuard)
    async deletePost(@Param('id') id: string):Promise<{deleted: boolean}> {
        return await this.blogService.deletePost(id);
    }
}
