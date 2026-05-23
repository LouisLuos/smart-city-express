
import { userRepository } from "../repository/UserRepository.js";
//const bcrypt = require('bcrypt')




export const authService = {
    register: async (userData: any) => {
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists ) {
            throw new Error("E-mail já cadastrado");
        }


// Por que o TODO agora?
//  Como a task pede para focar no fluxo do endpoint primeiro, você vai salvar a senha exatamente como ela chega. O TODO serve para lembrarmos que, antes de colocar
//  esse sistema no ar (produção), precisamos instalar o bcrypt e fazer essa conversão.


     //   const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = {
            ...userData,
            role: 'CITIZEN' as const
        }

        return await userRepository.create(newUser)
    }
}