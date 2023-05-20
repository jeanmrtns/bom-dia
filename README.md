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

Installing packages:
```js
npm install
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

---

## WEB
Enter web folder
```bash
cd web
```

Installing packages:
```bash
npm install
```

Running:
```bash
npm run dev
```

App will be available at http://localhost:3000 if the port 3000 is available, otherwise will use the next port e.g 3001