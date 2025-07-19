# Docker Usage

Build the image:
```
docker build -t calculator-ui .
```

Run the container:
```
docker run -p 8080:80 calculator-ui
```

Then visit http://localhost:8080 in your browser.
