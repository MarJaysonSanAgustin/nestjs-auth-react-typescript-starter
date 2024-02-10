import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [userProvider, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
