import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TextRecognitionController } from './text-recognition.controller';
import { TextRecognitionService } from './text-recognition.service';

@Module({
  imports: [HttpModule],
  controllers: [TextRecognitionController],
  providers: [TextRecognitionService],
})
export class TextRecognitionModule {}
