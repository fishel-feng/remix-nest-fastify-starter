import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useStaticAssets({
    root: join(process.cwd(), "public", "build"),
    prefix: "/build",
    maxAge: "1h",
    setHeaders: setCustomCacheControl,
  });

  await app.listen(3000);
}

const remixBuildPath = join(process.cwd(), "public", "build");
function setCustomCacheControl(res: any, filePath: string) {
  // Remix fingerprints its assets so we can cache forever
  if (filePath.startsWith(remixBuildPath)) {
    res.setHeader("Cache-Control", `max-age=${60 * 60 * 24 * 365},immutable`);
  }
}

bootstrap();
