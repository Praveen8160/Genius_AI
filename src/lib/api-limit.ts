import { MAX_FREE_COUNT } from "../../constants";
import prismadb from "./prismadb";

export const increaseApiLimit = async (userId: string | null) => {
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

export const checkAPiLimit = async (userId: any) => {
  try {
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
  } catch (error) {
    console.error("Error checking api limit:", error);
    return false;
  }
};

// export const getApiLimit = async (userId: string | null) => {
//   if (!userId) {
//     console.log("hello")
//     return 0;
//   }

//   const userApiLimit = await prismadb.userApiLimit.findUnique({
//     where: {
//       userId,
//     },
//   });

//   if (!userApiLimit) {
//     console.log("hyy")
//     return 0;
//   }
//   console.log("done")
//   return userApiLimit.apiLimit;
// };
