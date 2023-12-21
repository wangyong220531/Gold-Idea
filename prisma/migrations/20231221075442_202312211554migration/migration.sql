-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "goal" TEXT NOT NULL DEFAULT '',
    "publisherId" INTEGER NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedByUserId" INTEGER,
    CONSTRAINT "Question_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Question_deletedByUserId_fkey" FOREIGN KEY ("deletedByUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "pinNote" TEXT,
    "pinnedUserId" INTEGER,
    "isHonored" BOOLEAN NOT NULL DEFAULT false,
    "honorNote" TEXT,
    "honoredUserId" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedByUserId" INTEGER,
    CONSTRAINT "Comment_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_pinnedUserId_fkey" FOREIGN KEY ("pinnedUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_honoredUserId_fkey" FOREIGN KEY ("honoredUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_deletedByUserId_fkey" FOREIGN KEY ("deletedByUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avator" TEXT,
    "userName" TEXT NOT NULL,
    "policeNo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "users_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "units" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unitNo" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Collections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Collections_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attentions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attentions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attentions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleName" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "deletedByUserId" INTEGER,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "roles_deletedByUserId_fkey" FOREIGN KEY ("deletedByUserId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Collections_userId_questionId_key" ON "Collections"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Attentions_userId_questionId_key" ON "Attentions"("userId", "questionId");
