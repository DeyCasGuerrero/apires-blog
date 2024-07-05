import { PartialType } from '@nestjs/mapped-types';
import { CreatePost } from './create-post.dto';

export class UpdatePost extends PartialType(CreatePost){}
