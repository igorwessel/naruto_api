import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import * as express from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

@Middleware({ type: 'before' })
export class RateLimiter implements ExpressMiddlewareInterface {
	private _options = {
		port: parseInt(process.env.REDIS_PORT) || 6379,
		db: parseInt(process.env.REDIS_DB) || 0,
		host: process.env.REDIS_HOST || '127.0.0.1',
		enableOfflineQueue: false
	};

	private _redisClient = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : new Redis(this._options);

	private _rateLimiterOptions = {
		storeClient: this._redisClient,
		keyPrefix: 'middleware',
		points: 10, // 10 requests
		duration: 1 // per 1 second by IP
	};

	private _rateLimiter = new RateLimiterRedis(this._rateLimiterOptions);

	use(request: express.Request, response: express.Response, next: express.NextFunction): void {
		this._rateLimiter
			.consume(request.ip)
			.then(rateLimiterRes => {
				response.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000);
				response.setHeader('X-RateLimit-Limit', this._rateLimiterOptions.points);
				response.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
				response.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toString());
				next();
			})
			.catch(rateLimiterRes => {
				response.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000);
				response.setHeader('X-RateLimit-Limit', this._rateLimiterOptions.points);
				response.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
				response.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toString());
				response.status(429).send({ message: 'Too Many Requests! calm down' });
			});
	}
}
