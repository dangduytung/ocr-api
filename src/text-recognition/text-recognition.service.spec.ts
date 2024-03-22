import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TextRecognitionService } from './text-recognition.service';

describe('TextRecognitionService', () => {
  let service: TextRecognitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TextRecognitionService],
    }).compile();

    service = module.get<TextRecognitionService>(TextRecognitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
