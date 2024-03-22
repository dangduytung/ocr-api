import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TextRecognitionController } from './text-recognition.controller';
import { TextRecognitionService } from './text-recognition.service';

describe('TextRecognitionController', () => {
  let controller: TextRecognitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TextRecognitionService],
      controllers: [TextRecognitionController],
    }).compile();

    controller = module.get<TextRecognitionController>(
      TextRecognitionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
