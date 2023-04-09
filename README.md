# bom-dia

Requirements:
- NodeJS v18
- HTTP Client - Insomnia, Postman etc

Configuration:
- .env file:
```js
PEXELS_API_KEY=
```

You can get your Pexels API Key through this link: https://www.pexels.com/api/

Patterns:
- Use cases must be created inside src/use-cases folder using use-cases pattern
```js
export class FunctionUseCase {
  async execute(params) {
    // ...
  }
}
```

Running:
```js
npm run dev
```

On HTTP client:

Request to: POST <code>http://localhost:&lt;PORT&gt;/custom-image</code>
```json
{
    "imageTheme": "fire",
    "term": "Jesus frases" // Recommended using THEME + frases
}
```

Images will be stored in /tmp folder.