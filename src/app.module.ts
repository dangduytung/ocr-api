import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextRecognitionModule } from './text-recognition/text-recognition.module';

@Module({
  imports: [TextRecognitionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
