-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userGender" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userSecondName" TEXT NOT NULL,
    "userThirdName" TEXT NOT NULL,
    "userFirstLastname" TEXT NOT NULL,
    "userSecondLastname" TEXT NOT NULL,
    "userThirdLastname" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userDui" TEXT NOT NULL,
    "userBirthdate" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "userCreateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
