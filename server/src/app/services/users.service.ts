import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class UserService {
  public users = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findMany();
    const mappedAllUser = allUser.map(e => ({id: e.id, username: e.username, userUuid: e.userUuid}))
    return mappedAllUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    const mappedUser = {id: findUser.id, username: findUser.username, userUuid: findUser.userUuid}
    return mappedUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findUnique({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 12);
    const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 12);
    const updateUserData = await this.users.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.users.delete({ where: { id: userId } });
    return deleteUserData;
  }
}

export default UserService;
