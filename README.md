# Pym

Pym is a desktop app that wraps the web app [Squoosh](https://squoosh.app) using [DeskGap](https://github.com/patr0nus/DeskGap).

[Squoosh](https://squoosh.app) is an image compression web app that allows you to dive into the advanced options provided
by various image compressors.

Image compression is handled locally; no additional data is sent to the server.

On top of it, Pym features:

- Dark mode support on macOS 10.14+ and Windows 10 1809+.
- Native file dialog for image exporting.
- No Google Analytics tracking.

# Building locally

Clone the repo, and:

```sh
npm install
npm run build
```

You can run the app with:

```sh
npm start
```
