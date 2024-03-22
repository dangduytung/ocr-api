import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TextRecognitionService } from './text-recognition.service';

@Controller('text-recognition')
export class TextRecognitionController {
  constructor(
    private readonly textRecognitionService: TextRecognitionService,
  ) {}

  @Post('resolve-base64')
  async resolveBase64(
    @Body() body: { base64Image: string },
  ): Promise<{ text: string }> {
    try {
      console.log('Base64 Image:', body.base64Image);
      const text = await this.textRecognitionService.resolveFromBase64(
        body.base64Image,
      );

      return { text };
    } catch (error) {
      throw new Error('Failed to resolve base64.');
    }
  }

  @Post('resolve-link')
  async resolveLink(
    @Body('imageLink') imageLink: string,
  ): Promise<{ text: string }> {
    try {
      console.log('Image link:', imageLink);
      const text = await this.textRecognitionService.resolveFromLink(imageLink);
      return { text };
    } catch (error) {
      throw new Error(`Failed to resolve link: ${imageLink}`);
    }
  }

  @Post('resolve-image')
  @UseInterceptors(FileInterceptor('image'))
  async resolveImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ text: string }> {
    try {
      console.log('Image file:', image.originalname);
      const text = await this.textRecognitionService.resolveImage(image.buffer);
      return { text };
    } catch (error) {
      throw new Error(`Failed to resolve image: ${image.originalname}`);
    }
  }
}
