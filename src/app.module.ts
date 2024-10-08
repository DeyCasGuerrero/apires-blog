import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ProfileModule } from './profile/profile.module';
import { CategoriesModule } from './categories/categories.module';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      
      isGlobal:true,

    }),
    UserModule,
    AuthModule,
    BlogModule,
    ProfileModule,
    CategoriesModule,
    NewsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
