# OCR-API (Text Recognition)
This project utilizes Nest.js 10.x, Tesseract 5.x, and from Node.js 18.x to build a text recognition service capable of extracting text from images, base64 strings, and links.

#### Explore further:

* [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
* [Tesseract OCR](https://github.com/tesseract-ocr) the official repository for Tesseract OCR

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Sample API Endpoint

### Resolve Base64

This endpoint resolves base64-encoded images to extract text.

**HTTP Method:** POST

**URL:** `http://localhost:3000/text-recognition/resolve-base64`

**Request Body:**
```json
{
  "base64Image": "base64-encoded-image-data"
}
```
**Response:**
```json
{
  "text": "Extracted text from the image"
}
```



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Dang Duy Tung](https://github.com/dangduytung)

## License

Nest is [MIT licensed](LICENSE).
