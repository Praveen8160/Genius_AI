import { useAuth } from "@clerk/nextjs";
import { MAX_FREE_COUNT } from "../../constants";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
  const { userId } = useAuth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimit) {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        apiLimit: 1,
      },
    });
    return;
  }
  await prismadb.userApiLimit.update({
    where: {
      userId,
    },
    data: {
      apiLimit: userApiLimit.apiLimit + 1,
    },
  });
};

export const checkAPiLimit = async () => {
  const { userId } = useAuth();
  if (!userId) {
    return false;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit || userApiLimit.apiLimit < MAX_FREE_COUNT) {
    return true;
  } else {
    return false;
  }
};
