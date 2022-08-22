import { PrismaClient, User } from '@prisma/client';
import { SocketException } from '../exceptions/SocketException';

class ConnectionService {
  public users = new PrismaClient().user;

  public async setOnlineStatus(id: number, online: boolean): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { id: id } });
    if (!findUser) throw new SocketException(409, `User uuid ${id} not found`);
    const updatedUser = await this.users.update({ where: { id: id }, data: { online: online } });
    return updatedUser;
  }
}

export default ConnectionService;
