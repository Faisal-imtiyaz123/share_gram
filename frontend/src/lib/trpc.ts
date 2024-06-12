import { createTRPCReact } from '@trpc/react-query';
import { AppRouter} from "../../../server/server"
export const trpc = createTRPCReact<AppRouter>();