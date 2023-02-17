import * as dotenv from 'dotenv';

dotenv.config();

import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();

export default prisma;
