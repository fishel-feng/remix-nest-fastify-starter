import { All, Controller, Req, Res } from '@nestjs/common';
import { createRequestHandler } from '../remix-fastify';
import path from 'path';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  @All('*')
  renderRemix(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    const MODE = process.env.NODE_ENV;
    if (MODE === 'production') {
      createRequestHandler({
        build: require(path.join(process.cwd(), 'build')),
      })(request, reply);
    } else {
      purgeRequireCache();
      return createRequestHandler({
        build: require(path.join(process.cwd(), 'build')),
        mode: MODE,
      })(request, reply);
    }
  }
}

const BUILD_DIR = path.join(process.cwd(), 'build');
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
