import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { firstValueFrom } from 'rxjs';
import { createWorker } from 'tesseract.js';

@Injectable()
export class TextRecognitionService {
  constructor(private readonly httpService: HttpService) {}

  async recognizeText(imageData: string | Buffer): Promise<string> {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data } = await worker.recognize(imageData);
    await worker.terminate();

    return data.text ? data.text.trim().replace(/\s/g, '') : '';
  }

  async saveCanvasAsImage(canvas: Canvas, path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const directory = dirname(path);
      if (!existsSync(directory)) {
        mkdirSync(directory, { recursive: true });
      }
      const stream = canvas.createJPEGStream();
      const out = createWriteStream(path);
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });
  }

  async resolveImage(
    imageData: Buffer,
    type: string = 'file',
  ): Promise<string> {
    try {
      const img = await loadImage(imageData);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const text = await this.recognizeText(canvas.toBuffer('image/jpeg'));
      console.log('text', text);
      const currentTime = new Date().getTime();
      await this.saveCanvasAsImage(
        canvas,
        `data/${type}_${currentTime}_${text}.jpeg`,
      );
      return text;
    } catch (error) {
      console.error('Error resolving text:', error.stack);
      throw new Error('Failed to resolve text.');
    }
  }

  async resolveFromBase64(imageData: string): Promise<string> {
    const imageBuffer = Buffer.from(imageData, 'base64');
    return this.resolveImage(imageBuffer, 'base64');
  }

  async resolveFromLink(imageLink: string): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(imageLink, {
          responseType: 'arraybuffer',
        }),
      );
      const imageBuffer = Buffer.from(data, 'binary');
      return this.resolveImage(imageBuffer, 'link');
    } catch (error) {
      console.error('Error resolving text from link:', error.stack);
      throw new Error('Failed to resolve text from link.');
    }
  }
}
