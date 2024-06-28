import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {

    getPost(){
        return [ 'posts', 'posts', 'posts' ];
    }
}
