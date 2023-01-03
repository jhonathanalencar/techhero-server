import { Request, Response } from 'express';

class LogoutController {
  async handle(request: Request, response: Response) {
    const cookies = request.cookies;

    if (cookies?.jwt === undefined) {
      return response.sendStatus(204);
    }

    response.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    response.status(200).json({ message: 'Cookie cleared' });
  }
}

export { LogoutController };
