import { PrismaClient, User } from '@prisma/client';
import { SocketException } from '../exceptions/SocketException';

class ConnectionService {
  public users = new PrismaClient().user;

  public async setOnlineStatus(userUuid: string, online: boolean): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { userUuid: userUuid } });
    if (!findUser) throw new SocketException(409, `User uuid ${userUuid} not found`);
    const updatedUser = await this.users.update({ where: { id: findUser.id }, data: { online: online } });
    return updatedUser;
  }
}

export default ConnectionService;
