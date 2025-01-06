import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DatabaseConfig } from './database.config';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PackageModule } from './package/package.module';
import { WalletModule } from './wallet/wallet.module';
import { ReferralModule } from './referral/referral.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { BlogModule } from './blog/blog.module';
import { FilesModule } from './files/files.module';
import { SecurityQuestionModule } from './security-question/security-question.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { ProfileModule } from './profile/profile.module';
import { EarningsModule } from './earnings/earnings.module';
import { PusherService } from './pusher/pusher.service';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { EmailSettingsModule } from './email-settings/email-settings.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: '*',
        credentials: true,
      },
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ignoreEnvFile: true,
    }),
    UserModule,
    PackageModule,
    WalletModule,
    ReferralModule,
    NotificationModule,
    ChatModule,
    MessageModule,
    BlogModule,
    FilesModule,
    SecurityQuestionModule,
    CommentsModule,
    CategoriesModule,
    ComplaintsModule,
    ProfileModule,
    EarningsModule,
    NotificationModule,
    SubCategoryModule,
    EmailSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PusherService],
})
export class AppModule {}
