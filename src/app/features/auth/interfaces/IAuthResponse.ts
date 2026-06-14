import { IAuthUser } from "./IAuthUser";
import { ITokens } from "./ITokens";

export interface IAuthResponse extends IAuthUser, ITokens {}