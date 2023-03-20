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
class FunctionUseCase {
  async execute(params) {
    // ...
  }
}

module.exports = FunctionUseCase
```
