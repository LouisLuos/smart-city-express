import { User } from "@shared/types/User";
import { v4 as uuidv4 } from 'uuid';

// Mock data (Simulando um banco de dados)
const usersMock: (User & { password: string })[] = [
  {
    id: '1',
    name: 'João Cidadão',
    email: 'joao@email.com',
    role: 'CITIZEN',
    createdAt: '2026-01-01',
    password: '123456'
  },
  {
    id: '2',
    name: 'Maria Gestora',
    email: 'maria@email.com',
    role: 'MANAGER',
    createdAt: '2026-01-01',
    password: '123456'
  }
];

export class UserRepository {
  /**
   * Busca um usuário pelo ID.
   * Repositórios devem ser assíncronos para simular I/O de banco de dados.
   */
  async findById(id: string): Promise<User | undefined> {
    const user = usersMock.find(u => u.id === id);
    if (!user) return undefined;

    // Removemos o password antes de retornar para seguir o tipo User
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Busca um usuário pelo e-mail.
   */
  async findByEmail(email: string): Promise<(User & { password: string }) | undefined> {
    // Aqui retornamos com password pois geralmente é usado no login/auth
    return usersMock.find(u => u.email === email);
  }

  /**
   * Cria um novo usuário.
   */
  async create(userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<User> {
    const newUser: User & { password: string } = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };

    usersMock.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}

// Exportamos uma instância para facilitar o uso (Singleton simples)
export const userRepository = new UserRepository();
