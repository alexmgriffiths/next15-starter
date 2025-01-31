#!/bin/bash
set -a
. /app/.env
set +a
npx prisma generate
npx prisma migrate deploy
npx prisma studio &
npx prisma db seed
npx next dev